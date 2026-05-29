# Relatorio de Adequacao LGPD e Cookies - Site Eugen.IA

Data da auditoria: 2026-05-28

Escopo desta etapa: leitura do PDF `docs/Lei_geral_protecao_dados_pessoais_1ed.pdf`, verificacao do codigo atual do site e definicao das melhorias necessarias antes de implementar banner de cookies, bloqueio de Google Tag e politicas de privacidade/cookies.

Observacao: este relatorio e uma analise tecnica de adequacao com base na LGPD e em orientacoes publicas da ANPD. Nao substitui revisao juridica.

## 1. Requisitos LGPD Relevantes para o Site

### 1.1 Aplicabilidade

A LGPD se aplica a operacoes de tratamento de dados pessoais realizadas no Brasil, quando a coleta ocorre no Brasil ou quando a oferta de bens/servicos se dirige a pessoas no Brasil.

Para o site Eugen.IA, ha tratamento de dados pessoais porque o chat coleta ou pode coletar nome, e-mail, telefone, empresa, segmento, dores da operacao e historico de conversa.

### 1.2 Conceitos que precisam orientar a implementacao

- Dado pessoal: informacao relacionada a pessoa natural identificada ou identificavel.
- Dado pessoal sensivel: origem racial/etnica, conviccao religiosa, opiniao politica, saude, biometria etc. O site nao deve solicitar esse tipo de dado no fluxo comercial.
- Tratamento: coleta, recepcao, armazenamento, uso, compartilhamento, eliminacao e qualquer operacao com dados pessoais.
- Controlador: quem decide as finalidades e meios do tratamento. Para o site, a Eugen.IA tende a ser controladora dos dados coletados.
- Operador: quem trata dados em nome do controlador. O n8n/webhook, hospedagem, Google e eventuais ferramentas de CRM/analytics podem ser operadores ou controladores independentes, conforme contrato e uso.
- Consentimento: manifestacao livre, informada e inequivoca para finalidade determinada.

### 1.3 Principios obrigatorios

Todo tratamento precisa respeitar:

- Finalidade: informar propositos legitimos, especificos e explicitos.
- Adequacao: tratamento compativel com a finalidade informada.
- Necessidade: coletar apenas o minimo necessario.
- Livre acesso: facilitar consulta sobre forma e duracao do tratamento.
- Qualidade dos dados: manter dados claros, exatos, relevantes e atualizados.
- Transparencia: informar de forma clara sobre tratamento e agentes envolvidos.
- Seguranca: adotar medidas tecnicas e administrativas para proteger dados.
- Prevencao: reduzir riscos de incidentes e danos.
- Nao discriminacao: nao usar dados para fins discriminatorios ou abusivos.
- Responsabilizacao e prestacao de contas: conseguir demonstrar conformidade.

### 1.4 Base legal para cada finalidade

O site precisa mapear uma base legal para cada tratamento:

- Chat comercial/diagnostico: pode usar consentimento, execucao de procedimentos preliminares relacionados a contrato a pedido do titular, ou legitimo interesse, dependendo do desenho final. A base escolhida deve ser informada claramente.
- Contato comercial posterior via WhatsApp/e-mail: se depender de consentimento, ele deve ser claro, especifico e revogavel.
- Cookies tecnicos estritamente necessarios: normalmente podem operar sem consentimento, mas devem ser informados.
- Cookies de preferencia: podem depender de consentimento ou configuracao solicitada pelo usuario, conforme finalidade.
- Analytics/Google Tag: para este site, a recomendacao tecnica e exigir consentimento previo, principalmente se houver Google Analytics, Google Ads, remarketing, identificadores, medicao entre sites, personalizacao ou compartilhamento com terceiros.
- Marketing/remarketing: exige consentimento previo, granular e revogavel.

### 1.5 Consentimento valido

Quando a base legal escolhida for consentimento:

- Deve ser livre, informado e inequivoco.
- Deve estar vinculado a finalidades determinadas.
- Deve ser destacada a finalidade sensivel ou relevante, sem texto generico.
- Nao pode haver checkbox pre-marcado.
- O controlador deve conseguir provar que o consentimento foi obtido.
- Deve ser possivel revogar a qualquer momento, por procedimento gratuito e facilitado.
- Mudancas de finalidade exigem informacao previa e nova escolha quando necessario.
- O usuario deve ser informado sobre a consequencia de negar consentimento.

### 1.6 Informacoes obrigatorias ao titular

O site precisa disponibilizar acesso facil, claro e gratuito a:

- Finalidade especifica do tratamento.
- Forma e duracao do tratamento, observados segredos comercial e industrial.
- Identificacao do controlador.
- Informacoes de contato do controlador.
- Informacoes sobre compartilhamento de dados e suas finalidades.
- Responsabilidades dos agentes envolvidos.
- Direitos do titular.
- Canal para exercer direitos.

### 1.7 Direitos do titular

O site precisa oferecer canal e procedimento para:

- Confirmar existencia de tratamento.
- Acessar dados pessoais.
- Corrigir dados incompletos, inexatos ou desatualizados.
- Solicitar anonimizacao, bloqueio ou eliminacao de dados desnecessarios, excessivos ou tratados em desconformidade.
- Solicitar portabilidade quando aplicavel.
- Solicitar eliminacao de dados tratados com consentimento, salvo retencoes legais.
- Obter informacoes sobre compartilhamento.
- Ser informado sobre possibilidade de nao consentir e consequencias.
- Revogar consentimento.
- Opor-se a tratamento baseado em dispensa de consentimento, se houver descumprimento da LGPD.
- Solicitar revisao de decisoes automatizadas, se existirem.

### 1.8 Retencao e eliminacao

O tratamento deve terminar quando:

- A finalidade for alcancada.
- Os dados deixarem de ser necessarios.
- O titular revogar consentimento, quando essa for a base legal.
- Houver determinacao da ANPD.

Apos o termino, dados devem ser eliminados, salvo conservacao para cumprimento legal/regulatorio, estudo anonimizavel, transferencia autorizada a terceiro ou uso exclusivo do controlador com dados anonimizados.

### 1.9 Encarregado e canal LGPD

Como regra geral, o controlador deve indicar encarregado pelo tratamento de dados e publicar identidade e contato do encarregado no site. A necessidade exata pode variar conforme porte e regulamentacao da ANPD, mas o site deve ao menos ter um canal claro de privacidade/LGPD.

### 1.10 Registro, seguranca e prestacao de contas

Devem existir:

- Registro das operacoes de tratamento.
- Politica de seguranca minima para dados coletados.
- Controle de acesso aos dados recebidos pelo webhook/n8n.
- Medidas de prevencao contra vazamento, acesso indevido e perda.
- Procedimento de resposta a incidentes.
- Capacidade de demonstrar consentimentos e configuracoes de cookies.

### 1.11 Cookies e Google Tag

Embora o PDF da LGPD nao cite cookies nominalmente, cookies, pixels, tags e identificadores online podem ser dados pessoais quando identificam ou tornam identificavel um usuario ou dispositivo.

Requisitos praticos para cookies e tags:

- Inventario de cookies e tecnologias similares.
- Classificacao por finalidade: necessarios, preferencias, analytics/medicao, marketing/publicidade.
- Bloqueio previo de cookies nao essenciais antes do consentimento.
- Banner inicial com linguagem clara e botoes equivalentes para aceitar, rejeitar e configurar.
- Centro de preferencias com granularidade por categoria.
- Cookies nao essenciais desativados por padrao.
- Registro local da escolha do usuario.
- Mecanismo permanente para alterar/revogar consentimento.
- Politica de cookies explicando nome, fornecedor, finalidade, duracao, categoria e compartilhamento.
- Google Tag/Analytics/Ads so deve carregar apos consentimento valido para a categoria correspondente.
- Se usar Google Consent Mode, iniciar com `analytics_storage`, `ad_storage`, `ad_user_data` e `ad_personalization` como `denied`, atualizando para `granted` apenas apos aprovacao.

## 2. Estado Atual do Site

### 2.1 Chat e dados pessoais

Arquivos analisados:

- `SITE_EUGENIA/src/components/ChatWidget.jsx`
- `SITE_EUGENIA/src/contexts/ChatContext.jsx`
- `SITE_EUGENIA/src/utils/chatPayload.js`
- `N8N_CONEXAO_AGENTE.md`

Estado atual:

- O chat coleta mensagens livres e pode receber dados pessoais no texto.
- O payload enviado ao webhook inclui `session_id`, rota, mensagem, historico da conversa, dados de lead e `consent_lgpd`.
- O estado do chat e persistido em `sessionStorage` com chave `eugenia_chat_state`.
- O checkbox LGPD existe, mas nao bloqueia o envio da mensagem se estiver desmarcado.
- Mesmo com `consent_lgpd: false`, o site envia a conversa e dados ao webhook.
- O texto atual do consentimento e: "Autorizo o armazenamento e uso das informacoes para contato comercial, conforme a LGPD."
- Nao ha link visivel para Politica de Privacidade junto ao consentimento.
- Nao ha mecanismo visivel para apagar/resetar os dados do chat.

Risco:

- Se a base legal pretendida for consentimento, o fluxo atual e insuficiente, porque ha tratamento antes/de forma independente do consentimento.
- Se a base legal pretendida for procedimentos preliminares de contrato ou legitimo interesse, o checkbox atual pode confundir, pois parece exigir consentimento para armazenamento/contato comercial sem explicar outras bases e finalidades.

### 2.2 Cookies, localStorage e sessionStorage

Estado atual:

- Nao ha banner de cookies.
- Nao ha centro de preferencias.
- Nao ha Politica de Cookies.
- `localStorage` e usado para tema (`eugenia_theme`).
- `sessionStorage` e usado para estado do chat (`eugenia_chat_state`), contendo conversa e lead.
- Nao foi encontrado uso de `document.cookie` no codigo fonte do site.

Risco:

- Mesmo sem cookies tradicionais, o site usa armazenamento local do navegador. Isso deve ser informado na Politica de Privacidade/Cookies.
- O armazenamento do chat pode conter dados pessoais e precisa de transparencia, minimizacao e mecanismo de exclusao.

### 2.3 Google Tag, Analytics e marketing

Estado atual:

- Nao foi encontrada Google Tag, Google Analytics, GTM, Meta Pixel ou outro script de tracking no `SITE_EUGENIA/index.html` ou em `SITE_EUGENIA/src`.
- O deploy atual tambem nao deve carregar Google Tag a partir do codigo analisado.
- Portanto, hoje nao ha mecanismo de ativacao condicional porque a tag ainda nao esta implementada no codigo fonte.

Risco:

- Se a Google Tag for adicionada diretamente no `index.html`, ela carregara antes do consentimento e isso nao e adequado para analytics/ads/marketing.
- A implementacao correta deve centralizar a carga da tag em um componente/servico controlado pelo estado de consentimento.

### 2.4 Politicas e rotas legais

Estado atual:

- Nao ha rota `/privacidade`.
- Nao ha rota `/politica-de-privacidade`.
- Nao ha rota `/cookies` ou `/politica-de-cookies`.
- O footer nao exibe links legais de privacidade/cookies.
- Nao ha identificacao publica de controlador/encarregado/canal LGPD.

Risco:

- Falta atendimento claro aos deveres de transparencia e livre acesso.
- Falta canal estruturado para exercicio dos direitos do titular.

### 2.5 Compartilhamento com terceiros

Estado atual identificado:

- O chat envia dados para webhook n8n em `https://n8nwebhook.brewhouseinsumos.com.br/webhook/eugenia-site`.
- O site tem links externos para LinkedIn, Instagram, Facebook e WhatsApp, mas links simples nao carregam pixels por si so.
- Nao ha informacao publica sobre operadores, armazenamento, retencao, logs ou CRM conectado ao n8n.

Risco:

- Precisa documentar quem recebe os dados do chat e para qual finalidade.
- Precisa definir se ha transferencia internacional ou uso de fornecedores fora do Brasil, especialmente se forem adicionados Google Analytics/Ads ou ferramentas externas.

## 3. Melhorias Necessarias Antes de Considerar Adequado

### 3.1 Implementar gestao de consentimento de cookies

Criar um `CookieConsentProvider` ou equivalente com:

- Estado inicial sem consentimento para categorias nao essenciais.
- Persistencia da escolha em `localStorage`.
- Categorias: `necessary`, `preferences`, `analytics`, `marketing`.
- `necessary` sempre ativo e informado, sem toggle de desativacao.
- `preferences`, `analytics` e `marketing` desativados por padrao.
- Registro de versao da politica e data/hora da escolha.
- Funcao para revogar/alterar consentimento.

### 3.2 Criar banner de cookies

Banner inicial deve ter:

- Texto curto e claro.
- Botao "Aceitar todos".
- Botao "Rejeitar nao essenciais".
- Botao "Configurar".
- Link para Politica de Cookies/Privacidade.
- Sem pre-selecao de categorias nao essenciais.
- Sem bloquear acesso ao site se usuario rejeitar cookies nao essenciais.

### 3.3 Criar centro de preferencias

Modal ou pagina com:

- Explicacao por categoria.
- Toggle por categoria.
- Lista ou resumo dos cookies/tecnologias usadas.
- Botoes para salvar, rejeitar nao essenciais e aceitar todos.
- Acesso persistente no footer: "Preferencias de cookies".

### 3.4 Carregar Google Tag somente apos consentimento

Implementar um carregador condicional:

- Nao incluir Google Tag diretamente no HTML inicial.
- Se usar Google Consent Mode, inicializar com tudo `denied`.
- So injetar/configurar Google Tag apos consentimento de `analytics` e/ou `marketing`.
- Separar analytics de marketing/ads.
- Revogacao deve atualizar consentimento para `denied` e impedir novas chamadas.
- Documentar o ID da tag em variavel de ambiente, por exemplo `VITE_GOOGLE_TAG_ID`.

### 3.5 Criar Politica de Privacidade

Conteudo minimo:

- Quem e o controlador.
- Dados coletados pelo chat.
- Dados tecnicos e de navegacao.
- Finalidades.
- Bases legais.
- Compartilhamento com n8n, Google e outros fornecedores aplicaveis.
- Transferencia internacional, se aplicavel.
- Tempo de retencao.
- Direitos do titular.
- Canal de contato.
- Encarregado ou canal LGPD.
- Medidas de seguranca em alto nivel.
- Data e versao da politica.

### 3.6 Criar Politica de Cookies

Conteudo minimo:

- O que sao cookies e tecnologias similares.
- Categorias utilizadas.
- Cookies/armazenamentos atuais:
  - `eugenia_theme`: preferencia visual, `localStorage`, persistente.
  - `eugenia_chat_state`: estado e historico do chat, `sessionStorage`, sessao.
  - Google Tag/Analytics/Ads: somente se implementado e apos consentimento.
- Como aceitar, rejeitar ou alterar preferencias.
- Como bloquear cookies no navegador.
- Consequencias de rejeitar cookies nao essenciais.
- Data e versao.

### 3.7 Ajustar consentimento do chat

Decisao necessaria antes de implementar:

Opcao A - Consentimento como base legal do chat:

- Bloquear envio ate o usuario aceitar o tratamento dos dados do chat.
- Separar consentimento de "contato comercial posterior".
- Registrar data, versao do texto e finalidade consentida.

Opcao B - Procedimentos preliminares/legitimo interesse para responder ao chat:

- Permitir envio sem checkbox, mas informar claramente que dados serao tratados para responder a solicitacao.
- Usar checkbox separado apenas para contato comercial posterior/marketing.
- Atualizar payload para diferenciar base legal do atendimento e consentimento de marketing.

Recomendacao tecnica: Opcao B para atendimento inicial/diagnostico solicitado pelo usuario, com checkbox especifico para contato comercial posterior quando necessario. Validar juridicamente.

### 3.8 Permitir limpeza dos dados do chat

Adicionar:

- Acao "limpar conversa" ou "apagar dados desta sessao".
- Remocao de `eugenia_chat_state` do `sessionStorage`.
- Reinicio de sessao sem reaproveitar lead/conversa.

### 3.9 Atualizar footer e rotas

Adicionar links:

- Politica de Privacidade.
- Politica de Cookies.
- Preferencias de cookies.

Possiveis rotas:

- `/privacidade`
- `/cookies`

### 3.10 Criar inventario interno de tratamento

Documento interno recomendado:

- Dado coletado.
- Origem.
- Finalidade.
- Base legal.
- Onde fica armazenado.
- Quem acessa.
- Compartilhamento.
- Prazo de retencao.
- Como excluir.

### 3.11 Definir retencao e exclusao no n8n/backend

O frontend sozinho nao resolve conformidade se o webhook persistir dados.

Necessario definir:

- Onde o n8n grava as conversas/leads.
- Prazo de retencao.
- Processo de exclusao por pedido do titular.
- Logs tecnicos e tempo de retencao.
- Controle de acesso.
- Backups.

### 3.12 Preparar resposta a incidentes

Criar procedimento minimo:

- Como identificar incidente.
- Quem e responsavel.
- Como avaliar risco/dano relevante.
- Como comunicar ANPD e titulares quando necessario.
- Como registrar medidas adotadas.

## 4. Priorizacao Recomendada

### Prioridade 1 - Necessario antes de adicionar Google Tag

1. Criar camada de consentimento.
2. Criar banner de cookies.
3. Criar centro de preferencias.
4. Implementar Google Tag condicional, bloqueada por padrao.
5. Criar Politica de Cookies.
6. Adicionar link de preferencias no footer.

### Prioridade 2 - Necessario para o chat ficar mais consistente

1. Decidir base legal do chat.
2. Ajustar texto e comportamento do checkbox LGPD.
3. Separar consentimento de atendimento e contato comercial.
4. Criar botao de limpar conversa/dados da sessao.
5. Documentar compartilhamento com n8n.

### Prioridade 3 - Governanca

1. Criar Politica de Privacidade.
2. Publicar canal LGPD/encarregado.
3. Criar inventario interno de tratamento.
4. Definir retencao/exclusao no n8n.
5. Definir procedimento de incidentes.

## 5. Estado de Conformidade Atual

Status tecnico atual: parcialmente adequado apenas no ponto de existir um checkbox LGPD no chat.

Principais lacunas:

- Nao ha banner de cookies.
- Nao ha preferencia granular.
- Nao ha politica de cookies.
- Nao ha politica de privacidade.
- Nao ha canal LGPD visivel.
- O chat envia dados mesmo sem consentimento marcado.
- O consentimento do chat e generico e nao explica finalidades, base legal, compartilhamento, retencao ou direitos.
- Nao ha mecanismo de revogacao/limpeza no chat.
- A Google Tag ainda nao esta implementada; quando for, precisa ser bloqueada ate aprovacao.

Conclusao: antes de adicionar Google Tag/Analytics, o site deve implementar gestao de consentimento e politicas legais. Antes de considerar o chat adequado, e necessario ajustar a base legal, transparencia e controle do titular.
