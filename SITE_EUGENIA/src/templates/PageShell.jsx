import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '../components/organisms/Header'
import { Footer } from '../components/organisms/Footer'
import { ChatWidget } from '../components/organisms/ChatWidget'
import { ScrollProgress } from '../components/organisms/ScrollProgress'
import { GlobalCursor } from '../components/organisms/GlobalCursor'

export function PageShell() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <ScrollProgress />
      <GlobalCursor />
      <div className="site-mesh" aria-hidden="true" />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget variant="floating" />
    </>
  )
}
