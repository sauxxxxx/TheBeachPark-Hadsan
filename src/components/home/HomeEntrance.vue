<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import hadsanLogo from '../../assets/images/brands/hadsan-logo.png'
import { lockScroll } from '../../services/smoothScroll'

const storageKey = 'the-beach-park:tide-splash-seen:v3'
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const visible = ref(!hasPlayed())

let finishTimer

function hasPlayed() {
  try {
    return sessionStorage.getItem(storageKey) === 'true'
  } catch {
    return false
  }
}

function rememberSplash() {
  try {
    sessionStorage.setItem(storageKey, 'true')
  } catch {
    // The splash remains functional when storage is unavailable; it may simply
    // replay on the next load.
  }
}

function finishSplash() {
  if (!visible.value) return

  window.clearTimeout(finishTimer)
  visible.value = false
  document.body.classList.remove('splash-is-active')
  lockScroll(false)
  window.removeEventListener('keydown', finishSplash)
}

onMounted(() => {
  if (!visible.value) return

  rememberSplash()
  document.body.classList.add('splash-is-active')
  lockScroll(true)
  window.addEventListener('keydown', finishSplash)
  finishTimer = window.setTimeout(finishSplash, reduceMotion ? 500 : 3300)
})

onBeforeUnmount(() => {
  window.clearTimeout(finishTimer)
  window.removeEventListener('keydown', finishSplash)
  if (visible.value) {
    document.body.classList.remove('splash-is-active')
    lockScroll(false)
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="tide-splash"
      :class="{ 'tide-splash--reduced': reduceMotion }"
      aria-hidden="true"
      @pointerdown="finishSplash"
    >
      <div class="tide-splash__content">
        <img
          class="tide-splash__logo"
          :src="hadsanLogo"
          alt=""
          width="500"
          height="500"
        />
      </div>
      <span class="tide-splash__horizon"></span>
    </div>
  </Teleport>
</template>

<style scoped>
:global(body.splash-is-active) {
  overflow: hidden;
}

.tide-splash {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: var(--navy);
  color: var(--ivory);
  cursor: pointer;
  animation: tide-release 1100ms cubic-bezier(.16, 1, .3, 1) 2100ms both;
  will-change: transform;
}

.tide-splash__content {
  display: grid;
  justify-items: center;
  gap: 25px;
  transform: translateY(-2vh);
}

.tide-splash__logo {
  width: clamp(176px, 16vw, 232px);
  height: auto;
  animation: tide-mark 900ms cubic-bezier(.16, 1, .3, 1) both;
}

.tide-splash__horizon {
  position: absolute;
  top: 64%;
  right: 0;
  left: 0;
  height: 1px;
  background: color-mix(in srgb, var(--ivory) 72%, transparent);
  transform: scaleX(0);
  transform-origin: left;
  animation: tide-horizon 700ms cubic-bezier(.16, 1, .3, 1) 1450ms both;
}

@keyframes tide-mark {
  from { opacity: 0; transform: translateY(16px) scale(.96); }
  to { opacity: 1; transform: none; }
}

@keyframes tide-horizon {
  to { transform: scaleX(1); }
}

@keyframes tide-release {
  to { transform: translateY(-100%); }
}

@keyframes tide-reduced-fade {
  from { opacity: 1; }
  to { opacity: 0; }
}

@media (max-width: 800px) {
  .tide-splash__content { gap: 21px; transform: translateY(-3vh); }
  .tide-splash__logo { width: 158px; }
  .tide-splash__horizon { top: 66%; }
}

@media (prefers-reduced-motion: reduce) {
  .tide-splash--reduced {
    animation: tide-reduced-fade 280ms ease 160ms both !important;
  }
  .tide-splash__logo,
  .tide-splash__horizon { animation: none; }
  .tide-splash__horizon { transform: scaleX(1); }
}
</style>
