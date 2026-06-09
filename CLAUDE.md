# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Site da Eugen.IA (www.eugenia.ia.br) — React + Vite, hospedado em S3 como site estático. SSG pós-build via react-snap.

## Comandos

```bash
npm run dev        # servidor de desenvolvimento em localhost:5173
npm run build      # build de produção + react-snap (gera HTML por rota em dist/)
npm run preview    # serve o dist/ localmente para inspeção
```

Verificar bundle após build:
```bash
npx vite-bundle-visualizer
```

## Arquitetura

### Roteamento
`src/app/AppRouter.jsx` — react-router-dom v6, todas as rotas com `React.lazy` + `Suspense`.

### Páginas (src/pages/)
Uma por rota: `Home`, `Clinicas`, `Consultoria`, `Treinamento`, `Teste`, `Faq`, `Contato`. Cada uma tem `<Helmet>` com title e description únicos.

### Seções da Home (src/sections/)
Componentes exclusivos da home, um por seção: `HeroSection`, `ProblemSection`, `ServicesSection`, `MethodSection`, `DiferenciaisSection`, `FaqPreviewSection`, `CtaSection`.

### Componentes UI (src/components/ui/)
- `Button` — prop `variant` (primary/secondary/ghost) + `size` (sm/md/lg) + `href` para links
- `Tag` — label de seção em uppercase dourado
- `Accordion` — FAQ acessível, um item aberto por vez

### Layout (src/components/layout/)
- `Header` — fixed, estado expandido (topo) → pill condensada (após 80px de scroll). Dropdown "Serviços" no hover.
- `Footer` — 3 colunas: brand, nav, contato

### Design system
- `src/styles/tokens.css` — todas as CSS custom properties (cores, espaçamentos, radii)
- `src/styles/global.css` — reset + base
- CSS co-locado com cada componente (sem CSS modules, sem Tailwind)
- Cor primária: `var(--primary)` = `#fbba23` (dourado)
- Fundo: `var(--background)` = `#0f131a`
- Container: `var(--container)` = `min(1180px, calc(100vw - 40px))`

### Smooth scroll
`src/hooks/useLenis.js` — instancia Lenis com `lerp: 0.09`, chamado uma vez em `App.jsx`.

## Fases do projeto

- **Fase 1 (atual):** estrutura, rotas e copy. Sem animações complexas.
- **Fase 2 (futura):** canvas de partículas no hero, cursor customizado com lerp, GSAP ScrollTrigger horizontal (serviços), stack progressivo (Método 5D), parallax (Diferenciais).

## Restrições

- Bundle total < 400kb gzipped
- Sem SSR runtime — apenas arquivos estáticos para S3
- Three.js: permitido para BackgroundScene e HeaderLens (aprovado para efeitos WebGL)
- Sem Framer Motion, Lottie
- GSAP só na Fase 2, importado apenas onde usado
- Copy preservada fiel ao `plan.md` — não alterar sem instrução explícita

## Documentação de execução

Plano e documentos de tarefa por etapa estão em `docs/`:
- `docs/superpowers/plans/2026-06-05-eugenia-fase1.md` — plano principal da Fase 1
- `docs/tasks/01-scaffold.md` até `docs/tasks/08-seo-build.md` — instruções por tarefa
