# Task 4 — Seções da Home

Você está construindo as 7 seções da home do site da Eugen.IA. Leia o `plan.md` seção 6 para toda a copy antes de começar. **Não invente copy — use exatamente o que está no plan.md.**

Fase 1: sem animações complexas. As seções devem ter layout correto e copy fiel. Animações (canvas, scroll horizontal, parallax, stacks) ficam para a Fase 2.

Todas as seções ficam em `src/sections/`. A Home monta tudo em `src/pages/Home.jsx`.

---

## 1. HeroSection

### `src/sections/HeroSection.jsx`

```jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './HeroSection.css'

export default function HeroSection() {
  return (
    <section className="hero section">
      <div className="container hero-grid">

        <div className="hero-copy">
          <Tag>Automação de processos &amp; Agentes IA</Tag>

          <h1>
            Mapeamos seus processos e desenvolvemos{' '}
            <strong>Agentes de IA sob medida</strong> para sua empresa
          </h1>

          <div className="hero-actions">
            <Button
              href="https://wa.me/5551991129452"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
            >
              Agendar Pré-Diagnóstico gratuito
            </Button>
            <Button href="/teste" variant="secondary" size="lg">
              Fazer o Teste de Maturidade
            </Button>
          </div>
        </div>

        {/* Placeholder visual — será substituído por canvas na Fase 2 */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-placeholder" />
        </div>

      </div>

      {/* Barra de contexto */}
      <div className="container hero-context-bar">
        <span>100% remoto · todo o Brasil</span>
        <span className="hero-context-divider" />
        <span>Atendimento personalizado</span>
        <span className="hero-context-divider" />
        <span>Compliance LGPD nativo</span>
      </div>
    </section>
  )
}
```

### `src/sections/HeroSection.css`

```css
.hero {
  padding-top: calc(var(--header-height) + var(--space-16));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 55fr 45fr;
  gap: var(--space-12);
  align-items: center;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero-copy h1 {
  font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
  font-weight: 700;
  line-height: 1.15;
  color: var(--foreground);
}

.hero-copy h1 strong {
  color: var(--primary);
  font-weight: 700;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

/* Placeholder visual (Fase 2 vai ter canvas aqui) */
.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-visual-placeholder {
  width: 100%;
  aspect-ratio: 1;
  max-width: 480px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--line);
  opacity: 0.4;
}

/* Barra de contexto */
.hero-context-bar {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding-block: var(--space-6);
  margin-top: var(--space-16);
  border-top: 1px solid var(--line);
  font-size: var(--font-size-sm);
  color: var(--muted);
  flex-wrap: wrap;
}

.hero-context-divider {
  width: 1px;
  height: 16px;
  background: var(--line);
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    display: none;
  }

  .hero-context-bar {
    gap: var(--space-4);
  }

  .hero-context-divider {
    display: none;
  }
}
```

---

## 2. ProblemSection

Copy do `plan.md` seção 6 → "Seção 2 — Problema".

```jsx
// src/sections/ProblemSection.jsx
import Tag from '../components/ui/Tag.jsx'
import './ProblemSection.css'

const stats = [
  {
    number: '72%',
    text: 'das empresas brasileiras estão nos estágios iniciante ou experimental de adoção da IA',
    source: 'Abiacom + Brazil Panels + Líderes.ai — pesquisa com 200 empresas, out/nov 2025',
  },
  {
    number: '70%',
    text: 'dos profissionais reconhecem atividades em seu dia a dia que poderiam ser automatizadas por IA, mas não sabem como fazer',
    source: 'Abiacom, out/nov 2025',
  },
  {
    number: '47,4%',
    text: 'dos profissionais utilizam ferramentas de IA sem aprovação oficial — o chamado Shadow AI',
    source: 'Abiacom, out/nov 2025 — via Exame',
  },
  {
    number: '95%',
    text: 'das organizações que adotaram IA ainda não conseguiram ter ROI visível nos projetos de implementação',
    source: 'TEC.Institute / MIT Technology Review Brasil',
  },
]

export default function ProblemSection() {
  return (
    <section className="problem section">
      <div className="container">
        <h2 className="problem-heading">
          Você sabe que IA é importante{' '}
          <span>mas não sabe como aproveitar todo o potencial da tecnologia?</span>
        </h2>

        <div className="problem-cards">
          {stats.map((stat, i) => (
            <div key={i} className="problem-card">
              <span className="problem-number">{stat.number}</span>
              <p className="problem-text">{stat.text}</p>
              <span className="problem-source">Fonte: {stat.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

```css
/* src/sections/ProblemSection.css */
.problem-heading {
  font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
  font-weight: 700;
  line-height: 1.2;
  max-width: 720px;
  margin-bottom: var(--space-16);
}

.problem-heading span {
  color: var(--muted);
}

.problem-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.problem-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.problem-number {
  font-size: clamp(var(--font-size-4xl), 6vw, 4.5rem);
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.problem-text {
  color: var(--foreground);
  font-size: var(--font-size-base);
  line-height: 1.6;
}

.problem-source {
  font-size: var(--font-size-xs);
  color: var(--muted);
  margin-top: auto;
}

@media (max-width: 768px) {
  .problem-cards {
    grid-template-columns: 1fr;
  }
}
```

---

## 3. ServicesSection

Copy do `plan.md` seção 6 → "Seção 3 — Serviços". 5 cards. Fase 1: layout de grid simples (sem GSAP horizontal).

```jsx
// src/sections/ServicesSection.jsx
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
          {services.map((s) => (
            <div key={s.number} className="service-card">
              <span className="service-number">{s.number}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-subtitle">{s.subtitle}</p>
              <p className="service-description">{s.description}</p>
              {s.link && (
                <Button href={s.link} variant="ghost" size="sm">
                  {s.linkLabel}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

```css
/* src/sections/ServicesSection.css */
.services-heading {
  font-size: clamp(var(--font-size-2xl), 3.5vw, var(--font-size-3xl));
  font-weight: 700;
  line-height: 1.25;
  max-width: 640px;
  margin-top: var(--space-4);
  margin-bottom: var(--space-16);
}

.services-heading span {
  color: var(--muted);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.service-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: border-color 0.2s;
}

.service-card:hover {
  border-color: var(--primary);
}

.service-number {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 0.1em;
}

.service-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--foreground);
}

.service-subtitle {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--primary);
}

.service-description {
  font-size: var(--font-size-sm);
  color: var(--muted);
  line-height: 1.7;
  flex: 1;
}

@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 4. MethodSection

Copy do `plan.md` seção 6 → "Seção 4 — O Método 5D". Fase 1: layout vertical simples.

```jsx
// src/sections/MethodSection.jsx
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
```

```css
/* src/sections/MethodSection.css */
.method-heading {
  font-size: clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl));
  font-weight: 700;
  margin-top: var(--space-4);
  margin-bottom: var(--space-16);
}

.method-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.method-step {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: var(--space-6);
  padding: var(--space-8);
  border-bottom: 1px solid var(--line);
  align-items: start;
  background: var(--surface);
  transition: background 0.2s;
}

.method-step:last-child {
  border-bottom: none;
}

.method-step:hover {
  background: var(--surface-soft);
}

.method-step-id {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
  padding-top: 4px;
}

.method-step-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: var(--space-2);
}

.method-step-desc {
  color: var(--muted);
  font-size: var(--font-size-base);
  line-height: 1.7;
}

.method-footer {
  margin-top: var(--space-8);
  color: var(--muted);
  font-size: var(--font-size-base);
  font-style: italic;
}

@media (max-width: 640px) {
  .method-step {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}
```

---

## 5. DiferenciaisSection (NOVA)

Copy do `plan.md` seção 5 (Diferenciais). Fase 1: duas colunas sem parallax.

```jsx
// src/sections/DiferenciaisSection.jsx
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
    <section className="diferenciais section">
      <div className="container diferenciais-grid">

        <div className="diferenciais-headline">
          <h2>
            O que nos diferencia não é a tecnologia.{' '}
            <span>É entender o seu processo.</span>
          </h2>
        </div>

        <div className="diferenciais-list">
          {diferenciais.map((d, i) => (
            <div key={i} className="diferencial-item">
              <h3 className="diferencial-title">{d.title}</h3>
              <p className="diferencial-desc">{d.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
```

```css
/* src/sections/DiferenciaisSection.css */
.diferenciais-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}

.diferenciais-headline h2 {
  font-size: clamp(var(--font-size-2xl), 3.5vw, var(--font-size-4xl));
  font-weight: 700;
  line-height: 1.2;
  position: sticky;
  top: calc(var(--header-height) + var(--space-8));
}

.diferenciais-headline h2 span {
  color: var(--primary);
}

.diferenciais-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.diferencial-item {
  padding-top: var(--space-8);
  border-top: 1px solid var(--line);
}

.diferencial-title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--foreground);
  margin-bottom: var(--space-3);
}

.diferencial-desc {
  color: var(--muted);
  font-size: var(--font-size-base);
  line-height: 1.7;
}

@media (max-width: 768px) {
  .diferenciais-grid {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }

  .diferenciais-headline h2 {
    position: static;
  }
}
```

---

## 6. FaqPreviewSection

4 perguntas + link para `/faq`. Copy completa do FAQ está em `plan.md` seção 11. Use as 4 primeiras.

```jsx
// src/sections/FaqPreviewSection.jsx
import Tag from '../components/ui/Tag.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import Button from '../components/ui/Button.jsx'
import './FaqPreviewSection.css'

const previewItems = [
  {
    question: 'Minha operação é muito específica. Existe solução pronta para o que eu tenho?',
    answer: 'Não trabalhamos com soluções prontas. Cada projeto começa com um diagnóstico da sua operação. Se a IA faz sentido para o seu contexto, desenhamos a solução específica para o seu processo.',
  },
  {
    question: 'Já investi em tecnologia antes e não tive retorno. Por que seria diferente aqui?',
    answer: 'Porque começamos pelo diagnóstico, não pela ferramenta. A maioria dos projetos fracassa porque a tecnologia foi implementada sem entender o processo. Nosso Método 5D garante que o escopo seja fechado com critério de aceite antes de qualquer desenvolvimento.',
  },
  {
    question: 'Minha empresa não tem equipe técnica. Conseguimos usar o que vocês constroem?',
    answer: 'Sim. Entregamos documentação completa, treinamento da equipe e 30 dias de suporte pós-deploy. Construímos para autonomia, não para dependência.',
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Operamos com compliance nativo à LGPD. Seus dados ficam no seu ambiente — não em plataformas de terceiros sem contrato. Os agentes se identificam como IA na primeira mensagem. Seguimos os princípios do PL 2338/2023 desde a arquitetura.',
  },
]

export default function FaqPreviewSection() {
  return (
    <section className="faq-preview section">
      <div className="container faq-preview-inner">
        <Tag>Perguntas frequentes</Tag>
        <h2 className="faq-preview-heading">Dúvidas comuns</h2>

        <Accordion items={previewItems} />

        <div className="faq-preview-cta">
          <Button href="/faq" variant="secondary">
            Ver todas as perguntas →
          </Button>
        </div>
      </div>
    </section>
  )
}
```

```css
/* src/sections/FaqPreviewSection.css */
.faq-preview-inner {
  max-width: 720px;
}

.faq-preview-heading {
  font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
  font-weight: 700;
  margin-top: var(--space-4);
  margin-bottom: var(--space-12);
}

.faq-preview-cta {
  margin-top: var(--space-8);
}
```

---

## 7. CtaSection

Copy exata do `plan.md` seção 6 → "Seção 7 — CTA Final".

```jsx
// src/sections/CtaSection.jsx
import Tag from '../components/ui/Tag.jsx'
import Button from '../components/ui/Button.jsx'
import './CtaSection.css'

export default function CtaSection() {
  return (
    <section className="cta-final section">
      <div className="container">
        <div className="cta-card">
          <Tag>Próximo passo</Tag>
          <h2>
            Sua operação pode ser mais leve do que você imagina.{' '}
            <span>Fale com a Eugênia.</span>
          </h2>
          <Button
            href="https://wa.me/5551991129452"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Falar com a Eugênia →
          </Button>
          <p className="cta-disclaimer">
            Atendemos poucos projetos por vez, intencionalmente.
            Para garantir atenção real em cada operação.
          </p>
        </div>
      </div>
    </section>
  )
}
```

```css
/* src/sections/CtaSection.css */
.cta-card {
  background: var(--primary);
  border-radius: var(--radius-lg);
  padding: var(--space-20) var(--space-16);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

.cta-card .tag {
  color: #0f131a;
  opacity: 0.7;
}

.cta-card h2 {
  font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
  font-weight: 700;
  color: #0f131a;
  max-width: 640px;
  line-height: 1.2;
}

.cta-card h2 span {
  opacity: 0.75;
}

.cta-card .btn-primary {
  background: #0f131a;
  color: var(--primary);
}

.cta-disclaimer {
  font-size: var(--font-size-sm);
  color: #0f131a;
  opacity: 0.65;
  max-width: 400px;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .cta-card {
    padding: var(--space-12) var(--space-8);
  }
}
```

---

## 8. Home.jsx — monta todas as seções

```jsx
// src/pages/Home.jsx
import HeroSection from '../sections/HeroSection.jsx'
import ProblemSection from '../sections/ProblemSection.jsx'
import ServicesSection from '../sections/ServicesSection.jsx'
import MethodSection from '../sections/MethodSection.jsx'
import DiferenciaisSection from '../sections/DiferenciaisSection.jsx'
import FaqPreviewSection from '../sections/FaqPreviewSection.jsx'
import CtaSection from '../sections/CtaSection.jsx'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <MethodSection />
      <DiferenciaisSection />
      <FaqPreviewSection />
      <CtaSection />
    </>
  )
}
```

---

## Verificação

- `npm run dev`: rota `/` deve renderizar as 7 seções sem erros
- Conferir cada seção no browser e checar que o copy bate com o `plan.md`
- Responsivo: testar em viewport 375px
