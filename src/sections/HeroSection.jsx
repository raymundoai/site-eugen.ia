import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import NeuralSVG from './NeuralSVG.jsx'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero section" data-gsap="hero">
      <div className="container hero-grid">
        <div className="hero-copy" data-gsap="hero-copy">
          <Tag data-gsap="hero-item">Automação de processos &amp; Agentes IA</Tag>

          <h1 data-gsap="hero-item">
            Mapeamos seus processos e desenvolvemos{' '}
            <strong>Agentes de IA sob medida</strong> para sua empresa
          </h1>

          <div className="hero-actions" data-gsap="hero-item">
            <Button
              href="https://wa.me/5551991275825"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Agendar Pré-Diagnóstico gratuito
            </Button>
            <Button href="/teste" variant="secondary" size="lg">
              Fazer o Teste de Maturidade
            </Button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <NeuralSVG />
        </div>
      </div>

      <div className="container hero-context-bar" data-gsap="hero-item">
        <span>100% remoto · todo o Brasil</span>
        <span className="hero-context-divider" />
        <span>Atendimento personalizado</span>
        <span className="hero-context-divider" />
        <span>Compliance LGPD nativo</span>
      </div>
    </section>
  )
}
