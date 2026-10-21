<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BookingLink from '../shared/BookingLink.vue'
import { lockScroll } from '../../services/smoothScroll'

defineProps({ offer: { type: Object, required: true } })
const emit = defineEmits(['close'])
const dialog = ref(null)
let previousFocus
let previousOverflow

onMounted(() => {
  previousFocus = document.activeElement
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
  lockScroll(true)
  dialog.value.showModal()
})

onBeforeUnmount(() => {
  dialog.value?.close()
  document.body.style.overflow = previousOverflow
  lockScroll(false)
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
})

function closeOnBackdrop(event) {
  if (event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    emit('close')
  }
}

function trapFocus(event) {
  if (event.key !== 'Tab') return
  const controls = dialog.value.querySelectorAll('a[href], button:not([disabled])')
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
</script>

<template>
  <dialog
    ref="dialog"
    class="offer-dialog"
    aria-labelledby="offer-dialog-title"
    aria-describedby="offer-dialog-description"
    data-lenis-prevent
    @cancel.prevent="emit('close')"
    @click="closeOnBackdrop"
    @keydown="trapFocus"
  >
    <button class="offer-dialog__close" type="button" aria-label="Close special offers" autofocus @click="emit('close')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </button>
    <div class="offer-dialog__layout">
      <img class="offer-dialog__image" :src="offer.image" :alt="offer.imageAlt" :style="{ objectPosition: offer.imagePosition }" width="600" height="800" />
      <div class="offer-dialog__copy">
        <p class="offer-dialog__eyebrow">Before you go</p>
        <h2 id="offer-dialog-title">Don’t miss out.<br /><em>Your special deal awaits.</em></h2>
        <p id="offer-dialog-description">{{ offer.description }}</p>
        <BookingLink :to="offer.to" :label="offer.label" context="promotion_exit_offers" @click="emit('close')" />
        <button class="offer-dialog__continue" type="button" @click="emit('close')">Keep exploring</button>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.offer-dialog {
  position: fixed;
  inset: 0;
  width: 720px;
  max-width: calc(100% - 40px);
  max-height: calc(100svh - 40px);
  margin: auto;
  border: 0;
  padding: 0;
  background: var(--paper);
  color: var(--ink);
  box-shadow: 0 24px 90px rgb(6 34 46 / .28);
  animation: offer-arrive 380ms var(--ease) both;
}

.offer-dialog::backdrop { background: rgb(6 34 46 / .62); animation: backdrop-arrive 280ms ease both; }
.offer-dialog__close { position: absolute; top: 8px; right: 8px; display: grid; width: 44px; height: 44px; place-items: center; border: 0; background: var(--paper); color: var(--ink); cursor: pointer; }
.offer-dialog__close svg { width: 21px; height: 21px; }
.offer-dialog__layout { display: grid; grid-template-columns: 280px 1fr; }
.offer-dialog__image { width: 100%; height: 100%; min-height: 410px; object-fit: cover; }
.offer-dialog__copy { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 52px 44px 40px; }
.offer-dialog__eyebrow { margin-bottom: 20px; color: var(--muted); font-size: 11px; }
.offer-dialog h2 { margin-bottom: 22px; font-size: 42px; }
.offer-dialog h2 em { color: var(--coral-deep); font-weight: inherit; }
#offer-dialog-description { margin-bottom: 26px; color: var(--muted); font-size: 14px; line-height: 1.7; }
.offer-dialog .button { width: 100%; }
.offer-dialog__continue { align-self: center; min-height: 44px; margin-top: 8px; border: 0; padding: 0 12px; background: transparent; color: var(--muted); font-size: 12px; text-decoration: underline; text-underline-offset: 4px; cursor: pointer; }
.offer-dialog__continue:hover { color: var(--ink); }

@keyframes offer-arrive {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}

@keyframes backdrop-arrive {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 640px) {
  .offer-dialog__layout { grid-template-columns: 1fr; }
  .offer-dialog__image { min-height: 0; height: 160px; }
  .offer-dialog__copy { padding: 28px; }
  .offer-dialog__eyebrow { margin-bottom: 12px; }
  .offer-dialog h2 { font-size: 36px; margin-bottom: 16px; }
  #offer-dialog-description { margin-bottom: 20px; }
}
</style>
