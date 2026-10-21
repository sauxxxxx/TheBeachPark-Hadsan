<script setup>
import { computed, ref } from 'vue'
import BookingLink from '../shared/BookingLink.vue'

const props = defineProps({
  offers: { type: Array, required: true },
  cookieHeight: { type: Number, default: 0 },
})
const emit = defineEmits(['close'])
const active = ref(0)
const offer = computed(() => props.offers[active.value])

function next() {
  active.value = (active.value + 1) % props.offers.length
}
</script>

<template>
  <aside
    class="offer-teaser"
    :style="{ '--cookie-height': `${cookieHeight}px` }"
    aria-label="Booking offers"
    data-lenis-prevent
    @keydown.esc="emit('close')"
  >
    <button class="offer-teaser__close" type="button" aria-label="Close booking offer" @click="emit('close')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </button>
    <div class="offer-teaser__slide" aria-live="polite" aria-atomic="true">
      <div class="offer-teaser__visual">
        <img :src="offer.image" :alt="offer.imageAlt" :style="{ objectPosition: offer.imagePosition }" width="400" height="600" />
        <span>{{ offer.highlight }}</span>
      </div>
      <div class="offer-teaser__copy">
        <p class="offer-teaser__eyebrow">{{ offer.eyebrow }}</p>
        <h2>{{ offer.title }}</h2>
        <p class="offer-teaser__description">{{ offer.description }}</p>
        <BookingLink :to="offer.to" :label="offer.label" :context="`promotion_teaser_${offer.id}`" @click="emit('close')" />
      </div>
    </div>
    <div class="offer-teaser__controls">
      <span>Stay a little closer to the sea.</span>
      <div class="offer-teaser__dots" role="group" aria-label="Choose an offer">
        <button
          v-for="(item, index) in offers"
          :key="item.id"
          type="button"
          :aria-label="`Show offer ${index + 1}: ${item.title}`"
          :aria-pressed="active === index"
          @click="active = index"
        ><i aria-hidden="true"></i></button>
      </div>
      <button class="offer-teaser__next" type="button" aria-label="Next offer" @click="next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.offer-teaser {
  --promotion-gap: 24px;
  --promotion-bottom: calc(var(--cookie-height, 0px) + max(var(--promotion-gap), env(safe-area-inset-bottom)));
  position: fixed;
  right: max(24px, env(safe-area-inset-right));
  bottom: var(--promotion-bottom);
  z-index: 45;
  width: 440px;
  max-width: calc(100% - 32px);
  max-height: calc(100svh - var(--promotion-bottom) - 16px);
  overflow-y: auto;
  background: var(--paper);
  box-shadow: 0 12px 48px rgb(6 34 46 / .2);
}

.offer-teaser__close {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 0;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
}

.offer-teaser__close svg { width: 19px; height: 19px; }
.offer-teaser__slide { display: grid; grid-template-columns: 140px 1fr; }
.offer-teaser__visual { position: relative; min-height: 245px; overflow: hidden; }
.offer-teaser__visual img { width: 100%; height: 100%; object-fit: cover; }
.offer-teaser__visual span {
  position: absolute;
  bottom: 15px;
  left: 12px;
  padding: 7px 12px;
  background: var(--paper);
  color: var(--coral-deep);
  font-size: 15px;
  font-weight: 500;
}

.offer-teaser__copy { padding: 25px 26px 24px; }
.offer-teaser__eyebrow { max-width: 24ch; margin-bottom: 10px; color: var(--muted); font-size: 10px; line-height: 1.4; }
.offer-teaser h2 { margin-bottom: 12px; color: var(--navy); font-size: 32px; }
.offer-teaser__description { margin-bottom: 18px; font-size: 12px; line-height: 1.6; }
.offer-teaser .button { width: 100%; padding-inline: 12px; background: var(--coral); border-color: var(--coral); }
.offer-teaser .button:hover { background: var(--coral-deep); border-color: var(--coral-deep); }
.offer-teaser__controls { display: flex; min-height: 46px; align-items: center; justify-content: space-between; padding-left: 17px; border-top: 1px solid var(--line); }
.offer-teaser__controls > span { color: var(--muted); font-size: 10px; }
.offer-teaser__dots { display: flex; }
.offer-teaser__dots button { display: grid; width: 44px; height: 44px; place-items: center; border: 0; padding: 0; background: transparent; cursor: pointer; }
.offer-teaser__dots i { width: 6px; height: 6px; border-radius: 50%; background: var(--line); }
.offer-teaser__dots [aria-pressed="true"] i { background: var(--coral); }
.offer-teaser__next { display: grid; width: 46px; height: 46px; place-items: center; border: 0; background: transparent; color: var(--navy); cursor: pointer; }
.offer-teaser__next svg { width: 23px; height: 23px; transition: transform 220ms ease; }
.offer-teaser__next:hover svg { transform: translateX(3px); }

@media (max-width: 540px) {
  .offer-teaser { --promotion-gap: 16px; right: 16px; }
  .offer-teaser__slide { grid-template-columns: 100px 1fr; }
  .offer-teaser__visual { min-height: 210px; }
  .offer-teaser__visual span { left: 8px; bottom: 12px; padding: 5px 8px; font-size: 12px; }
  .offer-teaser__copy { padding: 21px 20px 18px; }
  .offer-teaser h2 { font-size: 28px; }
  .offer-teaser__description { margin-bottom: 12px; }
}

</style>
