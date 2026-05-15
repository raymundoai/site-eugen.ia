import { useEffect, useState } from 'react'

function shouldEnableCursor() {
  if (typeof window === 'undefined') return false
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return isDesktop && !reducedMotion
}

export function useCustomCursor() {
  const [enabled] = useState(shouldEnableCursor)
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [mode, setMode] = useState('default')

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('cursor-hidden')
    } else {
      document.documentElement.classList.remove('cursor-hidden')
    }

    if (!enabled) return undefined

    const onMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    const onOver = (event) => {
      const target = event.target.closest('[data-cursor]')
      setMode(target ? target.dataset.cursor : 'default')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.classList.remove('cursor-hidden')
    }
  }, [enabled])

  return { enabled, position, mode }
}
