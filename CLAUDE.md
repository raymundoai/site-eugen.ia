# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Site institucional da **Eugen.IA** — agência de implementação de Agentes de IA para PMEs brasileiras. Frontend React com animações premium, chat integrado ao n8n, e tema claro/escuro.

O código do frontend fica em `SITE_EUGENIA/`. A raiz do repositório contém documentação de referência (`MARCA_FONTES_CORES.md`, `N8N_CONEXAO_AGENTE.md`, etc.) e as pastas `deploy/` e `backup/`.

## Commands

Todos os comandos devem ser executados dentro de `SITE_EUGENIA/`:

```bash
npm run dev        # servidor local em http://localhost:5173
npm run build      # build em SITE_EUGENIA/dist/
npm run lint       # ESLint
npm run preview    # preview do build
# Build para deploy na raiz do repo:
npm run build -- --outDir ../deploy
```

## Architecture

### Entry point
`src/main.jsx` → envolve a app em `ThemeProvider` > `ChatProvider` > `BrowserRouter` > `AppRouter`.

### Roteamento
`src/app/AppRouter.jsx` inicializa Lenis (scroll suave) e GSAP ScrollReveal globalmente, e renderiza as páginas dentro de um layout fixo: `BackgroundField` + `GlobalCursor` + `Header` + `<Routes>` + `Footer`.

Rotas: `/`, `/servicos`, `/sobre`, `/faq`, `/contato`, `/obrigado`.

### Conteúdo
Todo o copy e dados estruturados do site vivem em **`src/data/siteContent.js`** — navItems, services, methodSteps, faqs, footerColumns. É a fonte de verdade para o conteúdo visível.

### Componentes
Flat em `src/components/` — não há subdivisão atoms/molecules/organisms na versão atual. Componentes de layout global (Header, Footer, BackgroundField, GlobalCursor) são montados no AppRouter; os demais são usados diretamente nas pages.

### Contextos
- `ThemeContext` / `ThemeProvider`: tema claro/escuro, persiste em `localStorage` com chave `eugenia_theme`, aplica `data-theme` no `documentElement`.
- `ChatContext` / `ChatProvider`: estado completo do chat (sessão, lead, conversa), persiste em `sessionStorage` com chave `eugenia_chat_state`.

### Chat widget (n8n)
`ChatWidget` tem dois modos: **floating** (botão fixo, exceto em `/contato`) e **embedded** (direto na ContactPage). Toda a lógica de envio está em `ChatWidget.jsx`; o contrato do payload está em `src/utils/chatPayload.js`.

Endpoint configurado via `VITE_N8N_CHAT_WEBHOOK` em `.env.local` (fallback hardcoded no componente).

O n8n responde com `{ assistant: { message }, status, lead_updates }`. Os status `qualified`, `waitlist`, `scheduled`, `closed` e `handoff` fecham o formulário.

### Animações
- **Lenis** (`useLenis`): scroll suave global, `lerp: 0.09`.
- **GSAP ScrollTrigger** (`useScrollReveal`): qualquer elemento com `data-reveal` aparece ao entrar na viewport (`autoAlpha + translateY`).
- **Cursor customizado** (`useCustomCursor` + `GlobalCursor`): ativo apenas em desktop sem `prefers-reduced-motion`. Muda para modo `action` em elementos com `data-cursor="action"`.
- `ServicesShowcase` usa ScrollTrigger scrubbed para sincronizar o slide ativo com o scroll.

## Design System

### Fontes
- **Sora**: títulos (`h1`, `h2`, `h3`), peso 500–800
- **Manrope**: corpo, interface, botões, chat — fonte padrão do body

### Tokens CSS (`:root`)
Tema dark por padrão; tema light via `[data-theme='light']`. Tokens principais: `--background`, `--surface`, `--surface-soft`, `--foreground`, `--muted`, `--line`, `--primary` (amarelo dourado), `--accent`, `--danger`, `--glass`, `--shadow-glow`.

O `--primary` no dark é `#fbba23`; no light é `#d99400`.

### Convenções visuais
- Botão CTA com gradiente dourado (`btn-primary`).
- Classe `.eyebrow` para labels de seção em caixa alta.
- `data-reveal` em blocos para animação de entrada.
- `data-cursor="action"` em links e botões interativos.
- `.container` centralizado com `min(1180px, calc(100vw - 40px))`.

## Deploy

Build final vai para `deploy/` na raiz do repositório (fora de `SITE_EUGENIA/`):

```bash
cd SITE_EUGENIA && npm run build -- --outDir ../deploy
```
