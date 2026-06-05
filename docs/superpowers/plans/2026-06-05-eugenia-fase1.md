# Eugen.IA — Fase 1: Estrutura e Conteúdo

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir o site da Eugen.IA do zero (React + Vite) com todas as 7 rotas da Fase 1, copy fiel ao plan.md e SSG via react-snap — sem animações complexas.

**Architecture:** Projeto Vite + React no root do repositório. Roteamento com react-router-dom v6, lazy loading por rota. Design system em CSS custom properties co-locado com cada componente. SSG pós-build via react-snap, meta tags via react-helmet-async.

**Tech Stack:** React 18, Vite 5, react-router-dom 6, react-helmet-async, lenis, react-snap (devDep), CSS puro (sem Tailwind/módulos)

**Restrição de escopo — Fase 1:** Sem canvas, sem GSAP, sem cursor customizado, sem parallax, sem scroll horizontal pinado. Animações ficam para a Fase 2.

---

## Estrutura de arquivos

```
src/
  app/
    AppRouter.jsx          — definição de rotas com React.lazy
  components/
    layout/
      Header.jsx / .css    — navbar expandida → pill ao scroll
      Footer.jsx / .css    — rodapé completo
    ui/
      Button.jsx / .css    — botão reutilizável (primary, secondary, ghost)
      Tag.jsx / .css       — label de seção (ex: "O QUE FAZEMOS")
      Accordion.jsx / .css — FAQ accordion acessível
  pages/
    Home.jsx               — monta as 7 seções da home
    Clinicas.jsx           — landing page do agente de agendamento
    Consultoria.jsx        — página da consultoria 5D
    Treinamento.jsx        — página do treinamento in-company
    Teste.jsx              — teste de maturidade (embed Google Forms)
    Faq.jsx                — 11 perguntas (8 preservadas + 3 novas)
    Contato.jsx            — página de contato (ajuste mínimo de copy)
  sections/                — seções exclusivas da Home
    HeroSection.jsx / .css
    ProblemSection.jsx / .css
    ServicesSection.jsx / .css
    MethodSection.jsx / .css
    DiferenciaisSection.jsx / .css
    FaqPreviewSection.jsx / .css
    CtaSection.jsx / .css
  styles/
    tokens.css             — CSS custom properties (cores, espaçamentos, radii)
    global.css             — reset + base + tipografia
  hooks/
    useLenis.js            — smooth scroll (Lenis)
  App.jsx                  — HelmetProvider + AppRouter
  main.jsx                 — ponto de entrada
public/
  sitemap.xml
  robots.txt
index.html                 — entrada Vite (substitui o compilado atual)
package.json
vite.config.js
CLAUDE.md
docs/
  tasks/                   — documentos de instrução para o Codex
```

---

## Tasks

### Task 1: Scaffold do projeto

**Doc de instrução:** `docs/tasks/01-scaffold.md`
**Estimativa:** 10 min

- [ ] Ler `docs/tasks/01-scaffold.md`
- [ ] Criar `package.json` com todas as dependências
- [ ] Criar `vite.config.js`
- [ ] Criar `index.html` (entrada Vite)
- [ ] Criar `src/main.jsx` e `src/App.jsx`
- [ ] Criar `src/app/AppRouter.jsx` (stub com todas as rotas)
- [ ] Atualizar `.gitignore`
- [ ] Rodar `npm install` e verificar que não há erros
- [ ] Commit: `chore: scaffold projeto React + Vite`

---

### Task 2: Design system

**Doc de instrução:** `docs/tasks/02-design-system.md`
**Estimativa:** 15 min

- [ ] Ler `docs/tasks/02-design-system.md`
- [ ] Criar `src/styles/tokens.css`
- [ ] Criar `src/styles/global.css`
- [ ] Criar `src/components/ui/Button.jsx` + `Button.css`
- [ ] Criar `src/components/ui/Tag.jsx` + `Tag.css`
- [ ] Criar `src/components/ui/Accordion.jsx` + `Accordion.css`
- [ ] Verificar build: `npm run build` sem erros
- [ ] Commit: `feat: design system — tokens, global styles e UI components`

---

### Task 3: Layout (Header + Footer)

**Doc de instrução:** `docs/tasks/03-layout.md`
**Estimativa:** 20 min

- [ ] Ler `docs/tasks/03-layout.md`
- [ ] Criar `src/hooks/useLenis.js`
- [ ] Criar `src/components/layout/Header.jsx` + `Header.css`
- [ ] Criar `src/components/layout/Footer.jsx` + `Footer.css`
- [ ] Verificar build sem erros
- [ ] Commit: `feat: layout — header com scroll behavior e footer`

---

### Task 4: Seções da Home

**Doc de instrução:** `docs/tasks/04-home.md`
**Referência de copy:** `plan.md` seções 6 e 5 (Diferenciais)
**Estimativa:** 45 min

- [ ] Ler `docs/tasks/04-home.md` e `plan.md` seções relevantes
- [ ] Criar `HeroSection.jsx` + `HeroSection.css`
- [ ] Criar `ProblemSection.jsx` + `ProblemSection.css`
- [ ] Criar `ServicesSection.jsx` + `ServicesSection.css`
- [ ] Criar `MethodSection.jsx` + `MethodSection.css`
- [ ] Criar `DiferenciaisSection.jsx` + `DiferenciaisSection.css`
- [ ] Criar `FaqPreviewSection.jsx` + `FaqPreviewSection.css`
- [ ] Criar `CtaSection.jsx` + `CtaSection.css`
- [ ] Criar `src/pages/Home.jsx` montando as 7 seções
- [ ] Verificar build + checar rota `/` no browser
- [ ] Commit: `feat: home — todas as seções com copy`

---

### Task 5: Página /clinicas

**Doc de instrução:** `docs/tasks/05-clinicas.md`
**Referência de copy:** `plan.md` seção 7
**Estimativa:** 20 min

- [ ] Ler `docs/tasks/05-clinicas.md` e `plan.md` seção 7
- [ ] Criar `src/pages/Clinicas.jsx` com todas as seções da LP
- [ ] Verificar build + checar rota `/clinicas`
- [ ] Commit: `feat: página /clinicas — agente de agendamento`

---

### Task 6: Páginas /consultoria e /treinamento

**Doc de instrução:** `docs/tasks/06-consultoria-treinamento.md`
**Referência de copy:** `plan.md` seções 8 e 9
**Estimativa:** 25 min

- [ ] Ler `docs/tasks/06-consultoria-treinamento.md` e `plan.md` seções 8–9
- [ ] Criar `src/pages/Consultoria.jsx`
- [ ] Criar `src/pages/Treinamento.jsx`
- [ ] Verificar build + checar ambas as rotas
- [ ] Commit: `feat: páginas /consultoria e /treinamento`

---

### Task 7: Páginas /teste, /faq e /contato

**Doc de instrução:** `docs/tasks/07-teste-faq-contato.md`
**Referência de copy:** `plan.md` seções 10, 11 e 12
**Estimativa:** 20 min

- [ ] Ler `docs/tasks/07-teste-faq-contato.md` e `plan.md` seções 10–12
- [ ] Criar `src/pages/Teste.jsx` (com placeholder do Google Forms)
- [ ] Criar `src/pages/Faq.jsx` (11 perguntas)
- [ ] Criar `src/pages/Contato.jsx`
- [ ] Verificar build + checar as 3 rotas
- [ ] Commit: `feat: páginas /teste, /faq e /contato`

---

### Task 8: SEO, SSG e build final

**Doc de instrução:** `docs/tasks/08-seo-build.md`
**Referência de meta tags:** `plan.md` seção 13
**Estimativa:** 20 min

- [ ] Ler `docs/tasks/08-seo-build.md` e `plan.md` seção 13
- [ ] Atualizar `AppRouter.jsx` com `React.lazy` + `Suspense` para cada rota
- [ ] Adicionar `<Helmet>` em cada página com title + description únicos
- [ ] Configurar `react-snap` no `package.json`
- [ ] Criar `public/sitemap.xml`
- [ ] Criar `public/robots.txt`
- [ ] Rodar `npm run build` → verificar bundle e rotas pré-renderizadas
- [ ] Testar com `npx serve dist` e navegar por todas as rotas
- [ ] Commit: `feat: SEO — meta tags, react-snap SSG, sitemap e robots.txt`

---

## Critérios de conclusão da Fase 1

- [ ] `npm run build` completa sem warnings críticos
- [ ] Todas as 7 rotas acessíveis e com copy correta
- [ ] Cada rota tem `<title>` e `<meta description>` únicos
- [ ] `dist/` contém HTML pré-renderizado por rota (react-snap)
- [ ] `sitemap.xml` e `robots.txt` presentes em `public/`
- [ ] Bundle total abaixo de 400kb gzipped
