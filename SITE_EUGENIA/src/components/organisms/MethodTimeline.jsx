import { methodSteps } from '../../data/siteContent'

export function MethodTimeline() {
  return (
    <section className="section section-method" aria-labelledby="metodo-title">
      <div className="container">
        <div className="section-intro" data-reveal>
          <p className="kicker">Método</p>
          <h2 id="metodo-title">Clareza primeiro. Execução depois.</h2>
        </div>

        <div className="timeline-grid">
          {methodSteps.map((step) => (
            <article key={step.number} className="timeline-step" data-reveal data-cursor="action">
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
