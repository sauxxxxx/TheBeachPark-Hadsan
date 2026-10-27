<script setup>
import { computed, nextTick, ref, useId } from 'vue'
import BookingCalendar from '../booking/BookingCalendar.vue'
import BookingGuestPanel from '../booking/BookingGuestPanel.vue'
import BookingSearchPanel from '../booking/BookingSearchPanel.vue'
import { useBookingSearch } from '../../composables/useBookingSearch.js'
import { addDays, formatBookingDate, validateBookingSearch } from '../../services/bookingSearch.js'
import { getBookingHref } from '../../services/exely.js'
import { trackEvent } from '../../services/analytics.js'

const id = useId()
const { selection, selectDate, query, today } = useBookingSearch()
const activePanel = ref('')
const anchor = ref(null)
const error = ref('')
const guestsButton = ref(null)
const checkoutButton = ref(null)
const promoCode = ref(null)
const showPromo = ref(Boolean(selection.promoCode))
const guestLabel = computed(() => `${selection.adults} ${selection.adults === 1 ? 'adult' : 'adults'}${selection.children.length ? `, ${selection.children.length} ${selection.children.length === 1 ? 'child' : 'children'}` : ''}`)
const panelLabel = computed(() => ({ checkIn: 'Check-in date', checkOut: 'Check-out date', guests: 'Your guests' })[activePanel.value])

function openPanel(name, event) {
  anchor.value = event.currentTarget
  activePanel.value = name
}

async function chooseDate(value) {
  const field = activePanel.value
  selectDate(field, value)
  activePanel.value = ''
  error.value = ''
  if (field === 'checkIn') {
    await nextTick()
    anchor.value = checkoutButton.value
    activePanel.value = 'checkOut'
  }
}

async function togglePromo() {
  showPromo.value = !showPromo.value
  if (!showPromo.value) selection.promoCode = ''
  else { await nextTick(); promoCode.value?.focus() }
}

function submit() {
  error.value = validateBookingSearch(selection)
  if (error.value) {
    if (selection.children.some((age) => age === '')) {
      anchor.value = guestsButton.value
      activePanel.value = 'guests'
    }
    return
  }
  trackEvent('booking_search_submit', { nights: query.value.nights, adults: selection.adults, children: selection.children.length })
  window.location.assign(getBookingHref({ query: query.value }))
}
</script>

<template>
  <form class="booking-enquiry" aria-label="Find a room" @submit.prevent="submit">
    <div class="booking-enquiry__fields">
      <button type="button" class="booking-enquiry__field" :aria-expanded="activePanel === 'checkIn'" aria-haspopup="dialog" @click="openPanel('checkIn', $event)">
        <span class="booking-enquiry__label">Check-in</span><span class="booking-enquiry__value">{{ formatBookingDate(selection.checkIn) }}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 2v6m10-6v6M3 11h18"/></svg>
      </button>
      <button ref="checkoutButton" type="button" class="booking-enquiry__field" :aria-expanded="activePanel === 'checkOut'" aria-haspopup="dialog" @click="openPanel('checkOut', $event)">
        <span class="booking-enquiry__label">Check-out</span><span class="booking-enquiry__value">{{ formatBookingDate(selection.checkOut) }}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M7 2v6m10-6v6M3 11h18"/></svg>
      </button>
      <button ref="guestsButton" type="button" class="booking-enquiry__field" :aria-expanded="activePanel === 'guests'" aria-haspopup="dialog" @click="openPanel('guests', $event)">
        <span class="booking-enquiry__label">Guests</span><span class="booking-enquiry__value">{{ guestLabel }}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></svg>
      </button>
      <button type="submit" class="booking-enquiry__submit">Find a room <span aria-hidden="true">↗</span></button>
    </div>
    <div class="booking-enquiry__extra">
      <span>Find your place by the shore.</span>
      <button type="button" :aria-expanded="showPromo" :aria-controls="`${id}-promo`" @click="togglePromo">{{ showPromo ? 'Remove promo code' : 'Have a promo code?' }}</button>
    </div>
    <div v-if="showPromo" :id="`${id}-promo`" class="booking-enquiry__promo"><label :for="`${id}-promo-input`">Promo code</label><input :id="`${id}-promo-input`" ref="promoCode" v-model="selection.promoCode" type="text" maxlength="80" autocomplete="off" placeholder="Enter your code" /></div>
    <p v-if="error" class="booking-enquiry__error" role="alert">{{ error }}</p>
    <BookingGuestPanel v-if="activePanel === 'guests'" :anchor="anchor" @close="activePanel = ''" @done="activePanel = ''; error = ''" />
    <BookingSearchPanel v-else-if="activePanel" :key="activePanel" :label="panelLabel" :anchor="anchor" @close="activePanel = ''">
      <BookingCalendar :label="panelLabel" :model-value="selection[activePanel]" :min="activePanel === 'checkOut' ? addDays(selection.checkIn, 1) : today()" @select="chooseDate" />
    </BookingSearchPanel>
  </form>
</template>
