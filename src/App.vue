<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import PreFooterBooking from './components/PreFooterBooking.vue'
import SiteHeader from './components/SiteHeader.vue'
import CookieNotice from './components/CookieNotice.vue'
import { useScrollChoreography } from './composables/useScrollChoreography'
import { registerScrollSource } from './services/scrollEngine'
import { destroySmoothScroll, initSmoothScroll } from './services/smoothScroll'

const route = useRoute()
const router = useRouter()
const main = ref(null)

// Wired once for the whole site: every route's markup is armed on navigation,
// so a view only has to carry the data-* attributes.
// Start smooth scrolling before the choreography subscribes, so the engine
// ticks from Lenis rather than the window and only one rAF loop runs.
registerScrollSource(initSmoothScroll())
onBeforeUnmount(destroySmoothScroll)

const { scan } = useScrollChoreography(main, () => route.fullPath)

// The first view resolves after mount; arm it once the router has settled.
onMounted(() => router.isReady().then(nextTick).then(scan))
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <SiteHeader />
  <main id="main-content" ref="main">
    <RouterView />
  </main>
  <PreFooterBooking v-if="!route.meta.immersive" />
  <SiteFooter />
  <CookieNotice />
</template>
