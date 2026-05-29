export function CookiesPage() {
  return (
    <>
      <section className="page-hero section">
        <div className="container page-centered" data-reveal>
          <p className="eyebrow">LGPD</p>
          <h1>Política de Cookies</h1>
          <p className="legal-updated">Última atualização: 29 de maio de 2026.</p>
        </div>
      </section>

      <section className="section legal-section">
        <div className="container legal-content">
          <article>
            <h2>Como usamos cookies e tecnologias similares</h2>
            <p>
              Usamos cookies, <code>localStorage</code>, <code>sessionStorage</code> e tecnologias similares para manter
              o site funcional, lembrar preferências e, somente com autorização, medir audiência com GA4.
            </p>
          </article>

          <article>
            <h2>Categorias</h2>
            <p>
              Necessários: mantêm o funcionamento do site e recursos solicitados, como a sessão do chat. Não podem ser
              desativados pelo painel porque são necessários ao serviço.
            </p>
            <p>Preferências: guardam escolhas de experiência, como tema claro ou escuro.</p>
            <p>Medição: ativam o Google Analytics 4 para entender navegação e melhorar o site.</p>
          </article>

          <article>
            <h2>Tecnologias atuais</h2>
            <ul className="legal-list">
              <li>
                <code>eugenia_cookie_consent</code>: preferências de cookies, em <code>localStorage</code>.
              </li>
              <li>
                <code>eugenia_theme</code>: preferência visual, em <code>localStorage</code>.
              </li>
              <li>
                <code>eugenia_chat_state</code>: estado da conversa, em <code>sessionStorage</code>.
              </li>
              <li>
                GA4 <code>G-LFD6SZVERB</code>: carregado apenas após consentimento para medição.
              </li>
            </ul>
          </article>

          <article>
            <h2>Como alterar sua escolha</h2>
            <p>
              Você pode abrir “Preferências de cookies” no rodapé do site a qualquer momento para aceitar, rejeitar ou
              revisar categorias não essenciais. Ao retirar consentimento de medição, o site interrompe novas chamadas ao
              GA4 e remove cookies conhecidos do Google Analytics quando acessíveis pelo navegador.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
