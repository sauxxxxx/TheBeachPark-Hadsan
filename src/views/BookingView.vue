<script setup>
import { exelyConfig } from '../services/exely'
import { property } from '../data/siteContent'
import { trackEvent } from '../services/analytics'
</script>

<template>
  <section class="booking-view">
    <div class="booking-view__inner">
      <p class="eyebrow">Exely booking engine</p>
      <h1>Book your stay.</h1>
      <p>Current availability, room rates, reservation terms, and booking data remain with Exely for property <strong>{{ property.exelyPropertyId }}</strong>.</p>
      <div v-if="exelyConfig.isConfigured" class="integration-placeholder">
        <span>Official booking connection</span>
        <strong>Continue to current availability and rates.</strong>
        <a class="button" :href="exelyConfig.bookingUrl" rel="noopener" @click="trackEvent('exely_booking_open', { property_id: property.exelyPropertyId })">Open secure booking</a>
      </div>
      <div v-else class="integration-placeholder">
        <span>Connection pending</span>
        <strong>The official Exely custom-site package still needs to be installed.</strong>
        <small>No replacement form or simulated booking engine is shown. Until the production connection is configured, please contact reservations directly.</small>
        <div class="button-row"><a class="button" :href="property.phoneHref">Call reservations</a><a class="button button--outline" :href="property.emailHref">Email the team</a></div>
      </div>
      <RouterLink class="text-link" to="/">← Return to the website</RouterLink>
    </div>
  </section>
</template>
