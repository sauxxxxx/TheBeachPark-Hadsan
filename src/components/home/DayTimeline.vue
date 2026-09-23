<script setup>
import { computed, ref } from 'vue'
import sunsetImage from '../../assets/images/real/beach-day.webp'
import EditorialImage from '../EditorialImage.vue'
import { dayStops } from '../../data/homeContent'
import { trackEvent } from '../../services/analytics'
import BookingLink from '../shared/BookingLink.vue'

const selectedIds = ref([])
const selectedStops = computed(() => dayStops.filter((stop) => selectedIds.value.includes(stop.id)))

function toggleStop(id) {
  const selected = !selectedIds.value.includes(id)
  selectedIds.value = selectedIds.value.includes(id)
    ? selectedIds.value.filter((selectedId) => selectedId !== id)
    : [...selectedIds.value, id]
  trackEvent('itinerary_selection', { item: id, selected })
}

function resetDay() {
  selectedIds.value = []
  trackEvent('itinerary_reset')
}
</script>

<template>
  <section id="day-plan" class="day-timeline">
    <EditorialImage :src="sunsetImage" alt="A real beach day at The Beach Park" :width="2560" :height="1600" data-parallax="0.14" />
    <div class="day-timeline__wash" aria-hidden="true"></div>
    <div class="day-timeline__inner page-shell">
      <div class="day-timeline__intro">
        <h2 data-lines>Make it yours.</h2>
        <p>Choose your moments. We’ll set the order.</p>
      </div>
      <ol aria-label="Suggested Beach Park experiences" data-sequence>
        <li v-for="stop in dayStops" :key="stop.time">
          <button type="button" :aria-pressed="selectedIds.includes(stop.id)" @click="toggleStop(stop.id)">
            <span class="day-timeline__check" aria-hidden="true">{{ selectedIds.includes(stop.id) ? 'Added' : 'Add' }}</span>
            <strong>{{ stop.time }}</strong>
            <span>{{ stop.label }}</span>
          </button>
        </li>
      </ol>
      <div class="day-summary" aria-live="polite">
        <div>
          <strong>{{ selectedStops.length ? `${selectedStops.length} ${selectedStops.length === 1 ? 'stop' : 'stops'} selected` : 'Your day is open' }}</strong>
          <p v-if="selectedStops.length">{{ selectedStops.map((stop) => stop.label).join(' → ') }}</p>
          <p v-else>Choose a stop to begin.</p>
          <small>Hours and availability require confirmation.</small>
        </div>
        <div class="day-summary__actions">
          <button class="text-button" type="button" :disabled="!selectedStops.length" @click="resetDay">Reset</button>
          <BookingLink label="Stay overnight" context="day_planner" variant="small" />
        </div>
      </div>
    </div>
  </section>
</template>
