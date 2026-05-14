# Particle System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar um sistema de partículas em dois níveis para a homepage — campo global com 3000 partículas douradas + morphing via scroll, e canvas por card de serviço com animações específicas (blackboard, engrenagens, robô).

**Architecture:** `ParticleField.jsx` (canvas fixo, `z-index: 0`, montado no AppRouter somente em `/`) gerencia 3000 partículas com Float32Array. `ServiceCanvas.jsx` (600 partículas por card) substitui o conteúdo do `.motion-panel` no ServicesShowcase. `particleShapes.js` gera targets via pixel-sampling de canvas offscreen. `main` já tem `position: relative; z-index: 1`, portanto o campo fica naturalmente atrás do conteúdo.

**Tech Stack:** React 19 hooks, Canvas 2D API, Float32Array, GSAP ScrollTrigger, OffscreenCanvas (fallback para `createElement('canvas')`), Vitest + vitest-canvas-mock

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `SITE_EUGENIA/src/utils/particleShapes.js` | Criar | Gera arrays `{x,y}` via pixel-sampling de canvas offscreen |
| `SITE_EUGENIA/src/components/ParticleField.jsx` | Criar | Canvas global, física ambiente, mouse repulsion, morphing via ScrollTrigger |
| `SITE_EUGENIA/src/components/ServiceCanvas.jsx` | Criar | Canvas por serviço, física spring, animações blackboard/gears/robot |
| `SITE_EUGENIA/src/app/AppRouter.jsx` | Modificar | Importar e montar `<ParticleField />` somente em `pathname === '/'` |
| `SITE_EUGENIA/src/components/ServicesShowcase.jsx` | Modificar | Importar `ServiceCanvas`, substituir conteúdo do `.motion-panel` |
| `SITE_EUGENIA/src/index.css` | Modificar | Adicionar `.particle-canvas-global` e `.service-canvas` |
| `SITE_EUGENIA/vite.config.js` | Modificar | Adicionar config de teste Vitest |
| `SITE_EUGENIA/package.json` | Modificar | Adicionar `vitest`, `@vitest/jsdom`, `vitest-canvas-mock` e script `test` |

---

### Task 1: CSS — classes do canvas de partículas

**Files:**
- Modify: `SITE_EUGENIA/src/index.css`

- [ ] **Step 1: Adicionar as classes ao final de `index.css`**

Localiza o final do arquivo e adiciona:

```css
/* ─── Particle System ─────────────────────────────── */

.particle-canvas-global {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  display: block;
}

.service-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
```

- [ ] **Step 2: Verificar que `.motion-panel` já tem `overflow: hidden`**

Linha 821 do `index.css` confirma:
```css
.motion-panel {
  position: absolute;
  inset: 0;
  overflow: hidden;
  ...
}
```
`overflow: hidden` já existe — o canvas do serviço ficará contido no card. Nada a mudar.

- [ ] **Step 3: Commit**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/index.css
git commit -m "style: adiciona classes CSS do sistema de partículas"
```

---

### Task 2: Vitest setup

**Files:**
- Modify: `SITE_EUGENIA/package.json`
- Modify: `SITE_EUGENIA/vite.config.js`

- [ ] **Step 1: Instalar dependências de teste**

```bash
cd /home/raymundo/projetos/site_eugenia/SITE_EUGENIA && npm install --save-dev vitest jsdom vitest-canvas-mock
```

- [ ] **Step 2: Adicionar script `test` no `package.json`**

Localiza a seção `"scripts"` e adiciona `"test"`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run"
},
```

- [ ] **Step 3: Adicionar config de teste no `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.js'],
  },
})
```

- [ ] **Step 4: Criar `SITE_EUGENIA/src/test-setup.js`**

```js
import 'vitest-canvas-mock'
```

- [ ] **Step 5: Rodar para confirmar que setup funciona**

```bash
cd /home/raymundo/projetos/site_eugenia/SITE_EUGENIA && npm test
```

Saída esperada: `No test files found` (ou `0 tests passed`) — sem erros de configuração.

- [ ] **Step 6: Commit**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/package.json SITE_EUGENIA/package-lock.json SITE_EUGENIA/vite.config.js SITE_EUGENIA/src/test-setup.js
git commit -m "chore: configura Vitest com jsdom e vitest-canvas-mock"
```

---

### Task 3: `particleShapes.js` — samplePixels + makeQuestionMarks + makeRoad

**Files:**
- Create: `SITE_EUGENIA/src/utils/particleShapes.js`

- [ ] **Step 1: Criar o arquivo com `samplePixels`, `makeQuestionMarks` e `makeRoad`**

```js
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
```

---

### Task 4: Testes — `makeQuestionMarks` e `makeRoad`

**Files:**
- Create: `SITE_EUGENIA/src/utils/particleShapes.test.js`

- [ ] **Step 1: Escrever os testes**

```js
import { describe, it, expect } from 'vitest'
import { makeQuestionMarks, makeRoad } from './particleShapes'

describe('makeQuestionMarks', () => {
  it('retorna array de objetos {x, y}', () => {
    const pts = makeQuestionMarks(400, 300, 100)
    expect(Array.isArray(pts)).toBe(true)
    if (pts.length > 0) {
      expect(pts[0]).toHaveProperty('x')
      expect(pts[0]).toHaveProperty('y')
    }
  })

  it('retorna no máximo count pontos', () => {
    const pts = makeQuestionMarks(400, 300, 50)
    expect(pts.length).toBeLessThanOrEqual(50)
  })
})

describe('makeRoad', () => {
  it('retorna array de objetos {x, y}', () => {
    const pts = makeRoad(400, 300, 100)
    expect(Array.isArray(pts)).toBe(true)
    if (pts.length > 0) {
      expect(pts[0]).toHaveProperty('x')
      expect(pts[0]).toHaveProperty('y')
    }
  })

  it('retorna no máximo count pontos', () => {
    const pts = makeRoad(400, 300, 50)
    expect(pts.length).toBeLessThanOrEqual(50)
  })
})
```

- [ ] **Step 2: Rodar os testes**

```bash
cd /home/raymundo/projetos/site_eugenia/SITE_EUGENIA && npm test
```

Saída esperada: `4 tests passed`

- [ ] **Step 3: Commit**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/utils/particleShapes.js SITE_EUGENIA/src/utils/particleShapes.test.js
git commit -m "feat: adiciona particleShapes.js com questionmarks e road"
```

---

### Task 5: `particleShapes.js` — makeBlackboard, makeGears, makeRobot

**Files:**
- Modify: `SITE_EUGENIA/src/utils/particleShapes.js`

- [ ] **Step 1: Adicionar as três funções restantes no final de `particleShapes.js`**

```js
// Blackboard with `checksVisible` (0–3) checkmarks shown
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

// Two interlocked gears — big (38%, 50%, r=28%, 10 teeth) + small (65%, 52%, r=18%, 7 teeth)
export function makeGears(w, h, angle, count = 600) {
  const off = makeOffscreen(w, h)
  const ctx = off.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#ffffff'
  _drawGear(ctx, w * 0.38, h * 0.50, w * 0.28, 10, angle)
  _drawGear(ctx, w * 0.65, h * 0.52, w * 0.18, 7, angle * -1.4286)
  return samplePixels(off, w, h, count)
}

function _drawGear(ctx, cx, cy, r, teeth, angle) {
  const inner = r * 0.72
  const hub   = r * 0.20
  const step  = (Math.PI * 2) / teeth
  ctx.beginPath()
  for (let i = 0; i < teeth; i++) {
    const a = angle + i * step
    const a0 = a - step * 0.48, a1 = a - step * 0.22
    const a2 = a + step * 0.22, a3 = a + step * 0.48
    if (i === 0) ctx.moveTo(cx + inner * Math.cos(a0), cy + inner * Math.sin(a0))
    else         ctx.lineTo(cx + inner * Math.cos(a0), cy + inner * Math.sin(a0))
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
  // Head (30%→70% x, 22%→78% y) with rounded corners
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
  // Visor (38%→62% x, 34%→54% y)
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
```

---

### Task 6: Testes — makeBlackboard, makeGears, makeRobot

**Files:**
- Modify: `SITE_EUGENIA/src/utils/particleShapes.test.js`

- [ ] **Step 1: Adicionar os testes para as três novas funções**

Adiciona ao final do arquivo de testes:

```js
import { makeBlackboard, makeGears, makeRobot } from './particleShapes'

describe('makeBlackboard', () => {
  it('retorna array de {x, y} com no máximo count pontos', () => {
    const pts = makeBlackboard(300, 300, 50, 0)
    expect(Array.isArray(pts)).toBe(true)
    expect(pts.length).toBeLessThanOrEqual(50)
  })

  it('aceita checksVisible de 0 a 3 sem erros', () => {
    expect(() => makeBlackboard(300, 300, 50, 0)).not.toThrow()
    expect(() => makeBlackboard(300, 300, 50, 3)).not.toThrow()
  })
})

describe('makeGears', () => {
  it('retorna array de {x, y}', () => {
    const pts = makeGears(400, 300, 0)
    expect(Array.isArray(pts)).toBe(true)
    if (pts.length > 0) {
      expect(pts[0]).toHaveProperty('x')
      expect(pts[0]).toHaveProperty('y')
    }
  })

  it('retorna resultado diferente para ângulos diferentes', () => {
    const a = makeGears(200, 200, 0)
    const b = makeGears(200, 200, Math.PI)
    // pelo menos um ponto deve diferir (engrenagens giraram)
    const same = a.length === b.length && a.every((p, i) => p.x === b[i]?.x && p.y === b[i]?.y)
    expect(same).toBe(false)
  })
})

describe('makeRobot', () => {
  it('retorna array de {x, y} com no máximo count pontos', () => {
    const pts = makeRobot(400, 400, 50)
    expect(Array.isArray(pts)).toBe(true)
    expect(pts.length).toBeLessThanOrEqual(50)
  })
})
```

- [ ] **Step 2: Rodar os testes**

```bash
cd /home/raymundo/projetos/site_eugenia/SITE_EUGENIA && npm test
```

Saída esperada: `10 tests passed`

- [ ] **Step 3: Commit**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/utils/particleShapes.js SITE_EUGENIA/src/utils/particleShapes.test.js
git commit -m "feat: completa particleShapes com blackboard, gears e robot"
```

---

### Task 7: `ParticleField.jsx` — canvas + inicialização + loop ambiente

**Files:**
- Create: `SITE_EUGENIA/src/components/ParticleField.jsx`

- [ ] **Step 1: Criar o componente com estrutura base**

```jsx
import { useEffect, useRef } from 'react'

const N = 3000
const TAU = Math.PI * 2
const OPA = [0.15, 0.25, 0.38]
const GOLD = '251,186,35'

export function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width = W
    canvas.height = H

    // Particle state — Float32Array para evitar GC pressure
    const px  = new Float32Array(N)
    const py  = new Float32Array(N)
    const vx  = new Float32Array(N)
    const vy  = new Float32Array(N)
    const tx  = new Float32Array(N)
    const ty  = new Float32Array(N)
    const rad = new Float32Array(N)
    const bkt = new Uint8Array(N)  // opacity bucket 0|1|2

    for (let i = 0; i < N; i++) {
      px[i]  = Math.random() * W
      py[i]  = Math.random() * H
      vx[i]  = (Math.random() - 0.5) * 0.4
      vy[i]  = (Math.random() - 0.5) * 0.4
      rad[i] = 1.0 + Math.random() * 1.5
      bkt[i] = (Math.random() * 3) | 0
    }

    let morphing = false

    // ─── Physics + render loop ─────────────────────
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
        px[i] += vx[i]
        py[i] += vy[i]
        // boundary wrap
        if (px[i] < 0)  px[i] += W
        else if (px[i] > W) px[i] -= W
        if (py[i] < 0)  py[i] += H
        else if (py[i] > H) py[i] -= H
      }

      // Batched render por bucket de opacidade
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

    // ─── Resize ────────────────────────────────────
    const onResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width  = W
      canvas.height = H
      morphing = false  // shape regenerada pelos ScrollTriggers na próxima entrada
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas-global" />
}
```

- [ ] **Step 2: Verificar no dev server que partículas douradas aparecem na homepage**

```bash
cd /home/raymundo/projetos/site_eugenia/SITE_EUGENIA && npm run dev
```

Abra `http://localhost:5173` — ainda não estará integrado ao AppRouter (próxima task), mas o componente já existe.

---

### Task 8: `ParticleField.jsx` — mouse repulsion + morph system

**Files:**
- Modify: `SITE_EUGENIA/src/components/ParticleField.jsx`

- [ ] **Step 1: Adicionar constantes de mouse e morfologia antes do `useEffect`**

Adiciona logo após as constantes existentes (`N`, `TAU`, etc.):

```js
const MOUSE_R  = 100
const MOUSE_R2 = MOUSE_R * MOUSE_R
```

- [ ] **Step 2: Dentro do `useEffect`, após a inicialização dos arrays, adicionar mouse tracking**

Adiciona logo antes do loop `tick()`:

```js
let mouseX = -9999, mouseY = -9999
const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
window.addEventListener('mousemove', onMouseMove)
```

- [ ] **Step 3: Dentro do loop de física do `tick`, adicionar mouse repulsion após o bloco de velocidade**

Localiza `px[i] += vx[i]` e, ANTES dessa linha, adiciona o bloco de repulsão:

```js
        // Mouse repulsion
        const dx = px[i] - mouseX
        const dy = py[i] - mouseY
        const d2 = dx * dx + dy * dy
        if (d2 < MOUSE_R2 && d2 > 0.01) {
          const d    = Math.sqrt(d2)
          const f    = (MOUSE_R - d) / MOUSE_R * 4
          vx[i]    += (dx / d) * f
          vy[i]    += (dy / d) * f
        }
```

- [ ] **Step 4: Adicionar funções `setShape` e `clearShape` após o bloco de resize, antes do `return`**

```js
    function setShape(pts) {
      if (!pts || pts.length === 0) { morphing = false; return }
      for (let i = 0; i < Math.min(800, pts.length); i++) {
        tx[i] = pts[i].x
        ty[i] = pts[i].y
      }
      morphing = true
    }

    function clearShape() { morphing = false }
```

Essas funções ficam no closure para acessar `tx`, `ty`, `morphing`.

- [ ] **Step 5: Adicionar `onMouseMove` ao cleanup do `useEffect`**

Localiza o `return () => {` e adiciona:

```js
      window.removeEventListener('mousemove', onMouseMove)
```

- [ ] **Step 6: Commit (parcial — ScrollTrigger vem na próxima task)**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/components/ParticleField.jsx
git commit -m "feat: ParticleField com física ambiente e mouse repulsion"
```

---

### Task 9: `ParticleField.jsx` — ScrollTrigger integration

**Files:**
- Modify: `SITE_EUGENIA/src/components/ParticleField.jsx`

- [ ] **Step 1: Adicionar imports de GSAP no topo do arquivo**

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { makeQuestionMarks, makeRoad } from '../utils/particleShapes'

gsap.registerPlugin(ScrollTrigger)
```

- [ ] **Step 2: Dentro do `useEffect`, após `clearShape`, criar os dois ScrollTriggers**

Adiciona antes do `return () => {`:

```js
    // ScrollTrigger: ProblemSection → question marks
    const st1 = ScrollTrigger.create({
      trigger: '.problem-text-phase',
      start: 'top center',
      end: 'bottom center',
      onEnter:     () => setShape(makeQuestionMarks(W, H, 800)),
      onLeave:     clearShape,
      onEnterBack: () => setShape(makeQuestionMarks(W, H, 800)),
      onLeaveBack: clearShape,
    })

    // ScrollTrigger: ServicesShowcase text phase → road
    const st2 = ScrollTrigger.create({
      trigger: '.showcase-text-phase',
      start: 'top center',
      end: 'bottom center',
      onEnter:     () => setShape(makeRoad(W, H, 800)),
      onLeave:     clearShape,
      onEnterBack: () => setShape(makeRoad(W, H, 800)),
      onLeaveBack: clearShape,
    })
```

- [ ] **Step 3: Adicionar cleanup dos ScrollTriggers**

No bloco `return () => {`:

```js
      st1.kill()
      st2.kill()
```

- [ ] **Step 4: Commit**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/components/ParticleField.jsx
git commit -m "feat: ParticleField com ScrollTrigger morphing (question marks + road)"
```

---

### Task 10: `ServiceCanvas.jsx`

**Files:**
- Create: `SITE_EUGENIA/src/components/ServiceCanvas.jsx`

- [ ] **Step 1: Criar o componente completo**

```jsx
import { useEffect, useRef } from 'react'
import { makeBlackboard, makeGears, makeRobot } from '../utils/particleShapes'

const SN   = 600
const TAU  = Math.PI * 2
const OPA  = [0.15, 0.25, 0.38]
const GOLD = '251,186,35'

export function ServiceCanvas({ serviceIndex, active }) {
  const canvasRef  = useRef(null)
  const controlRef = useRef({ type: 'scatter' })  // animation command
  const txRef      = useRef(new Float32Array(SN))
  const tyRef      = useRef(new Float32Array(SN))

  // Reage a mudanças de `active`
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
      // blackboard: fase 0 imediata, loop de 800ms pelo tick
      const pts = makeBlackboard(W, H, SN, 0)
      _copyTargets(pts, txRef.current, tyRef.current)
      controlRef.current = { type: 'blackboard', phase: 0, timer: 0 }
    } else if (serviceIndex === 1) {
      // gears: targets recalculados a cada frame pelo tick
      controlRef.current = { type: 'gears', angle: 0 }
    } else {
      // robot: shape estática, targets copiados uma vez
      const pts = makeRobot(W, H, SN)
      _copyTargets(pts, txRef.current, tyRef.current)
      controlRef.current = { type: 'morph' }
    }
  }, [active, serviceIndex])

  // Loop de animação — montado uma vez por instância
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
      const dt  = lastTs ? ts - lastTs : 16
      lastTs = ts
      ctx.clearRect(0, 0, W, H)

      const cmd = controlRef.current

      // ─── Atualiza targets se necessário ──────────
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

      // ─── Física ───────────────────────────────────
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
        // Clamp (sem wrap no canvas pequeno)
        if (px[i] < 0) px[i] = 0
        else if (px[i] > W) px[i] = W
        if (py[i] < 0) py[i] = 0
        else if (py[i] > H) py[i] = H
      }

      // ─── Render (batched por opacidade) ───────────
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
  }, [serviceIndex])  // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className="service-canvas" />
}

// Helper: copia pts[{x,y}] para Float32Arrays tx e ty
function _copyTargets(pts, tx, ty) {
  for (let i = 0; i < Math.min(SN, pts.length); i++) {
    tx[i] = pts[i].x
    ty[i] = pts[i].y
  }
}
```

- [ ] **Step 2: Commit**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/components/ServiceCanvas.jsx
git commit -m "feat: ServiceCanvas com blackboard, gears e robot"
```

---

### Task 11: AppRouter.jsx — montar `<ParticleField />` na homepage

**Files:**
- Modify: `SITE_EUGENIA/src/app/AppRouter.jsx`

- [ ] **Step 1: Adicionar o import do ParticleField**

Localiza a linha:
```js
import { useLenis } from '../hooks/useLenis'
```
E adiciona logo após:
```js
import { ParticleField } from '../components/ParticleField'
```

- [ ] **Step 2: Montar o componente condicionado ao pathname**

Localiza o bloco `return (` e adiciona `<ParticleField />` logo após `<BackgroundField />`, dentro de um condicional:

```jsx
  return (
    <>
      <BackgroundField />
      {location.pathname === '/' && <ParticleField />}
      <GlobalCursor />
      <Header />
      <main>
        <Routes>
          ...
        </Routes>
      </main>
      <Footer />
    </>
  )
```

- [ ] **Step 3: Verificar no dev server**

```bash
cd /home/raymundo/projetos/site_eugenia/SITE_EUGENIA && npm run dev
```

Em `http://localhost:5173`: partículas douradas visíveis na homepage, atrás do conteúdo. Em `/servicos` ou `/sobre`: sem partículas.

Verificar também que ao rolar até a seção `ProblemSection` (`.problem-text-phase`), as partículas formam pontos de interrogação; ao rolar até `ServicesShowcase` (`.showcase-text-phase`), formam a estrada.

- [ ] **Step 4: Commit**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/app/AppRouter.jsx
git commit -m "feat: monta ParticleField na homepage via AppRouter"
```

---

### Task 12: ServicesShowcase.jsx — substituir `.motion-panel` por `<ServiceCanvas />`

**Files:**
- Modify: `SITE_EUGENIA/src/components/ServicesShowcase.jsx`

- [ ] **Step 1: Adicionar o import do ServiceCanvas**

Localiza a linha:
```js
import { services } from '../data/siteContent'
```
E adiciona logo abaixo:
```js
import { ServiceCanvas } from './ServiceCanvas'
```

- [ ] **Step 2: Remover o import dos ícones Lucide que não serão mais usados dentro do `.motion-panel`**

A linha abaixo pode ser mantida (ícones ainda são usados em `media-readout`):
```js
import { BrainCircuit, GraduationCap, Workflow } from 'lucide-react'
```
Nada a remover — os ícones continuam em `media-readout`.

- [ ] **Step 3: Substituir o conteúdo interno do `.motion-panel`**

Localiza o bloco:
```jsx
                    <div className={active === index ? 'motion-panel active' : 'motion-panel'} key={service.title}>
                      <Icon size={34} />
                      <span>{service.signal}</span>
                      <div className="motion-lines">
                        {Array.from({ length: 10 }).map((_, i) => <i key={i} />)}
                      </div>
                    </div>
```

Substitui por:
```jsx
                    <div className={active === index ? 'motion-panel active' : 'motion-panel'} key={service.title}>
                      <ServiceCanvas serviceIndex={index} active={active === index} />
                    </div>
```

- [ ] **Step 4: Remover a variável `ActiveIcon` e o `const icons = [...]` se não mais utilizados**

Verificar: `ActiveIcon` ainda é usada no `media-readout`:
```jsx
<div className="media-readout">
  <ActiveIcon size={22} />
  <span>{services[active].title}</span>
</div>
```
Manter `icons` e `ActiveIcon`. Apenas o `Icon` dentro do map deixa de ser necessário:

Localiza `const icons = [GraduationCap, Workflow, BrainCircuit]` — **manter**, pois `media-readout` ainda usa.

Dentro do `.map((service, index) =>`, o `const Icon = icons[index]` pode ser removido:

Localiza:
```jsx
                {services.map((service, index) => {
                  const Icon = icons[index]
                  return (
```
Substitui por:
```jsx
                {services.map((service, index) => (
```
E remove o `return (` / `)` extras ajustando a indentação (agora é arrow function implícita).

O bloco final do `.map` fica:
```jsx
                {services.map((service, index) => (
                  <div className={active === index ? 'motion-panel active' : 'motion-panel'} key={service.title}>
                    <ServiceCanvas serviceIndex={index} active={active === index} />
                  </div>
                ))}
```

- [ ] **Step 5: Verificar no dev server**

```bash
cd /home/raymundo/projetos/site_eugenia/SITE_EUGENIA && npm run dev
```

Em `http://localhost:5173`, rola até a seção de serviços:
- Card ativo (index 0 por padrão): partículas devem convergir para o blackboard com checks animados
- Ao rolar e ativar index 1: partículas formam engrenagens girando
- Ao rolar e ativar index 2: partículas formam cabeça de robô
- Cards inativos: partículas se dispersam aleatoriamente dentro do card

- [ ] **Step 6: Commit final**

```bash
cd /home/raymundo/projetos/site_eugenia && git add SITE_EUGENIA/src/components/ServicesShowcase.jsx
git commit -m "feat: integra ServiceCanvas nos cards de serviço do ServicesShowcase"
```

---

## Checklist de verificação visual final

Após todas as tasks, verificar na homepage:

- [ ] 3000 partículas douradas flutuando discretamente em toda a página
- [ ] Mouse repele partículas próximas (raio ~100px)
- [ ] Ao entrar na seção de frase digitada ("Você sabe que IA é importante…"): 800 partículas formam 5 pontos de interrogação
- [ ] Ao sair da seção: partículas dispersam
- [ ] Ao entrar na fase de texto do ServicesShowcase ("Mostramos o caminho…"): 800 partículas formam estrada em perspectiva
- [ ] Cards de serviço: blackboard com checks animados / engrenagens girando / cabeça de robô
- [ ] Em `/servicos` ou qualquer outra rota: nenhuma partícula global
- [ ] Sem quedas de performance perceptíveis (< 4ms por frame)
