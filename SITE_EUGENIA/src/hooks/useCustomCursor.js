import { useEffect, useState } from 'react'

export function useCustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [mode, setMode] = useState('default')

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const shouldEnable = isDesktop && !reducedMotion
    setEnabled(shouldEnable)

    if (shouldEnable) {
      document.documentElement.classList.add('cursor-hidden')
    } else {
      document.documentElement.classList.remove('cursor-hidden')
    }

    if (!isDesktop || reducedMotion) {
      return undefined
    }

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
  }, [])

  return {
    enabled,
    position,
    mode,
  }
}
