import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const revealNodes = gsap.utils.toArray('[data-reveal]')
    const typeTargets = gsap.utils.toArray(
      [
        '.hero-title',
        '.hero-subtitle',
        '.section-intro h2',
        '.section-intro p:not(.kicker)',
        '.service-context-panel h2',
        '.service-context-panel p:not(.kicker)',
        '.service-card h3',
        '.service-card p',
        '.timeline-step h3',
        '.timeline-step p',
        '.cta-banner h2',
        '.cta-banner p',
        '.page-hero h1',
        '.page-hero .container > p:not(.kicker)',
        '.about-grid h2',
        '.about-grid p',
      ].join(', '),
    )
    const cardRails = gsap.utils.toArray('[data-card-rail]')
    const splits = []

    const ctx = gsap.context(() => {
      revealNodes.forEach((node, index) => {
        const y = node.dataset.revealY ? Number(node.dataset.revealY) : 32
        gsap.fromTo(
          node,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            delay: Math.min(index * 0.03, 0.28),
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      typeTargets.forEach((node) => {
        if (!node.textContent.trim() || node.closest('.chat-widget')) {
          return
        }

        const split = new SplitType(node, { types: 'words,chars', tagName: 'span' })
        splits.push(split)

        gsap.set(split.chars, {
          opacity: 0.18,
          y: 5,
          filter: 'blur(2px)',
        })

        gsap.to(split.chars, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.012,
          ease: 'none',
          scrollTrigger: {
            trigger: node,
            start: 'top 88%',
            end: 'bottom 58%',
            scrub: true,
          },
        })
      })

      cardRails.forEach((rail) => {
        const cards = Array.from(rail.children)
        if (cards.length < 2) {
          return
        }

        const viewport = rail.closest('[data-card-rail-viewport]') || rail.parentElement
        const getTravel = () => Math.max(0, rail.scrollWidth - viewport.clientWidth)
        const midpoint = (cards.length - 1) / 2

        gsap.set(cards, {
          transformOrigin: '50% 180%',
          y: (index) => Math.abs(index - midpoint) * 14,
          rotation: (index) => (index - midpoint) * -4,
        })

        gsap.fromTo(
          rail,
          { x: () => Math.min(64, viewport.clientWidth * 0.08) },
          {
            x: () => -getTravel() - Math.min(64, viewport.clientWidth * 0.08),
            ease: 'none',
            scrollTrigger: {
              trigger: viewport,
              start: 'top 82%',
              end: 'bottom 18%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )

        gsap.to(cards, {
          y: (index) => Math.abs(index - midpoint - 1.4) * 14,
          rotation: (index) => (index - midpoint - 1.4) * -4,
          ease: 'none',
          scrollTrigger: {
            trigger: viewport,
            start: 'top 82%',
            end: 'bottom 18%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })
    })

    return () => {
      ctx.revert()
      splits.forEach((split) => split.revert())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}
