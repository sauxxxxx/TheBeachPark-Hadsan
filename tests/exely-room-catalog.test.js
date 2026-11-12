import assert from 'node:assert/strict'
import test from 'node:test'
import { getExelyRoomCatalog } from '../src/services/exelyRoomCatalog.js'
import { getBookingHref } from '../src/services/exely.js'

const image = (room, id) => ({ url: `https://cdn.behopenapi.com/resource/images/rt/${room}/${id}` })
const hotel = (roomTypes) => ({
  hotels: [{ code: 507010, room_types: roomTypes.map((room) => ({ name: 'Room', ...room })) }],
})

test('maps the latest published photo order by room ID', async (t) => {
  const first = image(5063293, 'first-photo')
  const second = image(5063293, 'second-photo')
  const mock = t.mock.method(globalThis, 'fetch', async () => Response.json(hotel([
    { code: 5063293, name: 'Renamed Room', images: [first, second] },
  ])))
  const signal = new AbortController().signal
  const [initial] = await getExelyRoomCatalog({ signal })
  assert.equal(initial.slug, 'double-room')
  assert.deepEqual(initial.photos.map(({ src }) => src), [first.url, second.url])
  assert.equal(initial.photos[0].thumbnail,
    'https://cdn.behopenapi.com/resource/thumb/800x500/rt/5063293/first-photo')
  const [url, options] = mock.mock.calls[0].arguments
  assert.equal(url.searchParams.get('hotels[0].code'), '507010')
  assert.deepEqual(options, { cache: 'no-cache', signal })

  mock.mock.mockImplementation(async () => Response.json(hotel([
    { code: 5063293, images: [second] },
  ])))
  const [updated] = await getExelyRoomCatalog()
  assert.deepEqual(updated.photos.map(({ src }) => src), [second.url])
})

test('keeps known bathroom photos available without using them as covers', async (t) => {
  const lagoonBathroom = image(5075191, '639300769823622978-49ea6836-4791-40cc-ae4c-e197c217004c')
  const lagoonBedroom = image(5075191, '639300769841582830-e5a69ccf-f968-45ad-8a7f-a509232fc345')
  const balcony = image(5075191, 'balcony')
  const doubleBathroom = image(5063293, '639300768302597908-b4f31dbc-8f77-44db-bd21-836b63e285c7')
  t.mock.method(globalThis, 'fetch', async () => Response.json(hotel([
    { code: 5075191, images: [lagoonBathroom, balcony, lagoonBedroom] },
    { code: 5063293, images: [doubleBathroom] },
  ])))

  const [lagoon, double] = await getExelyRoomCatalog()
  assert.deepEqual(lagoon.photos.map(({ src }) => src), [
    lagoonBedroom.url, balcony.url, lagoonBathroom.url,
  ])
  assert.equal(lagoon.photos[2].canBeCover, false)
  assert.equal(double.photos[0].canBeCover, false)
})

test('distinguishes a published empty gallery from unavailable or malformed room photos', async (t) => {
  const valid = image(5063293, 'photo')
  t.mock.method(globalThis, 'fetch', async () => Response.json(hotel([
    { code: 5063293, images: [valid, valid, image(5075191, 'wrong-room'), { url: 'https://example.com/photo' }] },
    { code: 5063702, images: [] },
    { code: 5075191, images: [{ url: 'https://example.com/photo' }] },
    { code: 5077224 },
  ])))

  const [double, deluxe, lagoon, oceanfront] = await getExelyRoomCatalog()
  assert.deepEqual(double.photos.map(({ src }) => src), [valid.url])
  assert.deepEqual(deluxe.photos, [])
  assert.equal(lagoon.photos, undefined)
  assert.equal(oceanfront.photos, undefined)
})

test('publishes new rooms with stable links and excludes invalid or operational room entries', async (t) => {
  const mock = t.mock.method(globalThis, 'fetch', async () => Response.json(hotel([
    { code: 5063293, name: 'Double Room' },
    { code: '5099999', name: ' Family Loft ', description: ' Ocean view. ', max_occupancy: 5,
      size: { value: 32, unit: 'square_metre' }, amenities: [{ kind: 'possible_with_pets' }],
      images: [image(5099999, 'loft')] },
    { code: 5099999, name: 'Duplicate' },
    { code: 5099998, name: ' BUFFER ROOM ', images: [] },
    { code: 5099997, name: ' ' },
    { code: 'not-a-room-id', name: 'Invalid' },
  ])))
  const [existing, added] = await getExelyRoomCatalog()
  assert.equal(existing.slug, 'double-room')
  assert.deepEqual(added, {
    id: '5099999',
    slug: 'room-5099999',
    name: 'Family Loft',
    description: 'Ocean view.',
    maxOccupancy: 5,
    size: { value: 32, unit: 'square_metre' },
    petsAllowed: true,
    photos: [{
      src: image(5099999, 'loft').url,
      thumbnail: 'https://cdn.behopenapi.com/resource/thumb/800x500/rt/5099999/loft',
      canBeCover: true,
      sourceLabel: 'Property photograph',
    }],
  })
  assert.equal(getBookingHref({ roomType: added.id }), '/booking/?room-type=5099999')
  assert.deepEqual((await getExelyRoomCatalog()).map(({ id }) => id), ['5063293', '5099999'])

  mock.mock.mockImplementation(async () => Response.json(hotel([
    { code: 5099999, name: 'Renamed Family Loft', images: [] },
  ])))
  const [renamed] = await getExelyRoomCatalog()
  assert.equal(renamed.slug, added.slug)
  assert.equal(renamed.name, 'Renamed Family Loft')
  assert.deepEqual(renamed.photos, [])
})

test('rejects failed requests and unusable provider responses so the page can retain its fallback', async (t) => {
  const mock = t.mock.method(globalThis, 'fetch', async () => Response.json({}, { status: 503 }))
  await assert.rejects(getExelyRoomCatalog(), /503/)
  mock.mock.mockImplementation(async () => Response.json({ hotels: [{ code: 1, room_types: [{}] }] }))
  await assert.rejects(getExelyRoomCatalog(), /missing room types/)
})
