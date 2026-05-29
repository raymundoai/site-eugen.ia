import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChatProvider } from './contexts/ChatContext'
import { ConsentProvider } from './contexts/ConsentContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRouter } from './app/AppRouter'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ConsentProvider>
        <ChatProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ChatProvider>
      </ConsentProvider>
    </ThemeProvider>
  </StrictMode>,
)
