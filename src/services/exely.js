import { exelyIntegration, offerIds, roomTypeIds } from '../data/exelyIntegration.js'

export const exelyConfig = Object.freeze({
  propertyId: exelyIntegration.propertyId,
  localPath: exelyIntegration.bookingPath,
  mode: 'embedded',
  bookingUrl: exelyIntegration.bookingPath,
  isConfigured: true,
})

export function getBookingTarget() {
  return exelyConfig.localPath
}

export function isExternalBookingTarget() {
  return /^https?:\/\//i.test(getBookingTarget())
}

const bookingParameters = new Set([
  'date', 'nights', 'adults', 'children-age', 'access-code',
  'room-type', 'special-offer', 'hotel_id', 'currency', 'language', 'be-lng',
])

export function getBookingHref({ query = {}, roomType, offerId } = {}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (bookingParameters.has(key) && value != null && !Array.isArray(value)) {
      params.set(key, String(value))
    }
  }
  const room = roomTypeIds[roomType] || (/^\d+$/.test(roomType || '') ? roomType : '')
  const offer = offerIds[offerId] || (/^\d+$/.test(offerId || '') ? offerId : '')
  if (room) params.set('room-type', room)
  if (offer) params.set('special-offer', offer)
  const search = params.toString()
  return `${exelyConfig.localPath}${search ? `?${search}` : ''}`
}

export function getOfferBookingTarget(offerId) {
  return getBookingHref({ offerId })
}

export function getGuestReviewsUrl() {
  const { loaderHosts, language, context } = exelyIntegration
  return `https://${loaderHosts[0]}/integration/widget/reviews-widget/${language}/${context}`
}
