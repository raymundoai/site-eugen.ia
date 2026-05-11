import { ChatWidget } from '../components/organisms/ChatWidget'

export function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container" data-reveal>
          <p className="kicker">Contato</p>
          <h1>Fale com a Eugênia.</h1>
          <p>
            Em poucos minutos a Eugênia mapeia seu cenário e encaminha o diagnóstico com nosso time. Sem formulário longo. Sem
            espera.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-card" data-reveal>
            <p className="kicker">Contato</p>
            <h2>
              <span className="show-desktop-inline">A conversa ao lado é o caminho mais rápido.</span>
              <span className="show-mobile-inline">A conversa aqui é o caminho mais rápido.</span>
            </h2>
            <p>
              A Eugênia coleta o contexto da sua operação, qualifica o cenário e já encaminha tudo para o nosso time sem
              formulário, sem espera, sem você precisar repetir nada depois.
            </p>

            <div className="contact-direct">
              <h3>Prefere contato direto?</h3>
              <ul>
                <li>
                  <strong>E-mail</strong>
                  <a href="mailto:contato@eugenia.ia.br" data-cursor="action">
                    contato@eugenia.ia.br
                  </a>
                </li>
                <li>
                  <strong>WhatsApp</strong>
                  <a href="https://api.whatsapp.com/send/?phone=5551991129452" target="_blank" rel="noreferrer" data-cursor="action">
                    (51) 99112-9452
                  </a>
                </li>
                <li>
                  <strong>Atendimento</strong>
                  <span>100% remoto para todo o Brasil</span>
                </li>
              </ul>
            </div>
          </aside>

          <div data-reveal>
            <ChatWidget variant="embedded" className="chat-widget-page" />
          </div>
        </div>
      </section>
    </>
  )
}
