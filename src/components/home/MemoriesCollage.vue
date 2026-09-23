<script setup>
import EditorialImage from '../EditorialImage.vue'
import { memoryImages } from '../../data/homeContent'
</script>

<template>
  <section id="explore" class="memories section-paper">
    <div class="memories__copy">
      <h2 data-lines>Remember the day.</h2>
      <p>A closer look at The Beach Park.</p>
      <RouterLink class="button button--outline" to="/explore/gallery/">View gallery</RouterLink>
    </div>
    <EditorialImage v-for="image in memoryImages" :key="image.key" class="memory-image" :class="`memory-image--${image.key}`" data-image-expand :src="image.src" :alt="image.alt" :width="1200" :height="900" />
  </section>
</template>
