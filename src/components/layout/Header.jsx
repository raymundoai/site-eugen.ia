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
