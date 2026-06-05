import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './CtaSection.css'

export default function CtaSection() {
  return (
    <section className="cta-final section">
      <div className="container">
        <div className="cta-card">
          <Tag>Próximo passo</Tag>
          <h2>
            Sua operação pode ser mais leve do que você imagina.{' '}
            <span>Fale com a Eugênia.</span>
          </h2>
          <Button
            href="https://wa.me/5551991129452"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Falar com a Eugênia →
          </Button>
          <p className="cta-disclaimer">
            Atendemos poucos projetos por vez, intencionalmente.
            Para garantir atenção real em cada operação.
          </p>
        </div>
      </div>
    </section>
  )
}
