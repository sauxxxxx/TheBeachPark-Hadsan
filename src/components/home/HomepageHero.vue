<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const posterSrc = '/media/hero-poster.webp'
const videoSrc = '/media/hero-hadsan-last.mp4'

// The hero video is earned rather than assumed: wide viewports only, and never
// against the user's stated preferences. Phones, Save-Data and
// reduced-motion all keep the poster, which is the video's own first frame.
const useVideo = ref(false)
const heroStage = ref(null)
const heroVideo = ref(null)

let heroIsVisible = false
let playbackObserver

async function syncVideoPlayback() {
  const video = heroVideo.value
  if (!video) return

  if (!heroIsVisible || document.hidden) {
    video.pause()
    return
  }

  try {
    await video.play()
  } catch {
    // Muted autoplay is widely supported, but the poster remains a complete
    // fallback when a browser or device policy still declines playback.
  }
}

onMounted(async () => {
  const wideEnough = window.matchMedia('(min-width: 801px)').matches
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection?.saveData === true
  useVideo.value = wideEnough && !reducedMotion && !saveData

  if (!useVideo.value) return
  await nextTick()

  playbackObserver = new IntersectionObserver(
    ([entry]) => {
      heroIsVisible = entry.isIntersecting && entry.intersectionRatio >= 0.35
      syncVideoPlayback()
    },
    { threshold: [0, 0.35, 0.75] },
  )
  playbackObserver.observe(heroStage.value)
  document.addEventListener('visibilitychange', syncVideoPlayback)
})

onBeforeUnmount(() => {
  playbackObserver?.disconnect()
  document.removeEventListener('visibilitychange', syncVideoPlayback)
  heroVideo.value?.pause()
})
</script>

<template>
  <!-- The section is tall and its stage sticks. The video loops while that
       stage is visible, then pauses without resetting when the visitor leaves. -->
  <section class="proposal-hero" data-pin>
    <div ref="heroStage" class="proposal-hero__stage">
      <div class="proposal-hero__media">
        <img
          class="proposal-hero__poster"
          :src="posterSrc"
          alt="Aerial view of The Beach Park shoreline and clear Cebu water"
          width="1400"
          height="788"
          fetchpriority="high"
          decoding="async"
        />
        <video
          v-if="useVideo"
          ref="heroVideo"
          class="proposal-hero__video"
          :src="videoSrc"
          :poster="posterSrc"
          autoplay
          loop
          muted
          playsinline
          preload="auto"
          disablepictureinpicture
          aria-hidden="true"
          tabindex="-1"
        ></video>
        <div class="proposal-hero__wash" aria-hidden="true"></div>
      </div>
      <div class="proposal-hero__content">
        <h1>A better beach day.</h1>
        <p class="proposal-hero__intro">Come for the water. Stay for the moments.</p>
        <div class="proposal-hero__actions">
          <RouterLink class="button button--light" to="/booking/">Book your stay</RouterLink>
          <RouterLink class="button button--outline-light" to="/#experiences">Discover the park</RouterLink>
        </div>
      </div>
      <div class="proposal-hero__note" aria-hidden="true">
        <span>Stay</span><span>Eat</span><span>Make waves</span>
      </div>
    </div>
  </section>
</template>
