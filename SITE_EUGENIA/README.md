# Site Eugen.IA

Nova versão local do frontend da Eugen.IA.

## Stack

- React
- Vite
- JSX/JavaScript
- CSS global
- React Router
- GSAP ScrollTrigger
- Lenis
- Lucide React

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run build -- --outDir ../deploy
```

## Estrutura

- `src/data/siteContent.js`: copy e conteúdo estruturado
- `src/components/`: componentes visuais e interativos
- `src/contexts/`: providers de tema e chat
- `src/hooks/`: Lenis, cursor e reveal
- `src/pages/`: rotas compatíveis
- `src/utils/chatPayload.js`: contrato do webhook n8n

## Deploy

O build de publicação deve ser gerado na pasta raiz `deploy/`:

```bash
npm run build -- --outDir ../deploy
```
