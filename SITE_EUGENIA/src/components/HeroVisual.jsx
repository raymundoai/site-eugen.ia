export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="core-panel">
        <div className="core-topline">
          <span />
          <span />
          <span />
        </div>
        <div className="process-map">
          {Array.from({ length: 21 }).map((_, index) => (
            <span key={index} style={{ '--i': index }} />
          ))}
        </div>
        <div className="core-scan" />
      </div>
      <div className="signal-card signal-card-a">Diagnóstico</div>
      <div className="signal-card signal-card-b">Agentes IA</div>
      <div className="signal-card signal-card-c">Automação</div>
    </div>
  )
}
