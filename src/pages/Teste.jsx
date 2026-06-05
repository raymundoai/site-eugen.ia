import Tag from '../components/ui/Tag.jsx'
import './PageShared.css'
import './Teste.css'

// TODO: substituir pela URL real do formulário
const GOOGLE_FORMS_URL = 'https://docs.google.com/forms/d/e/PLACEHOLDER/viewform?embedded=true'

export default function Teste() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag>Diagnóstico gratuito</Tag>
          <h1>
            Descubra o nível de maturidade{' '}
            <span>em IA da sua operação.</span>
          </h1>
          <p className="page-hero-sub">
            10 perguntas. 3 minutos. Você recebe um relatório com seu score de
            maturidade e as 3 maiores oportunidades de automação identificadas
            para o seu negócio. Resultado em até 24 horas por e-mail.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="teste-outcomes">
            {[
              {
                title: 'Score de maturidade de 1 a 5',
                desc: 'com análise do seu perfil',
              },
              {
                title: '3 oportunidades de automação',
                desc: 'com estimativa de impacto',
              },
              {
                title: 'Contexto regulatório',
                desc: 'aplicado ao seu segmento',
              },
            ].map((item, i) => (
              <div key={i} className="teste-outcome">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container teste-form-container">
          <iframe
            src={GOOGLE_FORMS_URL}
            title="Teste de Maturidade em IA"
            className="teste-form"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            Carregando...
          </iframe>
        </div>
      </section>

      <section className="section">
        <div className="container teste-footer-note">
          <p>
            Após receber o relatório, você pode agendar o Pré-Diagnóstico
            gratuito para aprofundar qualquer oportunidade identificada.
          </p>
        </div>
      </section>
    </>
  )
}
