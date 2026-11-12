import assert from 'node:assert/strict'
import test from 'node:test'
import { getExelyRoomPhotos } from '../src/services/exelyRoomPhotos.js'

const image = (room, id) => ({ url: `https://cdn.behopenapi.com/resource/images/rt/${room}/${id}` })
const hotel = (roomTypes) => ({ hotels: [{ code: 507010, room_types: roomTypes }] })

test('maps the latest published photo order by room ID', async (t) => {
  const first = image(5063293, 'first-photo')
  const second = image(5063293, 'second-photo')
  const mock = t.mock.method(globalThis, 'fetch', async () => Response.json(hotel([
    { code: 5063293, name: 'Renamed Room', images: [first, second] },
  ])))
  const signal = new AbortController().signal
  const initial = await getExelyRoomPhotos({ signal })
  assert.deepEqual(initial['double-room'].map(({ src }) => src), [first.url, second.url])
  assert.equal(initial['double-room'][0].thumbnail,
    'https://cdn.behopenapi.com/resource/thumb/800x500/rt/5063293/first-photo')
  const [url, options] = mock.mock.calls[0].arguments
  assert.equal(url.searchParams.get('hotels[0].code'), '507010')
  assert.deepEqual(options, { cache: 'no-cache', signal })

  mock.mock.mockImplementation(async () => Response.json(hotel([
    { code: 5063293, images: [second] },
  ])))
  const updated = await getExelyRoomPhotos()
  assert.deepEqual(updated['double-room'].map(({ src }) => src), [second.url])
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

  const rooms = await getExelyRoomPhotos()
  assert.deepEqual(rooms['lagoon-room'].map(({ src }) => src), [
    lagoonBedroom.url, balcony.url, lagoonBathroom.url,
  ])
  assert.equal(rooms['lagoon-room'][2].canBeCover, false)
  assert.equal(rooms['double-room'][0].canBeCover, false)
})

test('distinguishes a published empty gallery from unavailable or malformed room photos', async (t) => {
  const valid = image(5063293, 'photo')
  t.mock.method(globalThis, 'fetch', async () => Response.json(hotel([
    { code: 5063293, images: [valid, valid, image(5075191, 'wrong-room'), { url: 'https://example.com/photo' }] },
    { code: 5063702, images: [] },
    { code: 5075191, images: [{ url: 'https://example.com/photo' }] },
    { code: 5077224 },
  ])))

  const rooms = await getExelyRoomPhotos()
  assert.deepEqual(Object.keys(rooms), ['double-room', 'double-deluxe'])
  assert.deepEqual(rooms['double-room'].map(({ src }) => src), [valid.url])
  assert.deepEqual(rooms['double-deluxe'], [])
})

test('rejects failed requests and unusable provider responses so the page can retain its fallback', async (t) => {
  const mock = t.mock.method(globalThis, 'fetch', async () => Response.json({}, { status: 503 }))
  await assert.rejects(getExelyRoomPhotos(), /503/)
  mock.mock.mockImplementation(async () => Response.json({ hotels: [{ code: 1, room_types: [{}] }] }))
  await assert.rejects(getExelyRoomPhotos(), /missing room types/)
})
