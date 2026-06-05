# Task 8 — SEO, SSG e build final

Leia `plan.md` seção 13 para todas as meta tags antes de começar.

Esta task finaliza o projeto: lazy loading por rota, Helmet por página, react-snap, sitemap, robots.txt e verificação do build.

---

## 1. Atualizar AppRouter com React.lazy

Substitua os imports diretos por lazy imports e envolva em Suspense:

```jsx
// src/app/AppRouter.jsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'

const Home = lazy(() => import('../pages/Home.jsx'))
const Clinicas = lazy(() => import('../pages/Clinicas.jsx'))
const Consultoria = lazy(() => import('../pages/Consultoria.jsx'))
const Treinamento = lazy(() => import('../pages/Treinamento.jsx'))
const Teste = lazy(() => import('../pages/Teste.jsx'))
const Faq = lazy(() => import('../pages/Faq.jsx'))
const Contato = lazy(() => import('../pages/Contato.jsx'))

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }} />
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clinicas" element={<Clinicas />} />
            <Route path="/consultoria" element={<Consultoria />} />
            <Route path="/treinamento" element={<Treinamento />} />
            <Route path="/teste" element={<Teste />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contato" element={<Contato />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
```

---

## 2. Helmet por página

Adicione `<Helmet>` no início de cada página. Use os valores exatos do `plan.md` seção 13.

### Home.jsx

```jsx
import { Helmet } from 'react-helmet-async'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Eugen.IA | Automação de Processos e Agentes de IA sob medida</title>
        <meta
          name="description"
          content="Diagnóstico e implementação de automações e Agentes de IA para PMEs e e-commerces. Método 5D. Compliance LGPD nativo."
        />
      </Helmet>
      {/* seções */}
    </>
  )
}
```

### Clinicas.jsx

```jsx
<Helmet>
  <title>Agente de Agendamento com IA para Clínicas | Eugen.IA</title>
  <meta
    name="description"
    content="Agente de IA no WhatsApp que agenda, confirma e atende seus clientes 24h por dia. Setup em 2 dias. R$ 1.200."
  />
</Helmet>
```

### Consultoria.jsx

```jsx
<Helmet>
  <title>Consultoria Estratégica em IA | Método 5D | Eugen.IA</title>
  <meta
    name="description"
    content="Diagnóstico, arquitetura e escopo fechado em duas sessões. Entregáveis que garantem autonomia total. R$ 800–900."
  />
</Helmet>
```

### Treinamento.jsx

```jsx
<Helmet>
  <title>Workshop de IA para Empresas | Eugen.IA</title>
  <meta
    name="description"
    content="Treinamento in-company sobre uso responsável de LLMs, Shadow AI e política de IA. Para times de até 20 pessoas."
  />
</Helmet>
```

### Teste.jsx

```jsx
<Helmet>
  <title>Teste de Maturidade em IA | Eugen.IA</title>
  <meta
    name="description"
    content="3 minutos. Descubra o nível de maturidade da sua operação e as 3 maiores oportunidades de automação. Resultado em 24h."
  />
</Helmet>
```

### Faq.jsx

```jsx
<Helmet>
  <title>Perguntas Frequentes | Eugen.IA</title>
  <meta
    name="description"
    content="Respostas sobre automação, Agentes de IA, investimento, LGPD e como a Eugen.IA trabalha."
  />
</Helmet>
```

### Contato.jsx

```jsx
<Helmet>
  <title>Contato | Fale com a Eugênia | Eugen.IA</title>
  <meta
    name="description"
    content="Fale com a Eugênia e agende seu Pré-Diagnóstico gratuito. Sem formulário. Sem espera. Sem compromisso."
  />
</Helmet>
```

---

## 3. Verificar react-snap no package.json

Confirme que o `package.json` tem exatamente estas configurações (já definidas na Task 1, mas verifique):

```json
"scripts": {
  "postbuild": "react-snap"
},
"reactSnap": {
  "source": "dist",
  "minifyHtml": { "collapseWhitespace": true },
  "puppeteerArgs": ["--no-sandbox"],
  "inlineCss": true
}
```

---

## 4. `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.eugenia.ia.br/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.eugenia.ia.br/clinicas</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.eugenia.ia.br/consultoria</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.eugenia.ia.br/treinamento</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.eugenia.ia.br/teste</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.eugenia.ia.br/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.eugenia.ia.br/contato</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

## 5. `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://www.eugenia.ia.br/sitemap.xml
```

---

## 6. Build e verificação

### Rodar o build

```bash
npm run build
```

Saída esperada:
- Sem erros críticos no console
- Arquivos em `dist/` com subpastas por rota (`dist/clinicas/index.html`, etc.) gerados pelo react-snap

### Verificar bundle

```bash
npx vite-bundle-visualizer
```

O bundle total deve ficar abaixo de 400kb gzipped. Se ultrapassar, identifique o chunk maior e avalie se há importação duplicada.

### Testar localmente

```bash
npx serve dist
```

Navegar manualmente por todas as 7 rotas e verificar:
- [ ] Copy correta em cada rota
- [ ] `<title>` muda conforme a rota (ver no tab do browser)
- [ ] HTML pré-renderizado em `dist/clinicas/index.html` (abrir o arquivo e confirmar que tem conteúdo — não apenas `<div id="root"></div>`)
- [ ] `dist/sitemap.xml` e `dist/robots.txt` presentes

---

## Commit final

```bash
git add -A
git commit -m "feat: SEO — meta tags, react-snap SSG, sitemap e robots.txt"
```
