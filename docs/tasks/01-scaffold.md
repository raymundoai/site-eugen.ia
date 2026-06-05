# Task 1 — Scaffold do projeto

Você está reconstruindo o site da Eugen.IA do zero com React + Vite. O repositório atual tem apenas os arquivos compilados (`index.html`, `assets/`), o `icon/` com a logo, `favicon.svg` e `plan.md`. Não apague `icon/`, `favicon.svg` nem `plan.md`.

---

## 1. `package.json`

Crie na raiz do repositório:

```json
{
  "name": "site-eugenia",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "postbuild": "react-snap",
    "preview": "vite preview"
  },
  "dependencies": {
    "lenis": "^1.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-router-dom": "^6.26.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "react-snap": "^1.23.0",
    "vite": "^5.4.10"
  },
  "reactSnap": {
    "source": "dist",
    "minifyHtml": { "collapseWhitespace": true },
    "puppeteerArgs": ["--no-sandbox"],
    "inlineCss": true
  }
}
```

---

## 2. `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
```

---

## 3. `index.html` (substituir o compilado atual)

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Eugen.IA</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 4. `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

---

## 5. `src/App.jsx`

```jsx
import { HelmetProvider } from 'react-helmet-async'
import AppRouter from './app/AppRouter.jsx'

export default function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  )
}
```

---

## 6. `src/app/AppRouter.jsx` (stub — será atualizado na Task 8)

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'

// Páginas importadas diretamente por enquanto — serão lazy na Task 8
import Home from '../pages/Home.jsx'
import Clinicas from '../pages/Clinicas.jsx'
import Consultoria from '../pages/Consultoria.jsx'
import Treinamento from '../pages/Treinamento.jsx'
import Teste from '../pages/Teste.jsx'
import Faq from '../pages/Faq.jsx'
import Contato from '../pages/Contato.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinicas" element={<Clinicas />} />
          <Route path="/consultoria" element={<Consultoria />} />
          <Route path="/treinamento" element={<Treinamento />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
```

Para que o build não quebre, crie arquivos stub para cada página (apenas um `export default function Nome() { return null }`) nas rotas que ainda não foram implementadas.

---

## 7. `.gitignore`

```
node_modules
dist
.DS_Store
*.local
```

---

## Verificação

Após `npm install`:
- `npm run dev` deve abrir em `localhost:5173` sem erros no console
- Não deve haver erros de importação

Após isso, faça o commit:
```bash
git add -A
git commit -m "chore: scaffold projeto React + Vite"
```
