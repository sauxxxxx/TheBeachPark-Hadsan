<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({ label: { type: String, required: true }, anchor: { type: Object, required: true } })
const emit = defineEmits(['close'])
const dialog = ref(null)
const position = ref({})

function place() {
  const width = Math.min(340, window.innerWidth - 32)
  const box = props.anchor.getBoundingClientRect()
  const height = Math.min(dialog.value.scrollHeight, window.innerHeight - 32)
  const below = box.bottom + 12
  position.value = {
    width: `${width}px`,
    left: `${Math.max(16, Math.min(box.left, window.innerWidth - width - 16))}px`,
    top: `${Math.max(16, below + height <= window.innerHeight - 16 ? below : box.top - height - 12)}px`,
  }
}

function close() { dialog.value.close() }
function backdrop(event) {
  if (event.target !== dialog.value) return
  const box = dialog.value.getBoundingClientRect()
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close()
}

let observer
onMounted(() => {
  dialog.value.showModal()
  place()
  observer = new ResizeObserver(place)
  observer.observe(dialog.value)
  window.addEventListener('resize', place)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', place)
  dialog.value?.close()
})
defineExpose({ close })
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="booking-panel" :style="position" :aria-label="label" data-lenis-prevent @close="emit('close')" @click="backdrop">
      <div class="booking-panel__heading"><span>{{ label }}</span><button type="button" aria-label="Close selection" @click="close">×</button></div>
      <slot />
    </dialog>
  </Teleport>
</template>
