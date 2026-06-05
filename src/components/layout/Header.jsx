import { useState, useEffect } from 'react'
import Button from '../ui/Button.jsx'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [pathname, setPathname] = useState('/')

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
