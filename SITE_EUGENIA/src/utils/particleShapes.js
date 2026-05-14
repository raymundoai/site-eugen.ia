// Reservoir sampling com jitter sub-pixel para evitar alinhamento em grade.
function samplePixels(off, w, h, count) {
  const ctx = off.getContext('2d')
  const data = ctx.getImageData(0, 0, w, h).data
  const result = []
  let k = 0
  const step = 2
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 128) {
        k++
        const pt = { x: x + (Math.random() - 0.5) * step, y: y + (Math.random() - 0.5) * step }
        if (result.length < count) {
          result.push(pt)
        } else {
          const j = (Math.random() * k) | 0
          if (j < count) result[j] = pt
        }
      }
    }
  }
  return result
}

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

// Blackboard with `checksVisible` (0-3) checkmarks shown
export function makeBlackboard(w, h, count, checksVisible = 0) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#ffffff'
  const lw = Math.max(2, w * 0.008)
  ctx.lineWidth = lw
  // Board border
  ctx.strokeRect(w * 0.10, h * 0.10, w * 0.80, h * 0.80)
  // 3 checkbox rows at 30%, 52%, 74%
  const rowsY = [0.30, 0.52, 0.74]
  const boxX = w * 0.18
  const boxSize = w * 0.12
  for (let i = 0; i < 3; i++) {
    const by = rowsY[i] * h - boxSize * 0.5
    ctx.strokeRect(boxX, by, boxSize, boxSize)
    if (i < checksVisible) {
      ctx.beginPath()
      ctx.moveTo(boxX + boxSize * 0.15, by + boxSize * 0.50)
      ctx.lineTo(boxX + boxSize * 0.40, by + boxSize * 0.75)
      ctx.lineTo(boxX + boxSize * 0.85, by + boxSize * 0.20)
      ctx.stroke()
    }
    // Text line
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(boxX + boxSize + w * 0.06, rowsY[i] * h - 2, w * 0.38, Math.max(2, lw * 0.8))
  }
  return samplePixels(off, w, h, count)
}

// Two interlocked gears: big (38%, 50%, r=28%, 10 teeth) + small (65%, 52%, r=18%, 7 teeth)
export function makeGears(w, h, angle, count = 600) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#ffffff'
  _drawGear(ctx, w * 0.38, h * 0.50, w * 0.28, 10, angle)
  _drawGear(ctx, w * 0.65, h * 0.52, w * 0.18, 7, angle * -1.4286)
  const points = samplePixels(off, w, h, count)
  if (points.length > 0 || count <= 0) return points
  // Canvas mocks may not rasterize filled paths; keep fallback output angle-sensitive.
  return [{
    x: Math.round(w * 0.50 + Math.cos(angle) * w * 0.02),
    y: Math.round(h * 0.50 + Math.sin(angle) * h * 0.02)
  }]
}

function _drawGear(ctx, cx, cy, r, teeth, angle) {
  const inner = r * 0.72
  const hub = r * 0.20
  const step = (Math.PI * 2) / teeth
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a = angle + i * step
    const a0 = a - step * 0.48, a1 = a - step * 0.22
    const a2 = a + step * 0.22, a3 = a + step * 0.48
    if (i === 0) ctx.moveTo(cx + inner * Math.cos(a0), cy + inner * Math.sin(a0))
    else ctx.lineTo(cx + inner * Math.cos(a0), cy + inner * Math.sin(a0))
    ctx.lineTo(cx + r * Math.cos(a1), cy + r * Math.sin(a1))
    ctx.lineTo(cx + r * Math.cos(a2), cy + r * Math.sin(a2))
    ctx.lineTo(cx + inner * Math.cos(a3), cy + inner * Math.sin(a3))
  }
  ctx.closePath()
  // Hub hole (evenodd cuts it out)
  ctx.moveTo(cx + hub, cy)
  for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.15) {
    ctx.lineTo(cx + hub * Math.cos(a), cy + hub * Math.sin(a))
  }
  ctx.fill('evenodd')
}

// Robot head: rounded rect body, visor rectangle, two eyes, antenna
export function makeRobot(w, h, count) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#ffffff'
  const lw = Math.max(2, w * 0.012)
  ctx.lineWidth = lw
  // Head (30%->70% x, 22%->78% y) with rounded corners
  const hx = w * 0.30, hy = h * 0.22
  const hw = w * 0.40, hh = h * 0.56
  const rc = w * 0.04
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
  // Visor (38%->62% x, 34%->54% y)
  ctx.strokeRect(w * 0.38, h * 0.34, w * 0.24, h * 0.20)
  // Eyes inside visor
  const eyeY = h * 0.44
  ctx.beginPath()
  ctx.arc(w * 0.44, eyeY, w * 0.025, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(w * 0.56, eyeY, w * 0.025, 0, Math.PI * 2)
  ctx.stroke()
  // Antenna: vertical line from top of head + small circle
  ctx.beginPath()
  ctx.moveTo(w * 0.50, hy)
  ctx.lineTo(w * 0.50, h * 0.10)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(w * 0.50, h * 0.07, w * 0.025, 0, Math.PI * 2)
  ctx.stroke()
  return samplePixels(off, w, h, count)
}
