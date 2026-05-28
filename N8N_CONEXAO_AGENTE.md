# Conexao n8n da Agente Eugenia

Este documento preserva o contrato funcional entre o futuro site e o webhook n8n da Agente Eugenia. Ele nao contem workflow n8n, credenciais privadas ou logica backend; apenas o necessario para o frontend reconstruido conversar com a agente.

## Endpoint

Use uma variavel de ambiente publica do Vite para configurar o endpoint:

```env
VITE_N8N_CHAT_WEBHOOK=https://n8nwebhook.brewhouseinsumos.com.br/webhook/eugenia-site
```

Fallback usado no frontend anterior:

```js
const CHAT_WEBHOOK_URL =
  import.meta.env.VITE_N8N_CHAT_WEBHOOK || 'https://n8nwebhook.brewhouseinsumos.com.br/webhook/eugenia-site'
```

## Requisicao do Frontend

- Metodo: `POST`
- Header: `Content-Type: application/json`
- Body: JSON
- Origem esperada: navegador do site
- Canal: `site`
- Fonte: `site_chat`

Exemplo:

```js
const response = await fetch(CHAT_WEBHOOK_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
```

## Payload Enviado ao n8n

O frontend deve enviar este contrato:

```json
{
  "source": "site_chat",
  "session_id": "uuid-ou-session-timestamp",
  "timestamp": "2026-05-12T12:00:00.000Z",
  "route": "/contato",
  "message": {
    "id": "msg_1770000000000_1",
    "role": "user",
    "content": "Mensagem digitada pelo usuario",
    "at": "2026-05-12T12:00:00.000Z"
  },
  "lead": {
    "name": "",
    "email": "",
    "phone": "",
    "company": "",
    "segment": "",
    "monthly_volume": "",
    "urgency": "",
    "main_pain": ""
  },
  "conversation": [
    {
      "role": "assistant",
      "message": "Ola! Eu sou a Eugenia.",
      "at": "2026-05-12T11:59:00.000Z"
    },
    {
      "role": "user",
      "message": "Mensagem digitada pelo usuario",
      "at": "2026-05-12T12:00:00.000Z"
    }
  ],
  "intent": "diagnostico",
  "consent_lgpd": true,
  "channel": "site",
  "widget_variant": "floating"
}
```

## Campos Obrigatorios

| Campo | Tipo | Descricao |
| --- | --- | --- |
| `source` | string | Sempre `site_chat` |
| `session_id` | string | Identificador persistente da sessao do chat |
| `timestamp` | string ISO | Momento do envio |
| `route` | string | Rota atual do site, por exemplo `/`, `/faq`, `/contato` |
| `message.id` | string | ID unico da mensagem enviada |
| `message.role` | string | Sempre `user` para mensagens enviadas pelo visitante |
| `message.content` | string | Texto digitado pelo visitante |
| `message.at` | string ISO | Momento da mensagem |
| `lead` | object | Dados conhecidos do lead, mesmo que vazios |
| `conversation` | array | Historico resumido de mensagens anteriores e atuais |
| `intent` | string | Padrao: `diagnostico` |
| `consent_lgpd` | boolean | Consentimento marcado no chat |
| `channel` | string | Sempre `site` |
| `widget_variant` | string | Contexto visual do chat |

## Variantes de Widget

Use estes valores para `widget_variant`:

- `floating`: balao lateral persistente
- `contact_embedded`: chat embutido na pagina de contato
- `embedded`: chat embutido em outro contexto

## Estado Local do Chat

O frontend anterior persistia o estado em `sessionStorage` com a chave:

```txt
eugenia_chat_state
```

Estado minimo recomendado:

```json
{
  "sessionId": "uuid",
  "intent": "diagnostico",
  "agentStatus": "active",
  "consent": true,
  "lead": {},
  "conversation": []
}
```

Campos usados pela UI, mas que nao precisam ser persistidos:

- `sending`
- `sendError`
- `isTyping`
- `introState`

## Resposta Esperada do n8n

O frontend espera uma resposta JSON.

Contrato recomendado:

```json
{
  "assistant": {
    "message": "Resposta da Eugenia para o visitante."
  },
  "status": "active",
  "lead_updates": {
    "name": "Nome identificado",
    "email": "email@exemplo.com",
    "phone": "",
    "company": "",
    "segment": "",
    "monthly_volume": "",
    "urgency": "",
    "main_pain": ""
  }
}
```

## Campos de Resposta

| Campo | Tipo | Descricao |
| --- | --- | --- |
| `assistant.message` | string | Mensagem que aparece como resposta da agente |
| `status` | string | Estado da conversa |
| `lead_updates` | object | Dados de lead identificados ou atualizados pelo n8n |

Valores de `status` tratados pelo frontend anterior:

- `active`: conversa em andamento
- `qualified`: nome, nicho e WhatsApp coletados; seguir pelo WhatsApp
- `waitlist`: contato registrado para avaliacao posterior
- `scheduled`: diagnostico agendado
- `closed`: conversa encerrada
- `handoff`: encaminhada para atendimento humano

Quando `status` for `qualified`, `waitlist`, `scheduled`, `closed` ou `handoff`, a UI pode bloquear novos envios e exibir estado de sucesso.

## Mensagens Padrao da UI

Mensagens iniciais:

```txt
Ola! Eu sou a Eugenia.
Como posso te chamar?
```

Fallback quando `assistant.message` vier vazio:

```txt
Nao recebi uma resposta. Tente novamente.
```

Erro de conexao mostrado ao usuario:

```txt
Nao consegui conectar. Tente novamente ou use o WhatsApp.
```

Mensagem da assistente em falha:

```txt
Tive um problema de conexao agora. Tente novamente em alguns segundos.
```

Sucesso:

```txt
Contato recebido. A Eugenia chama voce no WhatsApp em instantes.
```

Consentimento LGPD:

```txt
Autorizo o armazenamento e uso das informacoes para contato comercial, conforme a LGPD.
```

## Regras Funcionais

1. Gere `session_id` com `crypto.randomUUID()` quando disponivel; use fallback baseado em timestamp se necessario.
2. Envie a rota atual no campo `route`.
3. Inclua sempre o historico `conversation`, mesmo que curto.
4. Inclua sempre o objeto `lead` completo com campos vazios quando ainda nao houver dados.
5. Mantenha `intent` como `diagnostico` ate existir uma decisao diferente de produto.
6. Nao exponha tokens privados, chaves n8n ou credenciais no frontend.
7. Trate falhas HTTP e JSON invalido com uma mensagem amigavel e um caminho alternativo de contato.
8. Respeite `consent_lgpd`; se o checkbox estiver desmarcado, envie `false` e evite persistir dados sensiveis alem do necessario para a sessao.

## Exemplo de Builder

```js
let messageCounter = 0

export function buildChatPayload({ sessionId, route, message, lead, conversation, intent, consent, widgetVariant }) {
  messageCounter += 1

  return {
    source: 'site_chat',
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    route,
    message: {
      id: `msg_${Date.now()}_${messageCounter}`,
      role: 'user',
      content: message,
      at: new Date().toISOString(),
    },
    lead: {
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.company || '',
      segment: lead.segment || '',
      monthly_volume: lead.monthly_volume || '',
      urgency: lead.urgency || '',
      main_pain: lead.main_pain || '',
    },
    conversation: conversation.map((item) => ({
      role: item.role,
      message: item.message,
      at: item.at,
    })),
    intent: intent || 'diagnostico',
    consent_lgpd: Boolean(consent),
    channel: 'site',
    widget_variant: widgetVariant || 'embedded',
  }
}
```
