# Spec — Efeitos Inspira UI (BackgroundScene + HeaderLens + AuroraCursor)

**Data:** 2026-06-08
**Escopo:** Três novos componentes visuais WebGL/Canvas sem alteração de copy, rotas ou estrutura
**Dependência:** Executa após `2026-06-08-ui-redesign-design.md` (fase base já implementada)
**Ambiente:** Local apenas. Nenhum deploy em S3/AWS.

---

## 1. Contexto

Site Eugen.IA (Astro 4 + React 18, output estático para S3). O redesign base implementou GSAP, CustomCursor CSS, tema light/dark e NeuralSVG. Esta spec adiciona três efeitos WebGL/Canvas inspirados no Inspira UI:

1. **BackgroundScene** — Canvas WebGL full-page com blobs de luz fluidos em azul/âmbar
2. **HeaderLens** — Canvas dentro do header que distorce o background via shader
3. **AuroraCursor** — Trail de partículas aurora boreal que substitui o CustomCursor CSS

Three.js aprovado explicitamente pelo usuário apesar da restrição anterior no CLAUDE.md.

---

## 2. Dependências

```bash
npm install three
```

| Pacote | Versão | Uso |
|---|---|---|
| `three` | `^0.175.0` | BackgroundScene + HeaderLens |

**Bundle adicional estimado:**

| Item | Gzipped |
|---|---|
| three.js (tree-shaken: WebGLRenderer, ShaderMaterial, OrthographicCamera, PlaneGeometry, CanvasTexture) | ~85kb |
| Shaders GLSL inline | ~3kb |
| AuroraCursor Canvas 2D | ~2kb |
| **Total adicional** | **~90kb** |
| **Novo total do projeto** | **~204kb** ✓ |

---

## 3. Singleton de Comunicação

Para que HeaderLens acesse o canvas do BackgroundScene sem consulta ao DOM:

**Arquivo:** `src/components/three/background-singleton.js`

```js
let bgCanvas = null
export function registerBackgroundCanvas(canvas) { bgCanvas = canvas }
export function getBackgroundCanvas() { return bgCanvas }
```

BackgroundScene chama `registerBackgroundCanvas(renderer.domElement)` após criar o renderer. HeaderLens chama `getBackgroundCanvas()` para obter a textura.

---

## 4. BackgroundScene

Canvas WebGL full-page, `position: fixed`, `z-index: -1`, cobrindo `100vw × 100vh`. Renderiza dois blobs de luz fluidos usando FBM (Fractional Brownian Motion) domain-warped noise.

### 4.1 Setup Three.js

```
Renderer: WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
Camera:   OrthographicCamera(-1, 1, 1, -1, 0, 1)
Geometry: PlaneGeometry(2, 2)  → cobre todo o NDC space
Material: ShaderMaterial com vertex + fragment shaders abaixo
```

O canvas é registrado via `registerBackgroundCanvas()` logo após criação do renderer.

### 4.2 Vertex Shader

```glsl
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
```

### 4.3 Fragment Shader

```glsl
uniform float uTime;
uniform vec2 uMouse;  // posição normalizada [0,1]
uniform float uTheme; // 0.0 dark / 1.0 light
varying vec2 vUv;

// Value noise 2D
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), f.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
    f.y
  );
}

// FBM domain warp
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = vUv;

  // Mouse parallax: blobs derivam levemente em direção ao cursor
  vec2 mouseOffset = (uMouse - 0.5) * 0.04;

  // Blob azul — lower-left
  vec2 blueCenter = vec2(0.25, 0.65) + mouseOffset * 0.6;
  float blueField = fbm(uv * 2.2 + vec2(uTime * 0.08, uTime * 0.05));
  float blueMask = smoothstep(0.62, 0.35, distance(uv + blueField * 0.15, blueCenter));

  // Blob âmbar — upper-right
  vec2 amberCenter = vec2(0.75, 0.35) - mouseOffset * 0.4;
  float amberField = fbm(uv * 2.0 + vec2(-uTime * 0.06, uTime * 0.09) + 3.7);
  float amberMask = smoothstep(0.58, 0.30, distance(uv + amberField * 0.12, amberCenter));

  // Intensidades por tema
  float intensity = mix(0.18, 0.09, uTheme);

  vec3 blue  = vec3(0.114, 0.306, 0.847) * blueMask  * intensity;
  vec3 amber = vec3(0.984, 0.729, 0.137) * amberMask * intensity;

  // Fundo base
  vec3 bg = mix(vec3(0.059, 0.075, 0.102), vec3(0.973, 0.980, 0.988), uTheme);

  gl_FragColor = vec4(bg + blue + amber, 1.0);
}
```

### 4.4 Comportamento

- RAF loop contínuo: `uTime += delta`, `uMouse` atualizado via `mousemove` com lerp 0.05
- `prefers-reduced-motion`: `uTime` não avança (cena congelada)
- Mobile (<768px): `renderer.setPixelRatio(Math.min(devicePixelRatio, 1))` (padrão já é max 2 — reduz para 1 no mobile)
- WebGL indisponível: componente retorna `null`, site permanece funcional
- `ResizeObserver` no `document.body` atualiza `renderer.setSize()` e chama `ScrollTrigger.refresh()` se disponível
- Observa `document.documentElement.dataset.theme` via `MutationObserver` → atualiza uniform `uTheme`

### 4.5 Arquivos

- `src/components/three/BackgroundScene.jsx`
- `src/components/three/BackgroundScene.css`

---

## 5. HeaderLens

Canvas `position: absolute` dentro do `<header>`, com as mesmas dimensões do header (largura viewport × altura header). Aplica distorção de lente sobre a texture do BackgroundScene.

### 5.1 Integração com Header

O `Header.jsx` existente recebe `<HeaderLens />` como primeiro filho do elemento `<header>`:

```jsx
<header className={...}>
  <HeaderLens />       {/* position: absolute; inset: 0; z-index: 0; pointer-events: none */}
  <div className="header-inner" style={{position: 'relative', zIndex: 1}}>
    {/* conteúdo existente do header */}
  </div>
</header>
```

O elemento `<header>` precisa de `position: relative` (já deve ter ou será adicionado).

### 5.2 Setup Three.js

```
Renderer: WebGLRenderer({ alpha: true, antialias: false, canvas: canvasRef.current })
Camera:   OrthographicCamera(-1, 1, 1, -1, 0, 1)
Geometry: PlaneGeometry(2, 2)
Material: ShaderMaterial (uniforms abaixo)
Texture:  THREE.CanvasTexture(getBackgroundCanvas())
          texture.needsUpdate = true a cada frame
```

O canvas do renderer tem `width = window.innerWidth`, `height = header.offsetHeight`.

### 5.3 Uniforms

| Uniform | Tipo | Descrição |
|---|---|---|
| `uBackgroundTexture` | `sampler2D` | Canvas do BackgroundScene como textura |
| `uTime` | `float` | Tempo em segundos |
| `uHeaderHeightRatio` | `float` | `headerHeight / viewportHeight` — para mapear UVs corretos |
| `uGlassColor` | `vec4` | Cor do vidro: dark `rgba(15,19,26,0.72)`, light `rgba(255,255,255,0.72)` |

### 5.4 Fragment Shader

```glsl
uniform sampler2D uBackgroundTexture;
uniform float uTime;
uniform float uHeaderHeightRatio;
uniform vec4 uGlassColor;
varying vec2 vUv;

// Noise 2D (mesma função do BackgroundScene)
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y);
}

void main() {
  // Mapeia UV do header para UV do background (header ocupa topo da viewport)
  // vUv.y=0 = topo do header, que corresponde ao topo do background
  vec2 bgUV = vec2(
    vUv.x,
    1.0 - vUv.y * uHeaderHeightRatio  // inverte Y (Three.js UV) e escala para porção do header
  );

  // Distorção de lente animada
  float nx = noise(vUv * 5.5 + vec2(uTime * 0.14, 0.0));
  float ny = noise(vUv * 5.5 + vec2(0.0, uTime * 0.11) + 7.3);
  vec2 distortion = vec2(nx, ny) * 0.022 - 0.011;

  vec4 bg = texture2D(uBackgroundTexture, bgUV + distortion);

  // Mix com cor do vidro
  gl_FragColor = mix(bg, uGlassColor, 0.68);
}
```

### 5.5 Comportamento

- RAF loop sincronizado: `uTime` avança, `texture.needsUpdate = true` a cada frame
- `prefers-reduced-motion`: `uTime` congela (sem animação de distorção)
- `ResizeObserver` no header: atualiza dimensões do canvas e uniform `uHeaderHeightRatio`
- Observa `dataset.theme`: atualiza uniform `uGlassColor`
- **Inicialização lazy:** `getBackgroundCanvas()` pode retornar `null` no primeiro frame (race condition com BackgroundScene). HeaderLens tenta criar a `CanvasTexture` a cada frame até ter sucesso — nenhuma tentativa de render sem textura válida.
- Fallback definitivo: se após 3s ainda for null (WebGL indisponível), componente retorna `null` — o header com `backdrop-filter: blur()` permanece como fallback natural

### 5.6 Arquivos

- `src/components/three/HeaderLens.jsx`
- `src/components/three/HeaderLens.css`

---

## 6. AuroraCursor

Substitui `CustomCursor.jsx` e `CustomCursor.css`. Canvas 2D full-page, `position: fixed`, `z-index: 9999`, `pointer-events: none`.

**Motivação para Canvas 2D (não Three.js):** `ctx.globalCompositeOperation = 'lighter'` é blending aditivo nativo do Canvas 2D — cria o efeito aurora/glow acumulado sem contexto WebGL adicional. Mais simples, mais eficiente, resultado idêntico.

### 6.1 Estrutura de Dados da Partícula

```ts
type Particle = {
  x: number         // posição atual X
  y: number         // posição atual Y
  vx: number        // velocidade X (drift)
  vy: number        // velocidade Y (drift + gravidade)
  radius: number    // raio do círculo (4–9px)
  hue: number       // matiz HSL atual
  alpha: number     // opacidade atual (0–0.75)
}
```

### 6.2 Emissão e Física

```
Ao mover cursor:
  emitir 5 partículas com:
    x = cursor.x + random(-6, 6)
    y = cursor.y + random(-6, 6)
    vx = random(-0.4, 0.4)
    vy = random(-0.8, 0.0)
    radius = random(4, 9)
    // t = Date.now() * 0.0008; hue oscila entre azul (220°) e amarelo (45°)
    hue = 45 + ((1 + sin(t)) / 2) * 175   → range 45°–220°
    alpha = 0.75

Por frame, para cada partícula:
  vy += 0.018          → gravidade suave
  x += vx
  y += vy
  alpha -= 0.011
  Remover se alpha < 0.01

Máximo: 150 partículas (remove a mais antiga ao ultrapassar)
```

### 6.3 Render

```js
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.globalCompositeOperation = 'lighter'

for (const p of particles) {
  const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
  grd.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.alpha})`)
  grd.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`)
  ctx.fillStyle = grd
  ctx.beginPath()
  ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
  ctx.fill()
}

// Dot central (renderizado por cima, fora do 'lighter')
ctx.globalCompositeOperation = 'source-over'
ctx.fillStyle = '#fbba23'
ctx.beginPath()
ctx.arc(cursor.x, cursor.y, 4, 0, Math.PI * 2)
ctx.fill()
```

### 6.4 Loop RAF

O loop RAF pausa automaticamente quando não há partículas e o cursor está estático há >2s. Retoma imediatamente ao detectar movimento.

### 6.5 Tema Light

No tema light, `lightness` das partículas reduzida de 70%/50% para 55%/35% — melhora contraste sobre fundo claro.

### 6.6 Desabilitado

- `window.matchMedia('(pointer: coarse)').matches` — touch devices
- `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — acessibilidade
- Em ambos os casos: componente retorna `null`

### 6.7 Arquivos

- `src/components/ui/AuroraCursor.jsx` (substitui `CustomCursor.jsx` — arquivo **renomeado**)
- `src/components/ui/AuroraCursor.css` (substitui `CustomCursor.css` — arquivo **renomeado**)

---

## 7. Layout.astro — Alterações

```astro
---
import AuroraCursor from '../components/ui/AuroraCursor.jsx'
import BackgroundScene from '../components/three/BackgroundScene.jsx'
// remove: import CustomCursor
---

<!-- no <body>, antes de todo o conteúdo: -->
<BackgroundScene client:load />
<AuroraCursor client:load />
```

---

## 8. Header.jsx — Alterações

```jsx
import HeaderLens from '../three/HeaderLens.jsx'

// No JSX do <header> existente:
<header className={...} style={{ position: 'relative' }}>
  <HeaderLens />
  <div className="header-inner" style={{ position: 'relative', zIndex: 1 }}>
    {/* todo o conteúdo existente do header */}
  </div>
</header>
```

Se o header já tiver `position: relative` no CSS, não é necessário inline style. Se o header não tiver um div interno único envolvendo todo o conteúdo, o Codex deve criá-lo ao integrar o HeaderLens.

---

## 9. CLAUDE.md — Atualização

Na seção **Restrições**, substituir:
```
- Sem Three.js, Framer Motion, Lottie
```
por:
```
- Three.js: permitido para BackgroundScene e HeaderLens (aprovado para efeitos WebGL)
- Sem Framer Motion, Lottie
```

---

## 10. Responsividade e Acessibilidade

| Contexto | BackgroundScene | HeaderLens | AuroraCursor |
|---|---|---|---|
| `pointer: coarse` | Funciona | Funciona | `null` (não renderiza) |
| `prefers-reduced-motion` | `uTime` congela | `uTime` congela | `null` (não renderiza) |
| Mobile <768px | `pixelRatio` limitado a 1 | Funciona | `null` (touch) |
| WebGL indisponível | `null` | `null` | Canvas 2D não afetado |
| Tema light | `uTheme=1.0` (intensidade reduzida) | `uGlassColor` light | `lightness` reduzida |

---

## 11. Restrições Absolutas

- Zero alteração de copy
- Zero alteração de rotas ou estrutura de páginas
- Zero deploy em AWS/S3
- `output: 'static'` permanece
- Link `/teste` → Google Forms permanece

---

## 12. Ordem de Execução (para Codex)

1. Instalar `three` + atualizar `CLAUDE.md` + criar `background-singleton.js`
2. `BackgroundScene.jsx/.css` — renderer WebGL + shader FBM
3. `AuroraCursor.jsx/.css` — substitui CustomCursor
4. `HeaderLens.jsx/.css` — lente de distorção sobre background
5. `Layout.astro` — trocar CustomCursor → AuroraCursor, adicionar BackgroundScene
6. `Header.jsx` — integrar HeaderLens
