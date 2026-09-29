<script setup>
import { ref } from 'vue'
import GalleryLightbox from '../components/gallery/GalleryLightbox.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import PageHero from '../components/shared/PageHero.vue'
import beachAerial from '../assets/images/real/beach-aerial.webp'
import beachDay from '../assets/images/real/beach-day.webp'
import bananaBoat from '../assets/images/real/banana-boat.webp'
import kayakFamily from '../assets/images/real/kayak-family.webp'
import roomBarkada from '../assets/images/real/room-barkada.webp'
import roomFamily from '../assets/images/real/room-family.webp'
import speedboatBeach from '../assets/images/real/speedboat-beach.webp'
import eveningGrounds from '../assets/images/gallery/evening-grounds.jpg'
import eveningGuests from '../assets/images/gallery/evening-guests.jpg'
import liveMusic from '../assets/images/gallery/live-music.jpg'
import sunsetShore from '../assets/images/gallery/sunset-shore.jpg'

const galleryImages = [
  { src: sunsetShore, alt: 'Boats resting offshore as the sun sets over Hadsan', title: 'The day slows down', sourceLabel: 'Beach' },
  { src: roomFamily, alt: 'Two wooden beds in a family room at The Beach Park', title: 'Easy family stays', sourceLabel: 'Stay' },
  { src: bananaBoat, alt: 'Yellow Waterdog banana boat floating in clear water', title: 'Ready for the next ride', sourceLabel: 'Adventures' },
  { src: liveMusic, alt: 'Guests enjoying live music at The Beach Park after dark', title: 'Music by the shore', sourceLabel: 'Evenings' },
  { src: kayakFamily, alt: 'A parent and child preparing to kayak in shallow water', title: 'Paddle out together', sourceLabel: 'Adventures' },
  { src: beachDay, alt: 'Children playing together on the shore at The Beach Park', title: 'Room to play', sourceLabel: 'Beach' },
  { src: eveningGuests, alt: 'Friends gathered beneath the evening lights at The Beach Park', title: 'Good nights, shared', sourceLabel: 'Evenings' },
  { src: speedboatBeach, alt: 'Waterdog speedboat moored in clear water by The Beach Park shore', title: 'Ready by the shore', sourceLabel: 'Adventures' },
  { src: roomBarkada, alt: 'Built-in timber bunk beds in a barkada room', title: 'Room for the barkada', sourceLabel: 'Stay' },
  { src: eveningGrounds, alt: 'The open-air grounds lit for an evening gathering', title: 'After sunset', sourceLabel: 'Evenings' },
]

const activeIndex = ref(null)
</script>

<template>
  <PageHero
    class="gallery-hero"
    title="Days by the water."
    lede="Beach days, easy stays, watersports, and evenings under the lights."
    :image="beachAerial"
    image-alt="Aerial view of The Beach Park shoreline"
  />

  <section class="gallery-intro page-shell">
    <h2 data-lines>From morning to night.</h2>
    <p>Real moments from The Beach Park—on the shore, in the rooms, and after sunset. Open any frame for a closer look.</p>
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

  <EditorialCta title="See it for yourself." copy="Choose a room or plan a day by the water." context="gallery_footer" />
</template>
