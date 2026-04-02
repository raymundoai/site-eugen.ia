import { Link } from 'react-router-dom'
import { HeroInteractive } from '../components/organisms/HeroInteractive'
import { ServicesGrid } from '../components/organisms/ServicesGrid'
import { MethodTimeline } from '../components/organisms/MethodTimeline'
import { differentials } from '../data/siteContent'
import { Button } from '../components/atoms/Button'

export function HomePage() {
  return (
    <>
      <HeroInteractive />
      <ServicesGrid />

      <section className="section" aria-labelledby="diferenciais-title">
        <div className="container">
          <div className="section-intro" data-reveal>
            <p className="kicker">Diferenciais</p>
            <h2 id="diferenciais-title">Você criou seu e-commerce para ter liberdade, não para virar refém da operação.</h2>
          </div>

          <div className="differentials-grid">
            {differentials.map((item) => (
              <article key={item.title} className="differential-card" data-reveal data-cursor="action">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MethodTimeline />

      <section className="section section-cta" data-reveal>
        <div className="container cta-banner">
          <div>
            <p className="kicker">Próximo passo</p>
            <h2>Sua operação pode ser mais leve do que você imagina.</h2>
            <p>
              Atendemos poucos projetos por vez, intencionalmente. Para garantir atenção real em cada operação.
            </p>
          </div>
          <div className="cta-group">
            <Button as={Link} to="/contato" size="lg" data-cursor="action">
              Agendar diagnóstico gratuito agora
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
