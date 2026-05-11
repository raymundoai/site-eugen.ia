import { resolveServiceIcon } from '../../utils/serviceIcons'

export function ServiceCard({ title, promise, details, bullets, icon, index }) {
  const Icon = resolveServiceIcon(icon)

  return (
    <article className="service-card" data-reveal data-cursor="action" style={{ '--delay': `${index * 0.05}s` }}>
      <span className="service-card-icon" aria-hidden="true">
        <Icon size={18} strokeWidth={1.9} />
      </span>
      <h3>{title}</h3>
      <p>{promise}</p>
      {details ? <p>{details}</p> : null}
      <ul>
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}
