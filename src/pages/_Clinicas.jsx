import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './_Clinicas.css'

export default function Clinicas() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero section clinicas-hero">
        <div className="container">
          <Tag data-gsap="page-hero-item">Produto fixo — Agendamento com IA</Tag>
          <h1 data-gsap="page-hero-item">
            Sua clínica perdendo clientes{' '}
            <span>fora do horário comercial?</span>
          </h1>
          <p className="page-hero-sub" data-gsap="page-hero-item">
            Agente de IA que atende em 3 segundos, consulta a agenda dos seus
            profissionais e fecha o agendamento sozinho. 24 horas por dia,
            7 dias por semana.
          </p>
          <div className="page-hero-actions" data-gsap="page-hero-item">
            <Button
              href="https://wa.me/5551991275825"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Testar agora
            </Button>
            <Button href="#preco" variant="secondary" size="lg">
              Ver preço e detalhes ↓
            </Button>
          </div>
        </div>
      </section>

      {/* Demonstração */}
      <section className="section" data-gsap="page-section">
        <div className="container clinicas-demo">
          <h2>Veja funcionando antes de decidir</h2>
          <p>
            Mande uma mensagem para o número abaixo dizendo:{' '}
            <em>"Quero agendar uma avaliação para essa semana"</em>
          </p>
          <div className="clinicas-demo-box">
            <p className="clinicas-demo-label">Número do agente demo</p>
            <a
              href="https://wa.me/5551991275825"
              target="_blank"
              rel="noopener noreferrer"
              className="clinicas-demo-number"
            >
              (51) 99127-5825
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section" data-gsap="page-section">
        <div className="container">
          <Tag>Como funciona</Tag>
          <div className="clinicas-steps">
            {[
              { n: '01', text: 'O cliente envia mensagem no WhatsApp' },
              { n: '02', text: 'O agente consulta a agenda em tempo real' },
              { n: '03', text: 'O agendamento é confirmado automaticamente' },
            ].map(step => (
              <div key={step.n} className="clinicas-step">
                <span className="clinicas-step-n">{step.n}</span>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
          <p className="clinicas-steps-note">
            Entende áudio. Entende imagem. Não deixa cliente sem resposta.
          </p>
        </div>
      </section>

      {/* Preço */}
      <section id="preco" className="section" data-gsap="page-section">
        <div className="container clinicas-preco">
          <div className="clinicas-preco-card">
            <h2>O que está incluso</h2>
            <div className="clinicas-preco-values">
              <div>
                <span className="clinicas-preco-label">Setup completo</span>
                <span className="clinicas-preco-value">R$ 1.400</span>
              </div>
              <div>
                <span className="clinicas-preco-label">Manutenção mensal</span>
                <span className="clinicas-preco-value">R$ 350<small>/mês</small></span>
              </div>
            </div>
            <ul className="clinicas-include-list">
              <li>Configuração e onboarding</li>
              <li>Integração com Google Agenda</li>
              <li>30 dias de suporte</li>
              <li>Ajustes de prompt</li>
            </ul>
            <p className="clinicas-guarantee">
              Garantia de 7 dias ou devolvemos o valor.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section" data-gsap="page-section">
        <div className="container clinicas-compliance">
          <h3>Seguro, rastreável e adequado à LGPD</h3>
          <ul className="clinicas-compliance-list">
            <li>Agente se identifica como IA na primeira mensagem</li>
            <li>Dados do paciente ficam no seu ambiente</li>
            <li>Opção de falar com humano sempre disponível</li>
            <li>Mídias processadas e descartadas imediatamente</li>
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="section" data-gsap="page-section">
        <div className="container clinicas-cta">
          <h2>Pronto para atender enquanto você dorme?</h2>
          <Button
            href="https://wa.me/5551991275825"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Falar com a Eugênia →
          </Button>
          <p>Setup em até 2 dias úteis após preenchimento do formulário de onboarding.</p>
        </div>
      </section>
    </>
  )
}
