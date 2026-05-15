import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitChars } from '../hooks/useTypewriterScroll'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = 'Você sabe que IA é importante mas não sabe como aproveitar todo o potencial da tecnologia?'

/* ── 3D Pie Chart ──────────────────────────────────────────── */

function Pie3D({ value }) {
  const cx = 100, cy = 52, rx = 84, ry = 36, depth = 18
  const PI = Math.PI
  const startAngle = -PI / 2
  const endAngle = startAngle + (value / 100) * 2 * PI

  const sx = cx + rx * Math.cos(startAngle)
  const sy = cy + ry * Math.sin(startAngle)
  const ex = cx + rx * Math.cos(endAngle)
  const ey = cy + ry * Math.sin(endAngle)
  const large = value > 50 ? 1 : 0

  // Front wall of filled segment — visible arc from [0..min(endAngle, PI)]
  let filledWall = ''
  if (endAngle > 0 && value > 0 && value < 100) {
    const e = Math.min(endAngle, PI)
    const ax = cx + rx * Math.cos(0), ay = cy + ry * Math.sin(0)
    const bx = cx + rx * Math.cos(e), by = cy + ry * Math.sin(e)
    const fl = e > PI ? 1 : 0
    filledWall = `M${ax},${ay}A${rx},${ry} 0 ${fl} 1 ${bx},${by}L${bx},${by + depth}A${rx},${ry} 0 ${fl} 0 ${ax},${ay + depth}Z`
  }

  // Front wall of background segment — visible arc from [max(endAngle,0)..PI]
  let bgWall = ''
  if (value < 100) {
    const s = Math.max(endAngle, 0)
    if (s < PI) {
      const ax = cx + rx * Math.cos(s), ay = cy + ry * Math.sin(s)
      const bx = cx + rx * Math.cos(PI), by = cy + ry * Math.sin(PI)
      const bl = (PI - s) > PI ? 1 : 0
      bgWall = `M${ax},${ay}A${rx},${ry} 0 ${bl} 1 ${bx},${by}L${bx},${by + depth}A${rx},${ry} 0 ${bl} 0 ${ax},${ay + depth}Z`
    }
  }

  const topSlice = value > 0 && value < 100
    ? `M${cx},${cy}L${sx},${sy}A${rx},${ry} 0 ${large} 1 ${ex},${ey}Z`
    : null

  const label = Number.isInteger(value)
    ? `${value}%`
    : `${String(value).replace('.', ',')}%`

  return (
    <svg viewBox="0 0 200 120" className="chart-pie3d" aria-hidden="true">
      <ellipse cx={cx} cy={cy + depth} rx={rx} ry={ry}
        fill="color-mix(in oklab, var(--line), black 30%)" />
      {bgWall && <path d={bgWall}
        fill="color-mix(in oklab, var(--surface-soft), black 6%)" />}
      {filledWall && <path d={filledWall}
        fill="color-mix(in oklab, var(--primary), black 34%)" />}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--surface-soft)" />
      {value === 100
        ? <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--primary)" />
        : topSlice && <path d={topSlice} fill="var(--primary)" />}
      <text x={cx} y={cy + 7} textAnchor="middle" fill="var(--foreground)"
        fontSize="22" fontWeight="800" fontFamily="Sora,sans-serif">{label}</text>
    </svg>
  )
}

/* ── People Chart (5 × 2 grid) ─────────────────────────────── */

function PeopleChart({ filled = 7, total = 10 }) {
  return (
    <div className="chart-people" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 28" className={i < filled ? 'person active' : 'person'}>
          <circle cx="10" cy="6" r="5" />
          <path d="M2 26 C2 13 18 13 18 26" />
        </svg>
      ))}
      <p className="chart-people-label">em cada 10 profissionais</p>
    </div>
  )
}

/* ── Stat Card ─────────────────────────────────────────────── */

function StatCard({ number, text, source, chart }) {
  return (
    <div className="stat-card" data-reveal>
      <div className="stat-card__copy">
        <p className="stat-card__number">{number}</p>
        <p className="stat-card__text">{text}</p>
      </div>
      <div className="stat-card__chart">{chart}</div>
      <p className="stat-card__source">{source}</p>
    </div>
  )
}

/* ── Section ───────────────────────────────────────────────── */

export function ProblemSection() {
  const textPhaseRef = useRef(null)
  const h2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = h2Ref.current.querySelectorAll('.tw-char')
      gsap.fromTo(chars,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: { each: 0.04, from: 'start' },
          duration: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: textPhaseRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.6}`,
            scrub: 1,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="problem-section">
      <div className="problem-text-phase" ref={textPhaseRef}>
        <div className="problem-text-pin">
          <div className="container">
            <h2 className="problem-headline" ref={h2Ref}>
              {splitChars(HEADLINE)}
            </h2>
          </div>
        </div>
      </div>

      <div className="container problem-stats-wrapper">
        <div className="problem-stats">
          <StatCard
            number="72%"
            text="das empresas brasileiras estão nos estágios iniciante ou experimental de adoção da IA"
            source="Abiacom + Brazil Panels + Lideres.ai — pesquisa com 200 empresas, out/nov 2025"
            chart={<Pie3D value={72} />}
          />
          <StatCard
            number="70%"
            text="dos profissionais reconhecem atividades em seu dia a dia que poderiam ser automatizadas por IA"
            source="Abiacom, out/nov 2025 — via TI INSIDE"
            chart={<PeopleChart filled={7} total={10} />}
          />
          <StatCard
            number="47,4%"
            text="dos profissionais utilizam ferramentas de IA sem aprovação oficial — o chamado Shadow AI"
            source="Abiacom, out/nov 2025 — via Exame"
            chart={<Pie3D value={47.4} />}
          />
          <StatCard
            number="95%"
            text="das organizações que já adotaram IA registraram crescimento de receita, com aumento médio de 31%"
            source="AWS, agosto 2025 — via About Amazon Brasil"
            chart={<Pie3D value={95} />}
          />
        </div>
      </div>
    </section>
  )
}
