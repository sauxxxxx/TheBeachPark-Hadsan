<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import EditorialImage from '../EditorialImage.vue'
import { destinationTiles } from '../../data/homeContent'
import { trackEvent } from '../../services/analytics'

const rail = ref(null)
const canGoPrevious = ref(false)
const canGoNext = ref(true)

function updateControls() {
  const element = rail.value
  if (!element) return
  canGoPrevious.value = element.scrollLeft > 4
  canGoNext.value = element.scrollLeft < element.scrollWidth - element.clientWidth - 4
}

function move(direction) {
  const element = rail.value
  const firstTile = element?.querySelector('.destination-tile')
  if (!element || !firstTile) return
  const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0
  element.scrollBy({ left: direction * (firstTile.getBoundingClientRect().width + gap), behavior: 'smooth' })
}

onMounted(async () => {
  await nextTick()
  updateControls()
  window.addEventListener('resize', updateControls)
})

onBeforeUnmount(() => window.removeEventListener('resize', updateControls))
</script>

<template>
  <section id="experiences" class="destination-grid section-paper">
    <header class="destination-grid__title page-shell">
      <h2 data-lines>Choose your day.</h2>
      <div class="destination-grid__controls" aria-label="Browse destinations">
        <button type="button" :disabled="!canGoPrevious" aria-label="Previous destinations" @click="move(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button type="button" :disabled="!canGoNext" aria-label="Next destinations" @click="move(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
        </button>
      </div>
    </header>
    <div ref="rail" class="destination-grid__rail" aria-label="Ways to experience The Beach Park" data-sequence @scroll.passive="updateControls">
      <RouterLink
        v-for="tile in destinationTiles"
        :key="tile.key"
        class="destination-tile"
        :class="`destination-tile--${tile.key}`"
        :style="{ '--tile-position': tile.position || 'center' }"
        :to="tile.to"
        @click="trackEvent('destination_open', { destination: tile.key })"
      >
        <EditorialImage v-if="tile.image" :src="tile.image" :alt="tile.alt" :width="1600" :height="1100" />
        <div v-else class="destination-tile__placeholder" role="img" :aria-label="tile.alt">
          <span>Photography coming soon</span>
        </div>
        <div class="destination-tile__content">
          <strong>{{ tile.label }}</strong>
          <p>{{ tile.description }}</p>
          <span class="destination-tile__cta">{{ tile.action }}</span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
