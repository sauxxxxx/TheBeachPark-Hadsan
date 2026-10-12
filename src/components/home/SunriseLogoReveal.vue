<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { loadLogoBitmap } from './logoBitmap'
import { SUNRISE, createSunriseScene, sceneDpr } from './sunriseScene'

const props = defineProps({
  // Reduced motion: show the finished logo and leave timing to the parent.
  still: { type: Boolean, default: false },
})
// `ready` means the scene paints its own sky over the splash backdrop.
const emit = defineEmits(['ready', 'leave', 'done'])

const canvas = ref(null)
const stage = ref(null)
const mark = ref(null)
const phase = ref(props.still ? 'still' : 'loading') // loading | scene | fallback | leaving | still

let scene
let leaving = false
const timers = []
const wait = (ms) => new Promise((done) => window.setTimeout(done, ms))

async function paintMark(rect) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const bitmap = await loadLogoBitmap(rect.width * dpr, rect.height * dpr)
  mark.value.width = bitmap.width
  mark.value.height = bitmap.height
  mark.value.getContext('2d').drawImage(bitmap, 0, 0)
}

// Fallback path only; the scene runs its own wave.
async function leave(duration) {
  if (leaving || props.still) return
  leaving = true
  timers.forEach(window.clearTimeout)
  phase.value = 'leaving'
  emit('leave', duration)
  await wait(duration)
  emit('done')
}

onMounted(async () => {
  const rect = stage.value.getBoundingClientRect()
  if (props.still) {
    await paintMark(rect)
    return
  }

  try {
    const dpr = sceneDpr(window.innerWidth, window.innerHeight)
    const logo = await loadLogoBitmap(rect.width * dpr, rect.height * dpr)
    if (leaving) return
    scene = createSunriseScene(canvas.value, {
      logo,
      rect,
      dpr,
      modest: window.innerWidth < 800 || (navigator.hardwareConcurrency || 8) <= 4,
      onLeave: (ms) => emit('leave', ms),
    })
  } catch {
    scene = null
  }
  if (leaving) return

  if (scene) {
    phase.value = 'scene'
    emit('ready')
    scene.start().then(() => emit('done'))
  } else {
    phase.value = 'fallback'
    await paintMark(rect)
    timers.push(window.setTimeout(() => leave(SUNRISE.leave * 1000), SUNRISE.leaveAt * 1000))
  }
})

onBeforeUnmount(() => {
  timers.forEach(window.clearTimeout)
  scene?.destroy()
})

defineExpose({
  skip: () => (scene ? scene.skip() : leave(SUNRISE.skip * 1000)),
})
</script>

<template>
  <div class="sunrise-reveal" :class="`sunrise-reveal--${phase}`">
    <canvas ref="canvas" class="sunrise-reveal__scene" aria-hidden="true"></canvas>
    <div ref="stage" class="sunrise-reveal__stage">
      <canvas ref="mark" class="sunrise-reveal__mark" role="img" aria-label="The Beach Park Hadsan"></canvas>
    </div>
  </div>
</template>

<style scoped>
.sunrise-reveal {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.sunrise-reveal__scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Sizes the logo; the scene draws it, the mark is only for the fallbacks. */
.sunrise-reveal__stage {
  position: relative;
  width: var(--logo-width);
  height: var(--logo-height);
  transform: translateY(-2vh);
}

.sunrise-reveal__mark {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.sunrise-reveal--still .sunrise-reveal__mark {
  opacity: 1;
}

.sunrise-reveal--fallback .sunrise-reveal__mark {
  animation: mark-rise 900ms cubic-bezier(.16, 1, .3, 1) 150ms both;
}

.sunrise-reveal--leaving .sunrise-reveal__mark {
  animation: mark-out 400ms ease-in both;
}

@keyframes mark-rise {
  from { opacity: 0; transform: translateY(16px) scale(.97); }
  to { opacity: 1; transform: none; }
}

@keyframes mark-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
