import { ChatWidget } from '../components/ChatWidget'

export function ContactPage() {
  return (
    <>
      <section className="section contact-hero">
        <div className="container" data-reveal>
          <p className="eyebrow">Contato</p>
          <h1>Fale com a Eugênia.</h1>
          <p>
            Em poucos minutos a Eugênia mapeia seu cenário e agenda o diagnóstico gratuito com nosso time.
            Sem formulário. Sem espera. Sem compromisso.
          </p>
        </div>
      </section>

      <section className="section contact-page">
        <div className="container contact-grid">
          <aside className="contact-copy" data-reveal>
            <p className="eyebrow">Contato</p>
            <h2>
              A conversa <span className="contact-position-desktop">ao lado</span><span className="contact-position-mobile">abaixo</span> é o caminho mais rápido.
            </h2>
            <p>
              A Eugênia coleta o contexto da sua operação, qualifica o cenário e já encaminha tudo para o nosso
              time sem formulário, sem espera, sem você precisar repetir nada depois.
            </p>
            <div className="contact-direct">
              <h3>Prefere contato direto?</h3>
              <ul>
                <li>
                  <span className="contact-label">E-MAIL</span>
                  <a href="mailto:contato@eugenia.ia.br" data-cursor="action">contato@eugenia.ia.br</a>
                </li>
                <li>
                  <span className="contact-label">WHATSAPP</span>
                  <a href="https://api.whatsapp.com/send/?phone=5551991129452" target="_blank" rel="noreferrer" data-cursor="action">(51) 99112-9452</a>
                </li>
                <li>
                  <span className="contact-label">ATENDIMENTO</span>
                  <span>100% remoto para todo Brasil</span>
                </li>
              </ul>
            </div>
          </aside>
          <div data-reveal>
            <ChatWidget embedded />
          </div>
        </div>
      </section>
    </>
  )
}
