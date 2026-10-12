<script setup>
import { LOGO_VIEWBOX, logoLayers } from './hadsanLogoPieces'

const layers = logoLayers()
</script>

<template>
  <svg :viewBox="LOGO_VIEWBOX.join(' ')" role="img" aria-label="The Beach Park Hadsan">
    <path
      v-for="layer in layers"
      :key="layer.fill"
      :d="layer.d"
      :fill="layer.fill"
      fill-rule="evenodd"
    />
  </svg>
</template>
