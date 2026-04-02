#!/bin/bash
# ============================================================
# Script de deploy — Site Eugênia → S3 + CloudFront
# ============================================================
# Pré-requisito: AWS CLI instalado e configurado (aws configure)
# ============================================================

S3_BUCKET="www.eugenia.ia.br"
CLOUDFRONT_ID="E20ELLSGH3QH8R"
AWS_REGION="sa-east-1"

# Diretório com os arquivos buildados (este script deve estar nele)
DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "==> Verificando AWS CLI..."
if ! command -v aws &> /dev/null; then
  echo "ERRO: AWS CLI não encontrado."
  echo "Instale em: https://aws.amazon.com/cli/"
  exit 1
fi

echo ""
echo "==> Bucket : s3://$S3_BUCKET"
echo "==> CDN    : $CLOUDFRONT_ID"
echo "==> Região : $AWS_REGION"
echo ""

# ------------------------------------------------------------
# 1. assets/ — cache longo (1 ano, imutável)
#    Vite coloca hash no nome do arquivo (ex: index-DememI8b.js),
#    então nunca haverá colisão com versões antigas.
#    --delete remove arquivos antigos do bucket que não existem mais.
# ------------------------------------------------------------
echo "==> [1/4] Enviando assets/ (cache 1 ano)..."
aws s3 sync "$DEPLOY_DIR/assets/" "s3://$S3_BUCKET/assets/" \
  --region "$AWS_REGION" \
  --cache-control "public, max-age=31536000, immutable" \
  --delete

# ------------------------------------------------------------
# 2. icon/ — cache 1 dia
# ------------------------------------------------------------
echo "==> [2/4] Enviando icon/..."
aws s3 sync "$DEPLOY_DIR/icon/" "s3://$S3_BUCKET/icon/" \
  --region "$AWS_REGION" \
  --cache-control "public, max-age=86400" \
  --delete

# ------------------------------------------------------------
# 3. index.html — SEM cache
#    Crítico: é o único arquivo sem hash. Se ficar em cache,
#    o usuário vê versão antiga mesmo após novo deploy.
# ------------------------------------------------------------
echo "==> [3/4] Enviando index.html (sem cache)..."
aws s3 cp "$DEPLOY_DIR/index.html" "s3://$S3_BUCKET/index.html" \
  --region "$AWS_REGION" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --content-type "text/html; charset=utf-8"

# ------------------------------------------------------------
# 4. Invalidar CloudFront
#    Remove arquivos obsoletos dos edges (especialmente index.html).
#    Custo: primeira invalidação do mês é gratuita (até 1000 paths).
# ------------------------------------------------------------
echo "==> [4/4] Invalidando CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_ID" \
  --paths "/*" \
  --output table

echo ""
echo "✓ Deploy concluído — https://www.eugenia.ia.br"
