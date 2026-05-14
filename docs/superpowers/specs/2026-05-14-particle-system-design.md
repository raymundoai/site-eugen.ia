# Particle System — Design Spec
**Data:** 2026-05-14  
**Status:** Aprovado pelo usuário

---

## Visão geral

Sistema de partículas em dois níveis para a homepage do site Eugen.IA:

1. **Campo global** — canvas fixo full-viewport, presente em toda a homepage
2. **Service canvases** — canvas por card de serviço, dentro do bloco de animação do ServicesShowcase

---

## Decisões de produto confirmadas

| Decisão | Escolha |
|---|---|
| Páginas | Somente homepage (`/`) |
| Camada | Atrás de todo conteúdo (`z-index: 1`, abaixo do layout) |
| Cor ambiente | Dourado da marca `#fbba23` |
| Montagem dos cards | Partículas se montam do zero quando o serviço ativa |
| Mobile | Fora de escopo neste ciclo — desktop only |

---

## 1. ParticleField (campo global)

### Arquivo
`src/components/ParticleField.jsx`

### Responsabilidades
- Renderiza um `<canvas>` com `position: fixed; inset: 0; z-index: 0; pointer-events: none`
- Para garantir que o canvas fique atrás do conteúdo, `<main>` recebe `position: relative; z-index: 1` no CSS global. BackgroundField já está em `z-index: -1`.
- Montado no `AppRouter.jsx` apenas quando `location.pathname === '/'`
- Gerencia 3000 partículas em coordenadas de viewport

### Propriedades das partículas
- Posição: `px`, `py` (Float32Array)
- Velocidade: `vx`, `vy` (Float32Array)
- Alvo: `tx`, `ty` (Float32Array) — usado no morph
- Raio: 1.0–2.5px (aleatório na inicialização)
- Opacidade: 0.15–0.40 (aleatório, fixo por partícula)

### Física — estado ambiente
- Drift aleatório: `vx += (rand - 0.5) * 0.08` por frame
- Damping: `vx *= 0.97`
- Boundary wrap: ao sair da tela, reaparece no lado oposto

### Física — estado morph
- Spring: `vx += (tx - px) * 0.07`
- Damping: `vx *= 0.88`
- 800 partículas recebem targets; restantes continuam ambient

### Interação com mouse
- Raio de repulsão: 100px
- Força: `(MOUSE_R - dist) / MOUSE_R * 4`
- Capturado via `window.addEventListener('mousemove')`

### Rendering (performance)
- Batched: um `ctx.beginPath()` por grupo de cor/opacidade
- Partículas agrupadas em 3 faixas de opacidade (0.15, 0.25, 0.38)
- `ctx.clearRect` a cada frame

### Scroll triggers — GSAP ScrollTrigger
| Trigger | Elemento | Shape |
|---|---|---|
| `onEnter` ProblemSection text phase | `.problem-text-phase` | `questionmarks` |
| `onLeave` ProblemSection text phase | — | `ambient` |
| `onEnter` ServicesShowcase text phase | `.showcase-text-phase` | `road` |
| `onLeave` ServicesShowcase text phase | — | `ambient` |

### Resize
- `window.addEventListener('resize')` redimensiona canvas e regenera shapes

---

## 2. particleShapes.js (utilitário)

### Arquivo
`src/utils/particleShapes.js`

### API
```js
makeQuestionMarks(w, h, count) → [{x, y}, ...]
makeRoad(w, h, count)          → [{x, y}, ...]
makeBlackboard(w, h, count)    → [{x, y}, ...]
makeGears(w, h, angle)         → [{x, y}, ...]   // angle em radianos, recalculado por frame
makeRobot(w, h, count)         → [{x, y}, ...]
samplePixels(ctx, w, h, count) → [{x, y}, ...]   // interno
```

### Como funciona
Cada função `make*` renderiza a forma num canvas offscreen (`OffscreenCanvas` ou `createElement('canvas')`), depois chama `samplePixels` para extrair coordenadas dos pixels não-transparentes. O resultado é um array de `{x, y}` que serve como targets para as partículas.

### Detalhes por shape

**questionmarks**
- 5 glyphs `"?"` em Sora bold
- Posições distribuídas: `(20%, 45%)`, `(50%, 25%)`, `(80%, 55%)`, `(35%, 72%)`, `(65%, 18%)`
- Tamanhos: `18%` a `22%` da altura do canvas

**road**
- Linhas convergindo ao horizonte (ponto de fuga em `(50%, 15%)`)
- Margem base: `(10%, 100%)` e `(90%, 100%)`
- Linha tracejada central: `setLineDash([h*0.06, h*0.04])`
- `lineWidth` proporcional ao tamanho do canvas

**blackboard**
- Retângulo escuro com borda chalk (offwhite)
- 3 checkboxes com checkmarks (`✓`)
- Os checkmarks são animados sequencialmente em loop de 2.5s (1 aparece, depois o 2, depois o 3, depois reinicia)
- Animação feita pelo ServiceCanvas, não por `particleShapes.js`

**gears**
- Recebe `angle` como parâmetro (incrementado a cada frame pelo ServiceCanvas)
- Engrenagem grande: centro `(38%, 50%)`, raio `28%`, 10 dentes
- Engrenagem pequena: centro `(65%, 52%)`, raio `18%`, 7 dentes
- Engrenagem pequena gira em sentido oposto: `angle * -1.57` (relação de raios)
- Geometria: círculo base + dentes como retângulos rotacionados

**robot**
- Cabeça: retângulo com bordas arredondadas (`30%` a `70%` da largura, altura `20%` a `75%`)
- Viseira: retângulo interno (`38%` a `62%`, `30%` a `50%`)
- 2 olhos circulares dentro da viseira
- Antena: linha + círculo no topo da cabeça
- Partículas pulsam suavemente (scale leve via opacidade oscilante)

---

## 3. ServiceCanvas

### Arquivo
`src/components/ServiceCanvas.jsx`

### Props
```ts
serviceIndex: 0 | 1 | 2
active: boolean
```

### Comportamento
- **Inativo:** partículas em posições aleatórias dentro do canvas. Drift suave.
- **Ao ativar** (`active` muda de `false` para `true`): targets são calculados pela shape correspondente; partículas fazem spring até os targets.
- **Ao desativar:** targets limpos; partículas voltam ao drift aleatório.

### Física
- Spring stiffness: `0.06`, damping: `0.87`
- Sem mouse repulsion (canvas pequeno)

### Animação das gears (serviceIndex === 1)
- `angle` incrementado `+0.008` por frame (≈ 1 rpm a 60fps)
- `makeGears(w, h, angle)` chamado a cada frame — recalcula targets
- Partículas seguem os novos targets continuamente (spring suave cria efeito de "engrenagem viva")

### Animação do blackboard (serviceIndex === 0)
- 3 fases: `[checklist, checklist+check1, checklist+check1+check2, checklist+check1+check2+check3]`
- Ciclo de 800ms por fase, com spring dos novos targets a cada transição

### Integração no ServicesShowcase
- O `.motion-panel` existente mantém o container e estilos
- Seu conteúdo interno (ícone Lucide + `.motion-lines`) é substituído por `<ServiceCanvas />`
- `active` prop = `active === index`

---

## 4. Arquivos modificados

| Arquivo | Mudança |
|---|---|
| `src/app/AppRouter.jsx` | Import e mount de `<ParticleField />` condicionado a `pathname === '/'` |
| `src/components/ServicesShowcase.jsx` | Substitui conteúdo do `.motion-panel` por `<ServiceCanvas serviceIndex={index} active={active === index} />` |
| `src/index.css` | Adiciona `.particle-canvas-global` e `.service-canvas` |

---

## 5. Performance

| Sistema | Partículas | Custo estimado |
|---|---|---|
| ParticleField | 3000 | ~2ms/frame em CPU moderna |
| ServiceCanvas (1 ativo) | 600 | ~0.5ms/frame |
| ServiceCanvas (gears, recalculo) | 600 | ~1ms/frame |
| **Total** | 3600 | **< 4ms/frame** — bem dentro de 16ms (60fps) |

Partículas são gerenciadas via `Float32Array` para evitar GC pressure. Nenhum objeto é alocado no loop principal.

---

## 6. Fora de escopo

- Mobile / responsivo
- Outros efeitos em outras páginas
- Integração com ThemeContext (light mode)
- Ícones orbitando o robô
