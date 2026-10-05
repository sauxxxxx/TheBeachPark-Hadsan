<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { property } from '../../data/siteContent'
import { getGoogleReviews } from '../../services/googleReviews'

const reviewsData = ref(null)
const isLoading = ref(true)
const controller = new AbortController()

const ratingLabel = computed(() => {
  const rating = reviewsData.value?.rating
  return rating ? `${rating.toFixed(1)} out of 5` : 'Google reviews'
})

const ratingPercent = computed(() => {
  const rating = reviewsData.value?.rating || 0
  return `${Math.min(100, Math.max(0, (rating / 5) * 100))}%`
})

const googleMapsUrl = computed(() => reviewsData.value?.googleMapsUrl || property.googleMapsUrl)

onMounted(async () => {
  try {
    reviewsData.value = await getGoogleReviews({ signal: controller.signal })
  } catch (error) {
    if (error.name !== 'AbortError') console.warn(error.message)
  } finally {
    isLoading.value = false
  }
})

onBeforeUnmount(() => controller.abort())
</script>

<template>
  <section class="google-reviews" aria-labelledby="google-reviews-title">
    <div class="page-shell google-reviews__inner">
      <header class="google-reviews__header" data-reveal>
        <div>
          <p class="overline">Guest notes</p>
          <h2 id="google-reviews-title" data-lines>The days guests remember.</h2>
        </div>

        <div v-if="reviewsData?.rating" class="google-reviews__score" :aria-label="ratingLabel">
          <strong>{{ reviewsData.rating.toFixed(1) }}</strong>
          <div>
            <span class="google-reviews__stars" :style="{ '--rating-fill': ratingPercent }" aria-hidden="true">★★★★★</span>
            <small>Based on {{ reviewsData.reviewCount.toLocaleString() }} Google reviews</small>
            <span class="google-reviews__attribution" translate="no">Google Maps</span>
          </div>
        </div>
      </header>

      <div v-if="isLoading" class="google-reviews__loading" role="status">
        <span>Loading guest reviews…</span>
      </div>

      <div v-else-if="reviewsData?.reviews?.length" class="google-reviews__list" data-sequence>
        <article v-for="review in reviewsData.reviews" :key="`${review.author}-${review.published}`" class="google-review sequence-item">
          <div class="google-review__meta">
            <span aria-hidden="true">{{ '★'.repeat(Math.round(review.rating)) }}</span>
            <span class="sr-only">{{ review.rating }} out of 5 stars</span>
            <small>{{ review.published }}</small>
          </div>
          <blockquote>“{{ review.text }}”</blockquote>
          <footer>
            <a v-if="review.authorUrl" class="google-review__author" :href="review.authorUrl" target="_blank" rel="noopener noreferrer">
              <img v-if="review.authorPhotoUrl" :src="review.authorPhotoUrl" alt="" width="32" height="32" loading="lazy" referrerpolicy="no-referrer" />
              <span>{{ review.author }}</span>
            </a>
            <strong v-else>{{ review.author }}</strong>
            <div class="google-review__links">
              <small v-if="review.translated">Translated</small>
              <a v-if="review.googleMapsUrl" class="google-review__source" :href="review.googleMapsUrl" target="_blank" rel="noopener noreferrer" aria-label="Read this review on Google Maps"><span translate="no">Google Maps</span> ↗</a>
            </div>
          </footer>
        </article>
      </div>

      <div v-else class="google-reviews__fallback" data-reveal>
        <p>See recent guest experiences on our official Google listing.</p>
      </div>

      <div class="google-reviews__closing">
        <a class="google-reviews__all" :href="googleMapsUrl" target="_blank" rel="noopener noreferrer">
          Read all reviews on Google Maps <span aria-hidden="true">↗</span>
        </a>
        <p>Reviews are selected and ordered by Google Maps based on relevance.</p>
      </div>
    </div>
  </section>
</template>
