import { featuredReviews } from './featuredReviews.js'

const reviewId = (review) => review.id || review.googleMapsUrl?.match(/!1s([^!]+)/)?.[1]

export function selectFeaturedReviews(reviews = []) {
  const currentReviews = new Map(reviews.map((review) => [reviewId(review), review]))

  return featuredReviews.flatMap((approved) => {
    const current = currentReviews.get(approved.id)

    // Google's five-review batch is not the complete list. Keep checked reviews
    // available when they are absent from that batch or the API is unavailable.
    if (!current) return [{ ...approved }]

    // New wording or a lower rating requires another editorial check.
    if (![4, 5].includes(current.rating) || current.text !== approved.text) return []

    return [{ ...approved, ...current, id: approved.id }]
  })
}
