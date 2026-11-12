import { exelyIntegration, roomTypeIds } from '../data/exelyIntegration.js'
import { normalizeRoomPhotos } from './exelyRoomPhotos.js'

const slugsById = new Map(Object.entries(roomTypeIds).map(([slug, id]) => [id, slug]))

function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function petsAllowed(amenities) {
  if (!Array.isArray(amenities)) return undefined
  if (amenities.some((item) => item?.kind === 'without_pets')) return false
  if (amenities.some((item) => item?.kind === 'possible_with_pets')) return true
  return undefined
}

function normalizeRoom(room) {
  const id = String(room?.code ?? '')
  const name = text(room?.name)
  if (!/^[1-9]\d*$/.test(id) || !name || name.toLowerCase() === 'buffer room') return null

  // Keep existing links and use the room ID for new links so renames do not break them.
  const slug = slugsById.get(id) ?? `room-${id}`
  const size = room.size
  return {
    id,
    slug,
    name,
    description: text(room.description) || null,
    maxOccupancy: Number.isInteger(room.max_occupancy) && room.max_occupancy > 0 ? room.max_occupancy : null,
    size: Number.isFinite(size?.value) && size.value > 0 && size.unit === 'square_metre'
      ? { value: size.value, unit: size.unit }
      : null,
    petsAllowed: petsAllowed(room.amenities),
    photos: normalizeRoomPhotos(slug, id, room.images),
  }
}

export async function getExelyRoomCatalog({ signal } = {}) {
  const { propertyId, loaderHosts } = exelyIntegration
  const url = new URL('/ApiWebDistribution/BookingForm/hotel_info', `https://${loaderHosts[0]}`)
  url.search = new URLSearchParams({ 'hotels[0].code': propertyId, language: 'en-gb' })
  const response = await fetch(url, { cache: 'no-cache', signal })
  if (!response.ok) throw new Error(`Exely room catalog request failed (${response.status})`)

  const { hotels } = await response.json()
  const hotel = Array.isArray(hotels) ? hotels.find((item) => String(item?.code) === propertyId) : null
  const rooms = new Map()
  for (const entry of Array.isArray(hotel?.room_types) ? hotel.room_types : []) {
    const room = normalizeRoom(entry)
    if (room && !rooms.has(room.id)) rooms.set(room.id, room)
  }
  if (!rooms.size) throw new Error('Exely room catalog response is missing room types')
  return [...rooms.values()]
}
