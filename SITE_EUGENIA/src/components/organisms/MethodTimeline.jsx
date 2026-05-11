import { methodSteps } from '../../data/siteContent'

export function MethodTimeline() {
  return (
    <section className="section section-method" aria-labelledby="metodo-title">
      <div className="container">
        <div className="section-intro" data-reveal>
          <p className="kicker">Método</p>
          <h2 id="metodo-title">O método 5D para decidir onde a IA deve entrar.</h2>
          <p>
            Com mais de 10 anos analisando e otimizando processos, sabemos onde IA gera resultado e onde é hype. O método parte do diagnóstico da operação para priorizar a implementação certa.
          </p>
        </div>

        <div className="card-rail-viewport" data-card-rail-viewport>
          <div className="timeline-grid card-rail" data-card-rail>
            {methodSteps.map((step) => (
              <article key={step.number} className="timeline-step" data-reveal data-cursor="action">
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
