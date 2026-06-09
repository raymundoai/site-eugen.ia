import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './_PageShared.css'
import './_ConsultoriaTrainamento.css'

export default function Treinamento() {
  const modules = [
    {
      n: 'Módulo 1',
      title: 'O cenário atual',
      description: 'Como LLMs funcionam de verdade e o que isso significa para o time.',
    },
    {
      n: 'Módulo 2',
      title: 'Riscos e compliance',
      description:
        'Quais dados nunca devem sair da empresa. LGPD aplicada ao uso de IA. O que o PL 2338/2023 vai exigir.',
    },
    {
      n: 'Módulo 3',
      title: 'Uso produtivo',
      description: 'Engenharia de prompt aplicada às funções do time. Casos de uso por área.',
    },
    {
      n: 'Módulo 4',
      title: 'Política de IA',
      description: 'Como criar uma política simples e funcional. O que comunicar para o time.',
    },
  ]

  const deliverables = [
    'Guia de boas práticas (customizado)',
    'Template de política de IA mínima',
    'Lista de casos de uso validados',
    'Checklist do que nunca inserir em ferramentas externas',
  ]

  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag data-gsap="page-hero-item">Treinamento in-company</Tag>
          <h1 data-gsap="page-hero-item">
            Seu time já usa IA. <span>A questão é se usa bem.</span>
          </h1>
          <p className="page-hero-sub" data-gsap="page-hero-item">
            Workshop de 3-4 horas para times de até 20 pessoas. Uso responsável
            de ChatGPT e Claude, engenharia de prompt aplicada ao trabalho de
            vocês e política de IA para eliminar o Shadow AI.
          </p>
          <div className="page-hero-actions" data-gsap="page-hero-item">
            <Button
              href="https://wa.me/5551991275825"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Solicitar proposta →
            </Button>
          </div>
        </div>
      </section>

      <section className="section" data-gsap="page-section">
        <div className="container treinamento-problem">
          <h2>
            Shadow AI está acontecendo <span>na sua empresa agora</span>
          </h2>
          <p>
            47,4% dos profissionais usam ferramentas de IA sem aprovação — com
            dados da empresa, sem política, sem controle. Quando o PL 2338/2023
            for aprovado, isso vira passivo jurídico.
          </p>
        </div>
      </section>

      <section className="section" data-gsap="page-section">
        <div className="container">
          <h2 className="treinamento-heading">O que cobrimos</h2>
          <div className="treinamento-modules">
            {modules.map((module) => (
              <div key={module.n} className="treinamento-module">
                <span className="treinamento-module-n">{module.n}</span>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-gsap="page-section">
        <div className="container treinamento-deliverables">
          <h2>O que você leva</h2>
          <ul>
            {deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
          <div className="consultoria-preco">
            <span className="consultoria-preco-value">R$ 870 por turma</span>
          </div>
        </div>
      </section>

      <section className="section" data-gsap="page-section">
        <div className="container consultoria-cta">
          <h2>
            Transforme o uso de IA do seu time{' '}
            <span>de risco em vantagem competitiva.</span>
          </h2>
          <Button
            href="https://wa.me/5551991275825"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Solicitar proposta →
          </Button>
        </div>
      </section>
    </>
  )
}
