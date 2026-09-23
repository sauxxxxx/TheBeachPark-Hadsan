<script setup>
defineProps({
  title: { type: String, default: 'Good to know' },
  items: { type: Array, required: true },
})
</script>

<template>
  <section class="disclosures page-shell">
    <h2>{{ title }}</h2>
    <div>
      <details v-for="item in items" :key="item.question">
        <summary>{{ item.question }} <span aria-hidden="true">+</span></summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
