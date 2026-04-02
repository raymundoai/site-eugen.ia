import { ThemeProvider } from './contexts/ThemeContext'
import { ChatProvider } from './contexts/ChatProvider'
import { useLenis } from './hooks/useLenis'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import { AppRouter } from './app/AppRouter'

function AppContent() {
  useLenis(true)
  useScrollAnimations()

  return <AppRouter />
}

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </ThemeProvider>
  )
}

export default App
