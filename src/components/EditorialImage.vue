<script setup>
defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  width: { type: Number, default: 1600 },
  height: { type: Number, default: 900 },
  eager: { type: Boolean, default: false },
})
</script>

<template>
  <picture class="editorial-image">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
    />
  </picture>
</template>
