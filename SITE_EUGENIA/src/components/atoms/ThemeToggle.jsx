import { useTheme } from '../../contexts/ThemeContext'
import { classNames } from '../../utils/classNames'

export function ThemeToggle() {
  const { mode, resolvedTheme, toggleMode } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleMode}
      aria-label={`Alternar tema. Atual: ${mode} (${resolvedTheme})`}
      data-cursor="action"
      title={`Tema: ${mode}`}
    >
      <span className={classNames('theme-toggle-icon', !isDark && 'theme-toggle-icon-active')} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.5 17.5l1.57 1.57M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.5 6.5l1.57-1.57" />
        </svg>
      </span>
      <span className={classNames('theme-toggle-icon', isDark && 'theme-toggle-icon-active')} aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M21 13.4A8.4 8.4 0 1 1 10.6 3a7.2 7.2 0 1 0 10.4 10.4Z" />
        </svg>
      </span>
      <span className="sr-only">{isDark ? 'Tema noturno ativo' : 'Tema diurno ativo'}</span>
    </button>
  )
}
