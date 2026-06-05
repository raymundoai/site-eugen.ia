# Task 2 — Design system

Você está criando o design system do site da Eugen.IA. Estes tokens e componentes são usados por todo o projeto.

**Paleta:** fundo escuro, dourado/âmbar como cor de destaque. Não altere os valores abaixo — foram extraídos do site atual.

---

## 1. `src/styles/tokens.css`

```css
:root {
  /* Layout */
  --header-height: 82px;
  --container: min(1180px, calc(100vw - 40px));

  /* Radii */
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 26px;
  --radius-pill: 999px;

  /* Cores — tema escuro (padrão) */
  --background: #0f131a;
  --surface: #181d25;
  --surface-soft: #1f2631;
  --foreground: #fffaf0;
  --muted: #a5afbf;
  --line: #2a3240;
  --primary: #fbba23;
  --accent: #f6c655;
  --danger: #f06367;
  --glass: #181d259e;

  /* Sombras */
  --shadow-base: 0 16px 42px #060a1229;
  --shadow-glass: 0 22px 50px #060a1238;
  --shadow-glow: 0 0 48px #fbba2347;

  /* Tipografia */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Espaçamentos */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

---

## 2. `src/styles/global.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: auto; /* Lenis cuida do smooth scroll */
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-sans);
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.6;
  font-size: var(--font-size-base);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

img, svg {
  display: block;
  max-width: 100%;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* Container utilitário */
.container {
  width: var(--container);
  margin-inline: auto;
}

/* Seção utilitária */
.section {
  padding-block: var(--space-24);
}

/* Label de seção (usado pelas seções antes do h2) */
.section-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
}
```

---

## 3. `src/components/ui/Button.jsx`

```jsx
import './Button.css'

/**
 * variant: 'primary' | 'secondary' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({ children, variant = 'primary', size = 'md', href, ...props }) {
  const cls = `btn btn-${variant} btn-${size}`

  if (href) {
    return <a href={href} className={cls} {...props}>{children}</a>
  }

  return <button className={cls} {...props}>{children}</button>
}
```

## `src/components/ui/Button.css`

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-weight: 600;
  border: none;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  white-space: nowrap;
}

.btn:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

/* Sizes */
.btn-sm { padding: var(--space-2) var(--space-4); font-size: var(--font-size-sm); }
.btn-md { padding: var(--space-3) var(--space-6); font-size: var(--font-size-base); }
.btn-lg { padding: var(--space-4) var(--space-8); font-size: var(--font-size-lg); }

/* Variants */
.btn-primary {
  background: var(--primary);
  color: #0f131a;
}

.btn-secondary {
  background: transparent;
  color: var(--foreground);
  border: 1.5px solid var(--line);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.btn-ghost {
  background: transparent;
  color: var(--muted);
  padding-inline: 0;
  border-radius: 0;
}

.btn-ghost:hover {
  color: var(--foreground);
  opacity: 1;
  transform: none;
}
```

---

## 4. `src/components/ui/Tag.jsx`

```jsx
import './Tag.css'

export default function Tag({ children }) {
  return <span className="tag">{children}</span>
}
```

## `src/components/ui/Tag.css`

```css
.tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
}
```

---

## 5. `src/components/ui/Accordion.jsx`

Accordion acessível com `<details>` + `<summary>`. Um item aberto de cada vez.

```jsx
import { useRef } from 'react'
import './Accordion.css'

export function AccordionItem({ question, answer, open, onToggle }) {
  return (
    <div className={`accordion-item${open ? ' accordion-item--open' : ''}`}>
      <button
        className="accordion-trigger"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className="accordion-icon" aria-hidden="true">+</span>
      </button>
      <div className="accordion-body" hidden={!open}>
        <p>{answer}</p>
      </div>
    </div>
  )
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useRef(-1) // não usar useRef para state
  // Correto: usar useState
  return null // implementação completa abaixo
}
```

Implemente assim (substituindo o stub acima):

```jsx
import { useState } from 'react'
import './Accordion.css'

function AccordionItem({ question, answer, open, onToggle }) {
  return (
    <div className={`accordion-item${open ? ' accordion-item--open' : ''}`}>
      <button
        className="accordion-trigger"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className="accordion-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="accordion-body">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
```

## `src/components/ui/Accordion.css`

```css
.accordion {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.accordion-item {
  border-bottom: 1px solid var(--line);
}

.accordion-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-block: var(--space-6);
  background: transparent;
  border: none;
  color: var(--foreground);
  font-size: var(--font-size-lg);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  gap: var(--space-4);
}

.accordion-trigger:hover {
  color: var(--primary);
}

.accordion-icon {
  flex-shrink: 0;
  font-size: var(--font-size-xl);
  color: var(--primary);
  line-height: 1;
}

.accordion-body {
  padding-bottom: var(--space-6);
  color: var(--muted);
  line-height: 1.7;
}

.accordion-item--open .accordion-trigger {
  color: var(--primary);
}
```

---

## 6. `src/pages/PageShared.css`

Estilos compartilhados entre todas as páginas internas. Crie este arquivo — ele é importado por Clinicas, Consultoria, Treinamento, Teste, Faq e Contato.

```css
/* Herói padrão das páginas internas */
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

.page-hero h1 span {
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

/* Preço (consultoria + treinamento) */
.consultoria-preco {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-8);
}

.consultoria-preco-value {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--primary);
}

.consultoria-preco-note {
  font-size: var(--font-size-sm);
  color: var(--muted);
}

/* CTA final das páginas internas */
.consultoria-cta {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  max-width: 640px;
}

.consultoria-cta h2 {
  font-size: clamp(var(--font-size-2xl), 4vw, var(--font-size-4xl));
  font-weight: 700;
  line-height: 1.2;
}

.consultoria-cta h2 span {
  color: var(--muted);
}

.consultoria-cta p {
  color: var(--muted);
  font-size: var(--font-size-lg);
  line-height: 1.6;
}
```

---

## Verificação

- `npm run build` sem erros
- Componentes importam e renderizam sem crash
- Arquivo `src/pages/PageShared.css` existe (vai ser importado pelas páginas nas Tasks seguintes)
