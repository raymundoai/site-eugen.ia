import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useConsent } from '../hooks/useConsent'

const GA_MEASUREMENT_ID = 'G-LFD6SZVERB'
const GA_SCRIPT_ID = 'eugenia-ga4'

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }
}

function updateGoogleConsent(categories) {
  ensureDataLayer()
  window.gtag('consent', 'update', {
    analytics_storage: categories.analytics ? 'granted' : 'denied',
    functionality_storage: categories.preferences ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

function removeGoogleCookies() {
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name.startsWith('_gcl_'))

  const hostParts = window.location.hostname.split('.')
  const domains = [window.location.hostname]
  if (hostParts.length > 2) domains.push(`.${hostParts.slice(-3).join('.')}`)
  if (hostParts.length > 1) domains.push(`.${hostParts.slice(-2).join('.')}`)

  names.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`
    })
  })
}

export function GoogleAnalytics() {
  const { consent } = useConsent()
  const location = useLocation()
  const { categories } = consent

  useEffect(() => {
    ensureDataLayer()
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    })
  }, [])

  useEffect(() => {
    updateGoogleConsent(categories)

    if (!categories.analytics) {
      removeGoogleCookies()
      return
    }

    if (!document.getElementById(GA_SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = GA_SCRIPT_ID
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      document.head.appendChild(script)
      window.gtag('js', new Date())
    }

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: `${location.pathname}${location.search}${location.hash}`,
      anonymize_ip: true,
      send_page_view: false,
    })
    window.gtag('event', 'page_view', {
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [categories, location.hash, location.pathname, location.search])

  return null
}
