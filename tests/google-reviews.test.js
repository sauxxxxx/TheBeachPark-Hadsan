import assert from 'node:assert/strict'
import test from 'node:test'
import { featuredReviews } from '../server/reviews/featuredReviews.js'
import { selectFeaturedReviews } from '../server/reviews/selectFeaturedReviews.js'

const approvedReview = featuredReviews[0]
const containsReview = (reviews, id) => reviews.some((review) => review.id === id)

test('keeps five checked reviews when Google returns an empty or different batch', () => {
  assert.equal(selectFeaturedReviews().length, 5)
  assert.equal(selectFeaturedReviews([]).length, 5)
  assert.equal(selectFeaturedReviews([{ id: 'unapproved', rating: 1, text: 'Poor.' }]).length, 5)
})

test('every featured review has a positive rating, original attribution and an individual source', () => {
  assert.equal(new Set(featuredReviews.map((review) => review.id)).size, 5)
  for (const review of featuredReviews) {
    assert.ok([4, 5].includes(review.rating))
    assert.ok(review.text.trim())
    assert.match(review.authorUrl, /^https:\/\/www\.google\.com\/maps\/contrib\//)
    assert.match(review.authorPhotoUrl, /^https:\/\/lh3\.googleusercontent\.com\//)
    assert.match(review.googleMapsUrl, /^https:\/\/(www\.google\.com\/maps\/reviews\/|maps\.app\.goo\.gl\/)/)
    assert.equal(review.published, '')
  }
})

test('refreshes current metadata without losing other checked reviews', () => {
  const current = { ...approvedReview, published: '5 months ago', authorPhotoUrl: 'updated-avatar' }
  const result = selectFeaturedReviews([current])
  assert.equal(result.length, 5)
  assert.deepEqual(result[0], current)
  assert.equal(result[1].author, 'Aldrin Solayao')
})

test('matches the existing Google API source URL when a review has no explicit ID', () => {
  const { id, ...current } = approvedReview
  const result = selectFeaturedReviews([{ ...current, published: 'Latest metadata' }])
  assert.equal(result[0].id, id)
  assert.equal(result[0].published, 'Latest metadata')
})

test('removes a checked review if its current rating drops below four', () => {
  for (const rating of [0, 1, 2, 3, 6, NaN]) {
    const result = selectFeaturedReviews([{ ...approvedReview, rating }])
    assert.equal(result.length, 4)
    assert.equal(containsReview(result, approvedReview.id), false)
  }
  assert.equal(selectFeaturedReviews([{ ...approvedReview, rating: 4 }]).length, 5)
})

test('does not automatically feature an unreviewed five-star comment', () => {
  const mixedReview = {
    id: 'unapproved', rating: 5,
    text: 'Great for family, but the room needs repair and there were brownouts.',
  }
  assert.equal(containsReview(selectFeaturedReviews([mixedReview]), mixedReview.id), false)
})

test('requires another check when a known guest changes or removes their wording', () => {
  for (const text of ['Our latest visit was disappointing.', '', '   ', undefined]) {
    const result = selectFeaturedReviews([{ ...approvedReview, text }])
    assert.equal(result.length, 4)
    assert.equal(containsReview(result, approvedReview.id), false)
  }
})

test('does not mutate the catalogue or expose its records to mutation by consumers', () => {
  const before = structuredClone(featuredReviews)
  const result = selectFeaturedReviews()
  result[0].text = 'Changed by a consumer'
  assert.deepEqual(featuredReviews, before)
})
