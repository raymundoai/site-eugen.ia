import { HelmetProvider } from 'react-helmet-async'
import AppRouter from './app/AppRouter.jsx'
import { useLenis } from './hooks/useLenis.js'

function AppInner() {
  useLenis()
  return <AppRouter />
}

export default function App() {
  return (
    <HelmetProvider>
      <AppInner />
    </HelmetProvider>
  )
}
