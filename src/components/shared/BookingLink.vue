<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { exelyConfig, getBookingHref } from '../../services/exely'
import { trackEvent } from '../../services/analytics'

const props = defineProps({
  label: { type: String, default: 'Book your stay' },
  context: { type: String, default: 'general' },
  variant: { type: String, default: '' },
  to: { type: [String, Object], default: '/booking/' },
  roomType: { type: String, default: '' },
  offerId: { type: String, default: '' },
})

const route = useRoute()
const router = useRouter()
const classes = computed(() => ['button', props.variant && `button--${props.variant}`])
const destination = computed(() => {
  const target = router.resolve(props.to)
  return getBookingHref({
    query: { ...route.query, ...target.query },
    roomType: props.roomType,
    offerId: props.offerId,
  })
})

function trackBooking() {
  trackEvent('booking_cta_click', { context: props.context, destination: 'booking_route', exely_configured: exelyConfig.isConfigured })
}
</script>

<template>
  <!-- A document navigation gives the reservation engine its complete query
       string before initialization, including dates, room and offer filters. -->
  <a :class="classes" :href="destination" @click="trackBooking">{{ label }}</a>
</template>
