import assert from 'node:assert/strict'
import test from 'node:test'
import { GET } from '../api/google-reviews.js'
import { featuredReviews } from '../server/reviews/featuredReviews.js'

function configureApi(t, key) {
  const previousKey = process.env.GOOGLE_PLACES_API_KEY
  if (key) process.env.GOOGLE_PLACES_API_KEY = key
  else delete process.env.GOOGLE_PLACES_API_KEY
  t.after(() => {
    if (previousKey === undefined) delete process.env.GOOGLE_PLACES_API_KEY
    else process.env.GOOGLE_PLACES_API_KEY = previousKey
  })
  t.mock.method(console, 'error', () => {})
}

async function assertFeaturedResponse(response) {
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('cache-control'), 'private, no-store')
  const body = await response.json()
  assert.equal(body.reviews.length, 5)
  assert.equal(body.selectionCheckedAt, '2026-10-22')
  return body
}

test('serves the checked catalogue without a Google API key or an external request', async (t) => {
  configureApi(t)
  const fetchMock = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected fetch') })
  const body = await assertFeaturedResponse(await GET())
  assert.equal(fetchMock.mock.callCount(), 0)
  assert.deepEqual(body.reviews, featuredReviews)
  assert.equal(body.rating, undefined)
  assert.equal(body.reviewCount, undefined)
})

test('retains five reviews during Google errors, timeouts or an empty place response', async (t) => {
  configureApi(t, 'test-only-key')
  const fetchMock = t.mock.method(globalThis, 'fetch')
  for (const response of [
    () => Response.json({}, { status: 503 }),
    () => { throw new DOMException('Request timed out', 'TimeoutError') },
    () => Response.json({ places: [] }),
  ]) {
    fetchMock.mock.mockImplementation(response)
    await assertFeaturedResponse(await GET())
  }
})

test('a live batch with just one approved review still produces five featured reviews', async (t) => {
  configureApi(t, 'test-only-key')
  const approved = featuredReviews[0]
  t.mock.method(globalThis, 'fetch', async () => Response.json({ places: [{
    displayName: { text: 'The Beach Park-Hadsan' },
    rating: 3.8,
    userRatingCount: 1002,
    googleMapsUri: 'https://www.google.com/maps?cid=17501165753409000856',
    reviews: [
      {
        name: `places/property/reviews/${approved.id}`,
        authorAttribution: { displayName: approved.author, uri: approved.authorUrl, photoUri: approved.authorPhotoUrl },
        rating: 5,
        relativePublishTimeDescription: '4 months ago',
        text: { text: approved.text, languageCode: 'en' },
        googleMapsUri: approved.googleMapsUrl,
      },
      { name: 'places/property/reviews/negative', rating: 1, text: { text: 'Poor experience.' } },
    ],
  }] }))

  const body = await assertFeaturedResponse(await GET())
  assert.equal(body.rating, 3.8)
  assert.equal(body.reviewCount, 1002)
  assert.equal(body.reviews[0].text, approved.text)
  assert.equal(body.reviews[0].published, '4 months ago')
  assert.equal(body.reviews.some((review) => review.id === 'negative'), false)
})
