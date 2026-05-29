import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { BackgroundField } from '../components/BackgroundField'
import { GlobalCursor } from '../components/GlobalCursor'
import { useLenis } from '../hooks/useLenis'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { ParticleField } from '../components/ParticleField'
import { ChatWidget } from '../components/ChatWidget'
import { CookieConsent } from '../components/CookieConsent'
import { ContactPage } from '../pages/ContactPage'
import { CookiesPage } from '../pages/CookiesPage'
import { FaqPage } from '../pages/FaqPage'
import { GoogleAnalytics } from '../components/GoogleAnalytics'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PrivacyPage } from '../pages/PrivacyPage'
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
      <GoogleAnalytics />
      <BackgroundField />
      {location.pathname === '/' && <ParticleField />}
      <GlobalCursor />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/obrigado" element={<ThanksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      {location.pathname !== '/contato' && <ChatWidget />}
      <CookieConsent />
    </>
  )
}
