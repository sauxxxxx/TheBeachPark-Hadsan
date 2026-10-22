import { createHash } from 'node:crypto'

// Approve the complete wording as well as the source. If a guest edits their
// review, it must be checked again before it can appear as a featured review.
const approvedReviews = new Map([
  [
    // Evelyn Vilbar — verified positive, five-star Google review.
    'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT21RNVl6WlBVa1U0VFhWNlZWa3plR0YxT0ZZMGEzYxAB!2m1!1s0x33a990b6506606b7:0xf2e0a1870f2cd598',
    '978b351e23790e942c91b9ee6bc271a7b2767ad0758c715f57ebd22de55c46fb',
  ],
])

export function selectFeaturedReviews(reviews = []) {
  return reviews.filter((review) => {
    if (![4, 5].includes(review.rating) || !review.text?.trim()) return false

    const approvedTextHash = approvedReviews.get(review.googleMapsUrl)
    if (!approvedTextHash) return false

    const currentTextHash = createHash('sha256').update(review.text).digest('hex')
    return currentTextHash === approvedTextHash
  }).slice(0, 5)
}
