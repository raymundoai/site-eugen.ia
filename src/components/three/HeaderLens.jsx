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

    const geometry = new PlaneGeometry(2, 2)
    const material = new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true })
    scene.add(new Mesh(geometry, material))

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let texture = null
    let lastTime = performance.now()
    let rafId
    let initAttempts = 0

    const initTexture = () => {
      if (texture) return
      if (initAttempts++ > 180) return
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
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="header-lens" aria-hidden="true" />
}
