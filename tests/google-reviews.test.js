import assert from 'node:assert/strict'
import test from 'node:test'
import { selectFeaturedReviews } from '../server/reviews/selectFeaturedReviews.js'

const approvedReview = {
  author: 'Evelyn Vilbar',
  rating: 5,
  text: 'We had so much fun here! The place is very accessible if you are staying around Mactan or Lapu-Lapu. The beach is clean and safe for kids. They have AC rooms for day-use and will give you discounted price for entrance if you get an AC room. The AC was working which allowed yung kids na kasama namen na magnap. They also have barbecue place! Kayak was so much fun too! We loved our stay! 🌊🥰🫶',
  googleMapsUrl: 'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT21RNVl6WlBVa1U0VFhWNlZWa3plR0YxT0ZZMGEzYxAB!2m1!1s0x33a990b6506606b7:0xf2e0a1870f2cd598',
}

test('features checked positive reviews without changing their content or attribution', () => {
  const result = selectFeaturedReviews([approvedReview])
  assert.deepEqual(result, [approvedReview])
  assert.equal(result[0], approvedReview)
})

test('only permits four- and five-star ratings, even for an approved source', () => {
  for (const rating of [0, 1, 2, 3, 6, NaN]) {
    assert.deepEqual(selectFeaturedReviews([{ ...approvedReview, rating }]), [])
  }
  assert.equal(selectFeaturedReviews([{ ...approvedReview, rating: 4 }]).length, 1)
})

test('a high rating does not automatically approve mixed or unreviewed comments', () => {
  const mixedReview = {
    rating: 5,
    googleMapsUrl: 'https://www.google.com/maps/reviews/unapproved',
    text: 'Great for family, but the room needs repair and there were brownouts.',
  }
  assert.deepEqual(selectFeaturedReviews([mixedReview, approvedReview]), [approvedReview])
})

test('requires another check if an approved guest changes their wording', () => {
  const editedReview = { ...approvedReview, text: 'Our latest visit was disappointing.' }
  assert.deepEqual(selectFeaturedReviews([editedReview]), [])
})

test('does not reuse approved wording from a different source', () => {
  const copiedReview = { ...approvedReview, googleMapsUrl: 'https://example.com/review' }
  assert.deepEqual(selectFeaturedReviews([copiedReview]), [])
})

test('returns no featured reviews when the feed has no eligible comments', () => {
  assert.deepEqual(selectFeaturedReviews(), [])
  for (const text of ['', '   ', undefined]) {
    assert.deepEqual(selectFeaturedReviews([{ ...approvedReview, text }]), [])
  }
})
