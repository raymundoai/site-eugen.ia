# Planejamento do site Eugen.IA — Brief para Claude Code

## Contexto

Este documento orienta a refatoração completa do site da Eugen.IA (www.eugenia.ia.br), atualmente em React + Vite hospedado em bucket S3 da AWS. O objetivo é transformar o site atual em uma experiência visual marcante, interativa e tecnicamente sólida, sem comprometer performance ou indexação.

O Claude Code deve iniciar lendo os arquivos do projeto atual, os arquivos de referência de design na pasta `/referencias` (ou equivalente no diretório), e este documento, antes de qualquer alteração de código.

---

## 1. Prioridades absolutas (não negociáveis)

- PageSpeed Score mínimo de 90 no desktop
- Todas as rotas pré-renderizadas em HTML estático (SSG) para indexação no Google
- Bundle total abaixo de 400kb gzipped
- Compatibilidade com S3 static hosting (sem servidor, sem SSR runtime)
- Copy preservada ao máximo — alterações mínimas e justificadas
- Identidade visual atual preservada: fundo escuro, dourado/âmbar como cor de destaque, partículas

---

## 2. Configuração técnica obrigatória

### SSG (pré-renderização para SEO)

Instalar `react-snap` como dependência de desenvolvimento. Adicionar ao `package.json`:

```json
"postbuild": "react-snap"
```

Configurar no `package.json`:

```json
"reactSnap": {
  "source": "build",
  "minifyHtml": {
    "collapseWhitespace": true
  },
  "puppeteerArgs": ["--no-sandbox"],
  "inlineCss": true
}
```

Isso usa headless Chrome para pré-renderizar cada rota após o build, gerando HTML estático por página. Zero impacto na stack atual, compatível com S3.

### Meta tags por rota

Cada página precisa de `<title>` e `<meta name="description">` únicos. Usar `react-helmet-async`. Valores por página listados na seção de arquitetura.

### Sitemap e robots.txt

Gerar `sitemap.xml` e `robots.txt` no diretório `public/`. O sitemap deve listar todas as rotas da Fase 1.

### Dependências de animação

Usar apenas:
- GSAP + ScrollTrigger: apenas para o scroll horizontal da seção de serviços
- Intersection Observer API (nativa): para todas as entradas de elementos por scroll
- Canvas 2D (nativo): para o elemento interativo do hero
- CSS transitions e transforms: para tudo mais

Não instalar Three.js, Framer Motion, Lottie ou qualquer biblioteca de animação adicional.

---

## 3. Arquitetura de rotas — Fase 1

```
/                 Home
/clinicas         LP Agente de Agendamento
/consultoria      Consultoria 5D
/treinamento      Treinamento em IA
/teste            Teste de Maturidade
/faq              Perguntas Frequentes (atualizado)
/contato          Contato (ajuste mínimo de copy)
```

Rotas futuras (não implementar agora, apenas não bloquear):
```
/e-commerce
/automacao
/agentes
```

---

## 4. Navegação

### Estado expandido (hero visível)

Largura total. Logo à esquerda. Links centralizados: Serviços (dropdown com links para /clinicas, /consultoria, /treinamento), Teste de Maturidade, FAQ, Contato. CTA "Falar com a Eugênia" à direita.

### Estado condensado (após scroll inicial)

A navbar encolhe para uma pílula/barra centralizada com: logo reduzida + CTA + ícone hambúrguer de 3 listras. O menu hambúrguer abre um painel com todos os links. A transição entre estados usa CSS transition suave (width, padding, backdrop-filter). A navbar permanece fixada no topo em ambos os estados.

### Dropdown Serviços

Ao hover: painel simples com 3 links — Agente de Agendamento (/clinicas), Consultoria 5D (/consultoria), Treinamento em IA (/treinamento). Sem mega-menu.

---

## 5. Sistema de animações e cursor

### Cursor customizado

Dois elementos sobrepostos: cursor ponto (8px, dourado) + cursor anel (24px, branco com opacidade 0.3). O anel segue o ponto com delay via lerp (linear interpolation). Ao passar sobre links e CTAs: cursor ponto escala para 0, anel escala para 48px e muda para dourado sólido (efeito magnético suave). Implementar em CSS + JS puro, sem biblioteca.

### Scroll reveal padrão

Todos os elementos de conteúdo entram com: `opacity: 0 → 1` + `translateY: 24px → 0`, duração 0.5s, easing `cubic-bezier(0.16, 1, 0.3, 1)`. Usar Intersection Observer com `threshold: 0.15`. Elementos em sequência no mesmo bloco recebem `animation-delay` incremental de 80ms.

### Referências de design na pasta local

Claude Code deve inspecionar os arquivos de referência disponíveis no diretório local e extrair:
- Implementações de cursor magnético (procurar por `mousemove`, `lerp`, `cursor`, `magnetic`)
- Implementações de scroll horizontal pinado (procurar por `ScrollTrigger`, `pin`, `horizontal`)
- Implementações de canvas com partículas (procurar por `canvas`, `requestAnimationFrame`, `particle`)
- Efeitos de entrada com Intersection Observer (procurar por `IntersectionObserver`, `threshold`, `isIntersecting`)

Aproveitar qualquer implementação funcional encontrada, adaptando para o contexto da Eugen.IA.

---

## 6. Home — estrutura e copy por seção

### Seção 1 — Hero

**Layout:** duas colunas. Esquerda (~55%): conteúdo textual. Direita (~45%): elemento interativo canvas.

**Elemento canvas (hero):**
As partículas douradas que atualmente cobrem o fundo da página inteira devem ser concentradas na coluna direita como um objeto focal. O objeto é uma nuvem de partículas que orbita lentamente em torno de um centro invisível. Ao mover o cursor sobre o canvas, as partículas são atraídas em direção ao cursor e retornam à órbita quando o cursor sai. Implementar com Canvas 2D, requestAnimationFrame e física simples (força de atração + amortecimento). O fundo geral da página mantém um nível muito baixo de partículas esparsas (densidade 10% do atual).

**Copy (preservar):**
```
Tag: AUTOMAÇÃO DE PROCESSOS & AGENTES IA
H1: Mapeamos seus processos e desenvolvemos
    Agentes de IA sob medida para sua empresa
CTA primário: Agendar Pré-Diagnóstico gratuito
CTA secundário: Fazer o Teste de Maturidade
```

**Abaixo do hero (barra de contexto — nova):**
Linha horizontal fina com 3 itens separados por divisor: "100% remoto · todo o Brasil" / "Atendimento personalizado" / "Compliance LGPD nativo"

---

### Seção 2 — Problema

**Layout:** H2 fixado no topo da viewport enquanto os cards surgem abaixo. Cards empilham progressivamente conforme o scroll.

**Comportamento dos cards:**
Cards entram alternando horizontal: ímpar da esquerda, par da direita. `translateX: ±80px → 0` + `opacity: 0 → 1`. Cada card que entra empilha sobre os anteriores. Ao final do scroll da seção, os 4 estão visíveis simultaneamente.

**Copy (preservar integralmente):**
```
H2: Você sabe que IA é importante
    mas não sabe como aproveitar
    todo o potencial da tecnologia?

Card 1: 72%
das empresas brasileiras estão nos estágios
iniciante ou experimental de adoção da IA
Fonte: Abiacom + Brazil Panels + Líderes.ai —
pesquisa com 200 empresas, out/nov 2025

Card 2: 70%
dos profissionais reconhecem atividades em
seu dia a dia que poderiam ser automatizadas
por IA, mas não sabem como fazer
Fonte: Abiacom, out/nov 2025

Card 3: 47,4%
dos profissionais utilizam ferramentas de IA
sem aprovação oficial — o chamado Shadow AI
Fonte: Abiacom, out/nov 2025 — via Exame

Card 4: 95%
das organizações que adotaram IA ainda não
conseguiram ter ROI visível nos projetos
de implementação
Fonte: TEC.Institute / MIT Technology Review Brasil
```

---

### Seção 3 — Serviços

**Layout:** scroll horizontal pinado. O usuário rola verticalmente mas os cards deslizam para a lateral. Implementar com GSAP ScrollTrigger `pin: true` + `scrub: 1` + `horizontal: true`. Cada card ocupa ~70vw em mobile, ~40vw em desktop.

**Copy — label da seção (preservar):**
```
Label: O QUE FAZEMOS
H2: Mostramos o caminho mais rápido para
    sua empresa inovar e crescer com
    Inteligência Artificial.
```

**5 cards de produto (novo: adicionar Agente de Agendamento e Treinamento aos 3 atuais):**

Card 01:
```
01 — Agente de Agendamento
Sua clínica atendendo 24h por dia.
Agente de IA conectado ao WhatsApp e à agenda
dos seus profissionais. Agenda, confirma e
gerencia sem intervenção humana.
Link: Conhecer o produto → /clinicas
```

Card 02 (preservar copy atual):
```
02 — Consultoria e Treinamento
Clareza antes de qualquer ferramenta.
Mapeamos os gargalos reais da sua operação,
definimos prioridades e capacitamos a sua
equipe para operar com IA.
Link: Ver a metodologia → /consultoria
```

Card 03 (preservar copy atual):
```
03 — Automação de Processos
Processos que rodam sozinhos.
Horas devolvidas para decisão, relacionamento
e crescimento. Sua equipe para de apagar
incêndios e começa a evoluir.
```

Card 04 (preservar copy atual):
```
04 — Agentes de IA
Sua operação, aumentada por IA.
Agentes personalizados, conectados ao seu
stack, executando tarefas de forma autônoma,
segura e rastreável.
```

Card 05:
```
05 — Treinamento em IA
Seu time usando IA com método.
Workshop fechado por empresa: uso responsável,
engenharia de prompt e política de IA para
eliminar o Shadow AI da sua operação.
Link: Saiba mais → /treinamento
```

**Micro-animação dos cards:** ao entrar no foco do scroll horizontal, o card ativo escala de 0.92 para 1.0 e aumenta a opacidade. O card anterior recua para 0.88 e escurece. Transição CSS suave.

---

### Seção 4 — O Método 5D

**Layout:** scroll vertical. Cada etapa entra de baixo e empilha sobre a anterior (stack progressivo). Ao final, todas as 5 estão visíveis em linha.

**Copy — atualizar o método atual (3 etapas → 5 etapas):**
```
Label: COMO FAZEMOS
H2: O Método 5D

D1 — Diagnóstico
Mapeamos e diagnosticamos os principais
desafios e gargalos da sua operação.

D2 — Desenho
Projetamos a arquitetura da solução antes
de qualquer linha de código.

D3 — Decisão
Fechamos o escopo com critérios claros
de entrega. Nenhum desenvolvimento começa
sem alinhamento total.

D4 — Desenvolvimento
Construímos em tempo recorde — 7 a 15 dias —
exatamente o que foi decidido, sem desvios.

D5 — Deploy
Implementamos, validamos em produção e
acompanhamos até o resultado estar entregue.
```

Nota de rodapé da seção (preservar espírito do texto atual):
```
Com o Método Eugen.IA, garantimos resultado
visível no primeiro mês.
```

---

### Seção 5 — Diferenciais (nova seção)

**Layout:** duas colunas. Esquerda: headline em parallax mais lento. Direita: lista de diferenciais em parallax mais rápido. Fundo com densidade de partículas um pouco maior que o resto da página.

**Copy:**
```
H2: O que nos diferencia
    não é a tecnologia.
    É entender o seu processo.

Diferencial 1:
10+ anos em gestão de processos
Diagnosticamos o que precisa ser automatizado
antes de tocar em qualquer ferramenta.

Diferencial 2:
7 anos em operações de e-commerce
Falamos a língua de quem opera: CAC, LTV,
conciliação, logística reversa, ERP.

Diferencial 3:
Compliance nativo (LGPD + PL 2338/2023)
Logs auditáveis, dados no seu ambiente,
identificação obrigatória do agente.
Adequação hoje, não depois da lei.

Diferencial 4:
Autonomia garantida
Você recebe documentação suficiente para
implementar sozinho se quiser. Construímos
dependência zero.
```

---

### Seção 6 — FAQ preview

**Layout:** accordion. 4 perguntas visíveis, link "Ver todas as perguntas → /faq" ao final.

**Copy — manter 3 atuais + adicionar 1 sobre compliance:**
```
Minha operação é muito específica.
Existe solução pronta para o que eu tenho?

Já investi em tecnologia antes e não tive retorno.
Por que seria diferente aqui?

Minha empresa não tem equipe técnica.
Conseguimos usar o que vocês constroem?

[nova] Meus dados ficam seguros?
Operamos com compliance nativo à LGPD.
Seus dados ficam no seu ambiente — não em
plataformas de terceiros sem contrato. Seguimos
os princípios do PL 2338/2023.
```

---

### Seção 7 — CTA Final

**Layout:** card com fundo dourado/âmbar. Preservar exatamente como está.

**Copy (preservar integralmente):**
```
Label: PRÓXIMO PASSO
H2: Sua operação pode ser mais leve
    do que você imagina.
    Fale com a Eugênia.
CTA: Falar com a Eugênia →
Aviso: Atendemos poucos projetos por vez,
intencionalmente. Para garantir atenção
real em cada operação.
```

---

### Footer

**Copy (preservar integralmente):**
```
Eugen.IA
Automações e agentes de IA para empresas
que querem parar de ser operadas pelos donos
e começar a ser construídas por eles.

Navegação: Início / FAQ / Contato
Contato: contato@eugenia.ia.br
(51) 99112-9452
Atendimento remoto em todo o Brasil.
Legal: Política de Privacidade /
Política de Cookies / Preferências de cookies
© 2026 Eugen.IA. Todos os direitos reservados.
```

---

## 7. Página /clinicas — Agente de Agendamento

**Meta:**
```
title: Agente de Agendamento com IA para Clínicas | Eugen.IA
description: Agente de IA conectado ao WhatsApp e Google Agenda.
Sua clínica atendendo e agendando 24h por dia, sem intervenção humana.
```

**Estrutura de seções:**

Hero:
```
Tag: PRODUTO FIXO — AGENDAMENTO COM IA
H1: Sua clínica perdendo clientes
    fora do horário comercial?
Sub: Agente de IA que atende em 3 segundos,
     consulta a agenda dos seus profissionais
     e fecha o agendamento sozinho.
     24 horas por dia, 7 dias por semana.
CTA: Testar agora → [número da Eugênia demo]
CTA secundário: Ver preço e detalhes ↓
```

Demonstração:
```
H2: Veja funcionando antes de decidir
Sub: Mande uma mensagem para o número abaixo
     dizendo: "Quero agendar uma avaliação
     para essa semana"
[QR Code ou número do agente demo]
```

Como funciona (3 passos):
```
01 — O cliente envia mensagem no WhatsApp
02 — O agente consulta a agenda em tempo real
03 — O agendamento é confirmado automaticamente
Entende áudio. Entende imagem. Não deixa
cliente sem resposta.
```

O que está incluso:
```
Setup completo: R$ 1.200
Manutenção mensal: R$ 200/mês
Inclui: configuração, onboarding,
integração com Google Agenda,
30 dias de suporte, ajustes de prompt.
Garantia de 7 dias ou devolvemos o valor.
```

Compliance:
```
H3: Seguro, rastreável e adequado à LGPD
- Agente se identifica como IA na primeira mensagem
- Dados do paciente ficam no seu ambiente
- Opção de falar com humano sempre disponível
- Mídias processadas e descartadas imediatamente
```

CTA final:
```
H2: Pronto para atender enquanto você dorme?
CTA: Falar com a Eugênia →
Sub: Setup em até 2 dias úteis após
     preenchimento do formulário de onboarding.
```

---

## 8. Página /consultoria — Consultoria 5D

**Meta:**
```
title: Consultoria Estratégica em IA | Método 5D | Eugen.IA
description: Diagnóstico, arquitetura da solução e escopo fechado.
Duas sessões. Entregáveis que garantem autonomia total.
```

**Estrutura:**

Hero:
```
Tag: CONSULTORIA ESTRATÉGICA
H1: Clareza antes de qualquer ferramenta.
Sub: Mapeamos o problema, desenhamos a solução
     e fechamos o escopo antes de desenvolver.
     Você sai com material suficiente para
     implementar sozinho, se quiser.
CTA: Agendar Pré-Diagnóstico gratuito →
```

O que é:
```
H2: A Consultoria 5D em dois momentos
Sessão 1 — D1 Diagnóstico (com você, ~1h30):
Mapeamento do processo atual (SIPOC),
identificação da causa raiz (5 Porquês),
definição precisa do problema.

Trabalho solo — D2 Desenho:
Arquitetura da solução, fluxogramas,
stack recomendada com custo de infraestrutura.

Sessão 2 — D3 Decisão (com você, ~1h30):
Apresentação da solução, definição de escopo
(MoSCoW), critério de aceite (DoD),
métricas de sucesso.
```

O que você recebe:
```
H2: O que você leva ao final
- Problem Statement Canvas
- SIPOC do processo atual
- Fluxogramas da solução proposta
- Arquitetura com stack e custos
- Estimativa de esforço para implementação
- MoSCoW da v1
- DoD assinado
- Métricas de sucesso definidas

Investimento: R$ 800–900
Abatível do projeto de execução se avançar.
```

CTA:
```
H2: Comece pelo Pré-Diagnóstico gratuito
Sub: 30-45 minutos. Saímos com um
     caminho claro — ou a honestidade
     de que não é o momento.
CTA: Agendar agora →
```

---

## 9. Página /treinamento — Treinamento em IA

**Meta:**
```
title: Workshop de IA para Empresas | Treinamento em uso responsável | Eugen.IA
description: Workshop fechado por empresa. Uso responsável de LLMs,
engenharia de prompt e política de IA para eliminar o Shadow AI.
```

**Estrutura:**

Hero:
```
Tag: TREINAMENTO IN-COMPANY
H1: Seu time já usa IA.
    A questão é se usa bem.
Sub: Workshop de 3-4 horas para times de até
     20 pessoas. Uso responsável de ChatGPT
     e Claude, engenharia de prompt aplicada
     ao trabalho de vocês e política de IA
     para eliminar o Shadow AI.
CTA: Solicitar proposta →
```

O problema:
```
H2: Shadow AI está acontecendo
    na sua empresa agora
47,4% dos profissionais usam ferramentas
de IA sem aprovação — com dados da empresa,
sem política, sem controle.
Quando o PL 2338/2023 for aprovado,
isso vira passivo jurídico.
```

Conteúdo:
```
H2: O que cobrimos

Módulo 1 — O cenário atual
Como LLMs funcionam de verdade e
o que isso significa para o time.

Módulo 2 — Riscos e compliance
Quais dados nunca devem sair da empresa.
LGPD aplicada ao uso de IA.
O que o PL 2338/2023 vai exigir.

Módulo 3 — Uso produtivo
Engenharia de prompt aplicada às funções
do time. Casos de uso por área.

Módulo 4 — Política de IA
Como criar uma política simples e
funcional. O que comunicar para o time.
```

Entregáveis:
```
Guia de boas práticas (customizado)
Template de política de IA mínima
Lista de casos de uso validados
Checklist do que nunca inserir em
ferramentas externas

Investimento: R$ 800–900 por turma
```

CTA:
```
H2: Transforme o uso de IA do seu time
    de risco em vantagem competitiva.
CTA: Solicitar proposta →
```

---

## 10. Página /teste — Teste de Maturidade

**Meta:**
```
title: Teste de Maturidade em IA | Descubra as oportunidades da sua operação | Eugen.IA
description: 3 minutos. Resultado em até 24h. Score de maturidade e
3 oportunidades de automação identificadas para a sua empresa.
```

**Estrutura:**

Hero:
```
Tag: DIAGNÓSTICO GRATUITO
H1: Descubra o nível de maturidade
    em IA da sua operação.
Sub: 10 perguntas. 3 minutos.
     Você recebe um relatório com seu
     score de maturidade e as 3 maiores
     oportunidades de automação
     identificadas para o seu negócio.
     Resultado em até 24 horas por e-mail.
```

O que você recebe:
```
Score de maturidade de 1 a 5
com análise do seu perfil

3 oportunidades de automação
com estimativa de impacto

Contexto regulatório
aplicado ao seu segmento
```

Formulário embarcado:
```
[Embed do Google Forms]
```

Rodapé da seção:
```
Após receber o relatório, você pode
agendar o Pré-Diagnóstico gratuito para
aprofundar qualquer oportunidade identificada.
```

---

## 11. Página /faq — Atualizado

**Meta:**
```
title: Perguntas Frequentes | Eugen.IA
description: Respostas sobre automação de processos, Agentes de IA,
investimento, LGPD e como a Eugen.IA trabalha.
```

**Perguntas (preservar as 7 atuais + adicionar 3 novas):**

Preservadas:
```
Quem é a Eugen.IA?
Qual o investimento?
IA substitui minha equipe?
Não vou perder o controle ao automatizar processos?
E se não tenho tempo agora para implementar uma coisa nova?
Minha operação é muito específica. Existe solução pronta para o que eu tenho?
Já investi em tecnologia antes e não tive retorno. Por que seria diferente aqui?
Minha empresa não tem equipe técnica. Conseguimos usar o que vocês constroem?
```

Novas:
```
Meus dados ficam seguros?
Operamos com compliance nativo à LGPD. Seus dados
ficam no seu ambiente — não em plataformas de
terceiros sem contrato. Os agentes se identificam
como IA na primeira mensagem. Seguimos os princípios
do PL 2338/2023 desde a arquitetura.

O que acontece se eu não quiser contratar
a execução após a consultoria?
Você fica com todos os entregáveis: fluxogramas,
arquitetura, stack recomendada, estimativa de
esforço e escopo fechado. Material suficiente
para implementar sozinho ou contratar outro
fornecedor. Não cobrimos consultoria condicionada
à execução.

Vocês atendem fora do Rio Grande do Sul?
Sim, 100% remoto para todo o Brasil.
```

---

## 12. Página /contato — Ajuste mínimo

**Copy — alterar apenas a frase de diagnóstico:**

Atual: "agenda o diagnóstico gratuito com nosso time"
Novo: "agenda o Pré-Diagnóstico gratuito com nosso time"

Resto da página permanece idêntico.

---

## 13. Meta tags e SEO por rota

```
/ — Home
title: Eugen.IA | Automação de Processos e Agentes de IA sob medida
description: Diagnóstico e implementação de automações e Agentes de IA
para PMEs e e-commerces. Método 5D. Compliance LGPD nativo.

/clinicas
title: Agente de Agendamento com IA para Clínicas | Eugen.IA
description: Agente de IA no WhatsApp que agenda, confirma e atende
seus clientes 24h por dia. Setup em 2 dias. R$ 1.200.

/consultoria
title: Consultoria Estratégica em IA | Método 5D | Eugen.IA
description: Diagnóstico, arquitetura e escopo fechado em duas sessões.
Entregáveis que garantem autonomia total. R$ 800–900.

/treinamento
title: Workshop de IA para Empresas | Eugen.IA
description: Treinamento in-company sobre uso responsável de LLMs,
Shadow AI e política de IA. Para times de até 20 pessoas.

/teste
title: Teste de Maturidade em IA | Eugen.IA
description: 3 minutos. Descubra o nível de maturidade da sua operação
e as 3 maiores oportunidades de automação. Resultado em 24h.

/faq
title: Perguntas Frequentes | Eugen.IA
description: Respostas sobre automação, Agentes de IA, investimento,
LGPD e como a Eugen.IA trabalha.

/contato
title: Contato | Fale com a Eugênia | Eugen.IA
description: Fale com a Eugênia e agende seu Pré-Diagnóstico gratuito.
Sem formulário. Sem espera. Sem compromisso.
```

---

## 14. Performance e bundle

Antes de qualquer implementação, Claude Code deve auditar:
- Quais animações atuais podem ser substituídas por CSS puro
- Quais dependências do `package.json` atual não são utilizadas
- Tamanho atual do bundle com `npx vite-bundle-visualizer`

Regras:
- Importar GSAP apenas onde usado, nunca no bundle principal
- Usar `React.lazy` e `Suspense` para as páginas de rota (code splitting automático por rota)
- Comprimir todas as imagens com `sharp` antes do deploy
- Canvas do hero deve ter `will-change: transform` e rodar em Web Worker se o cálculo de partículas ultrapassar 2ms por frame

---

## 15. Checklist de entrega

- [ ] `react-snap` configurado e gerando HTML por rota no build
- [ ] `sitemap.xml` gerado em `/public`
- [ ] `robots.txt` em `/public`
- [ ] Meta tags únicas por rota via `react-helmet-async`
- [ ] Cursor customizado funcionando em desktop, oculto em mobile
- [ ] Navbar com transição expandida → condensada ao scroll
- [ ] Hero: canvas de partículas reativo ao cursor
- [ ] Seção 2: 4 cards empilhando com entrada alternada horizontal
- [ ] Seção 3: scroll horizontal pinado com GSAP ScrollTrigger
- [ ] Seção 4: stack progressivo do Método 5D
- [ ] Seção 5: parallax de dois planos nos diferenciais
- [ ] Todas as 7 rotas da Fase 1 implementadas
- [ ] PageSpeed Desktop ≥ 90 verificado antes de considerar entregue
- [ ] Build testado com `npx serve build` antes do deploy no S3