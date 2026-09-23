import beachSideRoom1 from '../assets/images/generated/rooms/beach-side-room-1-ai.webp'
import beachSideRoom2 from '../assets/images/generated/rooms/beach-side-room-2-ai.webp'
import beachSideRoom3 from '../assets/images/generated/rooms/beach-side-room-3-ai.webp'
import beachSideRoom4 from '../assets/images/generated/rooms/beach-side-room-4-ai.webp'
import barkadaBeachHouse1 from '../assets/images/generated/rooms/barkada-beach-house-1-ai.webp'
import barkadaBeachHouse2 from '../assets/images/generated/rooms/barkada-beach-house-2-ai.webp'
import barkadaBeachHouse3 from '../assets/images/generated/rooms/barkada-beach-house-3-ai.webp'
import barkadaBeachHouse4 from '../assets/images/generated/rooms/barkada-beach-house-4-ai.webp'
import barkadaBeachHouse5 from '../assets/images/generated/rooms/barkada-beach-house-5-ai.webp'
import barkadaBeachHouse6 from '../assets/images/generated/rooms/barkada-beach-house-6-ai.webp'
import barkadaBeachHouse7 from '../assets/images/generated/rooms/barkada-beach-house-7-ai.webp'
import barkadaOceanfrontDeck1 from '../assets/images/generated/rooms/barkada-oceanfront-deck-1-ai.webp'
import barkadaOceanfrontDeck2 from '../assets/images/generated/rooms/barkada-oceanfront-deck-2-ai.webp'
import barkadaOceanfrontDeck3 from '../assets/images/generated/rooms/barkada-oceanfront-deck-3-ai.webp'
import barkadaOceanfrontDeck4 from '../assets/images/generated/rooms/barkada-oceanfront-deck-4-ai.webp'
import barkadaPoolsideBalcony1 from '../assets/images/generated/rooms/barkada-poolside-balcony-1-ai.webp'
import barkadaPoolsideBalcony2 from '../assets/images/generated/rooms/barkada-poolside-balcony-2-ai.webp'
import barkadaPoolsideBalcony3 from '../assets/images/generated/rooms/barkada-poolside-balcony-3-ai.webp'
import beachHouseRoom1 from '../assets/images/generated/rooms/beach-house-room-1-ai.webp'
import beachHouseRoom2 from '../assets/images/generated/rooms/beach-house-room-2-ai.webp'
import beachsideBarkadaRoom1 from '../assets/images/generated/rooms/beachside-barkada-room-1-ai.webp'
import beachsideBarkadaRoom2 from '../assets/images/generated/rooms/beachside-barkada-room-2-ai.webp'
import beachsideBarkadaRoom3 from '../assets/images/generated/rooms/beachside-barkada-room-3-ai.webp'
import beachsideBarkadaRoom4 from '../assets/images/generated/rooms/beachside-barkada-room-4-ai.webp'
import beachsideBarkadaRoom5 from '../assets/images/generated/rooms/beachside-barkada-room-5-ai.webp'
import oceanfrontDeckRoom1 from '../assets/images/generated/rooms/oceanfront-deck-room-1-ai.webp'
import oceanfrontDeckRoom2 from '../assets/images/generated/rooms/oceanfront-deck-room-2-ai.webp'
import oceanfrontDeckRoom3 from '../assets/images/generated/rooms/oceanfront-deck-room-3-ai.webp'
import oceanfrontDeckRoom4 from '../assets/images/generated/rooms/oceanfront-deck-room-4-ai.webp'
import oceanfrontDeckRoom5 from '../assets/images/generated/rooms/oceanfront-deck-room-5-ai.webp'
import oceanfrontDeckRoom6 from '../assets/images/generated/rooms/oceanfront-deck-room-6-ai.webp'
import oceanfrontDeckRoom7 from '../assets/images/generated/rooms/oceanfront-deck-room-7-ai.webp'
import poolSideBalconyRoom1 from '../assets/images/generated/rooms/pool-side-balcony-room-1-ai.webp'
import poolSideBalconyRoom2 from '../assets/images/generated/rooms/pool-side-balcony-room-2-ai.webp'
import poolSideBalconyRoom3 from '../assets/images/generated/rooms/pool-side-balcony-room-3-ai.webp'
import poolSideBalconyRoom4 from '../assets/images/generated/rooms/pool-side-balcony-room-4-ai.webp'
import poolSideBalconyRoom5 from '../assets/images/generated/rooms/pool-side-balcony-room-5-ai.webp'
import poolVilla1 from '../assets/images/generated/rooms/pool-villa-1-ai.webp'
import poolVilla2 from '../assets/images/generated/rooms/pool-villa-2-ai.webp'
import poolVilla3 from '../assets/images/generated/rooms/pool-villa-3-ai.webp'
import poolVilla4 from '../assets/images/generated/rooms/pool-villa-4-ai.webp'
import { roomImageUrl as verifiedRoomImageUrl, rooms } from './rooms.generated'

const roomImageOverrides = {
  'barkada-beach-house-1.webp': barkadaBeachHouse1,
  'barkada-beach-house-2.webp': barkadaBeachHouse2,
  'barkada-beach-house-3.webp': barkadaBeachHouse3,
  'barkada-beach-house-4.webp': barkadaBeachHouse4,
  'barkada-beach-house-5.webp': barkadaBeachHouse5,
  'barkada-beach-house-6.webp': barkadaBeachHouse6,
  'barkada-beach-house-7.webp': barkadaBeachHouse7,
  'barkada-oceanfront-deck-1.webp': barkadaOceanfrontDeck1,
  'barkada-oceanfront-deck-2.webp': barkadaOceanfrontDeck2,
  'barkada-oceanfront-deck-3.webp': barkadaOceanfrontDeck3,
  'barkada-oceanfront-deck-4.webp': barkadaOceanfrontDeck4,
  'barkada-poolside-balcony-1.webp': barkadaPoolsideBalcony1,
  'barkada-poolside-balcony-2.webp': barkadaPoolsideBalcony2,
  'barkada-poolside-balcony-3.webp': barkadaPoolsideBalcony3,
  'beach-house-room-1.webp': beachHouseRoom1,
  'beach-house-room-2.webp': beachHouseRoom2,
  'beachside-barkada-room-1.webp': beachsideBarkadaRoom1,
  'beachside-barkada-room-2.webp': beachsideBarkadaRoom2,
  'beachside-barkada-room-3.webp': beachsideBarkadaRoom3,
  'beachside-barkada-room-4.webp': beachsideBarkadaRoom4,
  'beachside-barkada-room-5.webp': beachsideBarkadaRoom5,
  'beach-side-room-1.webp': beachSideRoom1,
  'beach-side-room-2.webp': beachSideRoom2,
  'beach-side-room-3.webp': beachSideRoom3,
  'beach-side-room-4.webp': beachSideRoom4,
  'oceanfront-deck-room-1.webp': oceanfrontDeckRoom1,
  'oceanfront-deck-room-2.webp': oceanfrontDeckRoom2,
  'oceanfront-deck-room-3.webp': oceanfrontDeckRoom3,
  'oceanfront-deck-room-4.webp': oceanfrontDeckRoom4,
  'oceanfront-deck-room-5.webp': oceanfrontDeckRoom5,
  'oceanfront-deck-room-6.webp': oceanfrontDeckRoom6,
  'oceanfront-deck-room-7.webp': oceanfrontDeckRoom7,
  'pool-side-balcony-room-1.webp': poolSideBalconyRoom1,
  'pool-side-balcony-room-2.webp': poolSideBalconyRoom2,
  'pool-side-balcony-room-3.webp': poolSideBalconyRoom3,
  'pool-side-balcony-room-4.webp': poolSideBalconyRoom4,
  'pool-side-balcony-room-5.webp': poolSideBalconyRoom5,
  'pool-villa-1.webp': poolVilla1,
  'pool-villa-2.webp': poolVilla2,
  'pool-villa-3.webp': poolVilla3,
  'pool-villa-4.webp': poolVilla4,
}

const roomImageOrderOverrides = {
  'barkada-oceanfront-deck': [
    'barkada-oceanfront-deck-3.webp',
    'barkada-oceanfront-deck-1.webp',
    'barkada-oceanfront-deck-2.webp',
    'barkada-oceanfront-deck-4.webp',
  ],
  'barkada-poolside-balcony': [
    'barkada-poolside-balcony-3.webp',
    'barkada-poolside-balcony-1.webp',
    'barkada-poolside-balcony-2.webp',
  ],
  'oceanfront-deck-room': [
    'oceanfront-deck-room-2.webp',
    'oceanfront-deck-room-1.webp',
    'oceanfront-deck-room-3.webp',
    'oceanfront-deck-room-4.webp',
    'oceanfront-deck-room-5.webp',
    'oceanfront-deck-room-6.webp',
    'oceanfront-deck-room-7.webp',
  ],
}

export { rooms }

export function roomImageUrl(file) {
  return roomImageOverrides[file] ?? verifiedRoomImageUrl(file)
}

export function roomImageFiles(room) {
  const preferredOrder = roomImageOrderOverrides[room.slug]
  if (!preferredOrder) return room.images

  const available = new Set(room.images)
  const preferred = preferredOrder.filter((file) => available.has(file))
  const remaining = room.images.filter((file) => !preferredOrder.includes(file))
  return [...preferred, ...remaining]
}

export function roomHeroImageUrl(room) {
  const [heroFile] = roomImageFiles(room)
  return heroFile ? roomImageUrl(heroFile) : null
}

export function roomImageSourceLabel(file) {
  return roomImageOverrides[file]
    ? 'Room view'
    : 'Verified property photograph'
}
