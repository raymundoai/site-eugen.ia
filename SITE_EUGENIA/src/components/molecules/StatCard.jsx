export function StatCard({ value, label }) {
  return (
    <article className="stat-card" data-reveal data-cursor="action">
      <strong>{value}</strong>
      <p>{label}</p>
    </article>
  )
}
