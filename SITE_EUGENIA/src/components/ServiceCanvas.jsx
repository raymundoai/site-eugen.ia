import { useEffect, useRef } from 'react'
import { makeBlackboard, makeGears, makeRobot } from '../utils/particleShapes'

const SN   = 600
const TAU  = Math.PI * 2
const OPA  = [0.15, 0.25, 0.38]
const GOLD = '251,186,35'

export function ServiceCanvas({ serviceIndex, active }) {
  const canvasRef  = useRef(null)
  const controlRef = useRef({ type: 'scatter' })
  const txRef      = useRef(new Float32Array(SN))
  const tyRef      = useRef(new Float32Array(SN))

  // React to active/serviceIndex changes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = canvas.width  || canvas.offsetWidth  || 400
    const H = canvas.height || canvas.offsetHeight || 400

    if (!active) {
      controlRef.current = { type: 'scatter' }
      return
    }

    if (serviceIndex === 0) {
      const pts = makeBlackboard(W, H, SN, 0)
      _copyTargets(pts, txRef.current, tyRef.current)
      controlRef.current = { type: 'blackboard', phase: 0, timer: 0 }
    } else if (serviceIndex === 1) {
      controlRef.current = { type: 'gears', angle: 0 }
    } else {
      const pts = makeRobot(W, H, SN)
      _copyTargets(pts, txRef.current, tyRef.current)
      controlRef.current = { type: 'morph' }
    }
  }, [active, serviceIndex])

  // Animation loop — mounted once per instance
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const W      = canvas.offsetWidth  || 400
    const H      = canvas.offsetHeight || 400
    canvas.width  = W
    canvas.height = H

    const px  = new Float32Array(SN)
    const py  = new Float32Array(SN)
    const vx  = new Float32Array(SN)
    const vy  = new Float32Array(SN)
    const rad = new Float32Array(SN)
    const bkt = new Uint8Array(SN)
    const tx  = txRef.current
    const ty  = tyRef.current

    for (let i = 0; i < SN; i++) {
      px[i]  = Math.random() * W
      py[i]  = Math.random() * H
      vx[i]  = (Math.random() - 0.5) * 0.4
      vy[i]  = (Math.random() - 0.5) * 0.4
      rad[i] = 1.0 + Math.random() * 1.5
      bkt[i] = (Math.random() * 3) | 0
    }

    let lastTs = 0
    let raf

    function tick(ts) {
      const dt = lastTs ? ts - lastTs : 16
      lastTs = ts
      ctx.clearRect(0, 0, W, H)

      const cmd = controlRef.current

      // Update targets for animated shapes
      if (cmd.type === 'gears') {
        cmd.angle += 0.008
        const pts = makeGears(W, H, cmd.angle)
        _copyTargets(pts, tx, ty)
      } else if (cmd.type === 'blackboard') {
        cmd.timer += dt
        if (cmd.timer >= 800) {
          cmd.timer = 0
          cmd.phase = (cmd.phase + 1) % 4
          const pts = makeBlackboard(W, H, SN, cmd.phase)
          _copyTargets(pts, tx, ty)
        }
      }

      const morphing = cmd.type !== 'scatter'

      // Physics
      for (let i = 0; i < SN; i++) {
        if (morphing) {
          vx[i] += (tx[i] - px[i]) * 0.06
          vy[i] += (ty[i] - py[i]) * 0.06
          vx[i] *= 0.87
          vy[i] *= 0.87
        } else {
          vx[i] += (Math.random() - 0.5) * 0.08
          vy[i] += (Math.random() - 0.5) * 0.08
          vx[i] *= 0.97
          vy[i] *= 0.97
        }
        px[i] += vx[i]
        py[i] += vy[i]
        // Clamp (no wrap for small canvas)
        if (px[i] < 0) px[i] = 0
        else if (px[i] > W) px[i] = W
        if (py[i] < 0) py[i] = 0
        else if (py[i] > H) py[i] = H
      }

      // Batched render by opacity bucket
      for (let b = 0; b < 3; b++) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${GOLD},${OPA[b]})`
        for (let i = 0; i < SN; i++) {
          if (bkt[i] === b) {
            ctx.moveTo(px[i] + rad[i], py[i])
            ctx.arc(px[i], py[i], rad[i], 0, TAU)
          }
        }
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [serviceIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className="service-canvas" />
}

function _copyTargets(pts, tx, ty) {
  for (let i = 0; i < Math.min(SN, pts.length); i++) {
    tx[i] = pts[i].x
    ty[i] = pts[i].y
  }
}
