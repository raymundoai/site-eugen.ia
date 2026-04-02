import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const revealNodes = gsap.utils.toArray('[data-reveal]')

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
    })

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])
}
