<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  activeIndex: { type: Number, required: true },
})

const emit = defineEmits(['close', 'change'])
const dialog = ref(null)
const closeButton = ref(null)
const returnFocus = document.activeElement
let touchStartX = 0

const move = (direction) => {
  const nextIndex = (props.activeIndex + direction + props.images.length) % props.images.length
  emit('change', nextIndex)
}

function handleKeydown(event) {
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowLeft') move(-1)
  if (event.key === 'ArrowRight') move(1)
  if (event.key === 'Tab') {
    const controls = dialog.value?.querySelectorAll('button')
    if (!controls?.length) return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

function handleTouchEnd(event) {
  const distance = event.changedTouches[0].clientX - touchStartX
  if (Math.abs(distance) > 55) move(distance > 0 ? -1 : 1)
}

onMounted(async () => {
  document.body.classList.add('lightbox-is-open')
  window.addEventListener('keydown', handleKeydown)
  await nextTick()
  closeButton.value?.focus()
})

onBeforeUnmount(() => {
  document.body.classList.remove('lightbox-is-open')
  window.removeEventListener('keydown', handleKeydown)
  returnFocus?.focus?.()
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="dialog"
      class="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="images[activeIndex].title"
      @click.self="emit('close')"
      @touchstart.passive="touchStartX = $event.touches[0].clientX"
      @touchend.passive="handleTouchEnd"
    >
      <button ref="closeButton" class="gallery-lightbox__close" type="button" aria-label="Close gallery" @click="emit('close')">
        <span>Close</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" /></svg>
      </button>

      <figure>
        <img :src="images[activeIndex].src" :alt="images[activeIndex].alt" />
        <figcaption>
          <div>
            <span>{{ images[activeIndex].sourceLabel }}</span>
            <strong>{{ images[activeIndex].title }}</strong>
          </div>
          <span>{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(images.length).padStart(2, '0') }}</span>
        </figcaption>
      </figure>

      <div class="gallery-lightbox__controls">
        <button type="button" aria-label="Previous photograph" @click="move(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
        </button>
        <button type="button" aria-label="Next photograph" @click="move(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>
