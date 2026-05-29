export function PrivacyPage() {
  return (
    <>
      <section className="page-hero section">
        <div className="container page-centered" data-reveal>
          <p className="eyebrow">LGPD</p>
          <h1>Política de Privacidade</h1>
          <p className="legal-updated">Última atualização: 29 de maio de 2026.</p>
        </div>
      </section>

      <section className="section legal-section">
        <div className="container legal-content">
          <article>
            <h2>Quem controla os dados</h2>
            <p>
              A Eugen.IA é responsável pelas decisões sobre os dados pessoais coletados neste site. Para solicitações
              sobre privacidade, use o e-mail <a href="mailto:contato@eugenia.ia.br">contato@eugenia.ia.br</a>.
            </p>
          </article>

          <article>
            <h2>Dados tratados</h2>
            <p>
              Podemos tratar dados informados no chat, como nome, e-mail, telefone, empresa, segmento, dores da
              operação, mensagens enviadas e metadados técnicos necessários para manter a conversa da sessão.
            </p>
            <p>
              Também usamos armazenamento local para preferências de tema, consentimento de cookies e estado do chat.
            </p>
          </article>

          <article>
            <h2>Finalidades e bases legais</h2>
            <p>
              Tratamos dados do chat para responder à sua solicitação, qualificar o atendimento e realizar procedimentos
              preliminares relacionados a uma possível contratação, a pedido do titular.
            </p>
            <p>
              O contato comercial posterior depende do consentimento específico marcado no chat. Cookies de medição,
              como GA4, só são ativados após consentimento para a categoria de medição.
            </p>
          </article>

          <article>
            <h2>Compartilhamento</h2>
            <p>
              Os dados do chat são enviados ao webhook n8n configurado para atendimento da Eugen.IA. Quando autorizado,
              dados de navegação podem ser enviados ao Google Analytics 4 para medição de audiência.
            </p>
          </article>

          <article>
            <h2>Retenção e segurança</h2>
            <p>
              Mantemos dados pelo tempo necessário às finalidades informadas, ao cumprimento de obrigações legais ou à
              defesa de direitos. No navegador, o chat fica em <code>sessionStorage</code> e pode ser apagado pelo botão
              “Limpar” no próprio chat.
            </p>
            <p>
              Adotamos medidas técnicas e administrativas proporcionais ao porte e finalidade do site para reduzir riscos
              de acesso indevido, perda, alteração ou vazamento.
            </p>
          </article>

          <article>
            <h2>Direitos do titular</h2>
            <p>
              Você pode solicitar confirmação de tratamento, acesso, correção, eliminação, anonimização, informações de
              compartilhamento, revogação de consentimento e oposição quando aplicável.
            </p>
            <p>
              Para exercer esses direitos, envie uma solicitação para{' '}
              <a href="mailto:contato@eugenia.ia.br">contato@eugenia.ia.br</a>.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
