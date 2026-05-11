import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../atoms/Button'
import { heroProofs } from '../../data/siteContent'
import { StatCard } from '../molecules/StatCard'

gsap.registerPlugin(ScrollTrigger)

export function HeroInteractive() {
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    if (!heroRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.to('.hero-orb-a', {
        yPercent: -12,
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.hero-orb-b', {
        yPercent: 14,
        xPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, heroRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-orb hero-orb-a" aria-hidden="true" />
      <div className="hero-orb hero-orb-b" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-content-top">
          <p className="kicker" data-reveal>
            Agência de Automação de Processos & IA
          </p>
          <h1 className="hero-title" data-reveal>
            Sua empresa está a 5 passos de uma operação que cresce sem sobrecarregar ninguém.
          </h1>
          <p className="hero-subtitle" data-reveal>
            Em 5 etapas, mapeamos seus processos e implementamos IA onde realmente gera resultado.
          </p>
        </div>

        <div className="hero-content-bottom">
          <div className="cta-group" data-reveal>
            <Button as={Link} to="/contato" variant="primary" size="lg" data-cursor="action">
              Agendar diagnóstico
            </Button>
          </div>

          <div className="hero-stats" data-card-rail-viewport>
            <div className="card-rail card-rail-compact" data-card-rail>
              {heroProofs.map((proof) => (
                <StatCard key={proof.label} value={proof.value} label={proof.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
