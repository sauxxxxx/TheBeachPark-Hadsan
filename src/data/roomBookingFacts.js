import { formatPeso, overnightRooms, rateSheetDate } from './ratesContent'

// Rates are supplied by the property. Bestseller status remains from the
// September 2026 booking listings; booking quotes remain date-based in Exely.
const bestsellerSlugs = new Set(['beach-side-room', 'oceanfront-deck-room'])
const ratesBySlug = new Map(overnightRooms.map((room) => [room.slug, room]))

export const roomRateVerifiedLabel = rateSheetDate

export function roomBookingFacts(room) {
  const rate = ratesBySlug.get(room?.slug)
  return {
    ...(rate ? { fromRate: rate.weekdayRoom, capacity: rate.capacity } : {}),
    bestseller: bestsellerSlugs.has(room?.slug),
  }
}

export function roomCapacity(room) {
  return roomBookingFacts(room).capacity ?? room?.maxOccupancy
}

export function roomRateLabel(room) {
  const { fromRate } = roomBookingFacts(room)
  return fromRate ? `From ${formatPeso(fromRate)} / night` : 'Rate on request'
}

export function isRoomBestseller(room) {
  return roomBookingFacts(room).bestseller
}
