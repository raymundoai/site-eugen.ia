import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings, ShieldCheck, X } from 'lucide-react'
import { useConsent } from '../hooks/useConsent'

const categoryCopy = [
  {
    key: 'necessary',
    title: 'Necessários',
    body: 'Mantêm o site funcionando, preservam segurança e permitem recursos solicitados por você, como o chat da sessão.',
    locked: true,
  },
  {
    key: 'preferences',
    title: 'Preferências',
    body: 'Guardam escolhas de experiência, como tema claro ou escuro.',
  },
  {
    key: 'analytics',
    title: 'Medição',
    body: 'Permitem medir audiência e navegação com GA4 para melhorar o site.',
  },
]

export function CookieConsent() {
  const { consent, acceptAll, rejectNonEssential, preferencesOpen, openPreferences } = useConsent()
  const showBanner = !consent.decided

  const title = useMemo(() => (showBanner ? 'Privacidade e cookies' : 'Preferências de cookies'), [showBanner])

  if (!showBanner && !preferencesOpen) return null

  return (
    <>
      {showBanner ? (
        <section className="cookie-banner" role="dialog" aria-live="polite" aria-label={title}>
          <div className="cookie-banner__copy">
            <span className="cookie-banner__icon" aria-hidden="true">
              <ShieldCheck size={20} />
            </span>
            <div>
              <h2>{title}</h2>
              <p>
                Usamos armazenamentos necessários para o funcionamento do site. Cookies de medição, incluindo GA4, só
                são ativados após sua aprovação.
              </p>
              <p>
                Você pode revisar a <Link to="/cookies">Política de Cookies</Link> e a{' '}
                <Link to="/privacidade">Política de Privacidade</Link>.
              </p>
            </div>
          </div>
          <div className="cookie-banner__actions">
            <button type="button" className="btn btn-glass" onClick={rejectNonEssential}>
              Rejeitar não essenciais
            </button>
            <button type="button" className="btn btn-glass" onClick={openPreferences}>
              <Settings size={17} aria-hidden="true" />
              Configurar
            </button>
            <button type="button" className="btn btn-primary" onClick={acceptAll}>
              Aceitar todos
            </button>
          </div>
        </section>
      ) : null}

      {preferencesOpen ? (
        <CookiePreferencesModal />
      ) : null}
    </>
  )
}

function CookiePreferencesModal() {
  const { consent, acceptAll, rejectNonEssential, saveConsent, closePreferences } = useConsent()
  const [draft, setDraft] = useState(consent.categories)

  function acceptAllAndClose() {
    acceptAll()
    closePreferences()
  }

  function rejectAndClose() {
    rejectNonEssential()
    closePreferences()
  }

  function saveDraft() {
    saveConsent(draft)
    closePreferences()
  }

  return (
    <div className="cookie-modal" role="dialog" aria-modal="true" aria-label="Preferências de cookies">
      <div className="cookie-modal__panel">
        <div className="cookie-modal__head">
          <div>
            <p className="eyebrow">LGPD</p>
            <h2>Preferências de cookies</h2>
          </div>
          <button type="button" className="cookie-modal__close" onClick={closePreferences} aria-label="Fechar">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="cookie-options">
          {categoryCopy.map((category) => (
            <label className="cookie-option" key={category.key}>
              <span>
                <strong>{category.title}</strong>
                <small>{category.body}</small>
              </span>
              <input
                type="checkbox"
                checked={Boolean(draft[category.key])}
                disabled={category.locked}
                onChange={(event) => setDraft((current) => ({ ...current, [category.key]: event.target.checked }))}
              />
            </label>
          ))}
        </div>

        <div className="cookie-modal__actions">
          <button type="button" className="btn btn-glass" onClick={rejectAndClose}>
            Rejeitar não essenciais
          </button>
          <button type="button" className="btn btn-glass" onClick={acceptAllAndClose}>
            Aceitar todos
          </button>
          <button type="button" className="btn btn-primary" onClick={saveDraft}>
            Salvar preferências
          </button>
        </div>
      </div>
    </div>
  )
}
