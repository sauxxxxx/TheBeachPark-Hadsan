<script setup>
import EditorialImage from '../EditorialImage.vue'

defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  lede: { type: String, required: true },
  image: { type: String, default: '' },
  imageAlt: { type: String, default: '' },
  imagePosition: { type: String, default: 'center' },
})
</script>

<template>
  <header class="page-hero" :class="{ 'page-hero--text-only': !image }">
    <div class="page-hero__content page-shell">
      <slot name="brand"></slot>
      <h1 data-lines>{{ title }}</h1>
      <p>{{ lede }}</p>
      <slot></slot>
    </div>
    <div v-if="image" class="page-hero__visual" data-image-expand>
      <EditorialImage data-parallax="0.05" :src="image" :alt="imageAlt" :width="1800" :height="1200" :style="{ '--image-position': imagePosition }" eager />
    </div>
  </header>
</template>
