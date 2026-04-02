# Documentacao de Continuidade do Projeto Site Eugen.IA

## Objetivo
Este documento existe para entregar contexto tecnico suficiente para que outro desenvolvedor assuma o projeto atual do site da Eugen.IA sem quebrar:

- a estrutura visual do site
- a organizacao dos componentes
- a persistencia do chat
- a logica de tema, animacoes e navegacao
- os pontos de integracao com o `n8n`

Ele complementa o documento de integracao do chat em `../AGENTE_EUGENIA/INSTRUCOES_INTEGRACAO_CHAT_EUGENIA_N8N.md`, mas o foco aqui e o **estado real do site hoje**.

---

## Resumo Executivo

### O que este projeto e
- Um frontend em `React + Vite`, multi-page via `react-router-dom`
- Linguagem principal: `JavaScript` com componentes em `JSX`
- Estilo centralizado em um unico arquivo global: `src/index.css`
- Copy do site em `pt-BR`
- Chat unificado reutilizado na home, no balao flutuante e na pagina `/contato`
- Tema claro/escuro com persistencia local
- Motion com `GSAP`, `ScrollTrigger`, `Lenis` e `SplitType`

### O que este projeto nao e
- Nao existe backend Node, API propria, SSR ou BFF dentro deste repositorio
- Nao existe banco de dados neste projeto
- Nao existe suite de testes automatizados hoje
- Nao existe TypeScript

### Estado funcional atual
- O site esta estruturado e renderiza todas as paginas principais
- O chat esta pronto visualmente e com persistencia entre paginas
- O chat **ainda nao opera como agente conversacional em loop com o n8n**
- Hoje o chat faz:
  - abertura visual/local da Eugenia
  - qualificacao local por perguntas fixas no frontend
  - envio ao webhook do `n8n` apenas no final desse mini fluxo
- A proxima fase planejada e migrar a inteligencia de qualificacao para o `n8n`

### Alerta importante
O documento `../AGENTE_EUGENIA/PROJETO_EUGENIA.md` menciona que o frontend ainda nao existia. Isso **nao reflete mais o estado atual** do site. Use este documento como referencia do frontend atual.

---

## Stack Tecnica

### Runtime
- `react`: `19.1.0`
- `react-dom`: `19.1.0`
- `react-router-dom`: `7.13.1`

### Motion e interatividade
- `gsap`: animacoes e `ScrollTrigger`
- `lenis`: scroll suave
- `split-type`: split de palavras no hero
- `lucide-react`: icones

### Build e tooling
- `vite`: `6.3.5`
- `@vitejs/plugin-react`
- `eslint`

### Scripts disponiveis
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## Estrutura de Pastas

### Raiz do projeto
```txt
SITE_EUGENIA/
├── COPY_BRIEF_EUGENIA.md
├── Design Atômico.md
├── DOCUMENTACAO_CONTINUIDADE_SITE_EUGENIA.md
├── README.md
├── dist/
├── eugenia.jpg
├── exemplo-copies.md
├── foto-perfil-1.png
├── icon/
├── image/
├── index.html
├── package.json
├── public/
├── samples/
├── src/
└── vite.config.js
```

### O que cada area representa
- `src/`: codigo fonte real do site
- `public/`: assets servidos de forma estatica
- `dist/`: build gerado. Nao editar manualmente
- `samples/`: referencias visuais estudadas no processo. Nao fazem parte do runtime
- `image/`: imagens de apoio para documentacao
- `COPY_BRIEF_EUGENIA.md`, `exemplo-copies.md`, `Design Atômico.md`: documentos de referencia editorial/estrutural, nao sao runtime
- `eugenia.jpg`: avatar da Eugenia usado no chat
- `foto-perfil-1.png`: foto da pagina Sobre
- `public/icon/logotipo.png`: logo/favico usado no site

### Estrutura do `src/`
```txt
src/
├── app/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── contexts/
├── data/
├── hooks/
├── pages/
├── templates/
├── utils/
├── design-tokens.json
├── index.css
├── App.jsx
└── main.jsx
```

---

## Arquitetura Geral da Aplicacao

Fluxo principal de montagem:

```txt
src/main.jsx
  -> src/App.jsx
    -> ThemeProvider
    -> ChatProvider
    -> AppRouter
      -> PageShell
        -> Header
        -> pagina ativa
        -> Footer
        -> Chat flutuante global
```

### Arquivos centrais
- `src/main.jsx`: bootstrap React
- `src/App.jsx`: injeta providers globais e ativa hooks de motion
- `src/app/AppRouter.jsx`: define rotas
- `src/templates/PageShell.jsx`: casca global do site

---

## Rotas Atuais

```txt
/            -> HomePage
/servicos    -> ServicesPage
/sobre       -> AboutPage
/faq         -> FaqPage
/contato     -> ContactPage
/obrigado    -> ThanksPage
*            -> NotFoundPage
```

### Observacoes sobre rotas
- O projeto usa `BrowserRouter`
- Em deploy estatico, isso exige fallback para `index.html`
- Em `AWS S3 + CloudFront`, configure `403/404 -> /index.html -> 200`

---

## Linguagem e Convencoes do Projeto

### Linguagem de implementacao
- `JavaScript` moderno com `JSX`
- Nao ha tipagem com TypeScript
- Nao ha camada de services formalizada; a chamada externa relevante hoje esta no proprio `ChatWidget`

### Linguagem do produto
- Copy do site em `pt-BR`
- Marca e discurso orientados a:
  - e-commerce
  - operacao
  - automacao
  - diagnostico consultivo

### Convencoes atuais
- Componentes nomeados por funcao visual
- Estilo por classes globais em `src/index.css`
- Conteudo institucional centralizado em `src/data/siteContent.js`
- Copy inicial do chat centralizada em `src/data/chatIntro.js`

---

## Design System e Estrutura de Componentes

O projeto foi organizado com referencia em Design Atomico, mesmo sem uma biblioteca formal de componentes.

### Atoms
Pasta: `src/components/atoms/`

Arquivos atuais:
- `Button.jsx`
- `InputField.jsx`
- `TextareaField.jsx`
- `Tag.jsx`
- `ThemeToggle.jsx`

### Status real dos atoms
- `Button` e `ThemeToggle` estao em uso
- `InputField`, `TextareaField` e `Tag` existem, mas nao sao protagonistas do fluxo atual
- O formulario tradicional de contato nao e mais a experiencia principal

### Molecules
Pasta: `src/components/molecules/`

Arquivos atuais:
- `ChatMessage.jsx`
- `NavItem.jsx`
- `ServiceCard.jsx`
- `StatCard.jsx`

### Organisms
Pasta: `src/components/organisms/`

Arquivos atuais:
- `ChatWidget.jsx`
- `FAQAccordion.jsx`
- `Footer.jsx`
- `GlobalCursor.jsx`
- `Header.jsx`
- `HeroInteractive.jsx`
- `MethodTimeline.jsx`
- `ScrollProgress.jsx`
- `ServicesGrid.jsx`

### Templates
Pasta: `src/templates/`

Arquivos atuais:
- `PageShell.jsx`

### Pages
Pasta: `src/pages/`

Arquivos atuais:
- `HomePage.jsx`
- `ServicesPage.jsx`
- `AboutPage.jsx`
- `FaqPage.jsx`
- `ContactPage.jsx`
- `ThanksPage.jsx`
- `NotFoundPage.jsx`

---

## Fonte de Verdade de Conteudo

### Arquivo principal
`src/data/siteContent.js`

Esse arquivo concentra:
- `navItems`
- `heroProofs`
- `services`
- `differentials`
- `methodSteps`
- `faqItems`

### Regra pratica
Se for alterar:
- menu
- servicos
- diferenciais
- metodo
- FAQ

o primeiro lugar a revisar e `src/data/siteContent.js`.

### Copy inicial do chat
`src/data/chatIntro.js`

Hoje contem:
- primeira mensagem da Eugenia
- segunda mensagem da Eugenia

### Tokens de design
`src/design-tokens.json`

Importante:
- esse arquivo documenta tokens de cor, tipografia, espacamento, radius, motion e shadow
- **ele nao e a principal fonte consumida pelo runtime hoje**
- o runtime visual depende principalmente de `src/index.css`

Em outras palavras:
- `design-tokens.json` funciona como referencia
- `index.css` e a implementacao real

---

## Tema, Paleta e Persistencia Visual

### Tema
Tema controlado em `src/contexts/ThemeContext.jsx`

Comportamento:
- modos: `dark`, `light`, `system`
- persistencia em `localStorage`
- chave usada:

```txt
theme_mode
```

### Implementacao atual
- `ThemeProvider` resolve o tema final
- o tema ativo e refletido no atributo:

```txt
data-theme
```

no elemento `document.documentElement`

### Toggle visual
`src/components/atoms/ThemeToggle.jsx`

### Tokens principais
Os tokens documentados em `src/design-tokens.json` refletem:
- background dark proximo de `#0f131a`
- foreground claro
- primary dourado
- light mode derivado da mesma identidade

---

## Estilos e Organizacao de CSS

### Arquivo principal
`src/index.css`

### Estado atual
- O CSS esta centralizado em um unico arquivo grande
- Nao ha CSS Modules
- Nao ha Tailwind
- Nao ha styled-components

### Implicacao pratica
Quem assumir o projeto precisa tratar `src/index.css` como infraestrutura critica.

Evite:
- renomear classes sem revisar todos os componentes
- mover blocos sem checar breakpoints
- alterar regras globais sem validar:
  - home
  - servicos
  - sobre
  - contato
  - chat flutuante

### Partes sensiveis do CSS
- cabecalho e navegacao
- hero e orbs de fundo
- cards de servicos
- pagina sobre e retrato
- pagina contato
- sistema do chat
- cursor custom
- responsividade mobile

---

## Motion e Interatividade

### Scroll suave
Hook: `src/hooks/useLenis.js`

Caracteristicas:
- ativo globalmente via `App.jsx`
- respeita `prefers-reduced-motion`

### Reveals de scroll
Hook: `src/hooks/useScrollAnimations.js`

Caracteristicas:
- aplica animacao a elementos com `data-reveal`
- aceita `data-reveal-y` para ajustar deslocamento
- usa `GSAP + ScrollTrigger`

### Hero da home
Componente: `src/components/organisms/HeroInteractive.jsx`

Caracteristicas:
- split de palavras com `SplitType`
- animacao inicial do `h1`
- parallax de orbs com `ScrollTrigger`
- chat embutido no lado direito

### Cursor custom
Arquivos:
- `src/hooks/useCustomCursor.js`
- `src/components/organisms/GlobalCursor.jsx`

Caracteristicas:
- desktop only
- desativado com `prefers-reduced-motion`
- esconde o cursor nativo
- usa marcadores `data-cursor="action"` para estado ativo

### Barra de progresso de scroll
Componente: `src/components/organisms/ScrollProgress.jsx`

---

## Estrutura das Paginas

## Home
Arquivo: `src/pages/HomePage.jsx`

Estrutura:
1. `HeroInteractive`
2. `ServicesGrid`
3. secao de diferenciais
4. `MethodTimeline`
5. CTA final

Observacoes:
- o chat embutido mais importante do site esta no hero
- os 5 servicos da home usam a mesma fonte `services` de `siteContent.js`

## Servicos
Arquivo: `src/pages/ServicesPage.jsx`

Estrutura:
1. page hero
2. painel contextual
3. stack vertical de servicos detalhados
4. CTA final

Observacoes:
- a ordem dos servicos vem de `siteContent.js`
- a consultoria esta intencionalmente em primeiro lugar

## Sobre
Arquivo: `src/pages/AboutPage.jsx`

Estrutura:
1. hero narrativo com texto + foto do fundador
2. grid com 4 blocos conceituais
3. CTA final

Assets usados:
- `foto-perfil-1.png` importado no componente

## FAQ
Arquivo: `src/pages/FaqPage.jsx`

Estrutura:
1. page hero
2. `FAQAccordion`
3. CTA final

## Contato
Arquivo: `src/pages/ContactPage.jsx`

Estrutura:
1. page hero
2. grid de duas colunas:
   - coluna esquerda: texto contextual + fallback de contato direto
   - coluna direita: chat embutido

Importante:
- `/contato` nao e mais formulario tradicional
- `/contato` hoje e uma pagina de entrada para o chat da Eugenia
- no mobile o texto muda de "ao lado" para "aqui"

## Obrigado
Arquivo: `src/pages/ThanksPage.jsx`

## 404
Arquivo: `src/pages/NotFoundPage.jsx`

---

## Cabecalho e Rodape

## Header
Arquivo: `src/components/organisms/Header.jsx`

Caracteristicas:
- logo via `/icon/logotipo.png`
- menu desktop
- menu mobile
- toggle de tema
- CTA para `/contato`

## Footer
Arquivo: `src/components/organisms/Footer.jsx`

Caracteristicas:
- resumo institucional
- menu de navegacao
- bloco de contato
- redes sociais clicaveis:
  - LinkedIn
  - Facebook
  - Instagram

---

## Chat: Estado Atual e Estrutura

Este e o ponto mais sensivel do projeto hoje.

## Arquivos principais do chat
- `src/components/organisms/ChatWidget.jsx`
- `src/components/molecules/ChatMessage.jsx`
- `src/contexts/ChatProvider.jsx`
- `src/contexts/chatContext.js`
- `src/hooks/useChat.js`
- `src/utils/chatPayload.js`
- `src/data/chatIntro.js`

## Onde o chat aparece
- Home: embutido no hero
- Contato: embutido na coluna direita
- Global: balao flutuante em `PageShell`

## Regra estrutural
Existe **um unico sistema de chat**, reaproveitado em todos os contextos.

Nao criar:
- um chat separado para home
- outro para contato
- outro para o balao

O estado deve continuar unificado em `ChatProvider`.

## Persistencia local
O estado e salvo em `sessionStorage` com a chave:

```txt
eugenia_chat_state
```

Persistencia atual:
- `sessionId`
- `intent`
- `stepIndex`
- `sent`
- `needsConsent`
- `consent`
- `lead`
- `conversation`

Estados transitivos como loading/typing nao sao a fonte principal persistida.

## Session ID
O `sessionId` e gerado no frontend.

Regra:
- nao trocar o `sessionId` no meio da conversa
- nao resetar a conversa ao navegar

## Intro atual da Eugenia
Hoje a abertura do chat e feita no frontend, nao no `n8n`.

Sequencia atual:
1. espera `3s`
2. mostra efeito de digitando
3. renderiza a mensagem 1
4. espera `2s`
5. mostra efeito de digitando
6. renderiza a mensagem 2

Mensagens atuais:
- `Olá! Eu sou a Eugênia. 😊`
- `Você montou esse negócio pra ter liberdade. Me diz qual parte da operação ainda não deixa?`

## Comportamento atual do fluxo
Hoje o chat funciona assim:

1. A Eugenia faz a abertura local
2. O usuario envia a primeira mensagem livre
3. O frontend entra em um fluxo local de qualificacao com perguntas fixas
4. Ao final, o frontend envia os dados ao webhook do `n8n`
5. O `n8n` e usado como destino de envio, nao como cerebro conversacional continuo

### Perguntas fixas atuais no frontend
Campos coletados:
- `name`
- `email`
- `phone`
- `company`
- `segment`
- `monthly_volume`
- `urgency`
- `main_pain`

### Consentimento
O chat inclui checkbox de LGPD antes do envio final.

## Integracao externa atual do chat
Hoje o webhook do chat e definido por:

```txt
VITE_N8N_CHAT_WEBHOOK
```

Fallback atual no codigo:

```txt
https://n8nwebhook.aeraartificial.com.br/webhook/chat-eugenia
```

### Arquivo do payload
`src/utils/chatPayload.js`

Campos enviados hoje:
- `source`
- `session_id`
- `timestamp`
- `route`
- `lead`
- `conversation`
- `intent`
- `consent_lgpd`

### Limitacao importante
O chat ainda nao envia uma mensagem por vez para o `n8n` e aguarda resposta do agente a cada turno.

Isso significa:
- o UI e a persistencia multi-contexto ja estao prontos
- a orquestracao conversacional real com agente ainda precisa ser implementada

## Relacao com o documento do n8n
Para a migracao correta do fluxo local para agente conversacional, usar:

`../AGENTE_EUGENIA/INSTRUCOES_INTEGRACAO_CHAT_EUGENIA_N8N.md`

---

## Assets e Midia

### Logo
- `public/icon/logotipo.png`
- consumido no `Header` e no favicon em `index.html`

### Avatar da Eugenia
- `eugenia.jpg`
- importado por `ChatMessage.jsx`

### Foto da pagina Sobre
- `foto-perfil-1.png`
- importada por `AboutPage.jsx`

### Observacao de peso
A foto do fundador e relativamente pesada. Se performance virar prioridade de curto prazo, um passo natural e otimizar esse asset sem comprometer a qualidade visual.

---

## Variaveis e Integracoes Externas

### Variavel relevante hoje
```txt
VITE_N8N_CHAT_WEBHOOK
```

### Onde ela e lida
`src/components/organisms/ChatWidget.jsx`

### Backend real do projeto
No contexto deste repositorio, "backend" significa:
- webhook externo do `n8n`
- futuras automacoes do agente Eugenia

Nao existe backend implementado localmente.

---

## Arquivos de Referencia Editorial e Estrutural

Estes arquivos ajudam a entender a intencao do projeto, mas nao controlam o runtime:
- `COPY_BRIEF_EUGENIA.md`
- `exemplo-copies.md`
- `Design Atômico.md`

E, fora desta pasta:
- `../AGENTE_EUGENIA/INSTRUCOES_INTEGRACAO_CHAT_EUGENIA_N8N.md`
- `../AGENTE_EUGENIA/PROJETO_EUGENIA.md`
- `../AGENTE_EUGENIA/REGRAS_DESENVOLVEDOR.md`

### Observacao importante
Os documentos da pasta `AGENTE_EUGENIA` tratam o agente e a futura automacao. Eles sao uteis, mas parte deles esta desatualizada em relacao ao frontend atual.

---

## Qualidade Atual, Limites e Divida Tecnica

### Lint
Existe um warning conhecido em:

`src/contexts/ThemeContext.jsx`

Natureza:
- regra `react-refresh/only-export-components`

Nao e erro de build, mas vale normalizar depois.

### Testes
- nao ha testes automatizados
- validacao atual e majoritariamente manual via navegador + `npm run build` + `npm run lint`

### Tipagem
- sem TypeScript
- interfaces e contratos estao implicitos no codigo
- por isso a documentacao ganha peso maior neste projeto

### CSS
- `src/index.css` esta grande e concentra muita responsabilidade
- qualquer refactor deve ser incremental e bem validado

### Chat
- visualmente maduro
- estruturalmente pronto para persistencia multi-contexto
- ainda aguardando migracao da inteligencia para o `n8n`

---

## O Que Nao Deve Ser Quebrado

### Estrutura global
1. Nao remover `ThemeProvider`
2. Nao remover `ChatProvider`
3. Nao transformar o `PageShell` em shells diferentes por pagina sem necessidade real

### Roteamento
4. Nao trocar `BrowserRouter` sem revisar deploy
5. Nao remover fallback de SPA do plano de deploy

### Chat
6. Nao duplicar a logica do chat por pagina
7. Nao resetar o `sessionId` ao navegar
8. Nao limpar a conversa ao fechar o balao
9. Nao transformar `/contato` de volta em formulario tradicional
10. Nao assumir que o `n8n` ja esta operando em loop por mensagem

### Conteudo
11. Nao espalhar copy institucional por varios arquivos sem criterio
12. Nao alterar `siteContent.js` sem validar home, servicos, FAQ, header e footer

### Estilo e interacao
13. Nao remover `data-reveal` sem entender o impacto visual
14. Nao remover `data-cursor="action"` sem revisar a experiencia desktop
15. Nao editar `dist/` manualmente

---

## Fluxo Recomendado Para Quem Assumir o Projeto

1. Ler este documento inteiro
2. Ler `../AGENTE_EUGENIA/INSTRUCOES_INTEGRACAO_CHAT_EUGENIA_N8N.md`
3. Rodar o projeto localmente:

```bash
npm install
npm run dev
```

4. Navegar manualmente por:
   - `/`
   - `/servicos`
   - `/sobre`
   - `/faq`
   - `/contato`

5. Testar especificamente:
   - troca de tema
   - chat da home
   - chat flutuante
   - continuidade do chat em `/contato`
   - responsividade mobile

6. Antes de alterar chat:
   - entender `ChatProvider`
   - entender `ChatWidget`
   - entender `chatPayload`
   - validar o contrato esperado pelo `n8n`

7. Antes de alterar layout:
   - localizar as classes em `src/index.css`
   - validar se a mudanca afeta mobile, hero, sobre ou contato

---

## Checklists Rapidos

### Checklist de manutencao segura
- [ ] Rodei `npm run dev`
- [ ] Rodei `npm run lint`
- [ ] Entendi se a mudanca e visual, de conteudo ou estrutural
- [ ] Identifiquei a fonte de verdade correta (`siteContent`, `chatIntro`, componente ou CSS)
- [ ] Testei home, contato e chat flutuante se mexi no chat
- [ ] Testei mobile se mexi em layout

### Checklist de deploy
- [ ] `npm run build`
- [ ] Validacao do conteudo em `dist/`
- [ ] Fallback SPA configurado no host
- [ ] `VITE_N8N_CHAT_WEBHOOK` apontando para o endpoint correto
- [ ] CORS do `n8n` liberado para o dominio final

---

## Comandos Uteis

### Desenvolvimento local
```bash
npm run dev
```

### Build de producao
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

---

## Conclusao

O site da Eugen.IA hoje ja tem:
- arquitetura de frontend consolidada
- paginas institucionais prontas
- design system informal mas consistente
- tema claro/escuro
- motion e interacoes premium
- chat visualmente pronto e persistente entre contextos

O principal ponto em aberto nao e layout. E a transicao do chat local atual para o fluxo conversacional real com o agente no `n8n`.

Se quem assumir respeitar:
- `ChatProvider` como fonte de estado
- `siteContent.js` como fonte principal da copy institucional
- `index.css` como infraestrutura visual central
- `PageShell` como shell global

o projeto pode evoluir sem regressao estrutural.
