import { Link } from 'react-router-dom'
import { FAQAccordion } from '../components/organisms/FAQAccordion'
import { Button } from '../components/atoms/Button'

export function FaqPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container" data-reveal>
          <p className="kicker">FAQ</p>
          <h1>As dúvidas que todo gestor tem antes de dar o próximo passo.</h1>
          <p>
            Respostas diretas. Sem forçar decisão. Se depois de ler ainda tiver dúvida, a Eugênia resolve no chat.
          </p>
        </div>
      </section>
      <FAQAccordion />

      <section className="section section-cta" data-reveal>
        <div className="container cta-banner">
          <div>
            <p className="kicker">Ainda com dúvida?</p>
            <h2>A Eugênia resolve em tempo real.</h2>
            <p>
              Clique no chat e faça sua pergunta diretamente. Ou, se já está pronto para mapear sua operação, o botão abaixo abre o diagnóstico.
            </p>
          </div>
          <Button as={Link} to="/contato" data-cursor="action">
            Agendar diagnóstico
          </Button>
        </div>
      </section>
    </>
  )
}
