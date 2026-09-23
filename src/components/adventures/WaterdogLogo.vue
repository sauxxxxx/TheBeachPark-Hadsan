<script setup>
import waterdogLogo from '../../assets/images/brands/waterdog-logo.png'

defineProps({
  overlay: { type: Boolean, default: false },
  decorative: { type: Boolean, default: false },
})
</script>

<template>
  <span class="waterdog-mark" :class="{ 'waterdog-mark--overlay': overlay }">
    <img
      :src="waterdogLogo"
      :alt="decorative ? '' : 'Waterdog Watersports and Adventures'"
      width="800"
      height="250"
      loading="eager"
      decoding="async"
    />
  </span>
</template>
