import { Link } from 'react-router-dom'
import { Button } from '../components/atoms/Button'
import profilePhoto from '../../foto-perfil-1.png'

export function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="container">
          <div className="about-hero-layout">
            <div className="about-hero-content" data-reveal>
              <p className="kicker">Sobre</p>
              <h1>Eu já estive do outro lado da planilha.</h1>
              <p>
                E sei exatamente como é quando a operação cresce mais rápido do que a sua capacidade de controlar ela manualmente.
              </p>
              <p>
                Era mais de 10 da noite. Abri a planilha, a mesma que eu abria toda noite, e comecei a atualizar informação por informação, linha por linha.
              </p>
              <p>
                Eram milhares de dados operacionais espalhados: preço, descrição, estoque, cliente, pedido, tarefa, prazo. Às vezes as informações estavam em sistemas diferentes que não conversavam entre si.
              </p>
              <p>
                Eu já tinha mais de 5 anos dentro de operação digital, com a mão na massa, resolvendo problema real. E naquele momento pensei: isso não é sustentável.
              </p>
              <p>
                Não foi epifania. Foi necessidade. Comecei a usar IA de verdade nos processos e o que levava dias passou a levar horas. O que levava horas, minutos. Não foi mágica. Foi estrutura.
              </p>
              <p>
                A Eugen.IA nasceu desse lugar: uma frustração real transformada em solução para empresas que ainda estão presas em processos manuais.
              </p>
            </div>

            <figure className="about-hero-portrait" data-reveal data-reveal-y="40">
              <div className="about-hero-portrait-media">
                <img src={profilePhoto} alt="Retrato do fundador da Eugen.IA" />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <article data-reveal>
            <h2>Quem fala aqui já operou</h2>
            <p>
              Não ensinamos teoria distante da prática. Mapeamos sua operação porque já vivemos rotinas parecidas e sabemos onde os gargalos costumam aparecer.
            </p>
          </article>
          <article data-reveal>
            <h2>Devolver tempo a quem constrói</h2>
            <p>
              Transformar processos manuais em sistemas inteligentes para que donos e gestores de PMEs parem de ser o gargalo da própria empresa.
            </p>
          </article>
          <article data-reveal>
            <h2>Valores</h2>
            <ul>
              <li>Clareza antes de ferramenta</li>
              <li>Estratégia conectada à execução</li>
              <li>Automação com impacto mensurável</li>
              <li>Entrega técnica com responsabilidade</li>
              <li>Relacionamento direto e honesto</li>
            </ul>
          </article>
          <article data-reveal>
            <h2>O que a Eugen.IA não é</h2>
            <p>
              Não somos uma fábrica de automações. Atendemos poucos projetos por vez, intencionalmente, para garantir que cada operação receba atenção real e não um template replicado com o logo da sua empresa.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-cta" data-reveal>
        <div className="container cta-banner">
          <div>
            <p className="kicker">Se você reconheceu algo dessa história</p>
            <h2>Provavelmente já sabe qual é o próximo passo.</h2>
            <p>30 minutos de conversa com a Eugênia para mapear o gargalo que mais pesa na sua operação hoje. Sem compromisso. Sem pitch.</p>
          </div>
          <Button as={Link} to="/contato" data-cursor="action">
            Agendar diagnóstico
          </Button>
        </div>
      </section>
    </>
  )
}
