import './ProblemSection.css'

const stats = [
  {
    number: '72',
    suffix: '%',
    text: 'das empresas brasileiras estão nos estágios iniciante ou experimental de adoção da IA',
    source: 'Abiacom + Brazil Panels + Líderes.ai — pesquisa com 200 empresas, out/nov 2025',
  },
  {
    number: '70',
    suffix: '%',
    text: 'dos profissionais reconhecem atividades em seu dia a dia que poderiam ser automatizadas por IA, mas não sabem como fazer',
    source: 'Abiacom, out/nov 2025',
  },
  {
    number: '47',
    suffix: ',4%',
    text: 'dos profissionais utilizam ferramentas de IA sem aprovação oficial — o chamado Shadow AI',
    source: 'Abiacom, out/nov 2025 — via Exame',
  },
  {
    number: '95',
    suffix: '%',
    text: 'das organizações que adotaram IA ainda não conseguiram ter ROI visível nos projetos de implementação',
    source: 'TEC.Institute / MIT Technology Review Brasil',
  },
]

export default function ProblemSection() {
  return (
    <section className="problem section" data-gsap="problem">
      <div className="container">
        <h2 className="problem-heading" data-gsap="problem-heading">
          Você sabe que IA é importante{' '}
          <span>mas não sabe como aproveitar todo o potencial da tecnologia?</span>
        </h2>

        <div className="problem-cards">
          {stats.map((stat, i) => (
            <div
              key={stat.number}
              className="problem-card"
              data-gsap="problem-card"
              data-direction={i % 2 === 0 ? 'left' : 'right'}
            >
              <span className="problem-number">
                <span
                  className="problem-counter"
                  data-target={stat.number}
                >
                  {stat.number}
                </span>
                {stat.suffix}
              </span>
              <p className="problem-text">{stat.text}</p>
              <span className="problem-source">Fonte: {stat.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
