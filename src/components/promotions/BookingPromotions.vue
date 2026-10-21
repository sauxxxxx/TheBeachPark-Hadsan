<script setup>
import { useBookingPromotions } from '../../composables/useBookingPromotions'
import { bookingPromotions } from '../../data/bookingPromotions'
import PromotionTeaser from './PromotionTeaser.vue'
import PromotionDialog from './PromotionDialog.vue'

const { teaserVisible, dialogOpen, cookieHeight, dismissTeaser, dismissDialog } = useBookingPromotions()
</script>

<template>
  <Teleport to="body">
    <Transition name="promotion-teaser">
      <PromotionTeaser v-if="teaserVisible" :offers="bookingPromotions" :cookie-height="cookieHeight" @close="dismissTeaser" />
    </Transition>
    <PromotionDialog v-if="dialogOpen" :offer="bookingPromotions[1]" @close="dismissDialog" />
  </Teleport>
</template>

<style scoped>
.promotion-teaser-enter-active,
.promotion-teaser-leave-active {
  transition: opacity 320ms ease, transform 420ms var(--ease);
}

.promotion-teaser-enter-from,
.promotion-teaser-leave-to {
  opacity: 0;
  transform: translateY(24px);
}
</style>
