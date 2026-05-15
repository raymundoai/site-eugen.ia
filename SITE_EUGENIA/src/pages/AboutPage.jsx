import { FaqList } from '../components/FaqList'

export function AboutPage() {
  return (
    <>
      <section className="page-hero section">
        <div className="container" data-reveal>
          <h1>Quem é a Eugen.IA?</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <FaqList limit={1} />
        </div>
      </section>
    </>
  )
}
