<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SandLogoReveal from './SandLogoReveal.vue'
import SunriseLogoReveal from './SunriseLogoReveal.vue'
import { lockScroll } from '../../services/smoothScroll'

// Every intro is kept; one plays. `?intro=sand` (or `sunrise`) previews another
// and replays on each load. `stallMs` ends the splash if a reveal never does.
const INTROS = {
  sunrise: { component: SunriseLogoReveal, stallMs: 6500 },
  sand: { component: SandLogoReveal, stallMs: 5000 },
}
const DEFAULT_INTRO = 'sunrise'

const storageKey = 'the-beach-park:tide-splash-seen:v6'
const requestedIntro = new URLSearchParams(window.location.search).get('intro')
const intro = INTROS[requestedIntro] || INTROS[DEFAULT_INTRO]
const previewing = requestedIntro in INTROS
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const visible = ref(previewing || !hasPlayed())
const leaveMs = ref(0)
const selfLit = ref(false)
const reveal = ref(null)

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
  window.removeEventListener('keydown', skipSplash)
}

// A skip hurries the reveal's own exit rather than cutting the scene.
function skipSplash() {
  if (reduceMotion) finishSplash()
  else reveal.value?.skip()
}

onMounted(() => {
  if (!visible.value) return

  rememberSplash()
  document.body.classList.add('splash-is-active')
  lockScroll(true)
  window.addEventListener('keydown', skipSplash)
  // The reveal ends the splash itself; this only guards against it stalling.
  finishTimer = window.setTimeout(finishSplash, reduceMotion ? 500 : intro.stallMs)
})

onBeforeUnmount(() => {
  window.clearTimeout(finishTimer)
  window.removeEventListener('keydown', skipSplash)
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
      :class="{
        'tide-splash--reduced': reduceMotion,
        'tide-splash--leaving': leaveMs,
        'tide-splash--self-lit': selfLit,
      }"
      :style="{ '--leave-ms': `${leaveMs}ms` }"
      aria-hidden="true"
      @pointerdown="skipSplash"
    >
      <span class="tide-splash__backdrop"></span>
      <component
        :is="intro.component"
        ref="reveal"
        :still="reduceMotion"
        @ready="selfLit = true"
        @leave="leaveMs = $event"
        @done="finishSplash"
      />
    </div>
  </Teleport>
</template>

<style scoped>
:global(body.splash-is-active) {
  overflow: hidden;
}

.tide-splash {
  /* Kept to the artwork's aspect (LOGO_ASPECT) and within 70% of the height. */
  --logo-width: min(clamp(220px, 26vw, 340px), calc(70vh / 1.2606));
  --logo-height: calc(var(--logo-width) * 1.2606);
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
  color: var(--ivory);
  cursor: pointer;
}

/* Night-blue sea air with warm light gathering where the logo will form. */
.tide-splash__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 42% 38% at 52% 44%, rgb(240 176 92 / .16), transparent 70%),
    radial-gradient(ellipse 90% 75% at 50% 46%, #0f4a5f 0%, var(--navy) 58%, #061f2c 100%);
}

.tide-splash__backdrop::after {
  position: absolute;
  inset: 0;
  content: "";
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  opacity: .14;
}

/* A scene that paints its own sky must not leave this behind when it washes away. */
.tide-splash--self-lit .tide-splash__backdrop {
  display: none;
}

/* The exit uncovers the page while the reveal plays out over it. */
.tide-splash--leaving {
  pointer-events: none;
}

.tide-splash--leaving .tide-splash__backdrop {
  opacity: 0;
  /* Hold the night a beat so the logo visibly breaks apart before the page shows. */
  transition: opacity calc(var(--leave-ms) * .75) cubic-bezier(.4, 0, .2, 1) calc(var(--leave-ms) * .25);
}

@keyframes tide-reduced-fade {
  from { opacity: 1; }
  to { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .tide-splash--reduced {
    animation: tide-reduced-fade 280ms ease 160ms both !important;
  }
}
</style>
