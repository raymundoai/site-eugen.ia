import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './PageShared.css'
import './Contato.css'

export default function Contato() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag>Contato</Tag>
          <h1>
            Fale com a Eugênia.{' '}
            <span>Sem formulário. Sem espera.</span>
          </h1>
          <p className="page-hero-sub">
            Clique no botão abaixo e agenda o Pré-Diagnóstico gratuito com
            nosso time. Sem compromisso.
          </p>
          <div className="page-hero-actions">
            <Button
              href="https://wa.me/5551991129452"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Falar com a Eugênia →
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contato-info">
          <div className="contato-item">
            <span className="contato-label">E-mail</span>
            <a href="mailto:contato@eugenia.ia.br">contato@eugenia.ia.br</a>
          </div>
          <div className="contato-item">
            <span className="contato-label">WhatsApp</span>
            <a href="https://wa.me/5551991129452" target="_blank" rel="noopener noreferrer">
              (51) 99112-9452
            </a>
          </div>
          <div className="contato-item">
            <span className="contato-label">Atendimento</span>
            <span>100% remoto · todo o Brasil</span>
          </div>
        </div>
      </section>
    </>
  )
}
