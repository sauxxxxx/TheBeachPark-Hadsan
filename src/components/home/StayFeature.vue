<script setup>
import { computed, ref } from 'vue'
import EditorialImage from '../EditorialImage.vue'
import { stayImages } from '../../data/homeContent'
import { trackEvent } from '../../services/analytics'

const activeIndex = ref(0)
const touchStartX = ref(0)
const activeImage = computed(() => stayImages[activeIndex.value])

function showImage(index) {
  activeIndex.value = (index + stayImages.length) % stayImages.length
  trackEvent('room_gallery_view', { image_index: activeIndex.value + 1 })
}

function handleKeydown(event) {
  if (event.key === 'ArrowLeft') showImage(activeIndex.value - 1)
  if (event.key === 'ArrowRight') showImage(activeIndex.value + 1)
}

function handleTouchEnd(event) {
  const distance = event.changedTouches[0].clientX - touchStartX.value
  if (Math.abs(distance) < 45) return
  showImage(activeIndex.value + (distance < 0 ? 1 : -1))
}
</script>

<template>
  <section id="stay" class="stay-feature section-paper">
    <div class="stay-feature__copy">
      <h2 data-lines>Stay by the water.</h2>
      <p>Rooms for two, families, and barkadas.</p>
      <RouterLink class="button button--outline" to="/stay/">Explore rooms</RouterLink>
      <!-- Thumbnails and stepper share a row on the paper ground. Over the
           photograph the white controls measured 1.33:1 against bright room
           walls, and no scrim light enough to keep the look would fix it. -->
      <div class="stay-feature__browse">
        <div class="stay-feature__stack" aria-label="Choose a room photo" data-sequence>
          <button v-for="(image, index) in stayImages" :key="image.alt" type="button" :class="{ 'is-active': activeIndex === index }" :aria-label="`Show room photo ${index + 1}`" :aria-pressed="activeIndex === index" @click="showImage(index)">
            <EditorialImage :src="image.src" alt="" :width="600" :height="400" />
          </button>
        </div>
        <div class="room-gallery__controls">
          <button type="button" aria-label="Previous room photo" @click="showImage(activeIndex - 1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <span>{{ activeIndex + 1 }} / {{ stayImages.length }}</span>
          <button type="button" aria-label="Next room photo" @click="showImage(activeIndex + 1)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="room-gallery" role="region" aria-label="Room photo gallery" tabindex="0" @keydown="handleKeydown" @touchstart.passive="touchStartX = $event.touches[0].clientX" @touchend.passive="handleTouchEnd">
      <Transition name="image-fade" mode="out-in">
        <EditorialImage :key="activeImage.src" class="stay-feature__main" data-image-expand :src="activeImage.src" :alt="activeImage.alt" :width="1600" :height="1200" />
      </Transition>
    </div>
  </section>
</template>
