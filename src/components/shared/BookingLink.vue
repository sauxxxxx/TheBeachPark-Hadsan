<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { exelyConfig, getBookingHref } from '../../services/exely'
import { trackEvent } from '../../services/analytics'
import { useBookingSearch } from '../../composables/useBookingSearch.js'
import BookingGuestPanel from '../booking/BookingGuestPanel.vue'

defineOptions({ inheritAttrs: false })
const emit = defineEmits(['click'])

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
const { linkQuery, selection } = useBookingSearch()
const guestAnchor = ref(null)
const classes = computed(() => ['button', props.variant && `button--${props.variant}`])
const destination = computed(() => {
  const target = router.resolve(props.to)
  return getBookingHref({
    query: { ...linkQuery(route.query), ...target.query },
    roomType: props.roomType,
    offerId: props.offerId,
  })
})

function trackBooking(event) {
  if (selection.children.some((age) => age === '')) {
    event.preventDefault()
    guestAnchor.value = event.currentTarget
    return
  }
  emit('click', event)
  trackEvent('booking_cta_click', { context: props.context, destination: 'booking_route', exely_configured: exelyConfig.isConfigured })
}

function continueBooking() {
  emit('click')
  trackEvent('booking_cta_click', { context: props.context, destination: 'booking_route', exely_configured: exelyConfig.isConfigured })
  window.location.assign(destination.value)
}
</script>

<template>
  <!-- A document navigation gives the reservation engine its complete query
       string before initialization, including dates, room and offer filters. -->
  <a v-bind="$attrs" :class="classes" :href="destination" @click="trackBooking">{{ label }}</a>
  <BookingGuestPanel v-if="guestAnchor" :anchor="guestAnchor" @close="guestAnchor = null" @done="continueBooking" />
</template>
