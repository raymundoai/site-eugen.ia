import { useEffect, useRef } from 'react'
import './AuroraCursor.css'

export default function AuroraCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    let cursorX = -200
    let cursorY = -200
    let lastMoveTime = 0
    const particles = []

    const isLight = () => document.documentElement.dataset.theme === 'light'

    const onMouseMove = (e) => {
      cursorX = e.clientX
      cursorY = e.clientY
      lastMoveTime = performance.now()

      for (let i = 0; i < 5; i++) {
        if (particles.length >= 150) particles.shift()
        const t = performance.now() * 0.0008
        const hue = 45 + ((1 + Math.sin(t)) / 2) * 175
        particles.push({
          x: cursorX + (Math.random() - 0.5) * 12,
          y: cursorY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * -0.8 - 0.2,
          radius: 4 + Math.random() * 5,
          hue,
          alpha: 0.75,
        })
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let rafId
    const tick = () => {
      rafId = requestAnimationFrame(tick)

      const idle = performance.now() - lastMoveTime > 2000
      if (idle && particles.length === 0) return

      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'

      const l1 = isLight() ? '55%' : '70%'
      const l2 = isLight() ? '35%' : '50%'

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.vy += 0.018
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.011
        if (p.alpha < 0.01) { particles.splice(i, 1); continue }

        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
        grd.addColorStop(0, `hsla(${p.hue}, 100%, ${l1}, ${p.alpha})`)
        grd.addColorStop(1, `hsla(${p.hue}, 100%, ${l2}, 0)`)
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#fbba23'
      ctx.beginPath()
      ctx.arc(cursorX, cursorY, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    rafId = requestAnimationFrame(tick)

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      particles.splice(0)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="aurora-cursor" aria-hidden="true" />
}
