import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { makeQuestionMarks, makeRoad, makeBlackboard, makeGears, makeRobot } from '../utils/particleShapes'

gsap.registerPlugin(ScrollTrigger)

const N          = 3000
const MORPH_N    = 1200   // partículas usadas para forming shapes
const TAU        = Math.PI * 2
const OPA        = [0.15, 0.25, 0.38]
const GOLD       = '251,186,35'
const MOUSE_R    = 100
const MOUSE_R2   = MOUSE_R * MOUSE_R

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
    let morphCount = 0
    let mouseX = -9999, mouseY = -9999

    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMouseMove)

    let raf
    function tick() {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < N; i++) {
        const isMorph = morphing && i < morphCount
        if (isMorph) {
          vx[i] += (tx[i] - px[i]) * 0.04
          vy[i] += (ty[i] - py[i]) * 0.04
          vx[i] *= 0.80
          vy[i] *= 0.80
        } else {
          vx[i] += (Math.random() - 0.5) * 0.015
          vy[i] += (Math.random() - 0.5) * 0.015
          vx[i] *= 0.95
          vy[i] *= 0.95
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

        if (isMorph) {
          // Clamp (sem wrap): evita loop teleporte + spring → partículas alucinando
          if (px[i] < 0) { px[i] = 0; vx[i] = 0 }
          else if (px[i] > W) { px[i] = W; vx[i] = 0 }
          if (py[i] < 0) { py[i] = 0; vy[i] = 0 }
          else if (py[i] > H) { py[i] = H; vy[i] = 0 }
        } else {
          if (px[i] < 0)       px[i] += W
          else if (px[i] > W)  px[i] -= W
          if (py[i] < 0)       py[i] += H
          else if (py[i] > H)  py[i] -= H
        }
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
      morphCount = 0
    }
    window.addEventListener('resize', onResize)

    function setShape(pts) {
      if (!pts || pts.length === 0) { morphing = false; return }
      morphCount = Math.min(MORPH_N, pts.length)
      for (let i = 0; i < morphCount; i++) {
        tx[i] = pts[i].x
        ty[i] = pts[i].y
      }
      morphing = true
    }
    function clearShape() {
      for (let i = 0; i < morphCount; i++) {
        vx[i] *= 0.1
        vy[i] *= 0.1
      }
      morphing = false
    }

    // Dispara quando ~50% do texto já digitado (0.8 × vh após o início do pin)
    const st1 = ScrollTrigger.create({
      trigger: '.problem-text-phase',
      start: () => `top+=${window.innerHeight * 0.8} top`,
      end: 'bottom top',
      onEnter:     () => setShape(makeQuestionMarks(W, H, MORPH_N)),
      onLeave:     clearShape,
      onEnterBack: () => setShape(makeQuestionMarks(W, H, MORPH_N)),
      onLeaveBack: clearShape,
    })

    const st2 = ScrollTrigger.create({
      trigger: '.showcase-text-phase',
      start: () => `top+=${window.innerHeight * 0.8} top`,
      end: 'bottom top',
      onEnter:     () => setShape(makeRoad(W, H, MORPH_N)),
      onLeave:     clearShape,
      onEnterBack: () => setShape(makeRoad(W, H, MORPH_N)),
      onLeaveBack: clearShape,
    })

    // Serviços: mesmas partículas, shapes no lado direito do canvas
    const SERVICE_FNS = [
      () => makeBlackboard(W * 0.46, H, MORPH_N, 3),
      () => makeGears(W * 0.46, H, 0, MORPH_N),
      () => makeRobot(W * 0.46, H, MORPH_N),
    ]
    const toRight = (pts) => pts.map(p => ({ x: p.x + W * 0.50, y: p.y }))

    let lastSvcIdx = -1
    function showService(idx) {
      if (idx === lastSvcIdx) return
      lastSvcIdx = idx
      setShape(toRight(SERVICE_FNS[idx]()))
    }

    const st3 = ScrollTrigger.create({
      trigger: '.showcase-cards-phase',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onEnter:     () => showService(0),
      onEnterBack: () => showService(2),
      onLeave:     () => { clearShape(); lastSvcIdx = -1 },
      onLeaveBack: () => { clearShape(); lastSvcIdx = -1 },
      onUpdate:    (self) => showService(Math.min(2, Math.floor(self.progress * 3))),
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      st1.kill()
      st2.kill()
      st3.kill()
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas-global" />
}
