import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../data/siteContent'
import { Button } from '../atoms/Button'
import { ThemeToggle } from '../atoms/ThemeToggle'
import { NavItem } from '../molecules/NavItem'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" data-cursor="action" aria-label="Eugen.IA - Página inicial">
          <img src="/icon/logotipo.png" alt="" className="brand-logo" width="20" height="20" />
          <span>
            Eugen<span>.IA</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Menu principal">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Button as={Link} to="/contato" variant="glass" data-cursor="action">
            Diagnóstico gratuito
          </Button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMobileOpen((current) => !current)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            Menu
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${mobileOpen ? 'mobile-nav-open' : ''}`} id="mobile-nav">
        <div className="container mobile-nav-content">
          {navItems.map((item) => (
            <NavItem key={item.path} item={item} onClick={() => setMobileOpen(false)} />
          ))}
          <Button as={Link} to="/contato" onClick={() => setMobileOpen(false)}>
            Diagnóstico gratuito
          </Button>
        </div>
      </div>
    </header>
  )
}
