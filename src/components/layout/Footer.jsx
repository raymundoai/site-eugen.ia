import { Link } from 'react-router-dom'
import './Footer.css'

const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5551991129452',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.1 4.9A9.8 9.8 0 0 0 3.4 16.3L2 21l4.8-1.3A9.8 9.8 0 0 0 19.1 4.9ZM12 19.3a7.4 7.4 0 0 1-3.8-1l-.3-.2-2.8.7.8-2.7-.2-.3A7.4 7.4 0 1 1 12 19.3Zm4.1-5.5c-.2-.1-1.3-.7-1.5-.7s-.4-.1-.6.2-.7.7-.8.9-.3.2-.5.1a6.1 6.1 0 0 1-1.8-1.1 6.7 6.7 0 0 1-1.2-1.6c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5a.5.5 0 0 0 0-.5l-.7-1.5c-.2-.4-.4-.3-.6-.3h-.5a1 1 0 0 0-.7.3 2.7 2.7 0 0 0-.8 2 4.7 4.7 0 0 0 1 2.5 10.9 10.9 0 0 0 4.2 3.7 14 14 0 0 0 1.4.5 3.4 3.4 0 0 0 1.5.1 2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.2-.2-.4-.3Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/eugenia.ia',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4Zm4.2 3.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2Zm5-2.3a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 6.9Z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/eugenia-ia',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.9 8.8H3.6V21h3.3ZM7.2 5a1.9 1.9 0 1 0-1.9 1.9A1.9 1.9 0 0 0 7.2 5ZM21 14.1c0-3.3-1.8-5.1-4.3-5.1a3.7 3.7 0 0 0-3.4 1.9V8.8h-3.2V21h3.3v-6.1c0-1.6.3-3.2 2.3-3.2s2 1.9 2 3.3v6h3.3Z" />
      </svg>
    ),
  },
]

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
          <div className="footer-social" aria-label="Redes sociais">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
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
