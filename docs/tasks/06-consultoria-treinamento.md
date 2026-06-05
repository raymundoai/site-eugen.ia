# Task 6 — Páginas /consultoria e /treinamento

Leia `plan.md` seções 8 e 9 para toda a copy antes de começar.

**Pré-requisito:** `src/pages/PageShared.css` já existe (criado na Task 2). Não o recrie — apenas importe-o nos componentes desta task.

---

## Página /consultoria

Arquivo: `src/pages/Consultoria.jsx`

Estrutura: Hero → O que é (2 sessões) → O que você leva → CTA.

```jsx
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
      {/* Hero */}
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

      {/* O que é */}
      <section className="section">
        <div className="container">
          <h2 className="consultoria-heading">A Consultoria 5D em dois momentos</h2>
          <div className="consultoria-sessions">
            {sessions.map((s, i) => (
              <div key={i} className="consultoria-session">
                <h3>{s.label}</h3>
                <ul>
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entregáveis */}
      <section className="section">
        <div className="container">
          <h2 className="consultoria-heading">O que você leva ao final</h2>
          <ul className="consultoria-deliverables">
            {deliverables.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <div className="consultoria-preco">
            <span className="consultoria-preco-value">R$ 800–900</span>
            <span className="consultoria-preco-note">
              Abatível do projeto de execução se avançar.
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
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
```

---

## Página /treinamento

Arquivo: `src/pages/Treinamento.jsx`

Estrutura: Hero → O problema (Shadow AI) → Conteúdo (4 módulos) → Entregáveis → CTA.

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './PageShared.css'
import './ConsultoriaTrainamento.css'

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
      description: 'Quais dados nunca devem sair da empresa. LGPD aplicada ao uso de IA. O que o PL 2338/2023 vai exigir.',
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
      {/* Hero */}
      <section className="page-hero section">
        <div className="container">
          <Tag>Treinamento in-company</Tag>
          <h1>
            Seu time já usa IA.{' '}
            <span>A questão é se usa bem.</span>
          </h1>
          <p className="page-hero-sub">
            Workshop de 3-4 horas para times de até 20 pessoas. Uso responsável
            de ChatGPT e Claude, engenharia de prompt aplicada ao trabalho de
            vocês e política de IA para eliminar o Shadow AI.
          </p>
          <div className="page-hero-actions">
            <Button
              href="https://wa.me/5551991129452"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Solicitar proposta →
            </Button>
          </div>
        </div>
      </section>

      {/* Shadow AI */}
      <section className="section">
        <div className="container treinamento-problem">
          <h2>
            Shadow AI está acontecendo{' '}
            <span>na sua empresa agora</span>
          </h2>
          <p>
            47,4% dos profissionais usam ferramentas de IA sem aprovação —
            com dados da empresa, sem política, sem controle. Quando o
            PL 2338/2023 for aprovado, isso vira passivo jurídico.
          </p>
        </div>
      </section>

      {/* Módulos */}
      <section className="section">
        <div className="container">
          <h2 className="treinamento-heading">O que cobrimos</h2>
          <div className="treinamento-modules">
            {modules.map((m, i) => (
              <div key={i} className="treinamento-module">
                <span className="treinamento-module-n">{m.n}</span>
                <h3>{m.title}</h3>
                <p>{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entregáveis */}
      <section className="section">
        <div className="container treinamento-deliverables">
          <h2>O que você leva</h2>
          <ul>
            {deliverables.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <div className="consultoria-preco">
            <span className="consultoria-preco-value">R$ 800–900 por turma</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container consultoria-cta">
          <h2>
            Transforme o uso de IA do seu time{' '}
            <span>de risco em vantagem competitiva.</span>
          </h2>
          <Button
            href="https://wa.me/5551991129452"
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
```

---

## CSS específico de Consultoria e Treinamento

Crie `src/pages/ConsultoriaTrainamento.css` com os estilos específicos destas duas páginas. Importe-o em ambos os componentes junto com `./PageShared.css`.

```css
/* src/pages/ConsultoriaTrainamento.css */

/* Consultoria específico */
.consultoria-heading {
  font-size: clamp(var(--font-size-2xl), 3.5vw, var(--font-size-3xl));
  font-weight: 700;
  margin-bottom: var(--space-8);
  max-width: 640px;
}

.consultoria-sessions {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 640px;
}

.consultoria-session {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.consultoria-session h3 {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--primary);
  margin-bottom: var(--space-4);
}

.consultoria-session ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.consultoria-session li {
  color: var(--muted);
  font-size: var(--font-size-sm);
  padding-left: var(--space-4);
  position: relative;
}

.consultoria-session li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--line);
}

.consultoria-deliverables {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 480px;
}

.consultoria-deliverables li {
  color: var(--muted);
  font-size: var(--font-size-base);
  padding-left: var(--space-6);
  position: relative;
}

.consultoria-deliverables li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 700;
}

/* Treinamento específico */
.treinamento-problem {
  max-width: 640px;
}

.treinamento-problem h2 {
  font-size: clamp(var(--font-size-2xl), 3.5vw, var(--font-size-3xl));
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: var(--space-6);
}

.treinamento-problem h2 span {
  color: var(--primary);
}

.treinamento-problem p {
  color: var(--muted);
  font-size: var(--font-size-lg);
  line-height: 1.7;
}

.treinamento-heading {
  font-size: clamp(var(--font-size-2xl), 3.5vw, var(--font-size-3xl));
  font-weight: 700;
  margin-bottom: var(--space-8);
}

.treinamento-modules {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.treinamento-module {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.treinamento-module-n {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.treinamento-module h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.treinamento-module p {
  color: var(--muted);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

.treinamento-deliverables {
  max-width: 480px;
}

.treinamento-deliverables h2 {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--space-6);
}

.treinamento-deliverables ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.treinamento-deliverables li {
  color: var(--muted);
  font-size: var(--font-size-base);
  padding-left: var(--space-6);
  position: relative;
}

.treinamento-deliverables li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--primary);
}

@media (max-width: 768px) {
  .treinamento-modules {
    grid-template-columns: 1fr;
  }
}
```

---

## Verificação

- Rotas `/consultoria` e `/treinamento` renderizam sem erros
- Copy bate com `plan.md` seções 8 e 9
- Responsivo em 375px
