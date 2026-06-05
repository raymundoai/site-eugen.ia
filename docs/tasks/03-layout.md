# Task 3 — Layout: Header + Footer

Você está criando os componentes de layout do site da Eugen.IA. Leia o `plan.md` seção 4 (Navegação) antes de implementar o Header.

---

## 1. `src/hooks/useLenis.js`

Smooth scroll com Lenis. Deve ser chamado uma vez em `App.jsx` ou no layout raiz.

```js
import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    let raf
    function tick(time) {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
```

Chame `useLenis()` dentro de `App.jsx` (ou em um componente `<Layout>` que envolva Header + main + Footer).

---

## 2. `src/components/layout/Header.jsx`

### Comportamento

- **Estado expandido** (padrão, topo da página): largura total, fundo transparente com backdrop-blur. Logo à esquerda, links no centro (com dropdown "Serviços"), CTA "Falar com a Eugênia" à direita.
- **Estado condensado** (após 80px de scroll): transição para pílula centralizada. Max-width ~520px, logo reduzida + CTA + ícone hambúrguer. Fundo `var(--surface)` com `backdrop-filter: blur(16px)`.
- O hambúrguer abre um painel de navegação mobile.
- Manter `position: fixed; top: 0; z-index: 100`.

### Dropdown "Serviços"

Ao hover no desktop, painel com links:
- Agente de Agendamento → `/clinicas`
- Consultoria 5D → `/consultoria`
- Treinamento em IA → `/treinamento`

### Links principais

- Serviços (com dropdown)
- Teste de Maturidade → `/teste`
- FAQ → `/faq`
- Contato → `/contato`

### CTA

"Falar com a Eugênia" → link para `https://wa.me/5551991129452` (abre WhatsApp). Use `Button` com `variant="primary"` e `size="sm"`.

### Código

```jsx
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' header--condensed' : ''}`}>
      <div className={`header-inner${scrolled ? ' header-inner--pill' : ' header-inner--full'}`}>

        {/* Logo */}
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img src="/icon/logotipo.png" alt="Eugen.IA" height={scrolled ? 28 : 36} />
        </Link>

        {/* Nav desktop */}
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
                  <NavLink to="/clinicas">Agente de Agendamento</NavLink>
                  <NavLink to="/consultoria">Consultoria 5D</NavLink>
                  <NavLink to="/treinamento">Treinamento em IA</NavLink>
                </div>
              )}
            </div>
            <NavLink to="/teste" className="header-nav-item">Teste de Maturidade</NavLink>
            <NavLink to="/faq" className="header-nav-item">FAQ</NavLink>
            <NavLink to="/contato" className="header-nav-item">Contato</NavLink>
          </nav>
        )}

        {/* CTA + hamburger */}
        <div className="header-actions">
          <Button
            href="https://wa.me/5551991129452"
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

      {/* Menu mobile (aberto pelo hambúrguer) */}
      {menuOpen && (
        <nav className="header-mobile-menu">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Início</NavLink>
          <NavLink to="/clinicas" onClick={() => setMenuOpen(false)}>Agente de Agendamento</NavLink>
          <NavLink to="/consultoria" onClick={() => setMenuOpen(false)}>Consultoria 5D</NavLink>
          <NavLink to="/treinamento" onClick={() => setMenuOpen(false)}>Treinamento em IA</NavLink>
          <NavLink to="/teste" onClick={() => setMenuOpen(false)}>Teste de Maturidade</NavLink>
          <NavLink to="/faq" onClick={() => setMenuOpen(false)}>FAQ</NavLink>
          <NavLink to="/contato" onClick={() => setMenuOpen(false)}>Contato</NavLink>
        </nav>
      )}
    </header>
  )
}
```

### `src/components/layout/Header.css`

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding-inline: var(--space-6);
  padding-block: var(--space-4);
  transition: padding 0.3s ease;
}

/* Estado expandido */
.header-inner--full {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--container);
  background: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-pill);
  padding: var(--space-3) var(--space-6);
  border: 1px solid var(--line);
  background: var(--glass);
}

/* Estado condensado — pílula centralizada */
.header-inner--pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  max-width: 520px;
  width: 100%;
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: var(--radius-pill);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-base);
}

/* Nav desktop */
.header-nav {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.header-nav-item {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
}

.header-nav-item:hover,
.header-nav-item.active {
  color: var(--foreground);
}

/* Dropdown */
.header-nav-dropdown {
  position: relative;
}

.dropdown-panel {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 220px;
  box-shadow: var(--shadow-glass);
  white-space: nowrap;
}

.dropdown-panel a {
  display: block;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--muted);
  border-radius: var(--radius-sm);
  transition: background 0.15s, color 0.15s;
}

.dropdown-panel a:hover {
  background: var(--surface-soft);
  color: var(--foreground);
}

/* Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

/* Hambúrguer */
.nav-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.nav-hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--foreground);
  border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
  transform-origin: center;
}

.nav-hamburger.is-open span:first-child {
  transform: translateY(7px) rotate(45deg);
}

.nav-hamburger.is-open span:nth-child(2) {
  opacity: 0;
}

.nav-hamburger.is-open span:last-child {
  transform: translateY(-7px) rotate(-45deg);
}

/* Menu mobile */
.header-mobile-menu {
  position: fixed;
  top: 72px;
  left: var(--space-4);
  right: var(--space-4);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  box-shadow: var(--shadow-glass);
  z-index: 99;
}

.header-mobile-menu a {
  font-size: var(--font-size-lg);
  font-weight: 500;
  color: var(--muted);
  padding-block: var(--space-2);
  border-bottom: 1px solid var(--line);
  transition: color 0.2s;
}

.header-mobile-menu a:last-child {
  border-bottom: none;
}

.header-mobile-menu a:hover,
.header-mobile-menu a.active {
  color: var(--primary);
}

/* Esconde nav desktop em mobile */
@media (max-width: 768px) {
  .header-nav {
    display: none;
  }

  .header-inner--full {
    justify-content: space-between;
  }
}
```

---

## 3. `src/components/layout/Footer.jsx`

Copy exata conforme `plan.md` seção "Footer":

```jsx
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div className="footer-brand">
          <img src="/icon/logotipo.png" alt="Eugen.IA" height={32} />
          <p>
            Automações e agentes de IA para empresas que querem parar de ser
            operadas pelos donos e começar a ser construídas por eles.
          </p>
        </div>

        <nav className="footer-nav">
          <span className="footer-nav-label">Navegação</span>
          <Link to="/">Início</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <div className="footer-contact">
          <span className="footer-nav-label">Contato</span>
          <a href="mailto:contato@eugenia.ia.br">contato@eugenia.ia.br</a>
          <a href="tel:+5551991129452">(51) 99112-9452</a>
          <span className="footer-muted">Atendimento remoto em todo o Brasil.</span>
        </div>

      </div>

      <div className="container footer-bottom">
        <div className="footer-legal">
          <a href="#">Política de Privacidade</a>
          <a href="#">Política de Cookies</a>
          <a href="#">Preferências de cookies</a>
        </div>
        <span className="footer-muted">© 2026 Eugen.IA. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}
```

### `src/components/layout/Footer.css`

```css
.footer {
  border-top: 1px solid var(--line);
  padding-block: var(--space-16) var(--space-8);
  margin-top: var(--space-24);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-12);
}

.footer-brand img {
  margin-bottom: var(--space-4);
}

.footer-brand p {
  color: var(--muted);
  font-size: var(--font-size-sm);
  line-height: 1.7;
  max-width: 320px;
}

.footer-nav,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-nav-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: var(--space-1);
}

.footer-nav a,
.footer-contact a {
  color: var(--muted);
  font-size: var(--font-size-sm);
  transition: color 0.2s;
}

.footer-nav a:hover,
.footer-contact a:hover {
  color: var(--primary);
}

.footer-muted {
  color: var(--muted);
  font-size: var(--font-size-sm);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-6);
  border-top: 1px solid var(--line);
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer-legal {
  display: flex;
  gap: var(--space-6);
}

.footer-legal a {
  font-size: var(--font-size-xs);
  color: var(--muted);
  transition: color 0.2s;
}

.footer-legal a:hover {
  color: var(--foreground);
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
```

---

## 4. Integrar useLenis em App.jsx

Atualize `src/App.jsx` para:

```jsx
import { HelmetProvider } from 'react-helmet-async'
import AppRouter from './app/AppRouter.jsx'
import { useLenis } from './hooks/useLenis.js'

function AppInner() {
  useLenis()
  return <AppRouter />
}

export default function App() {
  return (
    <HelmetProvider>
      <AppInner />
    </HelmetProvider>
  )
}
```

---

## Verificação

- `npm run dev`: header aparece fixo no topo, transição para pílula ao rolar
- Dropdown "Serviços" aparece ao hover nos links (desktop)
- Hambúrguer abre o menu mobile
- Footer renderiza corretamente
