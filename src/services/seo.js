function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export function applySeo(route) {
  const siteUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '')
  const title = route.meta.title || 'The Beach Park Hadsan'
  const description = route.meta.description || 'Stay and enjoy the water at The Beach Park in Hadsan, Lapu-Lapu City, Cebu.'
  const canonicalUrl = `${siteUrl}${route.path}`

  document.title = title
  upsertMeta('meta[name="description"]', { name: 'description', content: description })
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = canonicalUrl
}
