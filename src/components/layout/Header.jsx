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
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' header--condensed' : ''}`}>
      <div className={`header-inner${scrolled ? ' header-inner--pill' : ' header-inner--full'}`}>
        <Link to="/" className="header-logo" onClick={() => setMenuOpen(false)}>
          <img src="/icon/logotipo.png" alt="Eugen.IA" height={scrolled ? 28 : 36} />
        </Link>

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

          <button
            className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

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
