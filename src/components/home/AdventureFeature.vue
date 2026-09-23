<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import EditorialImage from '../EditorialImage.vue'
import { adventureActivities } from '../../data/homeContent'
import { trackEvent } from '../../services/analytics'

const AUTOPLAY_DURATION = 5000

const sectionRef = ref(null)
const activeActivity = ref(adventureActivities[0].id)
const progress = ref(0)
const isVisible = ref(false)
const isPointerOver = ref(false)
const isFocusWithin = ref(false)
const isDocumentVisible = ref(true)
const reducedMotion = ref(false)
const selectedActivity = computed(() => adventureActivities.find((activity) => activity.id === activeActivity.value))
const canAutoplay = computed(() =>
  isVisible.value &&
  isDocumentVisible.value &&
  !isPointerOver.value &&
  !isFocusWithin.value &&
  !reducedMotion.value,
)

let animationFrame = 0
let previousFrame = 0
let visibilityObserver
let motionQuery

function advanceActivity() {
  const currentIndex = adventureActivities.findIndex((activity) => activity.id === activeActivity.value)
  activeActivity.value = adventureActivities[(currentIndex + 1) % adventureActivities.length].id
}

function updateProgress(timestamp) {
  animationFrame = 0
  if (!canAutoplay.value) return

  if (!previousFrame) previousFrame = timestamp
  const elapsed = timestamp - previousFrame
  previousFrame = timestamp
  progress.value += elapsed / AUTOPLAY_DURATION

  if (progress.value >= 1) {
    progress.value %= 1
    advanceActivity()
  }

  animationFrame = requestAnimationFrame(updateProgress)
}

function syncPlayback(playing) {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  animationFrame = 0
  previousFrame = 0
  if (playing) animationFrame = requestAnimationFrame(updateProgress)
}

watch(canAutoplay, syncPlayback)

function selectActivity(id, event) {
  activeActivity.value = id
  progress.value = 0
  previousFrame = 0
  if (event?.detail > 0) event.currentTarget.blur()
  trackEvent('activity_selection', { activity: id })
}

function handleTabKeydown(event, index) {
  const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
  if (!keys.includes(event.key)) return
  event.preventDefault()

  let nextIndex = index
  if (event.key === 'ArrowLeft') nextIndex = (index - 1 + adventureActivities.length) % adventureActivities.length
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % adventureActivities.length
  if (event.key === 'Home') nextIndex = 0
  if (event.key === 'End') nextIndex = adventureActivities.length - 1

  const nextActivity = adventureActivities[nextIndex]
  selectActivity(nextActivity.id)
  event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[nextIndex]?.focus()
}

function handlePointerPause(event, paused) {
  if (event.pointerType !== 'touch') isPointerOver.value = paused
}

function handleFocusOut(event) {
  if (!sectionRef.value?.contains(event.relatedTarget)) isFocusWithin.value = false
}

function handleVisibilityChange() {
  isDocumentVisible.value = !document.hidden
}

function handleMotionPreference(event) {
  reducedMotion.value = event.matches
}

onMounted(() => {
  isDocumentVisible.value = !document.hidden
  document.addEventListener('visibilitychange', handleVisibilityChange)

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', handleMotionPreference)

  visibilityObserver = new IntersectionObserver(
    ([entry]) => { isVisible.value = entry.isIntersecting },
    { rootMargin: '-15% 0px -15% 0px', threshold: 0.01 },
  )
  visibilityObserver.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
  visibilityObserver?.disconnect()
  motionQuery?.removeEventListener('change', handleMotionPreference)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <section
  id="adventures"
  ref="sectionRef"
  class="adventure-feature"
  @focusin="isFocusWithin = true"
  @focusout="handleFocusOut"
>
    <div class="adventure-feature__bed">
      <Transition name="image-fade" mode="out-in">
        <EditorialImage :key="selectedActivity.id" :src="selectedActivity.image" :alt="selectedActivity.alt" :width="3840" :height="2160" />
      </Transition>
    </div>
    <div id="adventure-panel" class="adventure-feature__content" role="tabpanel" :aria-labelledby="`activity-tab-${selectedActivity.id}`">
      <h2 data-lines>Open water awaits.</h2>
      <p>{{ selectedActivity.description }}</p>
        <div
          class="activity-tabs"
          role="tablist"
          aria-label="Choose a water activity"
          @pointerenter="handlePointerPause($event, true)"
          @pointerleave="handlePointerPause($event, false)"
        >
        <button
          v-for="(activity, index) in adventureActivities"
          :id="`activity-tab-${activity.id}`"
          :key="activity.id"
          type="button"
          role="tab"
          :aria-selected="activeActivity === activity.id"
          :tabindex="activeActivity === activity.id ? 0 : -1"
          aria-controls="adventure-panel"
          :style="{ '--activity-progress': activeActivity === activity.id ? progress : 0 }"
          @click="selectActivity(activity.id, $event)"
          @keydown="handleTabKeydown($event, index)"
        >
          {{ activity.label }}
        </button>
      </div>
      <RouterLink class="button button--outline-light" to="/adventures/">Explore Waterdog</RouterLink>
    </div>
  </section>
</template>
