<script setup>
import { getGuestReviewsUrl } from '../../services/exely.js'
import { useStayReviews } from '../../composables/useStayReviews.js'

const { review, reviews, index, move } = useStayReviews()
</script>

<template>
  <section id="guest-reviews" class="stay-guest-reviews page-shell" aria-labelledby="stay-reviews-title">
    <div class="stay-guest-reviews__intro">
      <p class="stay-guest-reviews__eyebrow">Guest experiences</p>
      <h2 id="stay-reviews-title">A few words from<br />our guests.</h2>
      <a class="button" :href="getGuestReviewsUrl()" target="_blank" rel="noopener noreferrer">
        Read guest reviews <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
    <div v-if="review" class="stay-guest-reviews__carousel" role="group" aria-roledescription="carousel" aria-label="Selected positive Google guest reviews" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
      <div aria-live="polite" aria-atomic="true">
        <figure :key="review.id" class="stay-guest-reviews__quote">
          <div class="stay-guest-reviews__stars"><span aria-hidden="true">{{ '★'.repeat(review.rating) }}</span><span class="sr-only">{{ review.rating }} out of 5 stars</span></div>
          <blockquote>{{ review.text }}</blockquote>
          <figcaption>
            <a :href="review.authorUrl" target="_blank" rel="noopener noreferrer">{{ review.author }}</a>
            <a class="stay-guest-reviews__source" :href="review.googleMapsUrl" target="_blank" rel="noopener noreferrer">Google review <span class="sr-only">(opens in a new tab)</span></a>
          </figcaption>
        </figure>
        <span class="sr-only">Review {{ index + 1 }} of {{ reviews.length }}</span>
      </div>
      <div v-if="reviews.length > 1" class="stay-guest-reviews__controls" aria-label="Browse guest reviews">
        <button type="button" aria-label="Previous guest review" @click="move(-1)">←</button>
        <button type="button" aria-label="Next guest review" @click="move(1)">→</button>
      </div>
    </div>
    <p v-else class="stay-guest-reviews__empty">Discover guest experiences in our full reviews.</p>
  </section>
</template>
