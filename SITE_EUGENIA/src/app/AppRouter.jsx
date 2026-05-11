import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PageShell } from '../templates/PageShell'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { FaqPage } from '../pages/FaqPage'
import { ContactPage } from '../pages/ContactPage'
import { ThanksPage } from '../pages/ThanksPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/obrigado" element={<ThanksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
