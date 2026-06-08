# Spec — Eugen.IA UI Redesign (Abordagem B: Progressive Enhancement)

**Data:** 2026-06-08  
**Escopo:** Visual, animações, tema e interação — zero alteração de copy, rotas ou estrutura de páginas  
**Ambiente:** Local apenas. Nenhum deploy em S3/AWS.

---

## 1. Contexto

Site da Eugen.IA (agência de automação e Agentes IA para PMEs) em Astro 4 + React 18, output estático para S3. Stack atual: Lenis (smooth scroll), CSS co-locado, Inter font, tema escuro único. Objetivo: elevar o site ao padrão visual de uma agência de IA de referência — interação criativa, responsividade sólida e performance dentro do budget de 400kb gzipped.

---

## 2. Paleta de Marca

| Token CSS | Valor dark | Valor light |
|---|---|---|
| `--background` | `#0f131a` | `#f8fafc` |
| `--surface` | `#181d25` | `#ffffff` |
| `--surface-soft` | `#1f2631` | `#f1f5f9` |
| `--foreground` | `#fffaf0` | `#0f1a2e` |
| `--muted` | `#a5afbf` | `#64748b` |
| `--line` | `#2a3240` | `#e2e8f0` |
| `--primary` | `#fbba23` | `#fbba23` |
| `--accent` | `#f6c655` | `#f6c655` |
| `--blue` *(novo)* | `#2563eb` | `#1d4ed8` |
| `--blue-deep` *(novo)* | `#0f1e3d` | `#0f1e3d` |
| `--blue-glow` *(novo)* | `#2563eb47` | `#2563eb2a` |
| `--glass` | `rgba(24,29,37,0.62)` | `rgba(255,255,255,0.7)` |
| `--gradient-brand` | `linear-gradient(135deg,#fbba23,#2563eb)` | *(igual)* |
| `--shadow-blue` *(novo)* | `0 0 48px #2563eb47` | `0 0 32px #2563eb2a` |

---

## 3. Tema Light/Dark

- Controlado por `data-theme="light"` no elemento `<html>` (ausência = dark)
- Override em `[data-theme="light"]` no `tokens.css`
- Toggle: botão lua/sol no `Header.jsx`, sempre visível
- Inicialização em `Layout.astro` via `<script>` inline (antes do render para evitar flash):
  ```js
  const saved = localStorage.getItem('theme')
  const system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  document.documentElement.dataset.theme = saved ?? system
  ```
- Persiste em `localStorage('theme')`

---

## 4. Cursor Customizado

Componente React `CustomCursor.jsx` montado como island `client:load` no `Layout.astro`.

- **Dot** (8×8px): amarelo `#fbba23`, posição absoluta, transição `none` — acompanha exatamente
- **Ring** (40×40px): azul `#2563eb`, border 1.5px, `border-radius: 50%`, background transparente, transição `transform 120ms ease-out, width 200ms, height 200ms`
- **Hover state** (em `a`, `button`, `[data-cursor="hover"]`): ring cresce para 64×64px, `background: rgba(37,99,235,0.08)`
- **Desabilitado:** `@media (pointer: coarse)` — não renderiza o componente
- **prefers-reduced-motion:** transições reduzidas a `50ms`
- Usa `useEffect` com `mousemove` + `requestAnimationFrame` para performance

---

## 5. Animações GSAP por Seção

### Dependências a instalar
```
gsap  (inclui ScrollTrigger como módulo)
```
Importação lazy por arquivo de seção — ScrollTrigger nunca carrega em bloco global.

### 5.1 Hero Section
- **Trigger:** on mount (sem scroll)
- **Efeito:** stagger de entrada — Tag (y: -20, opacity: 0 → padrão), h1, hero-actions, context-bar em sequência com `stagger: 0.12`
- **Parallax:** `ScrollTrigger` com `scrub: true` no `hero-copy` — move 30px para cima ao scrollar a seção inteira

### 5.2 Problem Section — Stat Cards
- **Trigger:** `start: "top 80%"`
- **Efeito:** cards ímpares entram da esquerda (x: -60), pares da direita (x: +60), opacity 0→1
- **Counter:** GSAP `to()` com `onUpdate` atualizando `innerHTML` da porcentagem (ex: 0→72 em 1.2s)

### 5.3 Services Section — Scroll Horizontal Pinned
- **Desktop (≥768px):** container de cards é `display: flex` horizontal; `ScrollTrigger.pin` na seção; `scrub: 1`; translação total = `(nCards-1) × cardWidth + gaps`
- **Mobile (<768px):** layout vertical, cada card revela com fade + y: 30→0
- **Hover nos cards:** CSS `transform: perspective(800px) rotateY(3deg)` com transition

### 5.4 Method 5D — Linha Conectora
- SVG vertical com `<line>` ou `<path>` entre os steps
- `stroke-dasharray` e `stroke-dashoffset` = comprimento total da linha
- ScrollTrigger `scrub: 0.5` — linha se desenha conforme usuário desce
- Cada step revela com `opacity: 0→1` + `x: -20→0` em stagger atrelado ao progresso da linha

### 5.5 Diferenciais Section
- **Trigger:** `start: "top 75%"`
- **Headline** (esquerda): `x: -50, opacity: 0` → padrão
- **4 itens** (direita): stagger `x: +50, opacity: 0` → padrão, `stagger: 0.1`

### 5.6 FAQ Preview Section
- **Trigger:** `start: "top 80%"`
- **Efeito:** container `scale: 0.96, opacity: 0` → `scale: 1, opacity: 1`, `duration: 0.5`
- Sem scrub — transição limpa de entrada

### 5.7 CTA Section
- **Scroll enter:** `scale: 0.96, opacity: 0` → `scale: 1, opacity: 1`
- **CSS loop:** `box-shadow` pulsa entre `--shadow-glow` e `--shadow-blue` a cada 3s

---

## 6. Elemento Visual — Hero Neural Network SVG

Substitui `hero-visual-placeholder` por SVG inline `NeuralSVG.jsx`.

- ~12 nós (círculos), ~18 conexões (linhas)
- Nós azuis (`#2563eb`) e 3 nós amarelos (`#fbba23`) como destaques
- **Animação CSS:**
  - Nós: `@keyframes pulse` — scale 1→1.15→1, opacity 0.7→1→0.7, `animation-duration: 2–4s` variado por nó
  - Conexões: `stroke-dashoffset` animado em loop — simula fluxo de dados
- Dimensões: `viewBox="0 0 460 460"`, `width="100%"`, `max-width: 480px`
- Semanticamente: representa agentes IA conectados — direto ao conceito da Eugen.IA

---

## 7. Glass Effect

Aplicado via classes utilitárias `.glass-card` e `.glass-border`:

```css
.glass-card {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: var(--shadow-glass);
}
.glass-border {
  border: 1px solid rgba(255,255,255,0.06);
  transition: border-color 200ms;
}
.glass-border:hover {
  border-color: rgba(37,99,235,0.35);
}
```

**Aplicado em:**
- `CtaSection` — `.cta-card` recebe `.glass-card`
- `ServicesSection` — cada `.service-card` recebe `.glass-border`
- `Header` pill condensado — já tem `var(--glass)`, reforçado com `backdrop-filter`

---

## 8. Inner Pages

Todas as páginas internas (Clínicas, Consultoria, Treinamento, FAQ, Contato) recebem:
- Page hero: mesmo stagger de entrada do Hero principal (Tag → h1 → sub → actions)
- Seções de conteúdo: `ScrollTrigger` com `start: "top 80%"`, `y: 30→0`, `opacity: 0→1`, sem scrub

---

## 9. Header — Atualizações

- Botão toggle light/dark adicionado ao `header-actions` (antes do botão CTA existente)
- Ícone: SVG inline lua (dark) / sol (light), 20px
- Sem label de texto — apenas ícone com `aria-label`

---

## 10. Responsividade

| Breakpoint | Comportamento |
|---|---|
| `≥768px` | Experiência completa: cursor, horizontal scroll, todos os efeitos |
| `<768px` | Cursor desabilitado; Services: vertical stack; distâncias de animação reduzidas (50%); glass simplificado |
| `prefers-reduced-motion` | Todas as animações GSAP desabilitadas; CSS transitions em 50ms máx |

---

## 11. Budget de Performance

| Item | Gzipped estimado |
|---|---|
| gsap + ScrollTrigger | ~35kb |
| NeuralSVG.jsx (inline) | ~3kb |
| CustomCursor.jsx | ~1kb |
| Novos CSS (tokens, glass, cursor) | ~3kb |
| **Total adicional** | **~42kb** |
| **Total projeto estimado** | **~240–270kb** ✓ |

---

## 12. Restrições Absolutas

- Zero alteração de copy
- Zero alteração de rotas ou estrutura de páginas
- Zero deploy em AWS/S3
- Link `/teste` → Google Forms permanece
- `output: 'static'` no astro.config.mjs permanece

---

## 13. Ordem de Execução (para Codex)

1. `tokens.css` — novos tokens (blue, gradients, light theme vars)
2. `global.css` — light theme override block + utilitários glass
3. `Layout.astro` — script anti-flash, integração cursor + toggle
4. `CustomCursor.jsx` — componente cursor
5. `Header.jsx` — botão toggle light/dark
6. `NeuralSVG.jsx` — SVG animado do hero
7. `HeroSection.jsx/.css` — integra NeuralSVG + GSAP stagger
8. `ProblemSection.jsx/.css` — GSAP horizontal stagger + counters
9. `ServicesSection.jsx/.css` — scroll horizontal pinned + mobile fallback
10. `MethodSection.jsx/.css` — SVG line draw + step reveal
11. `DiferenciaisSection.jsx/.css` — split slide animação
12. `FaqPreviewSection.jsx/.css` — scale fade
13. `CtaSection.jsx/.css` — glass card + glow loop
14. `_PageShared.css` + páginas internas — stagger de hero + scroll reveals
