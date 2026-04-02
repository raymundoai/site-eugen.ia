import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { navItems } from '../../data/siteContent'

export function Footer() {
  return (
    <footer className="site-footer" data-reveal>
      <div className="container footer-inner">
        <div>
          <h3>Eugen.IA</h3>
          <p>
            Automações e agentes de IA para que e-commerces parem de ser operados pelos donos e comecem a ser construídos por eles.
          </p>
          <div className="footer-socials" aria-label="Redes sociais da Eugen.IA">
            <a
              href="https://www.linkedin.com/company/eugenia-agentes/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn da Eugen.IA"
              data-cursor="action"
            >
              <Linkedin size={18} strokeWidth={1.9} />
            </a>
            <a
              href="https://www.facebook.com/eugenia.agentesIA"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da Eugen.IA"
              data-cursor="action"
            >
              <Facebook size={18} strokeWidth={1.9} />
            </a>
            <a
              href="https://www.instagram.com/eugenia.agentes"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Eugen.IA"
              data-cursor="action"
            >
              <Instagram size={18} strokeWidth={1.9} />
            </a>
          </div>
        </div>

        <div>
          <h4>Navegação</h4>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} data-cursor="action">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contato</h4>
          <ul>
            <li>
              <a href="mailto:contato@eugenia.ia.br" data-cursor="action">
                contato@eugenia.ia.br
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send/?phone=555191283248" target="_blank" rel="noreferrer" data-cursor="action">
                (51) 9128-3248
              </a>
            </li>
            <li>Atendimento remoto em todo o Brasil</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Eugen.IA. Todos os direitos reservados.</div>
    </footer>
  )
}
