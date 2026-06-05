# Task 7 — Páginas /teste, /faq e /contato

Leia `plan.md` seções 10, 11 e 12 para a copy antes de começar.

---

## Página /teste

Arquivo: `src/pages/Teste.jsx`

Estrutura: Hero → O que você recebe (3 itens) → Formulário embed → Rodapé da seção.

O Google Forms URL não está especificado no plan.md. Use um placeholder `GOOGLE_FORMS_URL` no src do iframe e adicione um comentário `// TODO: substituir pela URL real do formulário`.

```jsx
import Tag from '../components/ui/Tag.jsx'
import './PageShared.css'
import './Teste.css'

// TODO: substituir pela URL real do formulário
const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/PLACEHOLDER/viewform?embedded=true'

export default function Teste() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero section">
        <div className="container">
          <Tag>Diagnóstico gratuito</Tag>
          <h1>
            Descubra o nível de maturidade{' '}
            <span>em IA da sua operação.</span>
          </h1>
          <p className="page-hero-sub">
            10 perguntas. 3 minutos. Você recebe um relatório com seu score de
            maturidade e as 3 maiores oportunidades de automação identificadas
            para o seu negócio. Resultado em até 24 horas por e-mail.
          </p>
        </div>
      </section>

      {/* O que você recebe */}
      <section className="section">
        <div className="container">
          <div className="teste-outcomes">
            {[
              {
                title: 'Score de maturidade de 1 a 5',
                desc: 'com análise do seu perfil',
              },
              {
                title: '3 oportunidades de automação',
                desc: 'com estimativa de impacto',
              },
              {
                title: 'Contexto regulatório',
                desc: 'aplicado ao seu segmento',
              },
            ].map((item, i) => (
              <div key={i} className="teste-outcome">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="section">
        <div className="container teste-form-container">
          <iframe
            src={GOOGLE_FORMS_URL}
            title="Teste de Maturidade em IA"
            className="teste-form"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Carregando…
          </iframe>
        </div>
      </section>

      {/* Rodapé */}
      <section className="section">
        <div className="container teste-footer-note">
          <p>
            Após receber o relatório, você pode agendar o Pré-Diagnóstico
            gratuito para aprofundar qualquer oportunidade identificada.
          </p>
        </div>
      </section>
    </>
  )
}
```

### `src/pages/Teste.css`

```css
.teste-outcomes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  max-width: 800px;
}

.teste-outcome {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

.teste-outcome h3 {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--primary);
  margin-bottom: var(--space-2);
}

.teste-outcome p {
  color: var(--muted);
  font-size: var(--font-size-sm);
}

.teste-form-container {
  max-width: 720px;
}

.teste-form {
  width: 100%;
  min-height: 800px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  background: var(--surface);
}

.teste-footer-note {
  max-width: 560px;
}

.teste-footer-note p {
  color: var(--muted);
  font-size: var(--font-size-base);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .teste-outcomes {
    grid-template-columns: 1fr;
  }
}
```

---

## Página /faq

Arquivo: `src/pages/Faq.jsx`

11 perguntas: 8 preservadas + 3 novas. Copy exata do `plan.md` seção 11. As respostas que não estão no plan.md devem ser elaboradas de forma coerente com o tom do site (profissional, direto, sem jargão).

```jsx
import { Helmet } from 'react-helmet-async'
import Tag from '../components/ui/Tag.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import './PageShared.css'
import './Faq.css'

const faqItems = [
  {
    question: 'Quem é a Eugen.IA?',
    answer: 'Somos uma empresa especializada em automação de processos e desenvolvimento de Agentes de IA para PMEs e e-commerces. Combinamos mais de 10 anos em gestão de processos com expertise em IA aplicada ao negócio.',
  },
  {
    question: 'Qual o investimento?',
    answer: 'Depende do escopo. A Consultoria 5D custa R$ 800–900 e é abatível do projeto de execução. O Agente de Agendamento tem setup de R$ 1.200 + R$ 200/mês de manutenção. O Treinamento in-company custa R$ 800–900 por turma. Projetos de automação e agentes customizados são orçados após o diagnóstico.',
  },
  {
    question: 'IA substitui minha equipe?',
    answer: 'Não. IA automatiza tarefas repetitivas e de baixo valor, devolvendo tempo para que sua equipe foque em decisão, relacionamento e crescimento. Nosso objetivo é aumentar a capacidade da equipe, não substituí-la.',
  },
  {
    question: 'Não vou perder o controle ao automatizar processos?',
    answer: 'Pelo contrário. Processos automatizados são rastreáveis, auditáveis e previsíveis. Você tem visibilidade sobre cada etapa. Construímos com logs auditáveis e dados no seu ambiente.',
  },
  {
    question: 'E se não tenho tempo agora para implementar uma coisa nova?',
    answer: 'Começamos pelo Pré-Diagnóstico de 30-45 minutos, sem compromisso. Se não for o momento certo, saímos com clareza sobre quando e como fazer. Não forçamos implementação fora do tempo da empresa.',
  },
  {
    question: 'Minha operação é muito específica. Existe solução pronta para o que eu tenho?',
    answer: 'Não trabalhamos com soluções prontas. Cada projeto começa com um diagnóstico da sua operação. Se a IA faz sentido para o seu contexto específico, desenhamos a solução para o seu processo — não o contrário.',
  },
  {
    question: 'Já investi em tecnologia antes e não tive retorno. Por que seria diferente aqui?',
    answer: 'Porque começamos pelo diagnóstico, não pela ferramenta. A maioria dos projetos fracassa porque a tecnologia foi implementada sem entender o processo. O Método 5D garante que o escopo seja fechado com critério de aceite claro antes de qualquer desenvolvimento.',
  },
  {
    question: 'Minha empresa não tem equipe técnica. Conseguimos usar o que vocês constroem?',
    answer: 'Sim. Entregamos documentação completa, treinamento da equipe e 30 dias de suporte pós-deploy. Construímos para autonomia — você recebe material suficiente para operar e, se quiser, implementar melhorias sozinho.',
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Operamos com compliance nativo à LGPD. Seus dados ficam no seu ambiente — não em plataformas de terceiros sem contrato. Os agentes se identificam como IA na primeira mensagem. Seguimos os princípios do PL 2338/2023 desde a arquitetura.',
  },
  {
    question: 'O que acontece se eu não quiser contratar a execução após a consultoria?',
    answer: 'Você fica com todos os entregáveis: fluxogramas, arquitetura, stack recomendada, estimativa de esforço e escopo fechado. Material suficiente para implementar sozinho ou contratar outro fornecedor. Não cobramos consultoria condicionada à execução.',
  },
  {
    question: 'Vocês atendem fora do Rio Grande do Sul?',
    answer: 'Sim, 100% remoto para todo o Brasil.',
  },
]

export default function Faq() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag>Perguntas frequentes</Tag>
          <h1>Tudo que você precisa saber</h1>
        </div>
      </section>

      <section className="section">
        <div className="container faq-body">
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
```

### `src/pages/Faq.css`

```css
.faq-body {
  max-width: 720px;
}
```

---

## Página /contato

Arquivo: `src/pages/Contato.jsx`

Copy mínima. O único ajuste do plan.md: "agenda o Pré-Diagnóstico gratuito" (não "diagnóstico gratuito").

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './PageShared.css'
import './Contato.css'

export default function Contato() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag>Contato</Tag>
          <h1>
            Fale com a Eugênia.{' '}
            <span>Sem formulário. Sem espera.</span>
          </h1>
          <p className="page-hero-sub">
            Clique no botão abaixo e agenda o Pré-Diagnóstico gratuito com
            nosso time. Sem compromisso.
          </p>
          <div className="page-hero-actions">
            <Button
              href="https://wa.me/5551991129452"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Falar com a Eugênia →
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container contato-info">
          <div className="contato-item">
            <span className="contato-label">E-mail</span>
            <a href="mailto:contato@eugenia.ia.br">contato@eugenia.ia.br</a>
          </div>
          <div className="contato-item">
            <span className="contato-label">WhatsApp</span>
            <a href="https://wa.me/5551991129452" target="_blank" rel="noopener noreferrer">
              (51) 99112-9452
            </a>
          </div>
          <div className="contato-item">
            <span className="contato-label">Atendimento</span>
            <span>100% remoto · todo o Brasil</span>
          </div>
        </div>
      </section>
    </>
  )
}
```

### `src/pages/Contato.css`

```css
.contato-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 400px;
}

.contato-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--line);
}

.contato-item:last-child {
  border-bottom: none;
}

.contato-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.contato-item a,
.contato-item span:last-child {
  font-size: var(--font-size-lg);
  color: var(--foreground);
  transition: color 0.2s;
}

.contato-item a:hover {
  color: var(--primary);
}
```

---

## Verificação

- Rotas `/teste`, `/faq` e `/contato` renderizam sem erros
- `/faq` exibe 11 perguntas com accordion funcional
- `/teste` tem o iframe do Google Forms (com placeholder no src)
- `/contato` diz "Pré-Diagnóstico gratuito" (não "diagnóstico gratuito")
