<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { property } from '../data/siteContent'

const route = useRoute()
const isPrivacy = computed(() => route.meta.legal === 'privacy')
</script>

<template>
  <article class="legal-page page-shell">
    <p class="overline">Website information</p>
    <h1>{{ isPrivacy ? 'Privacy policy' : 'Terms & conditions' }}</h1>
    <p class="legal-page__status">The final approved legal text needs confirmation before production launch.</p>
    <template v-if="isPrivacy">
      <h2>Website data</h2><p>This front-end may collect consent preferences and anonymous interaction events. Production analytics must not run until the visitor has granted the relevant consent.</p>
      <h2>Booking data</h2><p>When a visitor continues to the Exely booking experience, reservation, payment, and guest data are handled under the policies shown by the official booking provider.</p>
      <h2>Contact</h2><p>Questions may be sent to <a :href="property.emailHref">{{ property.email }}</a>.</p>
    </template>
    <template v-else>
      <h2>Website content</h2><p>Availability, rates, offers, operational hours, and activity details can change. Confirm current information directly or through the official booking connection.</p>
      <h2>Reservations</h2><p>Booking terms, payment rules, cancellation rules, and refunds are the terms presented through Exely at the time of reservation.</p>
      <h2>Authenticity</h2><p>This website does not guarantee that a proposed or photographed experience is operating at every date and time.</p>
    </template>
  </article>
</template>
