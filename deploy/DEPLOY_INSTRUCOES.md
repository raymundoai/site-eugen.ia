# Instruções de Deploy — Site Eugênia (S3 + CloudFront)

> Gerado em: 2026-03-08
> Bucket: `www.eugenia.ia.br` | CloudFront: `E20ELLSGH3QH8R` | Região: `sa-east-1`

---

## O que está nesta pasta

```text
deploy/
├── index.html          ← entrada do app React (sem cache)
├── vite.svg
├── assets/             ← JS, CSS, imagens (nomes com hash — cache longo)
│   ├── index-DememI8b.js
│   ├── index-D5-CSMLx.css
│   ├── eugenia-4RnHuGqX.jpg
│   └── foto-perfil-1-4GUuG1jL.png
├── icon/
├── deploy.sh           ← script de deploy (já configurado)
└── DEPLOY_INSTRUCOES.md
```

---

## Atenção: arquivos antigos que serão removidos do bucket

O `--delete` no script apaga do S3 tudo que não existe mais no build novo.
Estes arquivos do bucket atual **serão deletados**:

| Arquivo | Motivo |
| --- | --- |
| `assets/eugenia-logo-b9ensZ9b.png` | Substituído por novo nome com hash |
| `assets/hero-background-DKH7fyeE.jpg` | Substituído por novo nome com hash |
| `assets/index-Bkl3Dg-r.css` | Versão anterior do CSS |
| `assets/index-Cw3DFUSH.js` | Versão anterior do JS |
| `assets/index-voHdvUBS.js` | Versão anterior do JS |
| `eugenia-logo.png` | Não existe no novo build |
| `favicon.ico` | Não existe no novo build |
| `placeholder.svg` | Não existe no novo build |

> Se quiser manter `favicon.ico` ou `robots.txt` no site, adicione esses arquivos
> em `SITE_EUGENIA/public/` antes de rodar o próximo build.
> O Vite copia tudo da pasta `public/` para a raiz do build automaticamente.

---

## Pré-requisito único: configurar AWS CLI (uma vez só)

1. **Instalar:** <https://aws.amazon.com/cli/>
2. **Configurar:**

   ```bash
   aws configure
   ```

   Preencher com:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region: `sa-east-1`
   - Default output format: `json`

---

## Configuração obrigatória no CloudFront (apenas na primeira vez)

O site usa React Router. Sem essa configuração, rotas diretas como
`eugenia.ia.br/contato` retornam 403/404 em vez de carregar o app.

**Onde configurar:**
CloudFront console → distribuição `E20ELLSGH3QH8R` → aba **Error Pages** → **Create custom error response**

| Error code | Response page path | HTTP response code |
| --- | --- | --- |
| 403 | /index.html | 200 |
| 404 | /index.html | 200 |

Fazer isso para os dois códigos (403 e 404).

---

## Executar o deploy

Com AWS CLI instalado e configurado, rodar na raiz do projeto:

```bash
bash deploy/deploy.sh
```

O script executa na ordem correta:

| Passo | O que faz | Cache aplicado |
| --- | --- | --- |
| 1 | Sincroniza `assets/` (com `--delete`) | 1 ano — imutável |
| 2 | Sincroniza `icon/` (com `--delete`) | 1 dia |
| 3 | Envia `index.html` | Nenhum |
| 4 | Invalida CloudFront `/*` | — |

---

## Por que cache diferente para cada tipo?

| Arquivo | Cache | Motivo |
| --- | --- | --- |
| `assets/*.js`, `assets/*.css`, imagens | 1 ano | Vite coloca hash no nome. Se o conteúdo mudar, o nome muda — nunca haverá versão antiga em cache. |
| `index.html` | Nenhum | Único arquivo sem hash. Se ficar em cache, o usuário vê versão antiga após novo deploy. |

---

## Rotina de deploy (próximas vezes)

```bash
# 1. Build
cd SITE_EUGENIA
npm run build -- --outDir ../deploy

# 2. Deploy
cd ..
bash deploy/deploy.sh
```

---

## Verificação pós-deploy

- Abrir `https://www.eugenia.ia.br` — site deve carregar normalmente
- Acessar rota direta (`/contato`) — deve funcionar sem erro 403/404
- DevTools → Network → clicar em `index.html`: verificar `cache-control: no-cache`
- DevTools → Network → clicar em `index-*.js`: verificar `cache-control: max-age=31536000`
