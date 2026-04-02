import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

function getSystemTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') {
      return 'system'
    }

    const stored = window.localStorage.getItem('theme_mode')
    return stored === 'dark' || stored === 'light' || stored === 'system' ? stored : 'system'
  })

  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => setSystemTheme(getSystemTheme())
    query.addEventListener('change', onChange)

    return () => query.removeEventListener('change', onChange)
  }, [])

  const resolvedTheme = mode === 'system' ? systemTheme : mode

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme)
    window.localStorage.setItem('theme_mode', mode)
  }, [mode, resolvedTheme])

  const value = useMemo(
    () => ({
      mode,
      resolvedTheme,
      setMode,
      toggleMode: () => {
        setMode((current) => {
          if (current === 'system') return 'dark'
          if (current === 'dark') return 'light'
          return 'dark'
        })
      },
    }),
    [mode, resolvedTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
