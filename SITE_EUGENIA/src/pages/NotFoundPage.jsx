import { Link } from 'react-router-dom'
import { Button } from '../components/atoms/Button'

export function NotFoundPage() {
  return (
    <section className="page-hero page-centered">
      <div className="container" data-reveal>
        <p className="kicker">404</p>
        <h1>Página não encontrada</h1>
        <p>O conteúdo pode ter mudado de endereço ou não existe mais.</p>
        <Button as={Link} to="/" data-cursor="action">
          Ir para Home
        </Button>
      </div>
    </section>
  )
}
