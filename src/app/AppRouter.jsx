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
