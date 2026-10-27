<script setup>
import { useExelyWidget } from '../../composables/useExelyWidget'
import { property } from '../../data/siteContent'

const props = defineProps({
  type: { type: String, required: true },
  label: { type: String, required: true },
})
const { container, containerId, loading, unavailable, retry } = useExelyWidget(props.type)
</script>

<template>
  <div class="exely-widget" :class="{ 'is-loading': loading, 'is-unavailable': unavailable }" :aria-label="label" :aria-busy="loading" data-lenis-prevent>
    <div :id="containerId" ref="container" class="exely-widget__mount"></div>
    <p v-if="loading" class="exely-widget__status" role="status">Loading {{ label.toLowerCase() }}…</p>
    <div v-if="unavailable" class="exely-widget__fallback" role="status">
      <p>{{ label }} is temporarily unavailable.</p>
      <button type="button" @click="retry">Try again</button>
      <a :href="property.phoneHref">Call reservations</a>
    </div>
  </div>
</template>
