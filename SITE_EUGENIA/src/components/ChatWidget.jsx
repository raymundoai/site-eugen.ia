import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import { buildChatPayload } from '../utils/chatPayload'
import eugeniaAvatar from '../assets/eugenia.jpg'

const CHAT_WEBHOOK_URL =
  import.meta.env.VITE_N8N_CHAT_WEBHOOK || 'https://n8nwebhook.brewhouseinsumos.com.br/webhook/eugenia-site'

function createMessage(role, message) {
  return { role, message, at: new Date().toISOString() }
}

function getWidgetVariant(floating, pathname) {
  if (floating) return 'floating'
  if (pathname === '/contato') return 'contact_embedded'
  return 'embedded'
}

function ChatPanel({ floating = false, onClose }) {
  const { pathname } = useLocation()
  const { chatState, setChatState } = useChat()
  const [input, setInput] = useState('')
  const logRef = useRef(null)
  const { sessionId, intent, agentStatus, sending, sendError, consent, lead, conversation, isTyping, introState } =
    chatState
  const isClosed = ['scheduled', 'closed', 'handoff', 'qualified', 'waitlist'].includes(agentStatus)

  useEffect(() => {
    if (!logRef.current) return
    logRef.current.scrollTop = logRef.current.scrollHeight
  }, [conversation, isTyping])

  useEffect(() => {
    if (introState !== 'idle' || conversation.length) return

    setChatState((current) => {
      if (current.introState !== 'idle' || current.conversation.length) return current

      return {
        ...current,
        isTyping: false,
        introState: 'done',
        conversation: [
          ...current.conversation,
          createMessage('assistant', 'Olá! Eu sou a Eugênia.'),
          createMessage('assistant', 'Como posso te chamar?'),
        ],
      }
    })
  }, [conversation.length, introState, setChatState])

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || sending || isClosed) return

    const userMessage = createMessage('user', trimmed)
    const nextConversation = [...conversation, userMessage]
    setInput('')
    setChatState((current) => ({
      ...current,
      intent: current.intent || 'diagnostico',
      sending: true,
      isTyping: true,
      sendError: '',
      introState: 'done',
      conversation: nextConversation,
    }))

    try {
      const payload = buildChatPayload({
        sessionId,
        route: pathname,
        message: trimmed,
        lead,
        conversation: nextConversation,
        intent: intent || 'diagnostico',
        consent,
        widgetVariant: getWidgetVariant(floating, pathname),
      })

      const response = await fetch(CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error(`Unexpected response: ${response.status}`)
      const data = await response.json()
      const assistant = createMessage('assistant', data.assistant?.message || 'Nao recebi uma resposta. Tente novamente.')

      setChatState((current) => ({
        ...current,
        sending: false,
        isTyping: false,
        sendError: '',
        agentStatus: data.status || 'active',
        lead: { ...current.lead, ...Object.fromEntries(
          Object.entries(data.lead_updates || {}).filter(([k]) =>
            ['name','email','phone','company','segment','monthly_volume','urgency','main_pain'].includes(k)
          )
        ) },
        conversation: [...nextConversation, assistant],
      }))
    } catch {
      setChatState((current) => ({
        ...current,
        sending: false,
        isTyping: false,
        sendError: 'Nao consegui conectar. Tente novamente ou use o WhatsApp.',
        conversation: [
          ...nextConversation,
          createMessage('assistant', 'Tive um problema de conexao agora. Tente novamente em alguns segundos.'),
        ],
      }))
    }
  }

  return (
    <section className={floating ? 'chat-panel floating' : 'chat-panel'} id="contato">
      <div className="chat-head">
        <span>
          <MessageCircle size={18} aria-hidden="true" />
          Eugen.IA
        </span>
        {floating ? (
          <button type="button" onClick={onClose} aria-label="Fechar chat">
            <X size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="chat-log" ref={logRef} role="log" aria-live="polite">
        {conversation.map((message, index) => (
          <div className={`chat-row ${message.role}`} key={`${message.at}-${index}`}>
            {message.role === 'assistant' ? (
              <span className="chat-avatar" aria-hidden="true">
                <img src={eugeniaAvatar} alt="" />
              </span>
            ) : null}
            <p className={`chat-message ${message.role}`}>{message.message}</p>
          </div>
        ))}
        {isTyping ? (
          <div className="chat-row assistant">
            <span className="chat-avatar" aria-hidden="true">
              <img src={eugeniaAvatar} alt="" />
            </span>
            <p className="chat-message assistant typing">...</p>
          </div>
        ) : null}
      </div>

      {!isClosed ? (
        <form className="chat-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor={floating ? 'chat-floating' : 'chat-embedded'}>
            Resposta da conversa
          </label>
          <input
            id={floating ? 'chat-floating' : 'chat-embedded'}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite sua mensagem"
            disabled={sending || introState !== 'done'}
          />
          <button type="submit" disabled={!input.trim() || sending || introState !== 'done'} aria-label="Enviar">
            <Send size={18} aria-hidden="true" />
          </button>
        </form>
      ) : null}

      <label className="chat-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setChatState((current) => ({ ...current, consent: event.target.checked }))}
        />
        <span>Autorizo o armazenamento e uso das informacoes para contato comercial, conforme a LGPD.</span>
      </label>

      {sendError ? <p className="chat-error">{sendError}</p> : null}
      {isClosed ? <p className="chat-success">Contato recebido. A Eugênia chama você no WhatsApp em instantes.</p> : null}
    </section>
  )
}

export function ChatWidget({ embedded = false }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  if (embedded) return <ChatPanel />
  if (pathname === '/contato') return null

  return (
    <div className="chat-floating-shell">
      {open ? <ChatPanel floating onClose={() => setOpen(false)} /> : null}
      <button
        type="button"
        className="chat-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        data-cursor="action"
      >
        <span>Falar com a Eugênia</span>
      </button>
    </div>
  )
}
