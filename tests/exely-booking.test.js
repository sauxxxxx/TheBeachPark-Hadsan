import assert from 'node:assert/strict'
import test from 'node:test'
import { getBookingHref, getOfferBookingTarget, exelyConfig } from '../src/services/exely.js'
import { roomTypeIds, offerIds } from '../src/data/exelyIntegration.js'

test('uses the installed engine on the first-party booking page', () => {
  assert.equal(exelyConfig.propertyId, '507010')
  assert.equal(exelyConfig.mode, 'embedded')
  assert.equal(getBookingHref(), '/booking/')
})

test('maps all 13 supplied room types and the three supplied offers', () => {
  assert.equal(Object.keys(roomTypeIds).length, 13)
  assert.equal(Object.keys(offerIds).length, 3)
  assert.equal(getBookingHref({ roomType: 'beach-side-room' }), '/booking/?room-type=5040728')
  assert.equal(getBookingHref({ roomType: 'pool-villa' }), '/booking/?room-type=5056697')
  assert.equal(getBookingHref({ roomType: 'oceanfront-deck-deluxe' }), '/booking/?room-type=5077224')
  assert.equal(getOfferBookingTarget('book-now-stay-later'), '/booking/?special-offer=10167951')
  assert.equal(getOfferBookingTarget('best-available-rate'), '/booking/?special-offer=10124715')
})

test('preserves dates, guests, children ages and promo codes alongside room and offer filters', () => {
  const href = getBookingHref({
    query: { date: '2026-11-15', nights: '3', adults: '2,1', 'children-age': '10;2,7', 'access-code': 'FAMILY & FRIENDS' },
    roomType: 'beach-house-room', offerId: '10167951',
  })
  const params = new URL(href, 'https://example.com').searchParams
  assert.equal(params.get('date'), '2026-11-15')
  assert.equal(params.get('nights'), '3')
  assert.equal(params.get('adults'), '2,1')
  assert.equal(params.get('children-age'), '10;2,7')
  assert.equal(params.get('access-code'), 'FAMILY & FRIENDS')
  assert.equal(params.get('room-type'), '5056626')
  assert.equal(params.get('special-offer'), '10167951')
})

test('explicit room selection replaces an earlier filter and drops unrelated query parameters', () => {
  const href = getBookingHref({
    query: { 'room-type': '5040728', next: 'https://example.com', nights: ['2', '3'], date: null },
    roomType: 'pool-villa',
  })
  assert.equal(href, '/booking/?room-type=5056697')
  assert.equal(getBookingHref({ roomType: 'unknown-room', offerId: 'unlisted-offer' }), '/booking/')
})
