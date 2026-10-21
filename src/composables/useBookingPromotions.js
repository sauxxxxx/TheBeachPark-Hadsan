import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const SESSION_KEY = 'the-beach-park:booking-promotions:v2:'
const EXIT_DELAY = 1000
const excludedRoutes = new Set(['booking', 'privacy', 'terms', 'not-found'])

function wasSeen(kind) {
  try {
    return sessionStorage.getItem(SESSION_KEY + kind) === 'true'
  } catch {
    return false
  }
}

function remember(kind) {
  try {
    sessionStorage.setItem(SESSION_KEY + kind, 'true')
  } catch {
    // In-memory state still limits each popup while storage is unavailable.
  }
}

export function useBookingPromotions() {
  const route = useRoute()
  const blocked = ref(true)
  const cookieHeight = ref(0)
  const teaserOpen = ref(false)
  const dialogOpen = ref(false)
  const eligible = computed(() => !excludedRoutes.has(route.name) && !route.meta.immersive)
  const teaserVisible = computed(() => teaserOpen.value && eligible.value && !blocked.value && !dialogOpen.value)
  let teaserSeen = wasSeen('teaser')
  let dialogSeen = wasSeen('dialog')
  let exitReadyAt = Infinity
  let bodyObserver
  let contentObserver
  let cookieObserver
  let cookieElement

  function schedule() {
    exitReadyAt = Infinity
    if (blocked.value || !eligible.value) return

    exitReadyAt = Date.now() + EXIT_DELAY
    if (!teaserSeen) {
      teaserSeen = true
      remember('teaser')
      teaserOpen.value = true
    }
  }

  function checkObstacles() {
    blocked.value = document.body.classList.contains('splash-is-active')
      || document.body.classList.contains('menu-is-open')
    const notice = document.querySelector('.cookie-notice')
    if (notice !== cookieElement) {
      if (cookieElement) cookieObserver.unobserve(cookieElement)
      cookieElement = notice
      if (cookieElement) cookieObserver.observe(cookieElement)
    }
    cookieHeight.value = cookieElement?.getBoundingClientRect().height || 0
  }

  function dismissTeaser() {
    teaserOpen.value = false
  }

  function dismissDialog() {
    dialogOpen.value = false
  }

  function onExit(event) {
    if (event.relatedTarget || event.clientY > 0 || Date.now() < exitReadyAt) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (blocked.value || cookieHeight.value || !eligible.value || dialogSeen || document.visibilityState !== 'visible') return
    dialogSeen = true
    remember('dialog')
    dialogOpen.value = true
  }

  watch([eligible, blocked], schedule)
  watch(() => route.fullPath, () => {
    dismissDialog()
    schedule()
  })

  onMounted(() => {
    cookieObserver = new ResizeObserver(() => {
      cookieHeight.value = cookieElement?.getBoundingClientRect().height || 0
    })
    bodyObserver = new MutationObserver(checkObstacles)
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    contentObserver = new MutationObserver(checkObstacles)
    contentObserver.observe(document.getElementById('app'), { childList: true, subtree: true })
    document.documentElement.addEventListener('mouseout', onExit)
    checkObstacles()
  })

  onBeforeUnmount(() => {
    bodyObserver?.disconnect()
    contentObserver?.disconnect()
    cookieObserver?.disconnect()
    document.documentElement.removeEventListener('mouseout', onExit)
  })

  return { teaserVisible, dialogOpen, cookieHeight, dismissTeaser, dismissDialog }
}
