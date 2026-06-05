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
