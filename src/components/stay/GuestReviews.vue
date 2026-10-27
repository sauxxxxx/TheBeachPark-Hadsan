<script setup>
import { getGuestReviewsUrl } from '../../services/exely.js'
</script>

<template>
  <section id="guest-reviews" class="stay-guest-reviews page-shell" aria-labelledby="stay-reviews-title">
    <div>
      <h2 id="stay-reviews-title">What our guests say.</h2>
      <p>Read experiences shared by guests of The Beach Park.</p>
    </div>
    <a class="text-link" :href="getGuestReviewsUrl()" target="_blank" rel="noopener noreferrer">
      Read guest reviews <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
    </a>
  </section>
</template>
