import { FaqList } from '../components/FaqList'

export function FaqPage() {
  return (
    <>
      <section className="page-hero section">
        <div className="container" data-reveal>
          <h1>Perguntas Frequentes</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <FaqList />
        </div>
      </section>
    </>
  )
}
