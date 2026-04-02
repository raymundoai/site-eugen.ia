# Site Eugen.IA

Este repositório representa apenas o frontend atualmente publicado na AWS em `www.eugenia.ia.br`.

## Estrutura

- `SITE_EUGENIA/`: código-fonte do site em React + Vite
- `deploy/`: artefato estático e instruções de publicação em S3 + CloudFront

## Escopo

- Esta base não contém mais o projeto da automação/agente Eugênia.
- Qualquer backend, workflow n8n, webhook ou agente fica em outro projeto.
- O objetivo aqui é preservar e evoluir exclusivamente o site hoje publicado na AWS.

## Fluxo de trabalho

```bash
cd SITE_EUGENIA
npm ci
npm run build -- --outDir ../deploy

cd ..
bash deploy/deploy.sh
```

## AWS atual

- Bucket S3: `www.eugenia.ia.br`
- CloudFront: `E20ELLSGH3QH8R`
- Região: `sa-east-1`

Para detalhes de deploy, ver `deploy/DEPLOY_INSTRUCOES.md`.
