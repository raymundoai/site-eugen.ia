// Returns up to `count` {x, y} points sampled from non-transparent pixels.
// Uses reservoir sampling (O(n), no full-array shuffle).
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
        if (result.length < count) {
          result.push({ x, y })
        } else {
          const j = (Math.random() * k) | 0
          if (j < count) result[j] = { x, y }
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

// 5 question marks at fixed positions, pixel-sampled
export function makeQuestionMarks(w, h, count) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#ffffff'
  const positions = [[0.20, 0.45], [0.50, 0.25], [0.80, 0.55], [0.35, 0.72], [0.65, 0.18]]
  const sizes    = [0.18, 0.20, 0.22, 0.19, 0.21]
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < 5; i++) {
    const fontSize = sizes[i] * h
    ctx.font = `900 ${fontSize}px Sora, sans-serif`
    ctx.fillText('?', positions[i][0] * w, positions[i][1] * h)
  }
  return samplePixels(off, w, h, count)
}

// Two road edges converging to vanishing point + center dashes
export function makeRoad(w, h, count) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = Math.max(3, w * 0.004)
  const vx = w * 0.5, vy = h * 0.15
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
  return samplePixels(off, w, h, count)
}
