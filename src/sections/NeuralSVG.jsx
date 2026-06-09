import './NeuralSVG.css'

const nodes = [
  { id: 'n1',  x: 80,  y: 75,  r: 8,   accent: true  },
  { id: 'n2',  x: 210, y: 52,  r: 5,   accent: false },
  { id: 'n3',  x: 345, y: 92,  r: 6,   accent: false },
  { id: 'n4',  x: 435, y: 68,  r: 3.5, accent: false },
  { id: 'n5',  x: 148, y: 188, r: 7,   accent: true  },
  { id: 'n6',  x: 288, y: 208, r: 5,   accent: false },
  { id: 'n7',  x: 388, y: 232, r: 4,   accent: false },
  { id: 'n8',  x: 52,  y: 295, r: 4,   accent: false },
  { id: 'n9',  x: 192, y: 315, r: 6,   accent: false },
  { id: 'n10', x: 328, y: 328, r: 5,   accent: false },
  { id: 'n11', x: 438, y: 348, r: 3,   accent: false },
  { id: 'n12', x: 92,  y: 388, r: 4,   accent: false },
  { id: 'n13', x: 238, y: 408, r: 7,   accent: true  },
  { id: 'n14', x: 362, y: 428, r: 4,   accent: false },
  { id: 'n15', x: 442, y: 418, r: 3,   accent: false },
]

const edges = [
  ['n1','n2'], ['n2','n3'], ['n3','n4'],
  ['n1','n5'], ['n2','n5'], ['n2','n6'],
  ['n5','n6'], ['n3','n6'], ['n4','n7'],
  ['n6','n7'], ['n5','n9'], ['n8','n9'],
  ['n9','n10'],['n10','n11'],['n12','n13'],
  ['n13','n14'],['n14','n15'],['n9','n13'],
  ['n6','n10'],['n3','n7'],
]

const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

export default function NeuralSVG() {
  return (
    <svg
      className="neural-svg"
      viewBox="0 0 480 460"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-yellow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-blue" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map(([aId, bId], i) => {
        const a = nodeMap[aId]
        const b = nodeMap[bId]
        return (
          <line
            key={`${aId}-${bId}`}
            className="neural-edge"
            x1={a.x} y1={a.y}
            x2={b.x} y2={b.y}
            style={{ animationDelay: `${(i * 0.19).toFixed(2)}s` }}
          />
        )
      })}

      {nodes.map((node, i) => (
        <circle
          key={node.id}
          className={`neural-node${node.accent ? ' neural-node--accent' : ''}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          filter={node.accent ? 'url(#glow-yellow)' : 'url(#glow-blue)'}
          style={{ animationDelay: `${(i * 0.17).toFixed(2)}s` }}
        />
      ))}
    </svg>
  )
}
