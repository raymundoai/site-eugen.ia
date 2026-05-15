# Documentacao Tecnica do Site Atual da Eugen.IA

Este documento explica, em linguagem de briefing tecnico, como o site atual da Eugen.IA estava estruturado antes da limpeza local feita para a reconstrucao. Ele serve para orientar uma avaliacao externa antes de reconstruir o site do zero.

## Situacao Atual do Repositorio Local

O repositorio local foi limpo intencionalmente em 12 de maio de 2026 para preparar uma reconstrucao completa do site.

Foram preservados:

- o diretorio `.git/`, mantendo o vinculo com o GitHub;
- a documentacao de marca em `MARCA_FONTES_CORES.md`;
- o contrato de conexao com n8n em `N8N_CONEXAO_AGENTE.md`;
- os novos arquivos de briefing/copy adicionados depois da limpeza.

O codigo fonte antigo do frontend, o pacote de deploy antigo e os assets locais foram removidos da pasta local. A AWS e o GitHub remoto nao foram alterados por essa limpeza local.

## Repositorio GitHub

Remote configurado:

```txt
https://github.com/raymundoai/site-eugen.ia-v6-atual.git
```

Branch local observada antes da limpeza:

```txt
main
```

O repositorio local estava um commit a frente de `origin/main` antes da limpeza. A limpeza nao foi commitada nem enviada para o GitHub.

## Stack do Frontend Anterior

O site anterior era um frontend estatico feito com:

- React
- Vite
- JavaScript
- JSX
- CSS global
- React Router
- GSAP, para animacoes
- Lenis, para scroll suave
- Lucide React, para icones

Nao havia backend proprio dentro deste repositorio. A regra do projeto era manter este repositorio apenas como frontend do site Eugen.IA.

## Estrutura Local Anterior

Antes da limpeza, a estrutura principal era:

```txt
site_eugenia/
├── SITE_EUGENIA/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── contexts/
│       ├── data/
│       ├── hooks/
│       ├── pages/
│       ├── templates/
│       ├── utils/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── design-tokens.json
├── deploy/
│   ├── index.html
│   ├── assets/
│   ├── icon/
│   └── deploy.sh
├── copy/
└── .git/
```

## Organizacao do React

O frontend anterior seguia uma divisao por camadas de interface:

- `components/atoms`: botoes, inputs, tags, toggle de tema;
- `components/molecules`: cards, mensagens do chat, itens de navegacao;
- `components/organisms`: header, footer, grid de servicos, timeline, FAQ, chat, cursor e progresso de scroll;
- `pages`: paginas principais do site;
- `templates`: estrutura compartilhada de pagina;
- `contexts`: estados globais de tema e chat;
- `hooks`: hooks de scroll, cursor, chat e animacoes;
- `utils`: helpers de payload, classes CSS e icones;
- `data`: conteudo estruturado e mensagens iniciais.

## Rotas do Site Anterior

As rotas principais eram:

```txt
/          Home
/servicos  Servicos
/sobre     Sobre
/faq       FAQ
/contato   Contato
/obrigado  Pagina de obrigado
*          Pagina 404
```

Por usar React Router em site estatico, rotas diretas dependiam de configuracao correta no CloudFront/S3 para devolver `index.html`.

## Design e UI

O design anterior usava:

- tema claro e tema escuro;
- fontes `Sora` e `Manrope`;
- paleta grafite, marfim, branco, cinzas frios e dourado/amarelo como acento;
- botoes em formato pill;
- cards e paineis com bordas arredondadas, transparencia, blur e sombra suave;
- header fixo translucidado;
- chat flutuante e chat embutido na pagina de contato.

A referencia detalhada de fontes e cores esta em:

```txt
MARCA_FONTES_CORES.md
```

## Chat da Agente Eugenia

O site anterior tinha um widget de chat frontend-only conectado a um webhook n8n.

Endpoint configurado:

```env
VITE_N8N_CHAT_WEBHOOK=https://n8nwebhook.aeraartificial.com.br/webhook/eugenia-chat
```

O chat enviava mensagens por `POST` com JSON contendo:

- origem: `site_chat`;
- canal: `site`;
- `session_id`;
- rota atual;
- mensagem do usuario;
- historico da conversa;
- dados de lead;
- consentimento LGPD;
- variante do widget.

O n8n deveria responder com:

- `assistant.message`, texto da resposta da agente;
- `status`, por exemplo `active`, `scheduled`, `closed` ou `handoff`;
- `lead_updates`, com dados identificados ou atualizados.

A referencia detalhada do contrato com n8n esta em:

```txt
N8N_CONEXAO_AGENTE.md
```

## Infraestrutura de Publicacao

O site atual publicado usa uma arquitetura estatica simples:

- build local com Vite;
- arquivos gerados em `deploy/`;
- publicacao em S3;
- CloudFront na frente do bucket;
- dominio customizado com TLS via ACM.

Estado observado antes da limpeza:

```txt
Bucket S3: www.eugenia.ia.br
CloudFront distribution: E20ELLSGH3QH8R
Aliases CloudFront:
- eugenia.ia.br
- www.eugenia.ia.br
Default root object: index.html
Origem:
www.eugenia.ia.br.s3-website-sa-east-1.amazonaws.com
Regiao do bucket: sa-east-1
Certificado CloudFront: ACM em us-east-1
```

O fluxo de deploy anterior era:

```bash
cd SITE_EUGENIA
npm run build -- --outDir ../deploy
cd ..
bash deploy/deploy.sh
```

O script antigo fazia:

- sync de `assets/` para S3 com cache longo;
- sync de `icon/` para S3;
- upload de `index.html` sem cache;
- invalidacao CloudFront.

## Cache e Build

O Vite gerava assets com hash no nome, por exemplo:

```txt
assets/index-*.js
assets/index-*.css
```

Regra de cache esperada:

- `index.html`: sem cache ou cache muito curto;
- assets com hash: cache longo, idealmente `max-age=31536000, immutable`;
- imagens e icones: cache controlado conforme tipo de arquivo.

## Validacao Tecnica Anterior

Para alteracoes de frontend, a validacao esperada era:

```bash
cd SITE_EUGENIA
npm run lint
npm run build
```

Para alteracoes relacionadas ao pacote publicado:

```bash
cd SITE_EUGENIA
npm run build -- --outDir ../deploy
```

Para mudancas visuais, a regra era validar no navegador as principais rotas:

```txt
/
/servicos
/sobre
/faq
/contato
```

## Pontos Importantes para o Especialista

- O projeto anterior era um site estatico, nao uma aplicacao full-stack.
- A agente nao vivia neste repositorio; ela era acessada por webhook n8n.
- O frontend so renderizava o chat, mantinha estado local e enviava/recebia payloads.
- A AWS atual deve ser preservada, salvo decisao explicita de mudar a arquitetura.
- A reconstrucao pode reaproveitar React + Vite, mas o codigo antigo local foi removido de proposito.
- O GitHub remoto ainda contem o historico anterior, enquanto a pasta local agora esta pronta para nova base.
- O novo site deve manter a marca, o contrato n8n e a hospedagem estatica como referencias principais.
