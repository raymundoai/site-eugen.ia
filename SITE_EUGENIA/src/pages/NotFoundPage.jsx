import { Button } from '../components/Button'

export function NotFoundPage() {
  return (
    <section className="page-hero section">
      <div className="container page-centered" data-reveal>
        <h1>Página não encontrada</h1>
        <Button to="/">Voltar ao início</Button>
      </div>
    </section>
  )
}
