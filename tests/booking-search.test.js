import assert from 'node:assert/strict'
import test from 'node:test'
import { addDays, bookingSearchFromQuery, bookingSearchQuery, dateNumber, nightsBetween, normalizeBookingSearch, todayInManila, validateBookingSearch } from '../src/services/bookingSearch.js'
import { getBookingHref } from '../src/services/exely.js'

const today = '2026-10-27'

test('defaults to the current Philippine date across a UTC day boundary', () => {
  assert.equal(todayInManila(new Date('2026-10-26T17:00:00Z')), today)
  assert.deepEqual(normalizeBookingSearch({}, today), { checkIn: today, checkOut: '2026-10-28', adults: 2, children: [], promoCode: '' })
})

test('rejects impossible dates and calculates nights across months, years and leap days', () => {
  assert.ok(Number.isNaN(dateNumber('2026-02-30')))
  assert.ok(Number.isNaN(dateNumber('2026-2-01')))
  assert.equal(addDays('2028-02-28', 2), '2028-03-01')
  assert.equal(nightsBetween('2026-12-30', '2027-01-02'), 3)
})

test('restores saved searches safely when dates are expired or storage contains invalid values', () => {
  assert.deepEqual(normalizeBookingSearch({ checkIn: '2025-01-01', checkOut: '2025-01-02', adults: -3, children: [7, '', 99] }, today), {
    checkIn: today, checkOut: '2026-10-28', adults: 2, children: [7, '', ''], promoCode: '',
  })
})

test('restores an incoming Exely search including multiple child ages and promo code', () => {
  const selection = bookingSearchFromQuery({ date: '2026-11-15', nights: '3', adults: '3', 'children-age': '7;0', 'access-code': 'FAMILY & FRIENDS' }, today)
  assert.deepEqual(selection, { checkIn: '2026-11-15', checkOut: '2026-11-18', adults: 3, children: [7, 0], promoCode: 'FAMILY & FRIENDS' })
  assert.equal(validateBookingSearch(selection, today), '')
})

test('requires valid dates and an explicit age for every selected child', () => {
  const selection = normalizeBookingSearch({}, today)
  assert.match(validateBookingSearch({ ...selection, checkIn: '2026-10-26' }, today), /check-in/)
  assert.match(validateBookingSearch({ ...selection, checkOut: today }, today), /Check-out/)
  assert.match(validateBookingSearch({ ...selection, children: [7, ''] }, today), /each child/)
})

test('passes the same complete search to general results and a specific room', () => {
  const query = bookingSearchQuery({ checkIn: '2026-11-15', checkOut: '2026-11-18', adults: 3, children: [7, 0], promoCode: '  BEACH & SEA  ' })
  const general = new URL(getBookingHref({ query }), 'https://example.com')
  const room = new URL(getBookingHref({ query, roomType: 'pool-villa' }), 'https://example.com')
  assert.equal(general.searchParams.get('room-type'), null)
  assert.equal(room.searchParams.get('room-type'), '5056697')
  assert.equal(room.searchParams.get('date'), '2026-11-15')
  assert.equal(room.searchParams.get('nights'), '3')
  assert.equal(room.searchParams.get('adults'), '3')
  assert.equal(room.searchParams.get('children-age'), '7;0')
  assert.equal(room.searchParams.get('access-code'), 'BEACH & SEA')
})
