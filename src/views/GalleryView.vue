<script setup>
import { ref } from 'vue'
import GalleryLightbox from '../components/gallery/GalleryLightbox.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import PageHero from '../components/shared/PageHero.vue'
import barkadaRoom from '../assets/images/generated/gallery-barkada-room-v2.webp'
import beansCafe from '../assets/images/generated/beans-cafe-detail-v2.webp'
import doubleRoom from '../assets/images/generated/gallery-double-room-v2.webp'
import poolside from '../assets/images/generated/gallery-poolside-v2.webp'
import shoreline from '../assets/images/generated/gallery-shoreline-v2.webp'
import beachAerial from '../assets/images/real/beach-aerial.webp'
import bananaBoat from '../assets/images/real/banana-boat.webp'
import kayakFamily from '../assets/images/real/kayak-family.webp'
import poolVilla from '../assets/images/real/pool-villa.webp'
import roomFamily from '../assets/images/real/room-family.webp'
import speedboatBeach from '../assets/images/real/speedboat-beach.webp'

const galleryImages = [
  { src: shoreline, alt: 'Wide view across the clear water toward The Beach Park shoreline', title: 'The shoreline, from the water', sourceLabel: 'Coastal view', layout: 'wide' },
  { src: poolside, alt: 'Pool edge facing the shaded cottages and mature trees', title: 'Under the old trees', sourceLabel: 'Poolside view', layout: 'portrait' },
  { src: bananaBoat, alt: 'Yellow Waterdog banana boat floating in clear water', title: 'Waiting for the next ride', sourceLabel: 'Property photograph', layout: 'landscape' },
  { src: doubleRoom, alt: 'Double bed, blue wall, timber headboard, and folded towels', title: 'A simple place to settle in', sourceLabel: 'Room view', layout: 'landscape' },
  { src: kayakFamily, alt: 'A parent and child preparing to kayak in shallow water', title: 'Paddle out together', sourceLabel: 'Property photograph', layout: 'portrait' },
  { src: beansCafe, alt: 'Teal façade, timber windows, and entrance of Beans & Paddles Café', title: 'Coffee by the coast', sourceLabel: 'Café view', layout: 'wide' },
  { src: barkadaRoom, alt: 'Built-in timber barkada bunks with blue mattresses', title: 'Room for the whole barkada', sourceLabel: 'Room view', layout: 'portrait' },
  { src: speedboatBeach, alt: 'Waterdog speedboat floating in clear water by the beach', title: 'Ready by the shore', sourceLabel: 'Property photograph', layout: 'landscape' },
  { src: roomFamily, alt: 'Two wooden beds in a family room at The Beach Park', title: 'Easy family stays', sourceLabel: 'Property photograph', layout: 'landscape' },
  { src: poolVilla, alt: 'Pool villa area at The Beach Park', title: 'A few steps from the pool', sourceLabel: 'Property photograph', layout: 'portrait' },
]

const activeIndex = ref(null)
</script>

<template>
  <PageHero
    class="gallery-hero"
    eyebrow="Gallery"
    title="A closer look at days by the water."
    lede="Shoreline mornings, shaded paths, rooms for the whole group, and the small pauses in between."
    :image="beachAerial"
    image-alt="Aerial view of The Beach Park shoreline"
  />

  <section class="gallery-intro page-shell">
    <h2 data-lines>The place unfolds slowly.</h2>
    <p>Move from the water to the rooms, then back outside again. Open any frame for a closer view, or simply follow the day as it moves down the page.</p>
  </section>

  <section class="gallery-journal" aria-label="The Beach Park gallery">
    <figure v-for="(image, index) in galleryImages" :key="image.src" class="gallery-journal__frame">
      <button type="button" :aria-label="`Open photograph: ${image.title}`" @click="activeIndex = index">
        <img :src="image.src" :alt="image.alt" width="1600" height="1100" loading="lazy" decoding="async" />
        <span class="gallery-journal__caption">
          <small>{{ image.sourceLabel }}</small>
          <strong>{{ image.title }}</strong>
        </span>
      </button>
    </figure>
  </section>

  <GalleryLightbox
    v-if="activeIndex !== null"
    :images="galleryImages"
    :active-index="activeIndex"
    @change="activeIndex = $event"
    @close="activeIndex = null"
  />

  <EditorialCta title="Put your own people in the frame." copy="Choose a room, plan a beach day, or ask the team what is happening next." context="gallery_footer" />
</template>
