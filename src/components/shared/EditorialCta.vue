<script setup>
import BookingLink from './BookingLink.vue'

defineProps({
  eyebrow: { type: String, default: 'Your Beach Park day' },
  title: { type: String, required: true },
  copy: { type: String, required: true },
  secondaryLabel: { type: String, default: 'Plan your beach day' },
  secondaryTo: { type: String, default: '/experiences/' },
  context: { type: String, default: 'editorial_cta' },
})
</script>

<template>
  <section class="editorial-cta">
    <div class="page-shell editorial-cta__inner">
      <div>
        <h2>{{ title }}</h2>
      </div>
      <div>
        <p>{{ copy }}</p>
        <div class="button-row">
          <BookingLink :context="context" />
          <RouterLink class="button button--outline" :to="secondaryTo">{{ secondaryLabel }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
