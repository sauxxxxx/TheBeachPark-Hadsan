// Published room rates and bestseller states verified against the property's
// official booking listings in September 2026. Final quotes remain date-based.
const bookingFacts = {
  'beach-side-room': { fromRate: 2900, bestseller: true },
  'oceanfront-deck-room': { fromRate: 3200, bestseller: true },
  'pool-side-balcony-room': { fromRate: 3000 },
  'barkada-oceanfront-deck': { fromRate: 3472 },
  'beachside-barkada-room': { fromRate: 4500 },
  'barkada-beach-house': { fromRate: 6500 },
  'pool-villa': { fromRate: 5500 },
  'barkada-poolside-balcony': { fromRate: 4500 },
  'lagoon-room': { fromRate: 6500 },
  'oceanfront-deck-deluxe': { fromRate: 3600 },
}

const peso = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

export const roomRateVerifiedLabel = 'September 2026'

export function roomBookingFacts(room) {
  return bookingFacts[room?.slug] ?? {}
}

export function roomRateLabel(room) {
  const { fromRate } = roomBookingFacts(room)
  return fromRate ? `From ${peso.format(fromRate)} / night` : 'Rate on request'
}

export function isRoomBestseller(room) {
  return Boolean(roomBookingFacts(room).bestseller)
}
