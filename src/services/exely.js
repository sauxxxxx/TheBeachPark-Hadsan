const configuredUrl = import.meta.env.VITE_EXELY_BOOKING_URL?.trim() || ''
const configuredMode = import.meta.env.VITE_EXELY_INTEGRATION_MODE?.trim() || 'pending'

export const exelyConfig = Object.freeze({
  propertyId: '507010',
  localPath: '/booking/',
  mode: configuredMode,
  bookingUrl: configuredUrl,
  isConfigured: Boolean(configuredUrl),
})

export function getBookingTarget() {
  return exelyConfig.isConfigured ? exelyConfig.bookingUrl : exelyConfig.localPath
}

export function isExternalBookingTarget() {
  return /^https?:\/\//i.test(getBookingTarget())
}
