import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Button } from '../atoms/Button'
import { heroProofs } from '../../data/siteContent'
import { StatCard } from '../molecules/StatCard'
import { ChatWidget } from './ChatWidget'

gsap.registerPlugin(ScrollTrigger)

export function HeroInteractive() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)

  useLayoutEffect(() => {
    if (!heroRef.current || !titleRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const split = new SplitType(titleRef.current, { types: 'words' })
    const words = split.words

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.06,
        },
      )

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
      split.revert()
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-orb hero-orb-a" aria-hidden="true" />
      <div className="hero-orb hero-orb-b" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-content-top">
          <p className="kicker" data-reveal>
            Consultoria e implementação de IA para e-commerce
          </p>
          <h1 ref={titleRef} className="hero-title" data-reveal>
            Seu e-commerce perde horas todo dia em tarefas que uma IA poderia fazer por você.
          </h1>
          <p className="hero-subtitle" data-reveal>
            Seu e-commerce pode funcionar sem você no meio de cada processo. É isso que a Eugen.IA constrói.
          </p>
        </div>

        <div className="hero-chat" data-reveal data-reveal-y="40">
          <ChatWidget variant="embedded" />
        </div>

        <div className="hero-content-bottom">
          <div className="cta-group" data-reveal>
            <Button as={Link} to="/contato" variant="primary" size="lg" data-cursor="action">
              Quero meu diagnóstico gratuito
            </Button>
            <Button as={Link} to="/servicos" variant="outline" size="lg" data-cursor="action">
              Ver Como Funciona
            </Button>
          </div>

          <div className="hero-stats">
            {heroProofs.map((proof) => (
              <StatCard key={proof.label} value={proof.value} label={proof.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
