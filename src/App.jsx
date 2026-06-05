import { HelmetProvider } from 'react-helmet-async'
import AppRouter from './app/AppRouter.jsx'

export default function App() {
  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  )
}
