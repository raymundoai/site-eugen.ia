import Tag from '../components/ui/Tag.jsx'
import { ChatProvider } from '../components/chat/ChatContext.jsx'
import ChatPanel from '../components/chat/ChatPanel.jsx'
import '../components/chat/chat.css'
import './_PageShared.css'
import './_Contato.css'

export default function Contato() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag data-gsap="page-hero-item">Contato</Tag>
          <h1 data-gsap="page-hero-item">
            Fale com a Eugênia.{' '}
            <span>Sem formulário. Sem espera.</span>
          </h1>
          <p className="page-hero-sub" data-gsap="page-hero-item">
            Em poucos minutos a Eugênia mapeia seu cenário e agenda o diagnóstico
            gratuito com nosso time. Sem compromisso.
          </p>
        </div>
      </section>

      <section className="section contact-page" data-gsap="page-section">
        <div className="container contact-grid">
          <aside className="contact-copy">
            <Tag>Contato</Tag>
            <h2>
              A conversa ao lado é o caminho mais rápido.
            </h2>
            <p>
              A Eugênia coleta o contexto da sua operação, qualifica o cenário e
              já encaminha tudo para o nosso time sem formulário, sem espera, sem
              você precisar repetir nada depois.
            </p>
            <div className="contact-direct">
              <h3>Prefere contato direto?</h3>
              <ul>
                <li>
                  <span className="contact-label">E-MAIL</span>
                  <a href="mailto:contato@eugenia.ia.br">contato@eugenia.ia.br</a>
                </li>
                <li>
                  <span className="contact-label">WHATSAPP</span>
                  <a href="https://wa.me/5551991275825" target="_blank" rel="noreferrer">
                    (51) 99127-5825
                  </a>
                </li>
                <li>
                  <span className="contact-label">ATENDIMENTO</span>
                  <span>100% remoto para todo Brasil</span>
                </li>
              </ul>
            </div>
          </aside>

          <ChatProvider>
            <ChatPanel />
          </ChatProvider>
        </div>
      </section>
    </>
  )
}
