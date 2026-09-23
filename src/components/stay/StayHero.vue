<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BookingLink from '../shared/BookingLink.vue'
import poolVilla from '../../assets/images/generated/rooms/pool-villa-4-ai.webp'
import oceanfrontDeck from '../../assets/images/generated/rooms/oceanfront-deck-room-2-ai.webp'
import poolsideRoom from '../../assets/images/generated/rooms/pool-side-balcony-room-2-ai.webp'
import barkadaBeachHouse from '../../assets/images/generated/rooms/barkada-beach-house-1-ai.webp'

const frameDuration = 2000
const slides = [
  {
    src: poolVilla,
    name: 'Pool Villa',
    alt: 'Pool Villa with its private pool at The Beach Park Hadsan',
    position: 'center 55%',
    mobilePosition: '54% center',
  },
  {
    src: oceanfrontDeck,
    name: 'Oceanfront Deck',
    alt: 'Oceanfront Deck Room overlooking the water at The Beach Park Hadsan',
    position: 'center 50%',
    mobilePosition: '43% center',
  },
  {
    src: poolsideRoom,
    name: 'Poolside Balcony',
    alt: 'Poolside Balcony Room prepared for arriving guests',
    position: 'center 48%',
    mobilePosition: 'center center',
  },
  {
    src: barkadaBeachHouse,
    name: 'Barkada Beach House',
    alt: 'Barkada Beach House bunk beds at The Beach Park Hadsan',
    position: 'center 48%',
    mobilePosition: 'center center',
  },
]

const hero = ref(null)
const activeIndex = ref(0)
const isVisible = ref(true)
const documentVisible = ref(true)
const reducedMotion = ref(true)
const isPaused = computed(() => (
  !isVisible.value
  || !documentVisible.value
  || reducedMotion.value
))

let timer
let visibilityObserver
let motionQuery

function clearTimer() {
  window.clearTimeout(timer)
}

function syncTimer() {
  clearTimer()
  if (isPaused.value) return
  timer = window.setTimeout(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length
  }, frameDuration)
}

function handleVisibilityChange() {
  documentVisible.value = !document.hidden
}

function handleMotionChange(event) {
  reducedMotion.value = event.matches
}

watch([activeIndex, isPaused], syncTimer)

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', handleMotionChange)

  slides.slice(1).forEach(({ src }) => {
    const image = new Image()
    image.src = src
  })

  visibilityObserver = new IntersectionObserver(
    ([entry]) => { isVisible.value = entry.isIntersecting && entry.intersectionRatio >= 0.35 },
    { threshold: [0, 0.35, 0.75] },
  )
  visibilityObserver.observe(hero.value)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  syncTimer()
})

onBeforeUnmount(() => {
  clearTimer()
  visibilityObserver?.disconnect()
  motionQuery?.removeEventListener('change', handleMotionChange)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <section
    ref="hero"
    class="stay-cinematic-hero"
    aria-label="Featured rooms"
  >
    <div class="stay-cinematic-hero__media">
      <img
        v-for="(slide, index) in slides"
        :key="slide.name"
        class="stay-cinematic-hero__image"
        :class="{ 'is-active': index === activeIndex }"
        :src="slide.src"
        :alt="index === activeIndex ? slide.alt : ''"
        :aria-hidden="index !== activeIndex"
        :fetchpriority="index === 0 ? 'high' : 'low'"
        :style="{
          '--stay-slide-position': slide.position,
          '--stay-slide-mobile-position': slide.mobilePosition,
        }"
        width="1600"
        height="1100"
        decoding="async"
      />
      <div class="stay-cinematic-hero__wash" aria-hidden="true"></div>
    </div>

    <div class="stay-cinematic-hero__content page-shell">
      <h1>Choose your room.</h1>
      <p class="stay-cinematic-hero__lede">Beachside and oceanfront rooms, poolside balconies, a beach house, and barkada rooms that sleep up to ten — every one a short walk from the water.</p>
      <div class="stay-cinematic-hero__actions">
        <BookingLink context="stay_hero" />
        <a class="button button--outline-light" href="#rooms">Explore rooms</a>
      </div>
    </div>
  </section>
</template>
