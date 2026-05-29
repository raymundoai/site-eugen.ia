import { Link } from 'react-router-dom'
import { footerColumns } from '../data/siteContent'
import { useConsent } from '../hooks/useConsent'

function IconLinkedin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const socialIcons = { linkedin: IconLinkedin, instagram: IconInstagram, facebook: IconFacebook }

export function Footer() {
  const { openPreferences } = useConsent()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>Eugen.IA</h2>
          <p>{footerColumns.tagline}</p>
          <div className="footer-social">
            {footerColumns.social.map((item) => {
              const Icon = socialIcons[item.icon]
              return (
                <a key={item.icon} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                  <Icon />
                </a>
              )
            })}
          </div>
        </div>
        <div>
          <h3>Navegação</h3>
          {footerColumns.nav.map((item) => (
            <Link key={item.href} to={item.href}>{item.label}</Link>
          ))}
        </div>
        <div>
          <h3>Contato</h3>
          {footerColumns.contact.map((item) =>
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <p key={item.label}>{item.label}</p>
            )
          )}
        </div>
        <div>
          <h3>Legal</h3>
          <Link to="/privacidade">Política de Privacidade</Link>
          <Link to="/cookies">Política de Cookies</Link>
          <button type="button" className="footer-link-button" onClick={openPreferences}>
            Preferências de cookies
          </button>
        </div>
      </div>
      <div className="container footer-bottom">{footerColumns.copyright}</div>
    </footer>
  )
}
