import { Link } from 'react-router-dom'
import { HeroInteractive } from '../components/organisms/HeroInteractive'
import { ServicesGrid } from '../components/organisms/ServicesGrid'
import { MethodTimeline } from '../components/organisms/MethodTimeline'
import { Button } from '../components/atoms/Button'

export function HomePage() {
  return (
    <>
      <HeroInteractive />

      <section className="section" aria-labelledby="problema-title">
        <div className="container">
          <article className="service-context-panel" data-reveal>
            <p className="kicker">Problema principal</p>
            <h2 id="problema-title">Você sabe que IA é importante. Mas não sabe por onde começar?</h2>
            <p>Ou sente que não funciona para a realidade da sua empresa?</p>
            <p>65% das empresas brasileiras ainda não definiram como gerar resultado com IA.</p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="solucao-title">
        <div className="container">
          <article className="service-context-panel" data-reveal>
            <p className="kicker">Solução</p>
            <h2 id="solucao-title">Não prometemos resultado. Garantimos ele.</h2>
            <p>
              Mapeamos seus processos de ponta a ponta para identificar os gargalos reais e propor soluções sob medida que realmente funcionam.
            </p>
          </article>
        </div>
      </section>

      <ServicesGrid />

      <section className="section" aria-labelledby="diferenciais-title">
        <div className="container">
          <div className="section-intro" data-reveal>
            <p className="kicker">Por que escolher a Eugen.IA?</p>
            <h2 id="diferenciais-title">Atrair mais clientes não resolve uma operação que não sustenta crescimento.</h2>
          </div>

          <article className="service-context-panel" data-reveal>
            <p>
              Diferente da maioria das agências, sabemos que não adianta criar post bonito para Instagram ou gastar rios de dinheiro em tráfego pago se a operação não garante entrega e relacionamento com qualidade.
            </p>
            <p>
              Desde 2015, trabalhamos mapeando e otimizando processos de negócios locais e digitais dos mais diversos segmentos. Muitas empresas focam apenas no comercial, mas esquecem de reter.
            </p>
          </article>
        </div>
      </section>

      <MethodTimeline />

      <section className="section section-cta" data-reveal>
        <div className="container cta-banner">
          <div>
            <p className="kicker">Próximo passo</p>
            <h2>Sua empresa pode crescer sem sobrecarregar a operação.</h2>
            <p>
              O diagnóstico mostra por onde começar, quais gargalos atacar e onde a IA realmente faz sentido.
            </p>
          </div>
          <div className="cta-group">
            <Button as={Link} to="/contato" size="lg" data-cursor="action">
              Agendar diagnóstico
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
