<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { loadLogoBitmap } from './logoBitmap'
import { createSandField } from './sandField'

const props = defineProps({
  // Reduced motion: show the finished logo and leave timing to the parent.
  still: { type: Boolean, default: false },
})
const emit = defineEmits(['leave', 'done'])

const LAND_MS = 1950 // crisp logo starts covering the settling grains
const HOLD_MS = 2900 // storm start → departure
const LEAVE_MS = 850
const SKIP_MS = 450

const canvas = ref(null)
const logo = ref(null)
const phase = ref(props.still ? 'still' : 'loading') // loading | storm | fallback | leaving | still
const landed = ref(false)
const particles = ref(false)

let field
let leaving = false
const timers = []

const later = (fn, ms) => timers.push(window.setTimeout(fn, ms))
const wait = (ms) => new Promise((done) => window.setTimeout(done, ms))

// The crisp logo is a canvas at device resolution; grains sample a 2x copy.
async function paintLogo() {
  const rect = logo.value.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const bitmap = await loadLogoBitmap(rect.width * dpr, rect.height * dpr)
  logo.value.width = bitmap.width
  logo.value.height = bitmap.height
  logo.value.getContext('2d').drawImage(bitmap, 0, 0)
  return rect
}

async function buildField(rect) {
  const image = await loadLogoBitmap(rect.width * 2, rect.height * 2)
  const modest = window.innerWidth < 800 || (navigator.hardwareConcurrency || 8) <= 4
  return createSandField(canvas.value, { image, rect, count: modest ? 10000 : 22000 })
}

async function leave(duration) {
  if (leaving || props.still) return
  leaving = true
  timers.forEach(window.clearTimeout)
  phase.value = 'leaving'
  emit('leave', duration)
  await (field ? field.exit(duration) : wait(duration))
  emit('done')
}

onMounted(async () => {
  const rect = await paintLogo()
  if (props.still) return
  try {
    field = await buildField(rect)
  } catch {
    field = null
  }
  if (leaving) {
    field?.destroy()
    field = null
    return
  }

  if (field) {
    particles.value = true
    phase.value = 'storm'
    field.start()
    later(() => { landed.value = true }, LAND_MS)
    // Once the crisp logo fully covers them, stop drawing the landed grains.
    later(() => field.hide(true), LAND_MS + 500)
  } else {
    phase.value = 'fallback'
  }
  later(() => leave(LEAVE_MS), HOLD_MS)
})

onBeforeUnmount(() => {
  timers.forEach(window.clearTimeout)
  field?.destroy()
})

defineExpose({ skip: () => leave(SKIP_MS) })
</script>

<template>
  <div
    class="sand-reveal"
    :class="[`sand-reveal--${phase}`, { 'is-landed': landed, 'has-particles': particles }]"
  >
    <canvas ref="canvas" class="sand-reveal__canvas" aria-hidden="true"></canvas>
    <div class="sand-reveal__stage">
      <span class="sand-reveal__glow" aria-hidden="true"></span>
      <canvas ref="logo" class="sand-reveal__mark" role="img" aria-label="The Beach Park Hadsan"></canvas>
    </div>
  </div>
</template>

<style scoped>
.sand-reveal {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.sand-reveal__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sand-reveal__stage {
  position: relative;
  width: var(--logo-width);
  height: var(--logo-height);
  transform: translateY(-2vh);
}

.sand-reveal__mark {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform-origin: 50% 60%;
}

/* Centred on the sun in the artwork (LOGO_SUN). */
.sand-reveal__glow {
  position: absolute;
  top: 18.2%;
  left: 63.8%;
  width: 170%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgb(255 220 140 / .55) 0%,
    rgb(255 184 92 / .2) 28%,
    rgb(255 160 70 / 0) 62%
  );
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.sand-reveal--still .sand-reveal__mark {
  opacity: 1;
}

.is-landed .sand-reveal__mark {
  animation:
    mark-land 450ms cubic-bezier(.16, 1, .3, 1) both,
    mark-breathe 1100ms ease-in-out 450ms both;
}

.is-landed .sand-reveal__glow {
  animation: glow-pulse 1500ms cubic-bezier(.16, 1, .3, 1) both;
}

.sand-reveal--fallback .sand-reveal__mark {
  animation: mark-fade 800ms cubic-bezier(.16, 1, .3, 1) 150ms both;
}

/* Particles take over from the crisp logo the moment the gust arrives. */
.sand-reveal--leaving.has-particles .sand-reveal__mark {
  animation: none;
  opacity: 0;
}

.sand-reveal--leaving:not(.has-particles) .sand-reveal__mark {
  animation: mark-out 400ms ease-in both;
}

.sand-reveal--leaving .sand-reveal__glow {
  animation: glow-out 500ms ease-out both;
}

@keyframes mark-land {
  from { opacity: 0; filter: brightness(1.7) saturate(1.2); }
  to { opacity: 1; filter: none; }
}

@keyframes mark-breathe {
  from { opacity: 1; transform: none; }
  to { opacity: 1; transform: scale(1.012); }
}

@keyframes glow-pulse {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(.45); }
  22% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
  100% { opacity: .5; transform: translate(-50%, -50%) scale(1); }
}

@keyframes glow-out {
  from { opacity: .5; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -50%) scale(1.25); }
}

@keyframes mark-fade {
  from { opacity: 0; transform: translateY(16px) scale(.97); }
  to { opacity: 1; transform: none; }
}

@keyframes mark-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
