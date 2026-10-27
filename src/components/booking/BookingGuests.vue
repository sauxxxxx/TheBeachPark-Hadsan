<script setup>
defineProps({ adults: { type: Number, required: true }, children: { type: Array, required: true }, id: { type: String, required: true } })
defineEmits(['update:adults', 'change-children', 'update-age', 'done'])
</script>

<template>
  <div class="booking-guests">
    <div class="booking-guests__row">
      <div><strong>Adults</strong><small>Ages 12 and above</small></div>
      <div class="booking-stepper">
        <button type="button" aria-label="Remove an adult" :disabled="adults <= 1" @click="$emit('update:adults', adults - 1)">−</button>
        <output aria-live="polite" aria-label="Adults">{{ adults }}</output>
        <button type="button" aria-label="Add an adult" :disabled="adults >= 10" @click="$emit('update:adults', adults + 1)">+</button>
      </div>
    </div>
    <div class="booking-guests__row">
      <div><strong>Children</strong><small>Ages 0–11</small></div>
      <div class="booking-stepper">
        <button type="button" aria-label="Remove a child" :disabled="!children.length" @click="$emit('change-children', -1)">−</button>
        <output aria-live="polite" aria-label="Children">{{ children.length }}</output>
        <button type="button" aria-label="Add a child" :disabled="children.length >= 6" @click="$emit('change-children', 1)">+</button>
      </div>
    </div>
    <div v-if="children.length" class="booking-guests__ages">
      <label v-for="(age, index) in children" :key="index" :for="`${id}-child-${index}`">
        Child {{ index + 1 }} age
        <select :id="`${id}-child-${index}`" :value="age" @change="$emit('update-age', index, $event.target.value === '' ? '' : Number($event.target.value))">
          <option value="" disabled>Select age</option>
          <option v-for="years in 12" :key="years" :value="years - 1">{{ years - 1 === 0 ? 'Under 1' : years - 1 }}</option>
        </select>
      </label>
    </div>
    <button type="button" class="booking-panel__done" @click="$emit('done')">Done</button>
  </div>
</template>
