<script setup>
import ExelyWidget from '../components/shared/ExelyWidget.vue'
import { property } from '../data/siteContent'
</script>

<template>
  <section class="exely-booking-page" aria-labelledby="booking-title">
    <header class="exely-booking-page__heading">
      <p class="overline">The Beach Park Hadsan</p>
      <h1 id="booking-title">Book your stay.</h1>
    </header>
    <ExelyWidget type="booking-form" label="Room booking" />
    <footer class="exely-booking-page__help">
      <span>Need a hand with your reservation?</span>
      <a :href="property.phoneHref">{{ property.phone }}</a>
      <RouterLink to="/privacy/">Privacy</RouterLink>
      <RouterLink to="/terms/">Terms</RouterLink>
    </footer>
  </section>
</template>
