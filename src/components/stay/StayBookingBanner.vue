<script setup>
import BookingLink from '../shared/BookingLink.vue'
import beachPhoto from '../../assets/images/real/beach-aerial.webp'
</script>

<template>
  <section class="stay-booking-banner" aria-labelledby="stay-booking-title">
    <img class="stay-booking-banner__photo" :src="beachPhoto" alt="Turquoise water and guests enjoying the shore at The Beach Park Hadsan" width="2560" height="1600" loading="lazy" />
    <div class="stay-booking-banner__wash" aria-hidden="true"></div>
    <div class="stay-booking-banner__inner page-shell">
      <div>
        <h2 id="stay-booking-title">Stay a little longer.</h2>
        <p>Find the room for your next beach day.</p>
      </div>
      <div class="stay-booking-banner__actions">
        <BookingLink label="Check availability ↗" context="stay_footer" variant="light" />
        <RouterLink class="text-link text-link--light" to="/experiences/">Plan your beach day <span aria-hidden="true">↗</span></RouterLink>
      </div>
    </div>
  </section>
</template>
