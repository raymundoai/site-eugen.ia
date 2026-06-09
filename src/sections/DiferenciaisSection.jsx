import './DiferenciaisSection.css'

const diferenciais = [
  {
    title: '10+ anos em gestão de processos',
    description: 'Diagnosticamos o que precisa ser automatizado antes de tocar em qualquer ferramenta.',
  },
  {
    title: '7 anos em operações de e-commerce',
    description: 'Falamos a língua de quem opera: CAC, LTV, conciliação, logística reversa, ERP.',
  },
  {
    title: 'Compliance nativo (LGPD + PL 2338/2023)',
    description: 'Logs auditáveis, dados no seu ambiente, identificação obrigatória do agente. Adequação hoje, não depois da lei.',
  },
  {
    title: 'Autonomia garantida',
    description: 'Você recebe documentação suficiente para implementar sozinho se quiser. Construímos dependência zero.',
  },
]

export default function DiferenciaisSection() {
  return (
    <section className="diferenciais section" data-gsap="diferenciais">
      <div className="container diferenciais-grid">
        <div className="diferenciais-headline" data-gsap="diferenciais-headline">
          <h2>
            O que nos diferencia não é a tecnologia.{' '}
            <span>É entender o seu processo.</span>
          </h2>
        </div>

        <div className="diferenciais-list">
          {diferenciais.map((diferencial) => (
            <div
              key={diferencial.title}
              className="diferencial-item"
              data-gsap="diferencial-item"
            >
              <h3 className="diferencial-title">{diferencial.title}</h3>
              <p className="diferencial-desc">{diferencial.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
