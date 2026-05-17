import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useTypewriterScroll(ref, { start = 'top 78%', end = 'center 55%', scrub = 0.6 } = {}) {
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      const chars = ref.current.querySelectorAll('.tw-char')
      if (!chars.length) return

      const mm = gsap.matchMedia()

      // Efeito de digitação apenas no desktop
      mm.add('(min-width: 769px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start, end, scrub, invalidateOnRefresh: true },
        })
        tl.from(chars, { opacity: 0, stagger: { each: 0.04, from: 'start' }, duration: 0.08, ease: 'none' })
        return () => tl.kill()
      })
    }, ref)
    return () => ctx.revert()
  }, [])
}

export function splitChars(text, prefix = '') {
  return String(text).split('').map((char, i) => (
    <span className="tw-char" key={`${prefix}${i}`}>{char}</span>
  ))
}
