import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ChatMessage } from '../molecules/ChatMessage'
import { buildChatPayload } from '../../utils/chatPayload'
import { useChat } from '../../hooks/useChat'
import { EUGENIA_INTRO_MESSAGE_1, EUGENIA_INTRO_MESSAGE_2 } from '../../data/chatIntro'

const CHAT_WEBHOOK_URL =
  import.meta.env.VITE_N8N_CHAT_WEBHOOK || 'https://n8nwebhook.aeraartificial.com.br/webhook/eugenia-chat'
const INTRO_FIRST_DELAY_MS = 3000
const INTRO_TYPING_BEFORE_FIRST_MS = 900
const INTRO_SECOND_DELAY_MS = 2000
const INTRO_TYPING_BEFORE_SECOND_MS = 900

function createMessage(role, message) {
  return {
    role,
    message,
    at: new Date().toISOString(),
  }
}

function getWidgetVariant(floating, pathname) {
  if (floating) return 'floating'
  if (pathname === '/contato') return 'contact_embedded'
  return 'embedded'
}

function ChatPanel({ floating = false, onClose, className = '' }) {
  const location = useLocation()
  const scrollRef = useRef(null)
  const [input, setInput] = useState('')
  const { chatState, setChatState } = useChat()

  const { sessionId, intent, agentStatus, sending, sendError, consent, lead, conversation, isTyping, introState } =
    chatState

  const isScheduled = agentStatus === 'scheduled' || agentStatus === 'closed' || agentStatus === 'handoff'

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [conversation, isTyping])

  useEffect(() => {
    if (introState !== 'idle' || conversation.length > 0) {
      return
    }

    setChatState((current) => {
      if (current.introState !== 'idle' || current.conversation.length > 0) {
        return current
      }

      return {
        ...current,
        introState: 'scheduled',
      }
    })

    window.setTimeout(() => {
      setChatState((current) => {
        if (current.introState !== 'scheduled') {
          return current
        }

        return {
          ...current,
          isTyping: true,
          introState: 'typing-first',
        }
      })
    }, INTRO_FIRST_DELAY_MS)

    window.setTimeout(() => {
      setChatState((current) => {
        if (current.introState !== 'typing-first') {
          return current
        }

        return {
          ...current,
          conversation: [...current.conversation, createMessage('assistant', EUGENIA_INTRO_MESSAGE_1)],
          introState: 'waiting-second',
          isTyping: false,
        }
      })
    }, INTRO_FIRST_DELAY_MS + INTRO_TYPING_BEFORE_FIRST_MS)

    window.setTimeout(() => {
      setChatState((current) => {
        if (current.introState !== 'waiting-second') {
          return current
        }

        return {
          ...current,
          isTyping: true,
          introState: 'typing-second',
        }
      })
    }, INTRO_FIRST_DELAY_MS + INTRO_TYPING_BEFORE_FIRST_MS + INTRO_SECOND_DELAY_MS)

    window.setTimeout(() => {
      setChatState((current) => {
        if (current.introState !== 'typing-second') {
          return current
        }

        return {
          ...current,
          conversation: [...current.conversation, createMessage('assistant', EUGENIA_INTRO_MESSAGE_2)],
          introState: 'done',
          isTyping: false,
        }
      })
    }, INTRO_FIRST_DELAY_MS + INTRO_TYPING_BEFORE_FIRST_MS + INTRO_SECOND_DELAY_MS + INTRO_TYPING_BEFORE_SECOND_MS)

  }, [conversation.length, introState, setChatState])

  const handleSendAnswer = async (event) => {
    event.preventDefault()

    const trimmed = input.trim()
    if (!trimmed || sending || isScheduled) {
      return
    }

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
        route: location.pathname,
        message: trimmed,
        lead,
        conversation: nextConversation,
        intent: intent || 'diagnostico',
        consent,
        widgetVariant: getWidgetVariant(floating, location.pathname),
      })

      const response = await fetch(CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Resposta inesperada do servidor: ${response.status}`)
      }

      const data = await response.json()
      const agentMessage = createMessage(
        'assistant',
        data.assistant?.message || 'Não recebi uma resposta. Tente novamente.',
      )

      setChatState((current) => ({
        ...current,
        sending: false,
        isTyping: false,
        sendError: '',
        intent: current.intent || 'diagnostico',
        agentStatus: data.status || 'active',
        lead: { ...current.lead, ...(data.lead_updates || {}) },
        conversation: [...nextConversation, agentMessage],
      }))
    } catch {
      const errorMessage = createMessage(
        'assistant',
        'Tive um problema de conexão agora. Tente novamente em alguns segundos.',
      )

      setChatState((current) => ({
        ...current,
        sending: false,
        isTyping: false,
        sendError: 'Não consegui conectar. Tente novamente ou use o WhatsApp.',
        conversation: [...nextConversation, errorMessage],
      }))
    }
  }

  return (
    <section className={`chat-widget ${floating ? 'chat-widget-floating' : 'chat-widget-embedded'} ${className}`.trim()}>
      {floating ? (
        <button type="button" className="chat-close" onClick={onClose} aria-label="Fechar chat">
          ×
        </button>
      ) : null}

      <div className="chat-messages" ref={scrollRef} role="log" aria-live="polite">
        {conversation.map((message, index) => (
          <ChatMessage key={`${message.at}-${index}`} role={message.role} message={message.message} />
        ))}
        {isTyping ? <ChatMessage role="assistant" typing /> : null}
      </div>

      {!isScheduled ? (
        <form className="chat-form" onSubmit={handleSendAnswer}>
          <label htmlFor={`chat-input-${floating ? 'floating' : 'embedded'}`} className="sr-only">
            Resposta da conversa
          </label>
          <input
            id={`chat-input-${floating ? 'floating' : 'embedded'}`}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Digite sua mensagem"
            disabled={sending || introState !== 'done'}
          />

          <button type="submit" className="chat-submit" disabled={!input.trim() || sending || introState !== 'done'}>
            {sending ? 'ENVIANDO' : 'ENVIAR'}
          </button>
        </form>
      ) : null}

      <div className="chat-consent">
        <label>
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) =>
              setChatState((current) => ({
                ...current,
                consent: event.target.checked,
              }))
            }
          />
          <span>Autorizo o armazenamento e uso das informações para contato comercial, conforme a LGPD.</span>
        </label>
      </div>

      {sendError ? <p className="chat-error">{sendError}</p> : null}
      {isScheduled ? <p className="chat-success">Diagnóstico agendado com sucesso.</p> : null}
    </section>
  )
}

export function ChatWidget({ variant = 'embedded', className = '' }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const { chatState } = useChat()

  useEffect(() => {
    if (location.pathname === '/contato') {
      setOpen(false)
    }
  }, [location.pathname])

  if (variant === 'embedded') {
    return <ChatPanel className={className} />
  }

  if (location.pathname === '/contato') {
    return null
  }

  const isScheduled = chatState.agentStatus === 'scheduled' || chatState.agentStatus === 'closed'
  const hasStarted = Boolean(chatState.intent)

  const floatingTitle = isScheduled ? 'Diagnóstico agendado' : hasStarted ? 'Continuar conversa' : 'Chat IA'
  const floatingSubtitle = isScheduled ? 'ver histórico' : hasStarted ? 'retomar chat' : 'agente n8n'

  return (
    <div className="chat-floating-shell">
      {open ? <ChatPanel floating onClose={() => setOpen(false)} /> : null}
      <button
        type="button"
        className="chat-floating-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        data-cursor="action"
      >
        <span>{floatingTitle}</span>
        <small>{floatingSubtitle}</small>
      </button>
    </div>
  )
}
