import { Button } from '../components/Button'

export function ThanksPage() {
  return (
    <section className="page-hero section">
      <div className="container page-centered" data-reveal>
        <p className="eyebrow">Próximo passo</p>
        <h1>Sua operação pode ser mais leve do que você imagina.</h1>
        <Button to="/">Início</Button>
      </div>
    </section>
  )
}
