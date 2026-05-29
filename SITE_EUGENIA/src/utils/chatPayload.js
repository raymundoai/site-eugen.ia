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
    consent_scope: 'contato_comercial',
    privacy_notice_version: '2026-05-29',
    legal_basis: 'procedimentos_preliminares_a_pedido_do_titular',
    channel: 'site',
    widget_variant: widgetVariant || 'embedded',
  }
}
