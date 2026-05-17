import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../data/siteContent'
import { useTheme } from '../hooks/useTheme'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Eugen.IA" data-cursor="action">
        <img src="/icon/logotipo.png" alt="" className="brand-logo" width="44" height="44" />
        <span>
          Eugen<span>.IA</span>
        </span>
      </Link>

      <button
        className={`nav-hamburger ${menuOpen ? 'is-open' : ''}`}
        type="button"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>

      <nav className={`nav-pill ${menuOpen ? 'nav-mobile-open' : ''}`} aria-label="Navegação principal">
        {navItems.map((item) => (
          <Link
            key={item.href}
            className={pathname === item.href ? 'active' : ''}
            to={item.href}
            onClick={() => setMenuOpen(false)}
            data-cursor="action"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label="Alternar tema" data-cursor="action">
          {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        </button>
        <Link className="btn btn-glass header-cta" to="/contato" data-cursor="action">
          Falar com a Eugênia
        </Link>
      </div>
    </header>
  )
}
