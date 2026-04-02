import { Link } from 'react-router-dom'
import { services } from '../data/siteContent'
import { Button } from '../components/atoms/Button'
import { resolveServiceIcon } from '../utils/serviceIcons'

export function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container" data-reveal>
          <p className="kicker">Serviços</p>
          <h1>O que trava seu crescimento raramente é falta de venda.</h1>
          <p>
            É o tempo que sua operação consome todo dia. Não vendemos IA por IA. Mapeamos o que drena sua operação primeiro e só depois construímos a solução certa para o seu cenário.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="service-context-panel" data-reveal>
            <p className="kicker">O cenário que a gente reconhece</p>
            <h2>A operação cresceu. O caos cresceu junto.</h2>
            <p>
              Gestores com quem conversamos chegam com o mesmo padrão: faturamento subindo, equipe no limite,
              sensação constante de que se eles tirarem um dia, alguma coisa trava.
            </p>
            <p>
              Não é falta de esforço. É falta de estrutura automatizada. É para isso que a Eugen.IA existe.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-intro" data-reveal>
            <h2>Principais frentes de atuação</h2>
          </div>

          <div className="service-detail-stack" data-reveal>
            {services.map((service) => {
              const Icon = resolveServiceIcon(service.icon)

              return (
                <article key={service.title} className="service-detail" data-cursor="action">
                  <div>
                    <header className="service-detail-head">
                      <span className="service-detail-icon" aria-hidden="true">
                        <Icon size={20} strokeWidth={1.9} />
                      </span>
                      <h2>{service.title}</h2>
                    </header>
                    <p className="service-detail-lead">{service.details || service.promise}</p>
                    <ul>
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    {service.result ? <p className="service-detail-result">{service.result}</p> : null}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-cta" data-reveal>
        <div className="container cta-banner">
          <div>
            <p className="kicker">Próximo passo</p>
            <h2>30 minutos para mapear o gargalo que mais drena sua operação hoje.</h2>
            <p>
              Sem compromisso. Sem pitch de ferramenta. Se fizer sentido, a gente avança. Se não fizer, você sai com clareza sobre o que priorizar.
            </p>
          </div>
          <Button as={Link} to="/contato" data-cursor="action">
            Agendar diagnóstico gratuito
          </Button>
        </div>
      </section>
    </>
  )
}
