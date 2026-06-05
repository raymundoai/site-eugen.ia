# Task 5 — Página /clinicas

Você está construindo a landing page do produto "Agente de Agendamento" da Eugen.IA. Leia `plan.md` seção 7 para toda a copy antes de começar.

Estrutura da página: Hero → Demonstração → Como funciona → O que está incluso → Compliance → CTA final.

Arquivo: `src/pages/Clinicas.jsx`

---

## `src/pages/Clinicas.jsx`

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './Clinicas.css'

export default function Clinicas() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero section clinicas-hero">
        <div className="container">
          <Tag>Produto fixo — Agendamento com IA</Tag>
          <h1>
            Sua clínica perdendo clientes{' '}
            <span>fora do horário comercial?</span>
          </h1>
          <p className="page-hero-sub">
            Agente de IA que atende em 3 segundos, consulta a agenda dos seus
            profissionais e fecha o agendamento sozinho. 24 horas por dia,
            7 dias por semana.
          </p>
          <div className="page-hero-actions">
            <Button
              href="https://wa.me/5551991129452"
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
      <section className="section">
        <div className="container clinicas-demo">
          <h2>Veja funcionando antes de decidir</h2>
          <p>
            Mande uma mensagem para o número abaixo dizendo:{' '}
            <em>"Quero agendar uma avaliação para essa semana"</em>
          </p>
          <div className="clinicas-demo-box">
            <p className="clinicas-demo-label">Número do agente demo</p>
            <a
              href="https://wa.me/5551991129452"
              target="_blank"
              rel="noopener noreferrer"
              className="clinicas-demo-number"
            >
              (51) 99112-9452
            </a>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section">
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
      <section id="preco" className="section">
        <div className="container clinicas-preco">
          <div className="clinicas-preco-card">
            <h2>O que está incluso</h2>
            <div className="clinicas-preco-values">
              <div>
                <span className="clinicas-preco-label">Setup completo</span>
                <span className="clinicas-preco-value">R$ 1.200</span>
              </div>
              <div>
                <span className="clinicas-preco-label">Manutenção mensal</span>
                <span className="clinicas-preco-value">R$ 200<small>/mês</small></span>
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
      <section className="section">
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
      <section className="section">
        <div className="container clinicas-cta">
          <h2>Pronto para atender enquanto você dorme?</h2>
          <Button
            href="https://wa.me/5551991129452"
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
```

---

## `src/pages/Clinicas.css`

```css
.page-hero {
  padding-top: calc(var(--header-height) + var(--space-20));
}

.page-hero h1 {
  font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
  font-weight: 700;
  line-height: 1.15;
  margin-top: var(--space-4);
  max-width: 720px;
}

.clinicas-hero h1 span {
  color: var(--muted);
}

.page-hero-sub {
  font-size: var(--font-size-lg);
  color: var(--muted);
  max-width: 560px;
  line-height: 1.7;
  margin-top: var(--space-4);
}

.page-hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-top: var(--space-8);
}

/* Demo */
.clinicas-demo {
  max-width: 640px;
  text-align: center;
}

.clinicas-demo h2 {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.clinicas-demo p {
  color: var(--muted);
  margin-bottom: var(--space-8);
}

.clinicas-demo-box {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.clinicas-demo-label {
  font-size: var(--font-size-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.clinicas-demo-number {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--primary);
}

/* Steps */
.clinicas-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-8);
  max-width: 560px;
}

.clinicas-step {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-6);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
}

.clinicas-step-n {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--primary);
  flex-shrink: 0;
}

.clinicas-steps-note {
  margin-top: var(--space-6);
  color: var(--muted);
  font-style: italic;
}

/* Preço */
.clinicas-preco-card {
  background: var(--surface);
  border: 1px solid var(--primary);
  border-radius: var(--radius-lg);
  padding: var(--space-12);
  max-width: 560px;
}

.clinicas-preco-card h2 {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-8);
}

.clinicas-preco-values {
  display: flex;
  gap: var(--space-12);
  margin-bottom: var(--space-8);
}

.clinicas-preco-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-2);
}

.clinicas-preco-value {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--primary);
}

.clinicas-preco-value small {
  font-size: var(--font-size-base);
  color: var(--muted);
}

.clinicas-include-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.clinicas-include-list li::before {
  content: '✓ ';
  color: var(--primary);
  font-weight: 700;
}

.clinicas-guarantee {
  font-size: var(--font-size-sm);
  color: var(--muted);
  border-top: 1px solid var(--line);
  padding-top: var(--space-4);
  margin-top: var(--space-4);
}

/* Compliance */
.clinicas-compliance h3 {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
  max-width: 480px;
}

.clinicas-compliance-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 480px;
}

.clinicas-compliance-list li::before {
  content: '— ';
  color: var(--primary);
}

/* CTA */
.clinicas-cta {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.clinicas-cta h2 {
  font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
  font-weight: 700;
  max-width: 560px;
}

.clinicas-cta p {
  color: var(--muted);
  font-size: var(--font-size-sm);
}
```

---

## Verificação

- Rota `/clinicas` renderiza todas as seções
- Copy bate com `plan.md` seção 7
- Responsivo em 375px
