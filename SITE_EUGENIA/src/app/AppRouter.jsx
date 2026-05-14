import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { BackgroundField } from '../components/BackgroundField'
import { GlobalCursor } from '../components/GlobalCursor'
import { useLenis } from '../hooks/useLenis'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ParticleField } from '../components/ParticleField'
import { AboutPage } from '../pages/AboutPage'
import { ContactPage } from '../pages/ContactPage'
import { FaqPage } from '../pages/FaqPage'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ServicesPage } from '../pages/ServicesPage'
import { ThanksPage } from '../pages/ThanksPage'

export function AppRouter() {
  const location = useLocation()
  useLenis()
  useScrollReveal()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }, [location.hash, location.pathname])

  return (
    <>
      <BackgroundField />
      {location.pathname === '/' && <ParticleField />}
      <GlobalCursor />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/obrigado" element={<ThanksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
