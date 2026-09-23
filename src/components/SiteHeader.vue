<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import hadsanLogo from '../assets/images/brands/hadsan-logo.png'
import { navDestinations } from '../data/siteContent'
import { lockScroll } from '../services/smoothScroll'
import BookingLink from './shared/BookingLink.vue'
import EditorialImage from './EditorialImage.vue'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)
const panel = ref(null)
const closeButton = ref(null)
const menuButton = ref(null)
const hoveredIndex = ref(null)

const utilityRoutes = ['stay', 'booking', 'room-details', 'privacy', 'terms', 'not-found']
const isOverlay = computed(() => !utilityRoutes.includes(route.name) && !isScrolled.value && !menuOpen.value)

function matches(item) {
  return item.exact ? route.path === item.to : route.path.startsWith(item.group)
}

// The stage follows the pointer first, then the current page, then the top of the list.
const currentIndex = computed(() => {
  const active = navDestinations.findIndex(matches)
  return active === -1 ? 0 : active
})
const stagedIndex = computed(() => hoveredIndex.value ?? currentIndex.value)
const staged = computed(() => navDestinations[stagedIndex.value])

watch(() => route.fullPath, () => { menuOpen.value = false })

watch(menuOpen, async (open) => {
  document.body.classList.toggle('menu-is-open', open)
  // The class alone cannot stop Lenis, which drives its own scroll position.
  lockScroll(open)
  if (open) {
    hoveredIndex.value = null
    await nextTick()
    closeButton.value?.focus()
  } else {
    await nextTick()
    menuButton.value?.focus()
  }
})

function updateScrollState() {
  isScrolled.value = window.scrollY > 48
}

function handleKeydown(event) {
  if (!menuOpen.value) return
  if (event.key === 'Escape') {
    menuOpen.value = false
    return
  }
  if (event.key !== 'Tab' || !panel.value) return

  // Keep Tab inside the open panel; it covers the whole viewport.
  const focusable = panel.value.querySelectorAll('a[href], button:not([disabled])')
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
  window.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('menu-is-open')
})
</script>

<template>
  <header
    class="site-header"
    :class="{
      'site-header--overlay': isOverlay,
      'site-header--scrolled': isScrolled,
      'site-header--menu-open': menuOpen,
    }"
  >
    <button
      ref="menuButton"
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="site-navigation"
      @click="menuOpen = true"
    >
      <span class="menu-toggle__icon" aria-hidden="true"><i></i><i></i></span>
      <span>Menu</span>
    </button>

    <RouterLink class="brand-mark" to="/" aria-label="The Beach Park Hadsan home">
      <img class="brand-mark__logo brand-mark__logo--light" :src="hadsanLogo" alt="" width="500" height="500" />
      <img class="brand-mark__logo brand-mark__logo--dark" :src="hadsanLogo" alt="" width="500" height="500" />
    </RouterLink>

    <BookingLink label="Book" context="header" variant="header" />
  </header>

  <Transition name="menu-panel">
    <div
      v-if="menuOpen"
      id="site-navigation"
      ref="panel"
      class="site-nav-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div class="site-nav-panel__menu">
        <button ref="closeButton" class="nav-close" type="button" aria-label="Close menu" @click="menuOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true">
            <path d="M5 5 19 19M19 5 5 19" />
          </svg>
        </button>

        <nav class="site-nav" aria-label="Main navigation" @mouseleave="hoveredIndex = null">
          <RouterLink
            v-for="(item, index) in navDestinations"
            :key="item.label"
            :to="item.to"
            :class="{ 'is-active': matches(item) }"
            :aria-current="matches(item) ? 'page' : undefined"
            @mouseenter="hoveredIndex = index"
            @focus="hoveredIndex = index"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="site-nav-panel__foot">
          <!-- The stage carries the booking CTA on desktop, but it is hidden on
               narrow screens, so the menu column keeps its own copy. -->
          <BookingLink class="site-nav-panel__book-inline" label="Book your stay" context="menu_mobile" />
          <hr />
          <div class="site-nav-panel__legal">
            <RouterLink to="/terms/">Terms and Conditions</RouterLink>
            <RouterLink to="/privacy/">Privacy Policy</RouterLink>
          </div>
          <div class="site-nav-panel__social">
            <a href="https://www.facebook.com/TheBeachPark" target="_blank" rel="noopener" aria-label="The Beach Park on Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14.5 8.5V6.9c0-.7.2-1.1 1.2-1.1h1.5V3.1A17 17 0 0 0 15 3c-2.2 0-3.7 1.3-3.7 3.7v1.8H8.8V11h2.5v8h3.2v-8h2.3l.3-2.5h-2.6Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="The Beach Park on Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="site-nav-panel__stage">
        <Transition name="stage-fade" mode="out-in">
          <EditorialImage
            :key="staged.label"
            :src="staged.image"
            :alt="staged.alt"
            :width="1600"
            :height="1200"
            eager
          />
        </Transition>

        <RouterLink class="site-nav-panel__brand" to="/" aria-label="The Beach Park Hadsan home">
          <img :src="hadsanLogo" alt="" width="500" height="500" />
        </RouterLink>

        <div class="site-nav-panel__book">
          <BookingLink label="Book" context="menu" variant="header" />
        </div>

        <Transition name="stage-fade" mode="out-in">
          <div :key="staged.label" class="site-nav-panel__caption">
            <h2>{{ staged.title }}</h2>
            <p>{{ staged.caption }}</p>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>
