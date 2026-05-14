import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { makeQuestionMarks, makeRoad } from '../utils/particleShapes'

gsap.registerPlugin(ScrollTrigger)

const N      = 3000
const TAU    = Math.PI * 2
const OPA    = [0.15, 0.25, 0.38]
const GOLD   = '251,186,35'
const MOUSE_R  = 100
const MOUSE_R2 = MOUSE_R * MOUSE_R

export function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const px  = new Float32Array(N)
    const py  = new Float32Array(N)
    const vx  = new Float32Array(N)
    const vy  = new Float32Array(N)
    const tx  = new Float32Array(N)
    const ty  = new Float32Array(N)
    const rad = new Float32Array(N)
    const bkt = new Uint8Array(N)

    for (let i = 0; i < N; i++) {
      px[i]  = Math.random() * W
      py[i]  = Math.random() * H
      vx[i]  = (Math.random() - 0.5) * 0.4
      vy[i]  = (Math.random() - 0.5) * 0.4
      rad[i] = 1.0 + Math.random() * 1.5
      bkt[i] = (Math.random() * 3) | 0
    }

    let morphing = false
    let mouseX = -9999, mouseY = -9999

    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    let raf
    function tick() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < N; i++) {
        if (morphing && i < 800) {
          vx[i] += (tx[i] - px[i]) * 0.07
          vy[i] += (ty[i] - py[i]) * 0.07
          vx[i] *= 0.88
          vy[i] *= 0.88
        } else {
          vx[i] += (Math.random() - 0.5) * 0.08
          vy[i] += (Math.random() - 0.5) * 0.08
          vx[i] *= 0.97
          vy[i] *= 0.97
        }

        const dx = px[i] - mouseX
        const dy = py[i] - mouseY
        const d2 = dx * dx + dy * dy
        if (d2 < MOUSE_R2 && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = (MOUSE_R - d) / MOUSE_R * 4
          vx[i] += (dx / d) * f
          vy[i] += (dy / d) * f
        }

        px[i] += vx[i]
        py[i] += vy[i]

        if (px[i] < 0)       px[i] += W
        else if (px[i] > W)  px[i] -= W
        if (py[i] < 0)       py[i] += H
        else if (py[i] > H)  py[i] -= H
      }

      for (let b = 0; b < 3; b++) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${GOLD},${OPA[b]})`
        for (let i = 0; i < N; i++) {
          if (bkt[i] === b) {
            ctx.moveTo(px[i] + rad[i], py[i])
            ctx.arc(px[i], py[i], rad[i], 0, TAU)
          }
        }
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
      morphing = false
    }
    window.addEventListener('resize', onResize)

    function setShape(pts) {
      if (!pts || pts.length === 0) { morphing = false; return }
      for (let i = 0; i < Math.min(800, pts.length); i++) {
        tx[i] = pts[i].x
        ty[i] = pts[i].y
      }
      morphing = true
    }
    function clearShape() { morphing = false }

    const st1 = ScrollTrigger.create({
      trigger: '.problem-text-phase',
      start: 'top center',
      end: 'bottom center',
      onEnter:     () => setShape(makeQuestionMarks(W, H, 800)),
      onLeave:     clearShape,
      onEnterBack: () => setShape(makeQuestionMarks(W, H, 800)),
      onLeaveBack: clearShape,
    })

    const st2 = ScrollTrigger.create({
      trigger: '.showcase-text-phase',
      start: 'top center',
      end: 'bottom center',
      onEnter:     () => setShape(makeRoad(W, H, 800)),
      onLeave:     clearShape,
      onEnterBack: () => setShape(makeRoad(W, H, 800)),
      onLeaveBack: clearShape,
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      st1.kill()
      st2.kill()
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas-global" />
}
