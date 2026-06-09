# Inspira UI Effects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar três efeitos visuais WebGL/Canvas ao site Eugen.IA: fundo animado com blobs de luz fluidos, lente de distorção no header, e trail de partículas aurora que substitui o cursor CSS.

**Architecture:** BackgroundScene renderiza um canvas WebGL full-page com shader FBM. HeaderLens lê esse canvas como texture e aplica distorção de lente dentro do `<header>`. AuroraCursor usa Canvas 2D com blending aditivo para o trail de partículas. Os três são islands Astro com `client:load`. Um singleton de módulo (`background-singleton.js`) compartilha o canvas do BackgroundScene com o HeaderLens sem consulta ao DOM.

**Tech Stack:** Three.js 0.175+, Canvas 2D API, React 18, Astro 4 (`client:load`)

---

## Mapa de Arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/components/three/background-singleton.js` | Criar | Singleton: registra e expõe o canvas do BackgroundScene |
| `src/components/three/BackgroundScene.jsx` | Criar | WebGL renderer + shader FBM com blobs azul/âmbar |
| `src/components/three/BackgroundScene.css` | Criar | Canvas fixed full-page z-index -1 |
| `src/components/three/HeaderLens.jsx` | Criar | Canvas WebGL dentro do header com shader de distorção |
| `src/components/three/HeaderLens.css` | Criar | Canvas absolute inset-0 z-index 0 |
| `src/components/ui/AuroraCursor.jsx` | Criar | Canvas 2D com partículas aurora trail (substitui CustomCursor) |
| `src/components/ui/AuroraCursor.css` | Criar | Canvas fixed z-index 9999 + cursor: none |
| `src/layouts/Layout.astro` | Modificar | Trocar CustomCursor → AuroraCursor, adicionar BackgroundScene |
| `src/components/layout/Header.jsx` | Modificar | Integrar HeaderLens como primeiro filho do `<header>` |
| `src/components/layout/Header.css` | Modificar | Adicionar overflow: hidden + z-index para conteúdo interno |
| `package.json` | Modificar | Adicionar dependência `three` |
| `CLAUDE.md` | Modificar | Atualizar restrição de Three.js |

---

## Task 1: Setup — Three.js, singleton e CSS do header

**Files:**
- Modify: `package.json`
- Modify: `CLAUDE.md`
- Create: `src/components/three/background-singleton.js`
- Modify: `src/components/layout/Header.css`

- [ ] **Step 1: Instalar three**

```bash
npm install three
```

Saída esperada: `added 1 package` sem erros.

- [ ] **Step 2: Verificar instalação**

```bash
node -e "import('three').then(m => console.log(m.REVISION))"
```

Saída esperada: número da revisão (ex: `175`).

- [ ] **Step 3: Atualizar CLAUDE.md**

No arquivo `/home/raymundo/projetos/site_eugenia/CLAUDE.md`, seção **Restrições**, substituir a linha:
```
- Sem Three.js, Framer Motion, Lottie
```
por:
```
- Three.js: permitido para BackgroundScene e HeaderLens (aprovado para efeitos WebGL)
- Sem Framer Motion, Lottie
```

- [ ] **Step 4: Criar background-singleton.js**

Criar `src/components/three/background-singleton.js`:

```js
let _canvas = null

export function registerBackgroundCanvas(canvas) {
  _canvas = canvas
}

export function getBackgroundCanvas() {
  return _canvas
}
```

- [ ] **Step 5: Atualizar Header.css para conter o canvas do HeaderLens**

Ao final do arquivo `src/components/layout/Header.css`, adicionar:

```css
/* Contém o HeaderLens canvas e garante z-index correto do conteúdo */
.header { overflow: hidden; }
.header-inner { position: relative; z-index: 1; }
.header-mobile-menu { position: relative; z-index: 1; }
```

- [ ] **Step 6: Verificar que o dev server ainda sobe sem erros**

```bash
npm run dev -- --host 2>&1 | head -20
```

Saída esperada: `Local: http://localhost:4321/` sem erros de build.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json CLAUDE.md src/components/three/background-singleton.js src/components/layout/Header.css
git commit -m "chore: instala three.js e prepara singleton + CSS header para lens"
```

---

## Task 2: BackgroundScene — WebGL canvas com shader FBM

**Files:**
- Create: `src/components/three/BackgroundScene.jsx`
- Create: `src/components/three/BackgroundScene.css`

- [ ] **Step 1: Criar BackgroundScene.css**

Criar `src/components/three/BackgroundScene.css`:

```css
.bg-scene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
```

- [ ] **Step 2: Criar BackgroundScene.jsx**

Criar `src/components/three/BackgroundScene.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import {
  WebGLRenderer, OrthographicCamera, Scene,
  PlaneGeometry, ShaderMaterial, Mesh, Vector2,
} from 'three'
import { registerBackgroundCanvas } from './background-singleton.js'
import './BackgroundScene.css'

const VERT = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const FRAG = /* glsl */`
uniform float uTime;
uniform vec2  uMouse;
uniform float uTheme;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p) {
  vec2 i=floor(p), f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.1;a*=0.5;}return v;}

void main() {
  vec2 uv = vUv;
  vec2 mOff = (uMouse - 0.5) * 0.04;

  vec2  bC = vec2(0.25, 0.65) + mOff * 0.6;
  float bF = fbm(uv*2.2 + vec2(uTime*0.08, uTime*0.05));
  float bM = smoothstep(0.62, 0.35, distance(uv + bF*0.15, bC));

  vec2  aC = vec2(0.75, 0.35) - mOff * 0.4;
  float aF = fbm(uv*2.0 + vec2(-uTime*0.06, uTime*0.09) + 3.7);
  float aM = smoothstep(0.58, 0.30, distance(uv + aF*0.12, aC));

  float intensity = mix(0.18, 0.09, uTheme);

  vec3 blue  = vec3(0.114, 0.306, 0.847) * bM * intensity;
  vec3 amber = vec3(0.984, 0.729, 0.137) * aM * intensity;
  vec3 bg    = mix(vec3(0.059,0.075,0.102), vec3(0.973,0.980,0.988), uTheme);

  gl_FragColor = vec4(bg + blue + amber, 1.0);
}
`

export default function BackgroundScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
    } catch {
      return
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    registerBackgroundCanvas(canvas)

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const scene = new Scene()

    const uniforms = {
      uTime:  { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uTheme: { value: document.documentElement.dataset.theme === 'light' ? 1.0 : 0.0 },
    }

    scene.add(new Mesh(
      new PlaneGeometry(2, 2),
      new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms }),
    ))

    let targetMX = 0.5, targetMY = 0.5
    const onMove = (e) => {
      targetMX = e.clientX / window.innerWidth
      targetMY = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lastTime = 0, rafId

    const tick = (time) => {
      rafId = requestAnimationFrame(tick)
      const dt = (time - lastTime) / 1000
      lastTime = time
      if (!prefersReduced) {
        uniforms.uTime.value += dt
        uniforms.uMouse.value.x += (targetMX - uniforms.uMouse.value.x) * 0.05
        uniforms.uMouse.value.y += (targetMY - uniforms.uMouse.value.y) * 0.05
      }
      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(tick)

    const themeObs = new MutationObserver(() => {
      uniforms.uTheme.value = document.documentElement.dataset.theme === 'light' ? 1.0 : 0.0
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const onResize = () => renderer.setSize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      themeObs.disconnect()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="bg-scene" aria-hidden="true" />
}
```

- [ ] **Step 3: Testar visualmente o BackgroundScene isolado**

Adicione temporariamente ao `Layout.astro` (não comitar ainda):
```astro
import BackgroundScene from '../components/three/BackgroundScene.jsx'
...
<BackgroundScene client:load />
```

Abrir `http://localhost:4321/` no browser. Verificar:
- Fundo não é mais preto puro — dois blobs de luz difusa (azul e âmbar) visíveis sutilmente
- Mover mouse: blobs se deslocam levemente em paralaxe
- Sem erros no console do browser
- Alternar tema light/dark (botão no header): blobs ficam mais suaves no tema light, fundo muda para branco

- [ ] **Step 4: Reverter adição temporária ao Layout.astro**

Remover as linhas adicionadas no step anterior — a integração oficial acontece na Task 5.

- [ ] **Step 5: Commit**

```bash
git add src/components/three/BackgroundScene.jsx src/components/three/BackgroundScene.css
git commit -m "feat: BackgroundScene — WebGL canvas com shader FBM azul/âmbar"
```

---

## Task 3: AuroraCursor — trail Canvas 2D substitui CustomCursor

**Files:**
- Create: `src/components/ui/AuroraCursor.jsx`
- Create: `src/components/ui/AuroraCursor.css`

O `CustomCursor.jsx` e `CustomCursor.css` existentes **não são deletados** nesta task — serão removidos das importações na Task 5.

- [ ] **Step 1: Criar AuroraCursor.css**

Criar `src/components/ui/AuroraCursor.css`:

```css
@media (pointer: fine) {
  * { cursor: none !important; }
}

.aurora-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}
```

- [ ] **Step 2: Criar AuroraCursor.jsx**

Criar `src/components/ui/AuroraCursor.jsx`:

```jsx
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
```

- [ ] **Step 3: Testar AuroraCursor isolado**

Adicione temporariamente ao `Layout.astro` (não comitar ainda):
```astro
import AuroraCursor from '../components/ui/AuroraCursor.jsx'
...
<AuroraCursor client:load />
```
(mantendo CustomCursor também por agora — os dois juntos para comparar)

Abrir `http://localhost:4321/` no browser. Mover mouse rapidamente. Verificar:
- Trail de partículas coloridas seguindo o cursor
- Cores oscilam entre azul e amarelo
- Partículas caem levemente com gravidade e somem
- Ponto amarelo central na posição exata do cursor
- Em tema light: partículas ainda visíveis sobre fundo claro

- [ ] **Step 4: Reverter adição temporária ao Layout.astro**

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/AuroraCursor.jsx src/components/ui/AuroraCursor.css
git commit -m "feat: AuroraCursor — trail Canvas 2D com partículas aurora boreal"
```

---

## Task 4: HeaderLens — shader de distorção dentro do header

**Files:**
- Create: `src/components/three/HeaderLens.jsx`
- Create: `src/components/three/HeaderLens.css`

- [ ] **Step 1: Criar HeaderLens.css**

Criar `src/components/three/HeaderLens.css`:

```css
.header-lens {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}
```

- [ ] **Step 2: Criar HeaderLens.jsx**

Criar `src/components/three/HeaderLens.jsx`:

```jsx
import { useEffect, useRef } from 'react'
import {
  WebGLRenderer, OrthographicCamera, Scene,
  PlaneGeometry, ShaderMaterial, Mesh, Vector4, CanvasTexture,
} from 'three'
import { getBackgroundCanvas } from './background-singleton.js'
import './HeaderLens.css'

const VERT = /* glsl */`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`

const FRAG = /* glsl */`
uniform sampler2D uBg;
uniform float uTime;
uniform float uRatio;
uniform vec4  uGlass;
varying vec2 vUv;

float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

void main() {
  // Map UV do header → UV do background (header está no topo da viewport)
  // vUv.y=1 (topo) → bgUV.y=1.0 (topo do bg); vUv.y=0 (base) → bgUV.y=1.0-uRatio
  vec2 bgUV = vec2(vUv.x, 1.0 - uRatio * (1.0 - vUv.y));

  // Distorção de lente animada
  float nx = noise(vUv * 5.5 + vec2(uTime * 0.14, 0.0));
  float ny = noise(vUv * 5.5 + vec2(0.0, uTime * 0.11) + 7.3);
  vec2 dist = vec2(nx, ny) * 0.022 - 0.011;

  vec4 bg = texture2D(uBg, bgUV + dist);
  gl_FragColor = mix(bg, uGlass, 0.68);
}
`

function glassColor(theme) {
  return theme === 'light'
    ? new Vector4(1.0, 1.0, 1.0, 0.72)
    : new Vector4(0.059, 0.075, 0.102, 0.72)
}

export default function HeaderLens() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const header = canvas.parentElement
    if (!header) return

    let renderer
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false })
    } catch {
      return
    }

    const w = window.innerWidth
    const h = header.offsetHeight || 80
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const scene = new Scene()

    const theme = document.documentElement.dataset.theme || 'dark'
    const uniforms = {
      uBg:    { value: null },
      uTime:  { value: 0 },
      uRatio: { value: h / window.innerHeight },
      uGlass: { value: glassColor(theme) },
    }

    scene.add(new Mesh(
      new PlaneGeometry(2, 2),
      new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true }),
    ))

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let texture = null
    let lastTime = 0
    let rafId
    let initAttempts = 0

    const initTexture = () => {
      if (texture) return
      if (initAttempts++ > 180) return  // desiste após ~3s (60fps × 3)
      const bgCanvas = getBackgroundCanvas()
      if (!bgCanvas) return
      texture = new CanvasTexture(bgCanvas)
      uniforms.uBg.value = texture
    }

    const tick = (time) => {
      rafId = requestAnimationFrame(tick)
      initTexture()
      if (!uniforms.uBg.value) return
      const dt = (time - lastTime) / 1000
      lastTime = time
      if (!prefersReduced) uniforms.uTime.value += dt
      if (texture) texture.needsUpdate = true
      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(tick)

    const themeObs = new MutationObserver(() => {
      uniforms.uGlass.value = glassColor(document.documentElement.dataset.theme || 'dark')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const resObs = new ResizeObserver(() => {
      const nw = window.innerWidth
      const nh = header.offsetHeight || 80
      renderer.setSize(nw, nh)
      uniforms.uRatio.value = nh / window.innerHeight
    })
    resObs.observe(header)

    return () => {
      cancelAnimationFrame(rafId)
      themeObs.disconnect()
      resObs.disconnect()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="header-lens" aria-hidden="true" />
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/three/HeaderLens.jsx src/components/three/HeaderLens.css
git commit -m "feat: HeaderLens — shader de distorção WebGL dentro do header"
```

---

## Task 5: Layout.astro — integrar BackgroundScene e AuroraCursor

**Files:**
- Modify: `src/layouts/Layout.astro`

- [ ] **Step 1: Atualizar Layout.astro**

Substituir o conteúdo completo de `src/layouts/Layout.astro` por:

```astro
---
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.astro'
import ChatFloat from '../components/chat/ChatFloat.jsx'
import AuroraCursor from '../components/ui/AuroraCursor.jsx'
import BackgroundScene from '../components/three/BackgroundScene.jsx'
import '../styles/global.css'

interface Props {
  title: string
  description: string
}

const { title, description } = Astro.props
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <!-- Anti-flash tema: roda antes do render -->
    <script is:inline>
      ;(function () {
        var saved = localStorage.getItem('theme')
        var system = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
        document.documentElement.dataset.theme = saved || system
      })()
    </script>
  </head>
  <body>
    <BackgroundScene client:load />
    <AuroraCursor client:load />
    <Header client:load />
    <main>
      <slot />
    </main>
    <Footer />
    <ChatFloat pathname={Astro.url.pathname} client:load />

    <!-- Lenis + GSAP ScrollTrigger (inicializa após DOM) -->
    <script>
      import '../scripts/animations.js'
    </script>
  </body>
</html>
```

- [ ] **Step 2: Verificar no browser**

Abrir `http://localhost:4321/`. Verificar:
- Background com blobs azul/âmbar visível atrás de todo o conteúdo
- Cursor com trail de partículas aurora
- Header com glass pill ainda visível e funcional
- Nenhum erro no console

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: Layout.astro — integra BackgroundScene e AuroraCursor"
```

---

## Task 6: Header.jsx — integrar HeaderLens

**Files:**
- Modify: `src/components/layout/Header.jsx`

- [ ] **Step 1: Adicionar import do HeaderLens**

No topo do arquivo `src/components/layout/Header.jsx`, após as importações existentes, adicionar:

```jsx
import HeaderLens from '../three/HeaderLens.jsx'
```

O arquivo começa com:
```jsx
import { useState, useEffect } from 'react'
import Button from '../ui/Button.jsx'
import './Header.css'
```

Adicionar após a linha `import './Header.css'`:
```jsx
import HeaderLens from '../three/HeaderLens.jsx'
```

- [ ] **Step 2: Inserir HeaderLens dentro do `<header>`**

Localizar o retorno JSX do componente. A abertura é:
```jsx
  return (
    <header className={`header${scrolled ? ' header--condensed' : ''}`}>
      <div className={`header-inner${scrolled ? ' header-inner--pill' : ' header-inner--full'}`}>
```

Adicionar `<HeaderLens />` como primeiro filho do `<header>`, antes do `<div className="header-inner...">`:

```jsx
  return (
    <header className={`header${scrolled ? ' header--condensed' : ''}`}>
      <HeaderLens />
      <div className={`header-inner${scrolled ? ' header-inner--pill' : ' header-inner--full'}`}>
```

O resto do arquivo permanece idêntico.

- [ ] **Step 3: Verificar no browser**

Abrir `http://localhost:4321/`. Verificar:
- Header exibe o efeito de distorção/lente sobre os blobs do background
- Header-inner (pill/full) ainda visível e legível
- Links de navegação funcionam normalmente
- Scroll: header transição expanded → pill funciona
- Tema light: header adapta cor do glass
- Nenhum erro no console

- [ ] **Step 4: Verificar build de produção**

```bash
npm run build 2>&1 | tail -20
```

Saída esperada: sem erros, `dist/` gerado com sucesso.

- [ ] **Step 5: Verificar bundle**

```bash
du -sh dist/ && find dist -name "*.js" | xargs du -sh | sort -h | tail -10
```

Confirmar que o bundle principal não excede 400kb gzipped. Three.js adiciona ~85kb gzipped.

- [ ] **Step 6: Commit final**

```bash
git add src/components/layout/Header.jsx
git commit -m "feat: Header — integra HeaderLens com shader de distorção WebGL"
```

---

## Verificação Final

Após todos os tasks, abrir o browser e verificar:

1. **Home** (`/`) — background fluido visível, cursor aurora, header com lente
2. **Scroll** — blobs se deslocam sutilmente em paralaxe com o mouse
3. **Header pill** (após scroll de 80px) — efeito de lente ainda presente
4. **Página interna** (ex: `/clinicas`) — todos os três efeitos funcionam
5. **Tema light** (toggle) — fundo vira branco com blobs mais suaves, partículas visíveis
6. **Mobile** (DevTools → 375px) — cursor não aparece (touch), background funciona
7. **Console** — zero erros WebGL ou JS

Se o header exibir um canvas em branco (sem distorção), significa que `BackgroundScene` ainda não registrou o canvas quando `HeaderLens` tentou inicializar. Isso é normal nos primeiros 1-2 frames — o mecanismo de retry via `initAttempts` resolve automaticamente.
