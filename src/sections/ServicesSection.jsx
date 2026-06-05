import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './ServicesSection.css'

const services = [
  {
    number: '01',
    title: 'Agente de Agendamento',
    subtitle: 'Sua clínica atendendo 24h por dia.',
    description: 'Agente de IA conectado ao WhatsApp e à agenda dos seus profissionais. Agenda, confirma e gerencia sem intervenção humana.',
    link: '/clinicas',
    linkLabel: 'Conhecer o produto →',
  },
  {
    number: '02',
    title: 'Consultoria e Treinamento',
    subtitle: 'Clareza antes de qualquer ferramenta.',
    description: 'Mapeamos os gargalos reais da sua operação, definimos prioridades e capacitamos a sua equipe para operar com IA.',
    link: '/consultoria',
    linkLabel: 'Ver a metodologia →',
  },
  {
    number: '03',
    title: 'Automação de Processos',
    subtitle: 'Processos que rodam sozinhos.',
    description: 'Horas devolvidas para decisão, relacionamento e crescimento. Sua equipe para de apagar incêndios e começa a evoluir.',
    link: null,
  },
  {
    number: '04',
    title: 'Agentes de IA',
    subtitle: 'Sua operação, aumentada por IA.',
    description: 'Agentes personalizados, conectados ao seu stack, executando tarefas de forma autônoma, segura e rastreável.',
    link: null,
  },
  {
    number: '05',
    title: 'Treinamento em IA',
    subtitle: 'Seu time usando IA com método.',
    description: 'Workshop fechado por empresa: uso responsável, engenharia de prompt e política de IA para eliminar o Shadow AI da sua operação.',
    link: '/treinamento',
    linkLabel: 'Saiba mais →',
  },
]

export default function ServicesSection() {
  return (
    <section className="services section">
      <div className="container">
        <Tag>O que fazemos</Tag>
        <h2 className="services-heading">
          Mostramos o caminho mais rápido para sua empresa{' '}
          <span>inovar e crescer com Inteligência Artificial.</span>
        </h2>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.number} className="service-card">
              <span className="service-number">{service.number}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-subtitle">{service.subtitle}</p>
              <p className="service-description">{service.description}</p>
              {service.link && (
                <Button href={service.link} variant="ghost" size="sm">
                  {service.linkLabel}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
