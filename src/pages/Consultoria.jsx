import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './PageShared.css'
import './ConsultoriaTrainamento.css'

export default function Consultoria() {
  const deliverables = [
    'Problem Statement Canvas',
    'SIPOC do processo atual',
    'Fluxogramas da solução proposta',
    'Arquitetura com stack e custos',
    'Estimativa de esforço para implementação',
    'MoSCoW da v1',
    'DoD assinado',
    'Métricas de sucesso definidas',
  ]

  const sessions = [
    {
      label: 'Sessão 1 — D1 Diagnóstico (com você, ~1h30)',
      items: [
        'Mapeamento do processo atual (SIPOC)',
        'Identificação da causa raiz (5 Porquês)',
        'Definição precisa do problema',
      ],
    },
    {
      label: 'Trabalho solo — D2 Desenho',
      items: [
        'Arquitetura da solução',
        'Fluxogramas',
        'Stack recomendada com custo de infraestrutura',
      ],
    },
    {
      label: 'Sessão 2 — D3 Decisão (com você, ~1h30)',
      items: [
        'Apresentação da solução',
        'Definição de escopo (MoSCoW)',
        'Critério de aceite (DoD)',
        'Métricas de sucesso',
      ],
    },
  ]

  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag>Consultoria estratégica</Tag>
          <h1>Clareza antes de qualquer ferramenta.</h1>
          <p className="page-hero-sub">
            Mapeamos o problema, desenhamos a solução e fechamos o escopo antes
            de desenvolver. Você sai com material suficiente para implementar
            sozinho, se quiser.
          </p>
          <div className="page-hero-actions">
            <Button
              href="https://wa.me/5551991129452"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Agendar Pré-Diagnóstico gratuito →
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="consultoria-heading">A Consultoria 5D em dois momentos</h2>
          <div className="consultoria-sessions">
            {sessions.map((session) => (
              <div key={session.label} className="consultoria-session">
                <h3>{session.label}</h3>
                <ul>
                  {session.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="consultoria-heading">O que você leva ao final</h2>
          <ul className="consultoria-deliverables">
            {deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
          <div className="consultoria-preco">
            <span className="consultoria-preco-value">R$ 800–900</span>
            <span className="consultoria-preco-note">
              Abatível do projeto de execução se avançar.
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container consultoria-cta">
          <h2>Comece pelo Pré-Diagnóstico gratuito</h2>
          <p>
            30-45 minutos. Saímos com um caminho claro — ou a honestidade de
            que não é o momento.
          </p>
          <Button
            href="https://wa.me/5551991129452"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Agendar agora →
          </Button>
        </div>
      </section>
    </>
  )
}
