import { useCallback, useEffect, useMemo, useState } from 'react'
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
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `session-${Date.now()}`
}

function createDefaultState() {
  return {
    sessionId: createSessionId(),
    intent: '',
    agentStatus: '',
    consent: false,
    lead: { ...defaultLead },
    conversation: [],
    sending: false,
    sendError: '',
    isTyping: false,
    introState: 'idle',
  }
}

function hydrateState() {
  if (typeof window === 'undefined') return createDefaultState()
  const fallback = createDefaultState()
  const stored = window.sessionStorage.getItem(CHAT_STORAGE_KEY)
  if (!stored) return fallback

  try {
    const parsed = JSON.parse(stored)
    return {
      ...fallback,
      sessionId: parsed.sessionId || fallback.sessionId,
      intent: typeof parsed.intent === 'string' ? parsed.intent : fallback.intent,
      agentStatus: typeof parsed.agentStatus === 'string' ? parsed.agentStatus : fallback.agentStatus,
      consent: parsed.consent === undefined ? fallback.consent : Boolean(parsed.consent),
      lead: { ...fallback.lead, ...(parsed.lead || {}) },
      conversation: Array.isArray(parsed.conversation) ? parsed.conversation : fallback.conversation,
      introState: Array.isArray(parsed.conversation) && parsed.conversation.length ? 'done' : fallback.introState,
    }
  } catch {
    window.sessionStorage.removeItem(CHAT_STORAGE_KEY)
    return fallback
  }
}

function persistable(state) {
  return {
    sessionId: state.sessionId,
    intent: state.intent,
    agentStatus: state.agentStatus,
    consent: state.consent,
    lead: state.lead,
    conversation: state.conversation,
  }
}

export function ChatProvider({ children }) {
  const [chatState, setChatState] = useState(hydrateState)

  useEffect(() => {
    window.sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(persistable(chatState)))
  }, [chatState])

  const resetChat = useCallback(() => {
    window.sessionStorage.removeItem(CHAT_STORAGE_KEY)
    setChatState(createDefaultState())
  }, [])

  const value = useMemo(() => ({ chatState, setChatState, resetChat }), [chatState, resetChat])

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
