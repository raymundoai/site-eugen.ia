import { classNames } from '../../utils/classNames'
import { useCustomCursor } from '../../hooks/useCustomCursor'

export function GlobalCursor() {
  const { enabled, position, mode } = useCustomCursor()

  if (!enabled) {
    return null
  }

  return (
    <div
      className={classNames('custom-cursor', mode === 'action' && 'custom-cursor-action')}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      aria-hidden="true"
    >
      <div className="custom-cursor-core" />
      <div className="custom-cursor-ring" />
    </div>
  )
}
