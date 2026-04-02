# SITE_EUGENIA

Código-fonte do frontend atualmente publicado em `www.eugenia.ia.br`.

## Stack

- React
- Vite
- React Router
- GSAP
- Lenis

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Build para deploy

Para gerar o artefato usado na AWS:

```bash
npm run build -- --outDir ../deploy
```

O diretório `../deploy` contém o bundle estático e o script de publicação em S3 + CloudFront.

## Escopo

Este projeto contém apenas o frontend. A automação da Eugênia e quaisquer integrações de agente vivem em outro repositório.
