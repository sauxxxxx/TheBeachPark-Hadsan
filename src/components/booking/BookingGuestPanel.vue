<script setup>
import { ref, useId } from 'vue'
import BookingGuests from './BookingGuests.vue'
import BookingSearchPanel from './BookingSearchPanel.vue'
import { useBookingSearch } from '../../composables/useBookingSearch.js'

defineProps({ anchor: { type: Object, required: true } })
const emit = defineEmits(['close', 'done'])
const { selection, changeChildren } = useBookingSearch()
const id = useId()
const error = ref('')

function done() {
  if (selection.children.some((age) => age === '')) error.value = 'Choose an age for each child.'
  else emit('done')
}
</script>

<template>
  <BookingSearchPanel label="Your guests" :anchor="anchor" @close="emit('close')">
    <BookingGuests :id="id" :adults="selection.adults" :children="selection.children" @update:adults="selection.adults = $event" @change-children="changeChildren" @update-age="(index, age) => selection.children[index] = age" @done="done" />
    <p v-if="error" class="booking-enquiry__error" role="alert">{{ error }}</p>
  </BookingSearchPanel>
</template>
