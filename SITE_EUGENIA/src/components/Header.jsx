import { Moon, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../data/siteContent'
import { useTheme } from '../hooks/useTheme'

export function Header() {
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

      <nav className="nav-pill" aria-label="Navegação principal">
        {navItems.map((item) => (
          <Link key={item.href} className={pathname === item.href ? 'active' : ''} to={item.href} data-cursor="action">
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
