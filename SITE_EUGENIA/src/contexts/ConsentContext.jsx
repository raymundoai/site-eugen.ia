import { useCallback, useEffect, useMemo, useState } from 'react'
import { ConsentContext } from './consentContext'

const CONSENT_KEY = 'eugenia_cookie_consent'
const CONSENT_VERSION = '2026-05-29'

const defaultCategories = {
  necessary: true,
  preferences: false,
  analytics: false,
}

function createDefaultConsent() {
  return {
    version: CONSENT_VERSION,
    decided: false,
    updatedAt: '',
    categories: { ...defaultCategories },
  }
}

function normalizeConsent(raw) {
  return {
    version: raw?.version === CONSENT_VERSION ? raw.version : CONSENT_VERSION,
    decided: raw?.version === CONSENT_VERSION ? Boolean(raw.decided) : false,
    updatedAt: typeof raw?.updatedAt === 'string' ? raw.updatedAt : '',
    categories: {
      ...defaultCategories,
      ...(raw?.version === CONSENT_VERSION && raw?.categories ? raw.categories : {}),
      necessary: true,
    },
  }
}

function hydrateConsent() {
  if (typeof window === 'undefined') return createDefaultConsent()

  try {
    const stored = window.localStorage.getItem(CONSENT_KEY)
    return stored ? normalizeConsent(JSON.parse(stored)) : createDefaultConsent()
  } catch {
    window.localStorage.removeItem(CONSENT_KEY)
    return createDefaultConsent()
  }
}

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(hydrateConsent)
  const [preferencesOpen, setPreferencesOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
  }, [consent])

  const saveConsent = useCallback((categories) => {
    setConsent({
      version: CONSENT_VERSION,
      decided: true,
      updatedAt: new Date().toISOString(),
      categories: {
        ...defaultCategories,
        ...categories,
        necessary: true,
      },
    })
  }, [])

  const acceptAll = useCallback(() => {
    saveConsent({ preferences: true, analytics: true })
  }, [saveConsent])

  const rejectNonEssential = useCallback(() => {
    saveConsent({ preferences: false, analytics: false })
  }, [saveConsent])

  const openPreferences = useCallback(() => setPreferencesOpen(true), [])
  const closePreferences = useCallback(() => setPreferencesOpen(false), [])

  const value = useMemo(
    () => ({
      consent,
      acceptAll,
      rejectNonEssential,
      saveConsent,
      preferencesOpen,
      openPreferences,
      closePreferences,
    }),
    [acceptAll, closePreferences, consent, openPreferences, preferencesOpen, rejectNonEssential, saveConsent],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}
