import { useEffect } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')
    if (!dot || !ring) return

    let rafId
    let mouseX = -200
    let mouseY = -200
    let ringX = -200
    let ringY = -200
    let visible = false

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }
    }

    const onEnter = () => ring.classList.add('is-hovered')
    const onLeave = () => ring.classList.remove('is-hovered')

    const tick = () => {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      ringX += (mouseX - ringX) * 0.14
      ringY += (mouseY - ringY) * 0.14
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      rafId = requestAnimationFrame(tick)
    }

    const bindHoverTargets = () => {
      document.querySelectorAll('a, button, [role="button"], [data-cursor="hover"]').forEach((el) => {
        if (el.dataset.cursorBound) return
        el.dataset.cursorBound = '1'
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    bindHoverTargets()
    rafId = requestAnimationFrame(tick)

    const observer = new MutationObserver(bindHoverTargets)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  )
}
