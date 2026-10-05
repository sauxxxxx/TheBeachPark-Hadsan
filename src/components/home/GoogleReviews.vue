<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { property } from '../../data/siteContent'
import { getGoogleReviews } from '../../services/googleReviews'

const reviewsData = ref(null)
const isLoading = ref(true)
const rail = ref(null)
const canGoPrevious = ref(false)
const canGoNext = ref(false)
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

function updateControls() {
  const element = rail.value
  if (!element) return
  canGoPrevious.value = element.scrollLeft > 4
  canGoNext.value = element.scrollLeft < element.scrollWidth - element.clientWidth - 4
}

function move(direction) {
  const element = rail.value
  const firstReview = element?.querySelector('.google-review')
  if (!element || !firstReview) return
  const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0
  element.scrollBy({ left: direction * (firstReview.getBoundingClientRect().width + gap), behavior: 'smooth' })
}

onMounted(async () => {
  try {
    reviewsData.value = await getGoogleReviews({ signal: controller.signal })
  } catch (error) {
    if (error.name !== 'AbortError') console.warn(error.message)
  } finally {
    isLoading.value = false
  }

  await nextTick()
  updateControls()
  window.addEventListener('resize', updateControls)
})

onBeforeUnmount(() => {
  controller.abort()
  window.removeEventListener('resize', updateControls)
})
</script>

<template>
  <section class="google-reviews" aria-labelledby="google-reviews-title">
    <div class="page-shell google-reviews__inner">
      <header class="google-reviews__header" data-reveal>
        <div class="google-reviews__intro">
          <p class="overline">Guest notes</p>
          <h2 id="google-reviews-title" data-lines>In their own words.</h2>
        </div>

        <div v-if="reviewsData?.rating" class="google-reviews__score" :aria-label="ratingLabel">
          <strong>{{ reviewsData.rating.toFixed(1) }}</strong>
          <div>
            <span class="google-reviews__stars" :style="{ '--rating-fill': ratingPercent }" aria-hidden="true">★★★★★</span>
            <small>{{ reviewsData.reviewCount.toLocaleString() }} guest reviews</small>
            <span class="google-reviews__attribution" translate="no">Google Maps</span>
          </div>
        </div>

        <div v-if="reviewsData?.reviews?.length > 1" class="google-reviews__controls" aria-label="Browse guest reviews">
          <button type="button" :disabled="!canGoPrevious" aria-label="Previous reviews" @click="move(-1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" :disabled="!canGoNext" aria-label="Next reviews" @click="move(1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
        </div>
      </header>

      <div v-if="isLoading" class="google-reviews__loading" role="status">
        <span>Loading guest reviews…</span>
      </div>

      <div v-else-if="reviewsData?.reviews?.length" ref="rail" class="google-reviews__list" aria-label="Google Maps guest reviews" data-sequence @scroll.passive="updateControls">
        <article v-for="(review, index) in reviewsData.reviews" :key="`${review.author}-${review.published}`" class="google-review sequence-item">
          <div class="google-review__meta">
            <span class="google-review__number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="google-review__rating">
              <span aria-hidden="true">{{ '★'.repeat(Math.round(review.rating)) }}</span>
              <span class="sr-only">{{ review.rating }} out of 5 stars</span>
            </span>
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
          All reviews on Google Maps <span aria-hidden="true">↗</span>
        </a>
        <p>Reviews are selected and ordered by Google Maps based on relevance.</p>
      </div>
    </div>
  </section>
</template>
