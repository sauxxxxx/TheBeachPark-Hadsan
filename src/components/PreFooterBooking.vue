<script setup>
import sunsetShore from '../assets/images/gallery/sunset-shore.jpg'
import BookingEnquiryBar from './shared/BookingEnquiryBar.vue'
</script>

<template>
  <section class="prefooter-booking" aria-labelledby="prefooter-booking-title">
    <div class="prefooter-booking__scene">
      <img
        class="prefooter-booking__image"
        :src="sunsetShore"
        alt="Sunset over the water at The Beach Park Hadsan"
        width="1280"
        height="1024"
        loading="lazy"
        decoding="async"
      />
      <div class="prefooter-booking__wash" aria-hidden="true"></div>
    </div>
    <div class="prefooter-booking__content">
      <h2 id="prefooter-booking-title">Your beach day awaits.</h2>
      <BookingEnquiryBar />
    </div>
  </section>
</template>
