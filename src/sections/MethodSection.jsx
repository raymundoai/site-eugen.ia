import Tag from '../components/ui/Tag.jsx'
import './MethodSection.css'

const steps = [
  {
    id: 'D1',
    title: 'Diagnóstico',
    description: 'Mapeamos e diagnosticamos os principais desafios e gargalos da sua operação.',
  },
  {
    id: 'D2',
    title: 'Desenho',
    description: 'Projetamos a arquitetura da solução antes de qualquer linha de código.',
  },
  {
    id: 'D3',
    title: 'Decisão',
    description: 'Fechamos o escopo com critérios claros de entrega. Nenhum desenvolvimento começa sem alinhamento total.',
  },
  {
    id: 'D4',
    title: 'Desenvolvimento',
    description: 'Construímos em tempo recorde — 7 a 15 dias — exatamente o que foi decidido, sem desvios.',
  },
  {
    id: 'D5',
    title: 'Deploy',
    description: 'Implementamos, validamos em produção e acompanhamos até o resultado estar entregue.',
  },
]

export default function MethodSection() {
  return (
    <section className="method section">
      <div className="container">
        <Tag>Como fazemos</Tag>
        <h2 className="method-heading">O Método 5D</h2>

        <div className="method-steps">
          {steps.map((step) => (
            <div key={step.id} className="method-step">
              <span className="method-step-id">{step.id}</span>
              <div className="method-step-body">
                <h3 className="method-step-title">{step.title}</h3>
                <p className="method-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="method-footer">
          Com o Método Eugen.IA, garantimos resultado visível no primeiro mês.
        </p>
      </div>
    </section>
  )
}
