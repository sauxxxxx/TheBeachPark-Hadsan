<script setup>
import { computed, ref } from 'vue'
import { addDays, dateNumber } from '../../services/bookingSearch.js'

const props = defineProps({ modelValue: { type: String, required: true }, min: { type: String, required: true }, label: { type: String, required: true } })
const emit = defineEmits(['select'])
const visibleMonth = ref(props.modelValue.slice(0, 7))
const title = computed(() => new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${visibleMonth.value}-01T00:00:00Z`)))
const previousDisabled = computed(() => visibleMonth.value <= props.min.slice(0, 7))
const cells = computed(() => {
  const first = `${visibleMonth.value}-01`
  const start = addDays(first, -((new Date(dateNumber(first)).getUTCDay() + 6) % 7))
  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(start, index)
    return { date, day: Number(date.slice(-2)), outside: date.slice(0, 7) !== visibleMonth.value, disabled: date < props.min, label: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeZone: 'UTC' }).format(new Date(dateNumber(date))) }
  })
})

function moveMonth(delta) {
  const date = new Date(`${visibleMonth.value}-01T00:00:00Z`)
  date.setUTCMonth(date.getUTCMonth() + delta)
  visibleMonth.value = date.toISOString().slice(0, 7)
}

function moveFocus(event, date) {
  const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }
  if (!(event.key in offsets)) return
  event.preventDefault()
  const next = addDays(date, offsets[event.key])
  const target = event.currentTarget.parentElement.querySelector(`[data-date="${next}"]`)
  if (target && !target.disabled) target.focus()
}
</script>

<template>
  <div class="booking-calendar">
    <div class="booking-calendar__heading">
      <button type="button" :disabled="previousDisabled" aria-label="Previous month" @click="moveMonth(-1)">←</button>
      <strong aria-live="polite">{{ title }}</strong>
      <button type="button" aria-label="Next month" @click="moveMonth(1)">→</button>
    </div>
    <div class="booking-calendar__week" aria-hidden="true"><span v-for="(day, index) in ['M', 'T', 'W', 'T', 'F', 'S', 'S']" :key="index">{{ day }}</span></div>
    <div class="booking-calendar__days" :aria-label="label">
      <button v-for="cell in cells" :key="cell.date" type="button" :data-date="cell.date" :disabled="cell.disabled" :class="{ 'is-selected': cell.date === modelValue, 'is-outside': cell.outside }" :aria-label="cell.label" :aria-pressed="cell.date === modelValue" @click="emit('select', cell.date)" @keydown="moveFocus($event, cell.date)">{{ cell.day }}</button>
    </div>
  </div>
</template>
