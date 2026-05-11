import { services } from '../../data/siteContent'
import { ServiceCard } from '../molecules/ServiceCard'

export function ServicesGrid() {
  return (
    <section className="section section-services" aria-labelledby="construimos-title">
      <div className="container">
        <div className="section-intro" data-reveal>
          <p className="kicker">O que construímos</p>
          <h2 id="construimos-title">O que a Eugen.IA constrói para a sua operação</h2>
          <p>
            Soluções sob medida para tirar peso da rotina, conectar sistemas e liberar tempo para decisão real.
          </p>
        </div>

        <div className="card-rail-viewport" data-card-rail-viewport>
          <div className="services-grid card-rail" data-card-rail>
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
