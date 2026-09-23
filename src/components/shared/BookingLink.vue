<script setup>
import { computed } from 'vue'
import { exelyConfig } from '../../services/exely'
import { trackEvent } from '../../services/analytics'

const props = defineProps({
  label: { type: String, default: 'Book your stay' },
  context: { type: String, default: 'general' },
  variant: { type: String, default: '' },
})

const classes = computed(() => ['button', props.variant && `button--${props.variant}`])

function trackBooking() {
  trackEvent('booking_cta_click', { context: props.context, destination: 'booking_route', exely_configured: exelyConfig.isConfigured })
}
</script>

<template>
  <RouterLink :class="classes" to="/booking/" @click="trackBooking">{{ label }}</RouterLink>
</template>
