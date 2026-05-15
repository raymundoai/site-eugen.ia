import { CheckCircle2 } from 'lucide-react'
import { methodSteps } from '../data/siteContent'

export function MethodCards() {
  return (
    <section className="section method-cards" id="metodo">
      <div className="container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">Como fazemos</p>
          <h2>O Método</h2>
        </div>
        <div className="method-track">
          {methodSteps.map((step, index) => (
            <article className="method-card" data-reveal key={step.title}>
              <span className="method-number">0{index + 1}</span>
              <CheckCircle2 aria-hidden="true" size={24} />
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
