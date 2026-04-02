import { services } from '../../data/siteContent'
import { ServiceCard } from '../molecules/ServiceCard'

export function ServicesGrid() {
  return (
    <section className="section section-services" aria-labelledby="servicos-title">
      <div className="container">
        <div className="section-intro" data-reveal>
          <p className="kicker">Serviços</p>
          <h2 id="servicos-title">O que a Eugen.IA constrói para o seu e-commerce</h2>
          <p>
            Mapeamos gargalos reais e construímos soluções de IA para reduzir retrabalho, integrar operação e escalar com previsibilidade.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
