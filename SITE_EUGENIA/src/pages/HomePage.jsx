import { Button } from '../components/Button'
import { ChatWidget } from '../components/ChatWidget'
import { FaqList } from '../components/FaqList'
import { MethodCards } from '../components/MethodCards'
import { ProblemSection } from '../components/ProblemSection'
import { ServicesShowcase } from '../components/ServicesShowcase'

export function HomePage() {
  return (
    <>
      <section className="hero section" id="inicio">
        <div className="container hero-centered">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Automação de Processos & Agentes IA</p>
            <h1>
              Mapeamos seus processos e desenvolvemos <strong>Agentes de IA</strong>{' '}
              <span className="hero-title-tail">
                sob medida <span>para sua</span> <span>empresa</span>
              </span>
            </h1>
            <Button to="/contato" data-cursor="action">Falar com a Eugênia</Button>
          </div>
        </div>
      </section>

      <ProblemSection />

      <ServicesShowcase />

      <section className="section method-manifesto">
        <div className="container manifesto-panel" data-reveal>
          <p className="manifesto-headline">
            Com mais de 10 anos analisando e otimizando processos, sabemos exatamente onde a IA é resultado e onde é{' '}
            <span className="manifesto-hype">Hype.</span>
          </p>
          <p>
            Com o Método Eugen.IA, garantimos resultado visível no primeiro mês. Nós mapeamos e analisamos exatamente
            como sua operação funciona e decidimos com precisão cirúrgica onde a IA deve entrar.
          </p>
        </div>
      </section>

      <MethodCards />

      <section className="section faq-preview" id="faq">
        <div className="container">
          <div className="section-intro" data-reveal>
            <h2>Perguntas Frequentes</h2>
          </div>
          <FaqList />
        </div>
      </section>

      <section className="section final-cta">
        <div className="container cta-panel" data-reveal>
          <p className="eyebrow">Próximo passo</p>
          <h2>Sua operação pode ser mais leve do que você imagina. Fale com a Eugênia.</h2>
          <Button to="/contato" data-cursor="action">Falar com a Eugênia</Button>
          <p>Aviso: Atendemos poucos projetos por vez, intencionalmente. Para garantir atenção real em cada operação.</p>
        </div>
      </section>

      <ChatWidget />
    </>
  )
}
