const consentKey = 'beachpark_analytics_consent'

export function getAnalyticsConsent() {
  return localStorage.getItem(consentKey) || 'unset'
}

export function setAnalyticsConsent(value) {
  localStorage.setItem(consentKey, value)
}

export function trackEvent(name, properties = {}) {
  const detail = { name, properties, timestamp: new Date().toISOString() }
  window.dispatchEvent(new CustomEvent('beachpark:analytics', { detail }))

  if (getAnalyticsConsent() === 'granted' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...properties })
  }
}
