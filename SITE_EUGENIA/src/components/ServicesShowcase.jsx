import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/siteContent'
import { splitChars } from '../hooks/useTypewriterScroll'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE = 'Mostramos o caminho mais rápido para sua empresa inovar e crescer com Inteligência Artificial.'

export function ServicesShowcase() {
  const textPhaseRef = useRef(null)
  const h2Ref = useRef(null)
  const cardsPhaseRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fase 1: digita + apaga
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

      // Fase 2: desliza entre serviços
      ScrollTrigger.create({
        trigger: cardsPhaseRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const next = Math.min(services.length - 1, Math.floor(self.progress * services.length))
          setActive(next)
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="showcase-section" id="servicos">
      {/* Fase de texto — pin + digita + apaga */}
      <div className="showcase-text-phase" ref={textPhaseRef}>
        <div className="showcase-text-pin">
          <div className="container">
            <p className="eyebrow">O que fazemos</p>
            <h2 className="showcase-headline" ref={h2Ref}>{splitChars(HEADLINE)}</h2>
          </div>
        </div>
      </div>

      {/* Fase dos cards — pin + desliza */}
      <div className="showcase-cards-phase" ref={cardsPhaseRef}>
        <div className="container showcase-cards-container">
          <div className="showcase-tabs" aria-label="Serviços">
            {services.map((service, index) => (
              <a key={service.title} className={active === index ? 'active' : ''} href={`#service-${service.signal}`}>
                <span>{service.signal}</span>
                {service.title}
              </a>
            ))}
          </div>

          <div className="showcase-grid">
            <div className="showcase-copy-viewport">
              <div className="showcase-copy-track" style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}>
                {services.map((service) => (
                  <article className="service-slide" id={`service-${service.signal}`} key={service.title}>
                    <span className="service-index">{service.signal}</span>
                    <h3>{service.title}</h3>
                    <p>{service.short}</p>
                    <p>{service.body}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Coluna direita vazia — canvas global renderiza a shape aqui */}
            <div aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
