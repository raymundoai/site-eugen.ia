import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const ratio = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0
      setProgress(Math.min(100, Math.max(0, ratio)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div style={{ width: `${progress}%` }} />
    </div>
  )
}
