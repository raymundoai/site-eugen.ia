import { Link } from 'react-router-dom'
import { Button } from '../components/atoms/Button'

export function ThanksPage() {
  return (
    <section className="page-hero page-centered">
      <div className="container" data-reveal>
        <p className="kicker">Obrigado</p>
        <h1>Diagnóstico recebido com sucesso</h1>
        <p>Nosso time retorna em breve com os próximos passos para sua operação.</p>
        <Button as={Link} to="/" data-cursor="action">
          Voltar para início
        </Button>
      </div>
    </section>
  )
}
