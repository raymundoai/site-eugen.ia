import { useEffect, useMemo, useState } from 'react'
import { ChatContext } from './chatContext'

const CHAT_STORAGE_KEY = 'eugenia_chat_state'

const defaultLead = {
  name: '',
  email: '',
  phone: '',
  company: '',
  segment: '',
  monthly_volume: '',
  urgency: '',
  main_pain: '',
}

function createSessionId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `session-${Date.now()}`
}

function createDefaultChatState() {
  return {
    sessionId: createSessionId(),
    intent: '',
    agentStatus: '',
    sending: false,
    sendError: '',
    consent: true,
    isTyping: false,
    introState: 'idle',
    lead: { ...defaultLead },
    conversation: [],
  }
}

function hydrateChatState() {
  if (typeof window === 'undefined') {
    return createDefaultChatState()
  }

  const fallback = createDefaultChatState()
  const stored = window.sessionStorage.getItem(CHAT_STORAGE_KEY)

  if (!stored) {
    return fallback
  }

  try {
    const parsed = JSON.parse(stored)

    return {
      ...fallback,
      sessionId: parsed.sessionId || fallback.sessionId,
      intent: typeof parsed.intent === 'string' ? parsed.intent : fallback.intent,
      agentStatus: typeof parsed.agentStatus === 'string' ? parsed.agentStatus : fallback.agentStatus,
      consent: parsed.consent === undefined ? fallback.consent : Boolean(parsed.consent),
      introState:
        Array.isArray(parsed.conversation) && parsed.conversation.length > 0 ? 'done' : fallback.introState,
      lead: {
        ...fallback.lead,
        ...(parsed.lead || {}),
      },
      conversation:
        Array.isArray(parsed.conversation) && parsed.conversation.length > 0 ? parsed.conversation : fallback.conversation,
    }
  } catch {
    window.sessionStorage.removeItem(CHAT_STORAGE_KEY)
    return fallback
  }
}

function getPersistedChatState(chatState) {
  return {
    sessionId: chatState.sessionId,
    intent: chatState.intent,
    agentStatus: chatState.agentStatus,
    consent: chatState.consent,
    lead: chatState.lead,
    conversation: chatState.conversation,
  }
}

export function ChatProvider({ children }) {
  const [chatState, setChatState] = useState(hydrateChatState)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(getPersistedChatState(chatState)))
  }, [chatState])

  const value = useMemo(
    () => ({
      chatState,
      setChatState,
      resetChat: () => setChatState(createDefaultChatState()),
    }),
    [chatState],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
