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
