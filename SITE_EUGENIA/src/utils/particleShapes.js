
// Amostra apenas pixels de borda (adjacentes a pixels transparentes) — dá contornos nítidos.
function sampleEdgePixels(off, w, h, count) {
  const ctx = off.getContext('2d')
  const data = ctx.getImageData(0, 0, w, h).data
  const result = []
  let k = 0
  const step = 2
  for (let y = step; y < h - step; y += step) {
    for (let x = step; x < w - step; x += step) {
      if (data[(y * w + x) * 4 + 3] > 128) {
        const above = data[((y - step) * w + x) * 4 + 3]
        const below = data[((y + step) * w + x) * 4 + 3]
        const left  = data[(y * w + (x - step)) * 4 + 3]
        const right = data[(y * w + (x + step)) * 4 + 3]
        if (above < 128 || below < 128 || left < 128 || right < 128) {
          k++
          const pt = { x: x + (Math.random() - 0.5) * 1.5, y: y + (Math.random() - 0.5) * 1.5 }
          if (result.length < count) {
            result.push(pt)
          } else {
            const j = (Math.random() * k) | 0
            if (j < count) result[j] = pt
          }
        }
      }
    }
  }
  return result
}

function makeOffscreen(w, h) {
  if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h)
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return c
}

// 5 question marks at fixed positions — filled then edge-sampled for clean outlines
export function makeQuestionMarks(w, h, count) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#ffffff'
  const positions = [[0.20, 0.45], [0.50, 0.25], [0.80, 0.55], [0.35, 0.72], [0.65, 0.18]]
  const sizes    = [0.22, 0.24, 0.26, 0.23, 0.25]
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < 5; i++) {
    const fontSize = sizes[i] * h
    ctx.font = `900 ${fontSize}px Sora, sans-serif`
    ctx.fillText('?', positions[i][0] * w, positions[i][1] * h)
  }
  return sampleEdgePixels(off, w, h, count)
}

// Two road edges converging to vanishing point + center dashes
export function makeRoad(w, h, count) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = Math.max(20, w * 0.022)
  const vx = w * 0.5, vy = -h * 0.20
  // Left edge
  ctx.beginPath()
  ctx.moveTo(w * 0.10, h)
  ctx.lineTo(vx, vy)
  ctx.stroke()
  // Right edge
  ctx.beginPath()
  ctx.moveTo(w * 0.90, h)
  ctx.lineTo(vx, vy)
  ctx.stroke()
  // Center dashes
  ctx.setLineDash([h * 0.06, h * 0.04])
  ctx.beginPath()
  ctx.moveTo(w * 0.50, h)
  ctx.lineTo(vx, vy)
  ctx.stroke()
  ctx.setLineDash([])
  return sampleEdgePixels(off, w, h, count)
}

// Blackboard: border + 3 checkbox rows. xOff desloca para o lado direito do canvas.
export function makeBlackboard(w, h, count, checksVisible = 3, xOff = 0) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#ffffff'
  const rw = w - xOff
  const lw = Math.max(16, rw * 0.018)
  ctx.lineWidth = lw
  ctx.lineJoin = 'round'
  ctx.strokeRect(xOff + rw * 0.10, h * 0.12, rw * 0.80, h * 0.76)
  const rowsY = [0.30, 0.52, 0.74]
  const boxX = xOff + rw * 0.18
  const boxSize = rw * 0.14
  for (let i = 0; i < 3; i++) {
    const by = rowsY[i] * h - boxSize * 0.5
    ctx.strokeRect(boxX, by, boxSize, boxSize)
    if (i < checksVisible) {
      ctx.beginPath()
      ctx.moveTo(boxX + boxSize * 0.15, by + boxSize * 0.50)
      ctx.lineTo(boxX + boxSize * 0.42, by + boxSize * 0.78)
      ctx.lineTo(boxX + boxSize * 0.88, by + boxSize * 0.18)
      ctx.stroke()
    }
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(boxX + boxSize + rw * 0.06, rowsY[i] * h - lw * 0.4, rw * 0.34, lw * 0.8)
  }
  return sampleEdgePixels(off, w, h, count)
}

// Duas engrenagens — stroke, xOff desloca para o lado direito.
export function makeGears(w, h, angle = 0, count = 600, xOff = 0) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#ffffff'
  const rw = w - xOff
  ctx.lineWidth = Math.max(16, rw * 0.018)
  ctx.lineJoin = 'round'
  const r1 = rw * 0.26, r2 = rw * 0.14
  _drawGear(ctx, xOff + rw * 0.36, h * 0.50, r1, 10, angle)
  _drawGear(ctx, xOff + rw * 0.36 + r1 + r2, h * 0.52, r2, 7, angle * -1.4286)
  return sampleEdgePixels(off, w, h, count)
}

function _drawGear(ctx, cx, cy, r, teeth, angle) {
  const inner = r * 0.74
  const hub = r * 0.22
  const step = (Math.PI * 2) / teeth
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a = angle + i * step
    const a0 = a - step * 0.46, a1 = a - step * 0.20
    const a2 = a + step * 0.20, a3 = a + step * 0.46
    if (i === 0) ctx.moveTo(cx + inner * Math.cos(a0), cy + inner * Math.sin(a0))
    else ctx.lineTo(cx + inner * Math.cos(a0), cy + inner * Math.sin(a0))
    ctx.lineTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1))
    ctx.lineTo(cx + r * Math.cos(a2), cy + r * Math.sin(a2))
    ctx.lineTo(cx + inner * Math.cos(a3), cy + inner * Math.sin(a3))
  }
  ctx.closePath()
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(cx, cy, hub, 0, Math.PI * 2)
  ctx.stroke()
}

// Robô: cabeça arredondada, visor, olhos, antena. xOff desloca para o lado direito.
export function makeRobot(w, h, count, xOff = 0) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#ffffff'
  const rw = w - xOff
  const lw = Math.max(16, rw * 0.018)
  ctx.lineWidth = lw
  ctx.lineJoin = 'round'
  const hx = xOff + rw * 0.20, hy = h * 0.18
  const hw = rw * 0.60, hh = h * 0.60
  const rc = rw * 0.06
  ctx.beginPath()
  ctx.moveTo(hx + rc, hy)
  ctx.lineTo(hx + hw - rc, hy)
  ctx.arcTo(hx + hw, hy, hx + hw, hy + rc, rc)
  ctx.lineTo(hx + hw, hy + hh - rc)
  ctx.arcTo(hx + hw, hy + hh, hx + hw - rc, hy + hh, rc)
  ctx.lineTo(hx + rc, hy + hh)
  ctx.arcTo(hx, hy + hh, hx, hy + hh - rc, rc)
  ctx.lineTo(hx, hy + rc)
  ctx.arcTo(hx, hy, hx + rc, hy, rc)
  ctx.closePath()
  ctx.stroke()
  const vx = xOff + rw * 0.30, vy = h * 0.30, vw = rw * 0.40, vh = h * 0.22
  const vr = rw * 0.04
  ctx.beginPath()
  ctx.moveTo(vx + vr, vy)
  ctx.lineTo(vx + vw - vr, vy)
  ctx.arcTo(vx + vw, vy, vx + vw, vy + vr, vr)
  ctx.lineTo(vx + vw, vy + vh - vr)
  ctx.arcTo(vx + vw, vy + vh, vx + vw - vr, vy + vh, vr)
  ctx.lineTo(vx + vr, vy + vh)
  ctx.arcTo(vx, vy + vh, vx, vy + vh - vr, vr)
  ctx.lineTo(vx, vy + vr)
  ctx.arcTo(vx, vy, vx + vr, vy, vr)
  ctx.closePath()
  ctx.stroke()
  const eyeY = h * 0.41
  ctx.beginPath()
  ctx.arc(xOff + rw * 0.40, eyeY, rw * 0.05, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(xOff + rw * 0.60, eyeY, rw * 0.05, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(xOff + rw * 0.34, h * 0.60)
  ctx.lineTo(xOff + rw * 0.66, h * 0.60)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(xOff + rw * 0.50, hy)
  ctx.lineTo(xOff + rw * 0.50, h * 0.08)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(xOff + rw * 0.50, h * 0.05, rw * 0.04, 0, Math.PI * 2)
  ctx.stroke()
  return sampleEdgePixels(off, w, h, count)
}
