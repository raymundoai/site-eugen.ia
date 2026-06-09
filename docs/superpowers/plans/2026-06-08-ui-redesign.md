# UI Redesign — Progressive Enhancement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar o site da Eugen.IA com cursor customizado azul/amarelo, tema light/dark, SVG neural animado no hero e animações GSAP ScrollTrigger em todas as seções — sem alterar copy, rotas ou deploy AWS.

**Architecture:** Um script global `src/scripts/animations.js` (importado via `<script>` em Layout.astro) centraliza todo o GSAP e Lenis — seções permanecem HTML estático, animações operam via `data-gsap` attributes. Cursor e toggle de tema são ilhas React com `client:load`. NeuralSVG é JSX estático com CSS animations puras.

**Tech Stack:** Astro 4 + React 18, GSAP 3 (ScrollTrigger + matchMedia), Lenis (já instalado), CSS custom properties

---

## File Map

### Criar
- `src/scripts/animations.js` — Lenis + GSAP init + todos os ScrollTriggers
- `src/components/ui/CustomCursor.jsx` — cursor ring/dot, island client:load
- `src/components/ui/CustomCursor.css` — estilos do cursor
- `src/sections/NeuralSVG.jsx` — SVG rede neural, estático
- `src/sections/NeuralSVG.css` — CSS animations do SVG

### Modificar
- `src/styles/tokens.css` — tokens blue + override light theme
- `src/styles/global.css` — utilitários glass + overrides light
- `src/layouts/Layout.astro` — anti-flash script, remover Lenis inline, importar animations.js, montar cursor
- `src/components/layout/Header.jsx` — botão toggle tema
- `src/components/layout/Header.css` — estilos do toggle
- `src/sections/HeroSection.jsx` — integrar NeuralSVG + data attrs GSAP
- `src/sections/HeroSection.css` — posicionamento SVG
- `src/sections/ProblemSection.jsx` — data attrs slides + counters
- `src/sections/ProblemSection.css` — remover opacity manual se existir
- `src/sections/ServicesSection.jsx` — wrapper track para scroll horizontal
- `src/sections/ServicesSection.css` — layout horizontal track
- `src/sections/MethodSection.jsx` — SVG linha conectora + data attrs steps
- `src/sections/MethodSection.css` — SVG linha estilos
- `src/sections/DiferenciaisSection.jsx` — data attrs split
- `src/sections/DiferenciaisSection.css` — nenhuma mudança estrutural necessária
- `src/sections/FaqPreviewSection.jsx` — data attr
- `src/sections/CtaSection.jsx` — classe glass-card
- `src/sections/CtaSection.css` — glow pulse loop
- `src/pages/_PageShared.css` — classes hero-stagger para inner pages
- `src/pages/_Clinicas.jsx` — data attrs no page-hero
- `src/pages/_Consultoria.jsx` — data attrs
- `src/pages/_Treinamento.jsx` — data attrs
- `src/pages/_Faq.jsx` — data attrs
- `src/pages/_Contato.jsx` — data attrs

---

## Task 1: Instalar GSAP

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Instalar GSAP**

```bash
cd /home/raymundo/projetos/site_eugenia
npm install gsap
```

Saída esperada: `added 1 package` e versão gsap ^3.x.x em package.json dependencies.

- [ ] **Step 2: Verificar instalação**

```bash
node -e "require('./node_modules/gsap/index.js'); console.log('gsap ok')"
```

Saída esperada: `gsap ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: instala gsap"
```

---

## Task 2: Tokens CSS — paleta blue + tema light

**Files:**
- Modify: `src/styles/tokens.css`

- [ ] **Step 1: Substituir o arquivo inteiro por:**

```css
/* src/styles/tokens.css */
:root {
  /* Layout */
  --header-height: 82px;
  --container: min(1180px, calc(100vw - 40px));

  /* Radii */
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 26px;
  --radius-pill: 999px;

  /* Cores — tema escuro (padrão) */
  --background: #0f131a;
  --surface: #181d25;
  --surface-soft: #1f2631;
  --foreground: #fffaf0;
  --muted: #a5afbf;
  --line: #2a3240;
  --primary: #fbba23;
  --accent: #f6c655;
  --danger: #f06367;
  --glass: rgba(24, 29, 37, 0.62);

  /* Blue palette */
  --blue: #2563eb;
  --blue-mid: #1d4ed8;
  --blue-deep: #0f1e3d;
  --blue-glow: rgba(37, 99, 235, 0.28);

  /* Gradients */
  --gradient-brand: linear-gradient(135deg, #fbba23 0%, #2563eb 100%);
  --gradient-dark: linear-gradient(160deg, #0f131a 0%, #0f1e3d 100%);

  /* Sombras */
  --shadow-base: 0 16px 42px rgba(6, 10, 18, 0.16);
  --shadow-glass: 0 22px 50px rgba(6, 10, 18, 0.22);
  --shadow-glow: 0 0 48px rgba(251, 186, 35, 0.28);
  --shadow-blue: 0 0 48px rgba(37, 99, 235, 0.28);

  /* Tipografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Espaçamentos */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}

/* Tema light */
[data-theme="light"] {
  --background: #f8fafc;
  --surface: #ffffff;
  --surface-soft: #f1f5f9;
  --foreground: #0f1a2e;
  --muted: #64748b;
  --line: #e2e8f0;
  --glass: rgba(255, 255, 255, 0.72);
  --blue: #1d4ed8;
  --blue-glow: rgba(29, 78, 216, 0.18);
  --shadow-base: 0 16px 42px rgba(15, 26, 46, 0.08);
  --shadow-glass: 0 22px 50px rgba(15, 26, 46, 0.10);
  --shadow-glow: 0 0 48px rgba(251, 186, 35, 0.22);
  --shadow-blue: 0 0 48px rgba(29, 78, 216, 0.18);
  --gradient-dark: linear-gradient(160deg, #f8fafc 0%, #e8f0fe 100%);
}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

Saída esperada: sem erros, finaliza com `✓` ou `dist/` gerado.

- [ ] **Step 3: Commit**

```bash
git add src/styles/tokens.css
git commit -m "feat(tokens): paleta blue + tema light vars"
```

---

## Task 3: Global CSS — utilitários glass + overrides light

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Adicionar no FINAL do arquivo `src/styles/global.css`:**

```css
/* Glass utilities */
.glass-card {
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow-glass);
}

.glass-border {
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 250ms ease, box-shadow 250ms ease;
}

.glass-border:hover {
  border-color: rgba(37, 99, 235, 0.30);
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.12);
}

[data-theme="light"] .glass-card {
  border-color: rgba(0, 0, 0, 0.06);
}

[data-theme="light"] .glass-border {
  border-color: rgba(0, 0, 0, 0.06);
}

[data-theme="light"] .glass-border:hover {
  border-color: rgba(29, 78, 216, 0.30);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(global): utilitários glass + reduced-motion + light overrides"
```

---

## Task 4: CustomCursor — componente React

**Files:**
- Create: `src/components/ui/CustomCursor.jsx`
- Create: `src/components/ui/CustomCursor.css`

- [ ] **Step 1: Criar `src/components/ui/CustomCursor.css`:**

```css
@media (pointer: fine) {
  body,
  a,
  button,
  [role="button"],
  [data-cursor="hover"] {
    cursor: none !important;
  }

  .cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    background: var(--primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
    opacity: 0;
    transition: opacity 300ms;
  }

  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    margin-left: -20px;
    border: 1.5px solid var(--blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    will-change: transform;
    opacity: 0;
    transition: width 200ms ease,
                height 200ms ease,
                margin 200ms ease,
                background 200ms ease,
                opacity 300ms;
  }

  .cursor-dot.is-visible,
  .cursor-ring.is-visible {
    opacity: 1;
  }

  .cursor-ring.is-hovered {
    width: 64px;
    height: 64px;
    margin-top: -32px;
    margin-left: -32px;
    background: rgba(37, 99, 235, 0.08);
  }
}

@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}
```

- [ ] **Step 2: Criar `src/components/ui/CustomCursor.jsx`:**

```jsx
import { useEffect } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return

    let rafId
    let mouseX = -200
    let mouseY = -200
    let ringX = -200
    let ringY = -200
    let visible = false

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }
    }

    const onEnter = () => ring.classList.add('is-hovered')
    const onLeave = () => ring.classList.remove('is-hovered')

    const tick = () => {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      ringX += (mouseX - ringX) * 0.14
      ringY += (mouseY - ringY) * 0.14
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(tick)
    }

    const bindHoverTargets = () => {
      document.querySelectorAll('a, button, [role="button"], [data-cursor="hover"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    bindHoverTargets()
    rafId = requestAnimationFrame(tick)

    const observer = new MutationObserver(bindHoverTargets)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/CustomCursor.jsx src/components/ui/CustomCursor.css
git commit -m "feat(cursor): componente cursor customizado azul/amarelo"
```

---

## Task 5: Layout.astro — anti-flash + cursor island + animations script

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Substituir o conteúdo completo de `src/layouts/Layout.astro`:**

```astro
---
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.astro'
import ChatFloat from '../components/chat/ChatFloat.jsx'
import CustomCursor from '../components/ui/CustomCursor.jsx'
import '../styles/global.css'

interface Props {
  title: string
  description: string
}

const { title, description } = Astro.props
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <!-- Anti-flash tema: roda antes do render -->
    <script is:inline>
      ;(function () {
        var saved = localStorage.getItem('theme')
        var system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
        document.documentElement.dataset.theme = saved || system
      })()
    </script>
  </head>
  <body>
    <Header client:load />
    <main>
      <slot />
    </main>
    <Footer />
    <ChatFloat pathname={Astro.url.pathname} client:load />
    <CustomCursor client:load />

    <!-- Lenis + GSAP ScrollTrigger (inicializa após DOM) -->
    <script>
      import '../scripts/animations.js'
    </script>
  </body>
</html>
```

**Nota:** O script Lenis inline anterior foi removido — `animations.js` (Task 9) gerencia Lenis + GSAP juntos.

- [ ] **Step 2: Criar placeholder temporário para `src/scripts/animations.js`** (evita erro de import):

```js
// src/scripts/animations.js
// Inicialização completa em Task 9
```

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro src/scripts/animations.js
git commit -m "feat(layout): anti-flash tema, cursor island, import animations.js"
```

---

## Task 6: Header — botão toggle tema

**Files:**
- Modify: `src/components/layout/Header.jsx`
- Modify: `src/components/layout/Header.css`

- [ ] **Step 1: Adicionar o hook `useTheme` e o botão de toggle em `src/components/layout/Header.jsx`.**

Localizar o bloco de imports no topo do arquivo. Substituir o arquivo inteiro com:

```jsx
import { useState, useEffect } from 'react'
import Button from '../ui/Button.jsx'
import './Header.css'

function useTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
    setTheme(next)
  }

  return { theme, toggle }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [pathname, setPathname] = useState('/')
  const { theme, toggle } = useTheme()

  useEffect(() => {
    setPathname(window.location.pathname)
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLink = (href, label) => (
    <a
      href={href}
      className={`header-nav-item${pathname === href ? ' active' : ''}`}
    >
      {label}
    </a>
  )

  return (
    <header className={`header${scrolled ? ' header--condensed' : ''}`}>
      <div className={`header-inner${scrolled ? ' header-inner--pill' : ' header-inner--full'}`}>

        <a href="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img src="/icon/logotipo.png" alt="Eugen.IA" height={scrolled ? 28 : 36} />
        </a>

        {!scrolled && (
          <nav className="header-nav">
            <div
              className="header-nav-item header-nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <span>Serviços</span>
              {servicesOpen && (
                <div className="dropdown-panel">
                  <a href="/clinicas">Agente de Agendamento</a>
                  <a href="/consultoria">Consultoria 5D</a>
                  <a href="/treinamento">Treinamento em IA</a>
                </div>
              )}
            </div>
            {navLink('/teste', 'Teste de Maturidade')}
            {navLink('/faq', 'FAQ')}
            {navLink('/contato', 'Contato')}
          </nav>
        )}

        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            data-cursor="hover"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <Button
            href="https://wa.me/5551991275825"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
          >
            Falar com a Eugênia
          </Button>

          {scrolled && (
            <button
              className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
              aria-label="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="header-mobile-menu">
          <a href="/" onClick={() => setMenuOpen(false)}>Início</a>
          <a href="/clinicas" onClick={() => setMenuOpen(false)}>Agente de Agendamento</a>
          <a href="/consultoria" onClick={() => setMenuOpen(false)}>Consultoria 5D</a>
          <a href="/treinamento" onClick={() => setMenuOpen(false)}>Treinamento em IA</a>
          <a href="/teste" onClick={() => setMenuOpen(false)}>Teste de Maturidade</a>
          <a href="/faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a href="/contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Adicionar estilos do toggle no FINAL de `src/components/layout/Header.css`:**

```css
/* Theme toggle */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line);
  background: transparent;
  color: var(--muted);
  transition: color 200ms, border-color 200ms, background 200ms;
  flex-shrink: 0;
}

.theme-toggle:hover {
  color: var(--foreground);
  border-color: var(--blue);
  background: rgba(37, 99, 235, 0.08);
}

[data-theme="light"] .theme-toggle:hover {
  background: rgba(29, 78, 216, 0.06);
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.jsx src/components/layout/Header.css
git commit -m "feat(header): botão toggle tema light/dark com ícone lua/sol"
```

---

## Task 7: NeuralSVG — componente SVG animado do hero

**Files:**
- Create: `src/sections/NeuralSVG.jsx`
- Create: `src/sections/NeuralSVG.css`

- [ ] **Step 1: Criar `src/sections/NeuralSVG.css`:**

```css
.neural-svg {
  width: 100%;
  max-width: 480px;
  display: block;
  opacity: 0.85;
}

.neural-edge {
  stroke: var(--blue);
  stroke-width: 1;
  opacity: 0.22;
  stroke-dasharray: 4 14;
  animation: neural-flow 2.8s linear infinite;
}

.neural-node {
  fill: var(--blue);
  opacity: 0.55;
  animation: neural-pulse 3.2s ease-in-out infinite alternate;
}

.neural-node--accent {
  fill: var(--primary);
  opacity: 0.9;
  animation: neural-pulse-accent 2.4s ease-in-out infinite alternate;
}

@keyframes neural-flow {
  to {
    stroke-dashoffset: -18;
  }
}

@keyframes neural-pulse {
  from { opacity: 0.35; }
  to   { opacity: 0.72; }
}

@keyframes neural-pulse-accent {
  from { opacity: 0.70; }
  to   { opacity: 1; }
}

[data-theme="light"] .neural-edge {
  stroke: var(--blue);
  opacity: 0.18;
}

[data-theme="light"] .neural-node {
  opacity: 0.50;
}
```

- [ ] **Step 2: Criar `src/sections/NeuralSVG.jsx`:**

```jsx
import './NeuralSVG.css'

const nodes = [
  { id: 'n1',  x: 80,  y: 75,  r: 8,  accent: true  },
  { id: 'n2',  x: 210, y: 52,  r: 5,  accent: false },
  { id: 'n3',  x: 345, y: 92,  r: 6,  accent: false },
  { id: 'n4',  x: 435, y: 68,  r: 3.5,accent: false },
  { id: 'n5',  x: 148, y: 188, r: 7,  accent: true  },
  { id: 'n6',  x: 288, y: 208, r: 5,  accent: false },
  { id: 'n7',  x: 388, y: 232, r: 4,  accent: false },
  { id: 'n8',  x: 52,  y: 295, r: 4,  accent: false },
  { id: 'n9',  x: 192, y: 315, r: 6,  accent: false },
  { id: 'n10', x: 328, y: 328, r: 5,  accent: false },
  { id: 'n11', x: 438, y: 348, r: 3,  accent: false },
  { id: 'n12', x: 92,  y: 388, r: 4,  accent: false },
  { id: 'n13', x: 238, y: 408, r: 7,  accent: true  },
  { id: 'n14', x: 362, y: 428, r: 4,  accent: false },
  { id: 'n15', x: 442, y: 418, r: 3,  accent: false },
]

const edges = [
  ['n1','n2'], ['n2','n3'], ['n3','n4'],
  ['n1','n5'], ['n2','n5'], ['n2','n6'],
  ['n5','n6'], ['n3','n6'], ['n4','n7'],
  ['n6','n7'], ['n5','n9'], ['n8','n9'],
  ['n9','n10'],['n10','n11'],['n12','n13'],
  ['n13','n14'],['n14','n15'],['n9','n13'],
  ['n6','n10'],['n3','n7'],
]

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

export default function NeuralSVG() {
  return (
    <svg
      className="neural-svg"
      viewBox="0 0 480 460"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-yellow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-blue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map(([aId, bId], i) => {
        const a = nodeMap[aId]
        const b = nodeMap[bId]
        return (
          <line
            key={`${aId}-${bId}`}
            className="neural-edge"
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            style={{ animationDelay: `${(i * 0.19).toFixed(2)}s` }}
          />
        )
      })}

      {nodes.map((node, i) => (
        <circle
          key={node.id}
          className={`neural-node${node.accent ? ' neural-node--accent' : ''}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          filter={node.accent ? 'url(#glow-yellow)' : 'url(#glow-blue)'}
          style={{ animationDelay: `${(i * 0.17).toFixed(2)}s` }}
        />
      ))}
    </svg>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/NeuralSVG.jsx src/sections/NeuralSVG.css
git commit -m "feat(hero): NeuralSVG — rede neural animada azul/amarelo"
```

---

## Task 8: HeroSection — integrar NeuralSVG + data attrs GSAP

**Files:**
- Modify: `src/sections/HeroSection.jsx`
- Modify: `src/sections/HeroSection.css`

- [ ] **Step 1: Substituir `src/sections/HeroSection.jsx`:**

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import NeuralSVG from './NeuralSVG.jsx'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero section" data-gsap="hero">
      <div className="container hero-grid">
        <div className="hero-copy" data-gsap="hero-copy">
          <Tag data-gsap="hero-item">Automação de processos &amp; Agentes IA</Tag>

          <h1 data-gsap="hero-item">
            Mapeamos seus processos e desenvolvemos{' '}
            <strong>Agentes de IA sob medida</strong> para sua empresa
          </h1>

          <div className="hero-actions" data-gsap="hero-item">
            <Button
              href="https://wa.me/5551991275825"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Agendar Pré-Diagnóstico gratuito
            </Button>
            <Button href="/teste" variant="secondary" size="lg">
              Fazer o Teste de Maturidade
            </Button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <NeuralSVG />
        </div>
      </div>

      <div className="container hero-context-bar" data-gsap="hero-item">
        <span>100% remoto · todo o Brasil</span>
        <span className="hero-context-divider" />
        <span>Atendimento personalizado</span>
        <span className="hero-context-divider" />
        <span>Compliance LGPD nativo</span>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Substituir `src/sections/HeroSection.css`:**

```css
.hero {
  padding-top: calc(var(--header-height) + var(--space-16));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: var(--space-12);
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero-copy h1 {
  font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
  font-weight: 700;
  line-height: 1.15;
  color: var(--foreground);
}

.hero-copy h1 strong {
  color: var(--primary);
  font-weight: 700;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-context-bar {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-block: var(--space-6);
  margin-top: var(--space-16);
  border-top: 1px solid var(--line);
  font-size: var(--font-size-sm);
  color: var(--muted);
  flex-wrap: wrap;
}

.hero-context-divider {
  width: 1px;
  height: 16px;
  background: var(--line);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    display: none;
  }

  .hero-context-bar {
    gap: var(--space-4);
  }

  .hero-context-divider {
    display: none;
  }
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/HeroSection.jsx src/sections/HeroSection.css
git commit -m "feat(hero): integra NeuralSVG, data attrs para GSAP"
```

---

## Task 9: ProblemSection — data attrs para slide + counter

**Files:**
- Modify: `src/sections/ProblemSection.jsx`

- [ ] **Step 1: Substituir `src/sections/ProblemSection.jsx`:**

```jsx
import './ProblemSection.css'

const stats = [
  {
    number: '72',
    suffix: '%',
    text: 'das empresas brasileiras estão nos estágios iniciante ou experimental de adoção da IA',
    source: 'Abiacom + Brazil Panels + Líderes.ai — pesquisa com 200 empresas, out/nov 2025',
  },
  {
    number: '70',
    suffix: '%',
    text: 'dos profissionais reconhecem atividades em seu dia a dia que poderiam ser automatizadas por IA, mas não sabem como fazer',
    source: 'Abiacom, out/nov 2025',
  },
  {
    number: '47',
    suffix: ',4%',
    text: 'dos profissionais utilizam ferramentas de IA sem aprovação oficial — o chamado Shadow AI',
    source: 'Abiacom, out/nov 2025 — via Exame',
  },
  {
    number: '95',
    suffix: '%',
    text: 'das organizações que adotaram IA ainda não conseguiram ter ROI visível nos projetos de implementação',
    source: 'TEC.Institute / MIT Technology Review Brasil',
  },
]

export default function ProblemSection() {
  return (
    <section className="problem section" data-gsap="problem">
      <div className="container">
        <h2 className="problem-heading" data-gsap="problem-heading">
          Você sabe que IA é importante{' '}
          <span>mas não sabe como aproveitar todo o potencial da tecnologia?</span>
        </h2>

        <div className="problem-cards">
          {stats.map((stat, i) => (
            <div
              key={stat.number}
              className="problem-card"
              data-gsap="problem-card"
              data-direction={i % 2 === 0 ? 'left' : 'right'}
            >
              <span className="problem-number">
                <span
                  className="problem-counter"
                  data-target={stat.number}
                >
                  {stat.number}
                </span>
                {stat.suffix}
              </span>
              <p className="problem-text">{stat.text}</p>
              <span className="problem-source">Fonte: {stat.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Commit**

```bash
git add src/sections/ProblemSection.jsx
git commit -m "feat(problem): data attrs direction + counter para GSAP"
```

---

## Task 10: ServicesSection — wrapper para scroll horizontal

**Files:**
- Modify: `src/sections/ServicesSection.jsx`
- Modify: `src/sections/ServicesSection.css`

- [ ] **Step 1: Substituir `src/sections/ServicesSection.jsx`:**

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './ServicesSection.css'

const services = [
  {
    number: '01',
    title: 'Agente de Agendamento',
    subtitle: 'Sua clínica atendendo 24h por dia.',
    description: 'Agente de IA conectado ao WhatsApp e à agenda dos seus profissionais. Agenda, confirma e gerencia sem intervenção humana.',
    link: '/clinicas',
    linkLabel: 'Conhecer o produto →',
  },
  {
    number: '02',
    title: 'Consultoria e Treinamento',
    subtitle: 'Clareza antes de qualquer ferramenta.',
    description: 'Mapeamos os gargalos reais da sua operação, definimos prioridades e capacitamos a sua equipe para operar com IA.',
    link: '/consultoria',
    linkLabel: 'Ver a metodologia →',
  },
  {
    number: '03',
    title: 'Automação de Processos',
    subtitle: 'Processos que rodam sozinhos.',
    description: 'Horas devolvidas para decisão, relacionamento e crescimento. Sua equipe para de apagar incêndios e começa a evoluir.',
    link: null,
  },
  {
    number: '04',
    title: 'Agentes de IA',
    subtitle: 'Sua operação, aumentada por IA.',
    description: 'Agentes personalizados, conectados ao seu stack, executando tarefas de forma autônoma, segura e rastreável.',
    link: null,
  },
  {
    number: '05',
    title: 'Treinamento em IA',
    subtitle: 'Seu time usando IA com método.',
    description: 'Workshop fechado por empresa: uso responsável, engenharia de prompt e política de IA para eliminar o Shadow AI da sua operação.',
    link: '/treinamento',
    linkLabel: 'Saiba mais →',
  },
]

export default function ServicesSection() {
  return (
    <section className="services section" data-gsap="services">
      <div className="container">
        <Tag>O que fazemos</Tag>
        <h2 className="services-heading">
          Mostramos o caminho mais rápido para sua empresa{' '}
          <span>inovar e crescer com Inteligência Artificial.</span>
        </h2>
      </div>

      <div className="services-scroll-outer" data-gsap="services-outer">
        <div className="services-track" data-gsap="services-track">
          {services.map((service) => (
            <div key={service.number} className="service-card glass-border">
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <p className="service-description">{service.description}</p>
              {service.link && (
                <Button href={service.link} variant="ghost" size="sm">
                  {service.linkLabel}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Substituir `src/sections/ServicesSection.css`:**

```css
.services {
  overflow: hidden;
}

.services-heading {
  font-size: clamp(var(--font-size-2xl), 3.5vw, var(--font-size-4xl));
  font-weight: 700;
  margin-top: var(--space-4);
  margin-bottom: var(--space-12);
  max-width: 680px;
}

.services-heading span {
  color: var(--primary);
}

/* Desktop: horizontal scroll container */
.services-scroll-outer {
  padding-left: calc((100vw - var(--container)) / 2 + 0px);
  padding-right: var(--space-8);
  overflow: visible;
}

.services-track {
  display: flex;
  gap: var(--space-6);
  width: max-content;
}

.service-card {
  width: 300px;
  flex-shrink: 0;
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: transform 300ms ease;
}

.service-card:hover {
  transform: translateY(-4px);
}

.service-number {
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--blue);
}

.service-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--foreground);
}

.service-subtitle {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--primary);
}

.service-description {
  font-size: var(--font-size-sm);
  color: var(--muted);
  line-height: 1.65;
  flex: 1;
}

@media (max-width: 767px) {
  .services-scroll-outer {
    padding-left: 0;
    padding-right: 0;
    overflow: visible;
  }

  .services-track {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: var(--space-4);
    padding-inline: calc((100vw - var(--container)) / 2);
  }

  .service-card {
    width: 100%;
  }
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/ServicesSection.jsx src/sections/ServicesSection.css
git commit -m "feat(services): wrapper track para scroll horizontal GSAP"
```

---

## Task 11: MethodSection — SVG linha conectora + data attrs

**Files:**
- Modify: `src/sections/MethodSection.jsx`
- Modify: `src/sections/MethodSection.css`

- [ ] **Step 1: Substituir `src/sections/MethodSection.jsx`:**

```jsx
import Tag from '../components/ui/Tag.jsx'
import './MethodSection.css'

const steps = [
  {
    id: 'D1',
    title: 'Diagnóstico',
    description: 'Mapeamos e diagnosticamos os principais desafios e gargalos da sua operação.',
  },
  {
    id: 'D2',
    title: 'Desenho',
    description: 'Projetamos a arquitetura da solução antes de qualquer linha de código.',
  },
  {
    id: 'D3',
    title: 'Decisão',
    description: 'Fechamos o escopo com critérios claros de entrega. Nenhum desenvolvimento começa sem alinhamento total.',
  },
  {
    id: 'D4',
    title: 'Desenvolvimento',
    description: 'Construímos em tempo recorde — 7 a 15 dias — exatamente o que foi decidido, sem desvios.',
  },
  {
    id: 'D5',
    title: 'Deploy',
    description: 'Implementamos, validamos em produção e acompanhamos até o resultado estar entregue.',
  },
]

export default function MethodSection() {
  return (
    <section className="method section" data-gsap="method">
      <div className="container method-inner">
        <div className="method-header">
          <Tag>Como fazemos</Tag>
          <h2 className="method-heading">O Método 5D</h2>
        </div>

        <div className="method-content">
          {/* SVG linha conectora — animada por GSAP scrub */}
          <svg
            className="method-line-svg"
            aria-hidden="true"
            data-gsap="method-line"
          >
            <line
              className="method-line-track"
              x1="50%" y1="0"
              x2="50%" y2="100%"
            />
            <line
              className="method-line-progress"
              x1="50%" y1="0"
              x2="50%" y2="100%"
              data-gsap="method-line-path"
            />
          </svg>

          <div className="method-steps">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="method-step"
                data-gsap="method-step"
                style={{ '--step-index': i }}
              >
                <div className="method-step-dot" />
                <span className="method-step-id">{step.id}</span>
                <div className="method-step-body">
                  <h3 className="method-step-title">{step.title}</h3>
                  <p className="method-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="method-footer" data-gsap="method-footer">
          Com o Método Eugen.IA, garantimos resultado visível no primeiro mês.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Substituir `src/sections/MethodSection.css`:**

```css
.method-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.method-heading {
  font-size: clamp(var(--font-size-3xl), 4vw, var(--font-size-5xl));
  font-weight: 700;
  margin-top: var(--space-4);
}

.method-content {
  position: relative;
  display: grid;
  grid-template-columns: 2px 1fr;
  gap: 0 var(--space-12);
  padding-left: var(--space-4);
}

.method-line-svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
}

.method-line-track {
  stroke: var(--line);
  stroke-width: 2;
}

.method-line-progress {
  stroke: var(--blue);
  stroke-width: 2;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  transition: stroke-dashoffset 0.1s;
}

.method-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: var(--space-8);
}

.method-step {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: var(--space-6);
  row-gap: var(--space-2);
  padding-block: var(--space-10);
  border-bottom: 1px solid var(--line);
  position: relative;
}

.method-step:last-child {
  border-bottom: none;
}

.method-step-dot {
  position: absolute;
  left: calc(-1 * var(--space-8) - 5px);
  top: calc(var(--space-10) + 4px);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--surface-soft);
  border: 2px solid var(--line);
  transition: background 400ms, border-color 400ms;
}

.method-step.is-active .method-step-dot {
  background: var(--blue);
  border-color: var(--blue);
  box-shadow: 0 0 12px var(--blue-glow);
}

.method-step-id {
  font-size: var(--font-size-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--blue);
  grid-column: 1;
  grid-row: 1;
  padding-top: 2px;
}

.method-step-body {
  grid-column: 2;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.method-step-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--foreground);
}

.method-step-desc {
  font-size: var(--font-size-sm);
  color: var(--muted);
  line-height: 1.65;
  max-width: 560px;
}

.method-footer {
  font-size: var(--font-size-base);
  color: var(--muted);
  border-top: 1px solid var(--line);
  padding-top: var(--space-6);
}

@media (max-width: 768px) {
  .method-content {
    grid-template-columns: 1fr;
    padding-left: 0;
  }

  .method-line-svg {
    display: none;
  }

  .method-steps {
    padding-left: 0;
  }

  .method-step-dot {
    display: none;
  }
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
git add src/sections/MethodSection.jsx src/sections/MethodSection.css
git commit -m "feat(method): SVG linha conectora + dot por step, data attrs GSAP"
```

---

## Task 12: DiferenciaisSection, FaqPreviewSection, CtaSection — data attrs + glass

**Files:**
- Modify: `src/sections/DiferenciaisSection.jsx`
- Modify: `src/sections/CtaSection.jsx`
- Modify: `src/sections/CtaSection.css`
- Modify: `src/sections/FaqPreviewSection.jsx`

- [ ] **Step 1: Substituir `src/sections/DiferenciaisSection.jsx`** (única mudança: `data-gsap` attrs):

```jsx
import './DiferenciaisSection.css'

const diferenciais = [
  {
    title: '10+ anos em gestão de processos',
    description: 'Diagnosticamos o que precisa ser automatizado antes de tocar em qualquer ferramenta.',
  },
  {
    title: '7 anos em operações de e-commerce',
    description: 'Falamos a língua de quem opera: CAC, LTV, conciliação, logística reversa, ERP.',
  },
  {
    title: 'Compliance nativo (LGPD + PL 2338/2023)',
    description: 'Logs auditáveis, dados no seu ambiente, identificação obrigatória do agente. Adequação hoje, não depois da lei.',
  },
  {
    title: 'Autonomia garantida',
    description: 'Você recebe documentação suficiente para implementar sozinho se quiser. Construímos dependência zero.',
  },
]

export default function DiferenciaisSection() {
  return (
    <section className="diferenciais section" data-gsap="diferenciais">
      <div className="container diferenciais-grid">
        <div className="diferenciais-headline" data-gsap="diferenciais-headline">
          <h2>
            O que nos diferencia não é a tecnologia.{' '}
            <span>É entender o seu processo.</span>
          </h2>
        </div>

        <div className="diferenciais-list">
          {diferenciais.map((diferencial, i) => (
            <div
              key={diferencial.title}
              className="diferencial-item"
              data-gsap="diferencial-item"
            >
              <h3 className="diferencial-title">{diferencial.title}</h3>
              <p className="diferencial-desc">{diferencial.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Substituir `src/sections/FaqPreviewSection.jsx`** (única mudança: `data-gsap` attr):

```jsx
import Tag from '../components/ui/Tag.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import Button from '../components/ui/Button.jsx'
import './FaqPreviewSection.css'

const previewItems = [
  {
    question: 'Minha operação é muito específica. Existe solução pronta para o que eu tenho?',
    answer: 'Não trabalhamos com soluções prontas. Cada projeto começa com um diagnóstico da sua operação. Se a IA faz sentido para o seu contexto, desenhamos a solução específica para o seu processo.',
  },
  {
    question: 'Já investi em tecnologia antes e não tive retorno. Por que seria diferente aqui?',
    answer: 'Porque começamos pelo diagnóstico, não pela ferramenta. A maioria dos projetos fracassa porque a tecnologia foi implementada sem entender o processo. Nosso Método 5D garante que o escopo seja fechado com critério de aceite antes de qualquer desenvolvimento.',
  },
  {
    question: 'Minha empresa não tem equipe técnica. Conseguimos usar o que vocês constroem?',
    answer: 'Sim. Entregamos documentação completa, treinamento da equipe e 30 dias de suporte pós-deploy. Construímos para autonomia, não para dependência.',
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Operamos com compliance nativo à LGPD. Seus dados ficam no seu ambiente — não em plataformas de terceiros sem contrato. Os agentes se identificam como IA na primeira mensagem. Seguimos os princípios do PL 2338/2023 desde a arquitetura.',
  },
]

export default function FaqPreviewSection() {
  return (
    <section className="faq-preview section" data-gsap="faq-preview">
      <div className="container faq-preview-inner">
        <Tag>Perguntas frequentes</Tag>
        <h2 className="faq-preview-heading">Dúvidas comuns</h2>

        <Accordion items={previewItems} />

        <div className="faq-preview-cta">
          <Button href="/faq" variant="secondary">
            Ver todas as perguntas →
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Substituir `src/sections/CtaSection.jsx`** (adiciona `glass-card` e `data-gsap`):

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './CtaSection.css'

export default function CtaSection() {
  return (
    <section className="cta-final section" data-gsap="cta">
      <div className="container">
        <div className="cta-card glass-card">
          <Tag>Próximo passo</Tag>
          <h2>
            Sua operação pode ser mais leve do que você imagina.{' '}
            <span>Fale com a Eugênia.</span>
          </h2>
          <Button
            href="https://wa.me/5551991275825"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Falar com a Eugênia →
          </Button>
          <p className="cta-disclaimer">
            Atendemos poucos projetos por vez, intencionalmente.
            Para garantir atenção real em cada operação.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Adicionar no FINAL de `src/sections/CtaSection.css`** o glow pulse loop:

```css
/* Glow pulse loop */
@keyframes cta-glow {
  0%, 100% { box-shadow: var(--shadow-glass), var(--shadow-glow); }
  50%       { box-shadow: var(--shadow-glass), var(--shadow-blue); }
}

.cta-card {
  animation: cta-glow 4s ease-in-out infinite;
}
```

- [ ] **Step 5: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 6: Commit**

```bash
git add src/sections/DiferenciaisSection.jsx src/sections/FaqPreviewSection.jsx src/sections/CtaSection.jsx src/sections/CtaSection.css
git commit -m "feat(sections): data attrs GSAP, glass no CTA, glow pulse"
```

---

## Task 13: animations.js — Lenis + GSAP + todos os ScrollTriggers

**Files:**
- Modify: `src/scripts/animations.js`

- [ ] **Step 1: Substituir o conteúdo completo de `src/scripts/animations.js`:**

```js
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Lenis + GSAP ticker integration ────────────────────────────────────────
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Skip all animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Lenis still runs for smooth scroll, but no GSAP animations
} else {
  initAnimations()
}

function initAnimations() {
  // ─── Hero: stagger on load ─────────────────────────────────────────────────
  const heroItems = gsap.utils.toArray('[data-gsap="hero-item"]')
  if (heroItems.length) {
    gsap.set(heroItems, { opacity: 0, y: -28 })
    gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: 'power2.out',
      delay: 0.2,
    })

    // Parallax no hero-copy
    const heroCopy = document.querySelector('[data-gsap="hero-copy"]')
    if (heroCopy) {
      gsap.to(heroCopy, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-gsap="hero"]',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }

  // ─── Problem: slide alternado + counters ───────────────────────────────────
  const problemCards = gsap.utils.toArray('[data-gsap="problem-card"]')
  if (problemCards.length) {
    problemCards.forEach((card) => {
      const dir = card.dataset.direction === 'right' ? 60 : -60
      gsap.set(card, { opacity: 0, x: dir })
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
        },
        onComplete: () => animateCounter(card),
      })
    })

    const heading = document.querySelector('[data-gsap="problem-heading"]')
    if (heading) {
      gsap.set(heading, { opacity: 0, y: 24 })
      gsap.to(heading, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      })
    }
  }

  // ─── Services: horizontal scroll (desktop) / fade vertical (mobile) ───────
  const mm = gsap.matchMedia()

  mm.add('(min-width: 768px)', () => {
    const track = document.querySelector('[data-gsap="services-track"]')
    const section = document.querySelector('[data-gsap="services"]')
    if (!track || !section) return

    const outer = document.querySelector('[data-gsap="services-outer"]')
    const getDistance = () =>
      track.scrollWidth - (outer ? outer.offsetWidth : document.documentElement.clientWidth)

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => tween.kill()
  })

  mm.add('(max-width: 767px)', () => {
    const cards = gsap.utils.toArray('[data-gsap="services"] .service-card')
    gsap.set(cards, { opacity: 0, y: 30 })
    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      })
    })
  })

  // ─── Method 5D: linha SVG scrub + steps reveal ────────────────────────────
  const methodSection = document.querySelector('[data-gsap="method"]')
  if (methodSection) {
    const linePath = methodSection.querySelector('[data-gsap="method-line-path"]')
    const steps = gsap.utils.toArray('[data-gsap="method-step"]')

    if (linePath) {
      // Calcula comprimento total da linha
      const lineLen = linePath.getTotalLength?.() ?? 1000
      gsap.set(linePath, { strokeDasharray: lineLen, strokeDashoffset: lineLen })
      gsap.to(linePath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: methodSection,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.4,
        },
      })
    }

    // Cada step revela com stagger
    gsap.set(steps, { opacity: 0, x: -24 })
    steps.forEach((step, i) => {
      gsap.to(step, {
        opacity: 1, x: 0, duration: 0.55, ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          onEnter: () => step.classList.add('is-active'),
        },
      })
    })
  }

  // ─── Diferenciais: split slide ────────────────────────────────────────────
  const difHeadline = document.querySelector('[data-gsap="diferenciais-headline"]')
  const difItems = gsap.utils.toArray('[data-gsap="diferencial-item"]')

  if (difHeadline) {
    gsap.set(difHeadline, { opacity: 0, x: -48 })
    gsap.to(difHeadline, {
      opacity: 1, x: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: difHeadline, start: 'top 78%' },
    })
  }

  if (difItems.length) {
    gsap.set(difItems, { opacity: 0, x: 48 })
    gsap.to(difItems, {
      opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-gsap="diferenciais"]', start: 'top 75%' },
    })
  }

  // ─── FAQ Preview: scale fade ──────────────────────────────────────────────
  const faqSection = document.querySelector('[data-gsap="faq-preview"]')
  if (faqSection) {
    gsap.set(faqSection, { opacity: 0, scale: 0.97 })
    gsap.to(faqSection, {
      opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: faqSection, start: 'top 80%' },
    })
  }

  // ─── CTA: scale fade ──────────────────────────────────────────────────────
  const ctaCard = document.querySelector('[data-gsap="cta"] .cta-card')
  if (ctaCard) {
    gsap.set(ctaCard, { opacity: 0, scale: 0.96, y: 20 })
    gsap.to(ctaCard, {
      opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: ctaCard, start: 'top 82%' },
    })
  }

  // ─── Inner pages: page-hero stagger ──────────────────────────────────────
  const pageHeroItems = gsap.utils.toArray('[data-gsap="page-hero-item"]')
  if (pageHeroItems.length) {
    gsap.set(pageHeroItems, { opacity: 0, y: -20 })
    gsap.to(pageHeroItems, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.15,
    })
  }

  // Inner page sections: fade reveal
  const pageSections = gsap.utils.toArray('[data-gsap="page-section"]')
  pageSections.forEach((section) => {
    gsap.set(section, { opacity: 0, y: 28 })
    gsap.to(section, {
      opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 82%' },
    })
  })
}

// ─── Counter animation helper ─────────────────────────────────────────────────
function animateCounter(card) {
  const el = card.querySelector('.problem-counter')
  if (!el) return
  const target = parseFloat(el.dataset.target)
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration: 1.4,
    ease: 'power1.inOut',
    onUpdate() {
      el.textContent = Math.round(obj.val)
    },
  })
}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 3: Verificar no browser** — iniciar dev server e checar:

```bash
npm run dev
```

Abrir `http://localhost:4321` e verificar:
- Cursor ring azul + dot amarelo aparecem ao mover o mouse
- Toggle lua/sol no header funciona, troca o tema
- Hero: elementos entram em stagger ao carregar
- ProblemSection: cards entram da esquerda/direita ao scrollar
- MethodSection: linha azul se desenha ao scrollar
- CTA: glass card visível com glow pulsando

- [ ] **Step 4: Commit**

```bash
git add src/scripts/animations.js
git commit -m "feat(animations): Lenis+GSAP ScrollTrigger — todos os efeitos de scroll"
```

---

## Task 14: Inner Pages — data attrs no page hero e seções

**Files:**
- Modify: `src/pages/_Clinicas.jsx`
- Modify: `src/pages/_Consultoria.jsx`
- Modify: `src/pages/_Treinamento.jsx`
- Modify: `src/pages/_Faq.jsx`
- Modify: `src/pages/_Contato.jsx`

Para cada arquivo de página interna, adicionar `data-gsap="page-hero-item"` nos elementos filhos do hero (Tag/h1/parágrafo/botões) e `data-gsap="page-section"` em cada `<section>` de conteúdo subsequente.

**Padrão a aplicar em todos os page heroes:**

```jsx
// Elemento Tag do hero:
<Tag data-gsap="page-hero-item">...</Tag>

// h1 do hero:
<h1 data-gsap="page-hero-item">...</h1>

// parágrafo introdutório do hero (se existir):
<p className="page-hero-sub" data-gsap="page-hero-item">...</p>

// div de ações do hero (se existir):
<div className="page-hero-actions" data-gsap="page-hero-item">...</div>

// Seções subsequentes (não o hero):
<section className="section" data-gsap="page-section">...</section>
```

- [ ] **Step 1: Aplicar o padrão em `src/pages/_Clinicas.jsx`**

Resultado esperado no page hero (seção `.clinicas-hero`): Tag, h1, parágrafo e div de ações recebem `data-gsap="page-hero-item"`. Demais `<section>` recebem `data-gsap="page-section"`.

O componente completo atualizado:

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './_Clinicas.css'

export default function Clinicas() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero section clinicas-hero">
        <div className="container">
          <Tag data-gsap="page-hero-item">Produto fixo — Agendamento com IA</Tag>
          <h1 data-gsap="page-hero-item">
            Sua clínica perdendo clientes{' '}
            <span>fora do horário comercial?</span>
          </h1>
          <p className="page-hero-sub" data-gsap="page-hero-item">
            Agente de IA que atende em 3 segundos, consulta a agenda dos seus
            profissionais e fecha o agendamento sozinho. 24 horas por dia,
            7 dias por semana.
          </p>
          <div className="page-hero-actions" data-gsap="page-hero-item">
            <Button
              href="https://wa.me/5551991275825"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Testar agora
            </Button>
            <Button href="#preco" variant="secondary" size="lg">
              Ver preço e detalhes ↓
            </Button>
          </div>
        </div>
      </section>

      {/* Demonstração */}
      <section className="section" data-gsap="page-section">
        <div className="container clinicas-demo">
          <h2>Veja funcionando antes de decidir</h2>
          <p>
            Mande uma mensagem para o número abaixo dizendo:{' '}
            <em>"Quero agendar uma avaliação para essa semana"</em>
          </p>
          <div className="clinicas-demo-box">
            <p className="clinicas-demo-label">Número do agente demo</p>
            <a
              href="https://wa.me/5551991275825"
              target="_blank"
              rel="noopener noreferrer"
              className="clinicas-demo-number"
            >
              (51) 99127-5825
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section" data-gsap="page-section">
        <div className="container">
          <Tag>Como funciona</Tag>
          <div className="clinicas-steps">
            {[
              { n: '01', text: 'O cliente envia mensagem no WhatsApp' },
              { n: '02', text: 'O agente consulta a agenda em tempo real' },
              { n: '03', text: 'O agendamento é confirmado automaticamente' },
            ].map(step => (
              <div key={step.n} className="clinicas-step">
                <span className="clinicas-step-n">{step.n}</span>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <p className="clinicas-steps-note">
            Entende áudio. Entende imagem. Não deixa cliente sem resposta.
          </p>
        </div>
      </section>

      {/* Preço */}
      <section id="preco" className="section" data-gsap="page-section">
        <div className="container clinicas-preco">
          <div className="clinicas-preco-card">
            <h2>O que está incluso</h2>
            <div className="clinicas-preco-values">
              <div>
                <span className="clinicas-preco-label">Setup completo</span>
                <span className="clinicas-preco-value">R$ 1.400</span>
              </div>
              <div>
                <span className="clinicas-preco-label">Manutenção mensal</span>
                <span className="clinicas-preco-value">R$ 350<small>/mês</small></span>
              </div>
            </div>
            <ul className="clinicas-include-list">
              <li>Configuração e onboarding</li>
              <li>Integração com Google Agenda</li>
              <li>30 dias de suporte</li>
              <li>Ajustes de prompt</li>
            </ul>
            <p className="clinicas-guarantee">
              Garantia de 7 dias ou devolvemos o valor.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section" data-gsap="page-section">
        <div className="container clinicas-compliance">
          <h3>Seguro, rastreável e adequado à LGPD</h3>
          <ul className="clinicas-compliance-list">
            <li>Agente se identifica como IA na primeira mensagem</li>
            <li>Dados do paciente ficam no seu ambiente</li>
            <li>Opção de falar com humano sempre disponível</li>
            <li>Mídias processadas e descartadas imediatamente</li>
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="section" data-gsap="page-section">
        <div className="container clinicas-cta">
          <h2>Pronto para atender enquanto você dorme?</h2>
          <Button
            href="https://wa.me/5551991275825"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Falar com a Eugênia →
          </Button>
          <p>Setup em até 2 dias úteis após preenchimento do formulário de onboarding.</p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Aplicar o mesmo padrão de `data-gsap` em `src/pages/_Consultoria.jsx`, `_Treinamento.jsx`, `_Faq.jsx` e `_Contato.jsx`**

Regra: elementos filhos do primeiro `<section>` (page hero) recebem `data-gsap="page-hero-item"`. Todo `<section>` subsequente recebe `data-gsap="page-section"`.

- [ ] **Step 3: Verificar build**

```bash
npm run build 2>&1 | tail -5
```

- [ ] **Step 4: Testar inner page no browser**

Com o dev server rodando, abrir `http://localhost:4321/clinicas` e verificar:
- Elementos do hero entram em stagger ao carregar a página
- Seções subsequentes revelam em fade+slide ao scrollar

- [ ] **Step 5: Commit**

```bash
git add src/pages/_Clinicas.jsx src/pages/_Consultoria.jsx src/pages/_Treinamento.jsx src/pages/_Faq.jsx src/pages/_Contato.jsx
git commit -m "feat(pages): data attrs page-hero-item e page-section para GSAP"
```

---

## Task 15: Verificação final e ajustes de responsividade

**Files:**
- Review all modified files

- [ ] **Step 1: Build de produção limpo**

```bash
npm run build 2>&1
```

Saída esperada: zero erros, arquivos gerados em `dist/`.

- [ ] **Step 2: Preview do build**

```bash
npm run preview
```

Abrir `http://localhost:4321` e testar:

- [ ] Home desktop: cursor aparece, todas as animações de scroll funcionam, horizontal scroll em Services
- [ ] Home mobile (redimensionar para 375px): cursor some, Services em stack vertical, animações simplificadas
- [ ] Toggle tema: dark→light→dark sem flash
- [ ] Tema persiste após reload (F5)
- [ ] `prefers-reduced-motion`: desativar animações no SO e verificar que o site ainda é usável
- [ ] Inner pages: /clinicas, /consultoria, /treinamento, /faq, /contato — hero stagger funciona

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "feat: UI redesign completo — cursor, tema, GSAP animations, NeuralSVG"
```

---

## Notas de implementação

- **GSAP + Lenis:** `gsap.ticker` substitui o `requestAnimationFrame` manual que estava em Layout.astro. Não duplicar Lenis.
- **`<script is:inline>` para anti-flash:** O atributo `is:inline` impede que Astro processe o script com Vite — necessário para garantir execução síncrona antes do render do HTML.
- **Services horizontal scroll:** `getDistance()` é uma função (não valor fixo) para que `invalidateOnRefresh` recalcule corretamente em resize.
- **SVG `getTotalLength()`:** `linePath.getTotalLength?.()` usa optional chaining — SVG `<line>` não implementa `getTotalLength` em todos os browsers. O fallback `?? 1000` garante que a animação funcione de qualquer forma.
- **Counter animation:** O `gsap.fromTo` anima um objeto `{val}` e usa `onUpdate` para escrever no DOM — mais leve do que animar o elemento SVG diretamente.
- **`data-gsap` pattern:** Todas as animações são acionadas por atributo `data-gsap`, não por className — facilita debugging no DevTools e desacopla CSS de animação.
