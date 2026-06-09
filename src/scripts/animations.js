import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Lenis + GSAP ticker integration ────────────────────────────────────────
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Skip all animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Lenis still runs for smooth scroll, but no GSAP animations
} else {
  initAnimations()
}

function initAnimations() {
  // ─── Hero: stagger on load ─────────────────────────────────────────────────
  const heroItems = gsap.utils.toArray('[data-gsap="hero-item"]')
  if (heroItems.length) {
    gsap.set(heroItems, { opacity: 0, y: -28 })
    gsap.to(heroItems, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: 'power2.out',
      delay: 0.2,
    })

    // Parallax no hero-copy
    const heroCopy = document.querySelector('[data-gsap="hero-copy"]')
    if (heroCopy) {
      gsap.to(heroCopy, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-gsap="hero"]',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }

  // ─── Problem: slide alternado + counters ───────────────────────────────────
  const problemCards = gsap.utils.toArray('[data-gsap="problem-card"]')
  if (problemCards.length) {
    problemCards.forEach((card) => {
      const dir = card.dataset.direction === 'right' ? 60 : -60
      gsap.set(card, { opacity: 0, x: dir })
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
        },
        onComplete: () => animateCounter(card),
      })
    })

    const heading = document.querySelector('[data-gsap="problem-heading"]')
    if (heading) {
      gsap.set(heading, { opacity: 0, y: 24 })
      gsap.to(heading, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      })
    }
  }

  // ─── Services: horizontal scroll (desktop) / fade vertical (mobile) ───────
  const mm = gsap.matchMedia()

  mm.add('(min-width: 768px)', () => {
    const track = document.querySelector('[data-gsap="services-track"]')
    const section = document.querySelector('[data-gsap="services"]')
    if (!track || !section) return

    const outer = document.querySelector('[data-gsap="services-outer"]')
    const getDistance = () =>
      track.scrollWidth - (outer ? outer.offsetWidth : document.documentElement.clientWidth)

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => tween.kill()
  })

  mm.add('(max-width: 767px)', () => {
    const cards = gsap.utils.toArray('[data-gsap="services"] .service-card')
    gsap.set(cards, { opacity: 0, y: 30 })
    cards.forEach((card) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: card, start: 'top 85%' },
      })
    })
  })

  // ─── Method 5D: linha SVG scrub + steps reveal ────────────────────────────
  const methodSection = document.querySelector('[data-gsap="method"]')
  if (methodSection) {
    const linePath = methodSection.querySelector('[data-gsap="method-line-path"]')
    const steps = gsap.utils.toArray('[data-gsap="method-step"]')

    if (linePath) {
      const lineLen = linePath.getTotalLength?.() ?? 1000
      gsap.set(linePath, { strokeDasharray: lineLen, strokeDashoffset: lineLen })
      gsap.to(linePath, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: methodSection,
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: 0.4,
        },
      })
    }

    gsap.set(steps, { opacity: 0, x: -24 })
    steps.forEach((step) => {
      gsap.to(step, {
        opacity: 1, x: 0, duration: 0.55, ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          onEnter: () => step.classList.add('is-active'),
        },
      })
    })
  }

  // ─── Diferenciais: split slide ────────────────────────────────────────────
  const difHeadline = document.querySelector('[data-gsap="diferenciais-headline"]')
  const difItems = gsap.utils.toArray('[data-gsap="diferencial-item"]')

  if (difHeadline) {
    gsap.set(difHeadline, { opacity: 0, x: -48 })
    gsap.to(difHeadline, {
      opacity: 1, x: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: difHeadline, start: 'top 78%' },
    })
  }

  if (difItems.length) {
    gsap.set(difItems, { opacity: 0, x: 48 })
    gsap.to(difItems, {
      opacity: 1, x: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-gsap="diferenciais"]', start: 'top 75%' },
    })
  }

  // ─── FAQ Preview: scale fade ──────────────────────────────────────────────
  const faqSection = document.querySelector('[data-gsap="faq-preview"]')
  if (faqSection) {
    gsap.set(faqSection, { opacity: 0, scale: 0.97 })
    gsap.to(faqSection, {
      opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: faqSection, start: 'top 80%' },
    })
  }

  // ─── CTA: scale fade ──────────────────────────────────────────────────────
  const ctaCard = document.querySelector('[data-gsap="cta"] .cta-card')
  if (ctaCard) {
    gsap.set(ctaCard, { opacity: 0, scale: 0.96, y: 20 })
    gsap.to(ctaCard, {
      opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: ctaCard, start: 'top 82%' },
    })
  }

  // ─── Inner pages: page-hero stagger ──────────────────────────────────────
  const pageHeroItems = gsap.utils.toArray('[data-gsap="page-hero-item"]')
  if (pageHeroItems.length) {
    gsap.set(pageHeroItems, { opacity: 0, y: -20 })
    gsap.to(pageHeroItems, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 0.15,
    })
  }

  // Inner page sections: fade reveal
  const pageSections = gsap.utils.toArray('[data-gsap="page-section"]')
  pageSections.forEach((section) => {
    gsap.set(section, { opacity: 0, y: 28 })
    gsap.to(section, {
      opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 82%' },
    })
  })
}

// ─── Counter animation helper ─────────────────────────────────────────────────
function animateCounter(card) {
  const el = card.querySelector('.problem-counter')
  if (!el) return
  const target = parseFloat(el.dataset.target)
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration: 1.4,
    ease: 'power1.inOut',
    onUpdate() {
      el.textContent = Math.round(obj.val)
    },
  })
}
