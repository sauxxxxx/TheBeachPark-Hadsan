<script setup>
import { computed } from 'vue'
import DisclosureList from '../components/shared/DisclosureList.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import ScrollStory from '../components/home/ScrollStory.vue'
import StayHero from '../components/stay/StayHero.vue'
import { isRoomBestseller, roomCapacity, roomRateLabel, roomRateVerifiedLabel } from '../data/roomBookingFacts'
import { commonFaqs, roomAmenities, roomHeroImageUrl, rooms } from '../data/siteContent'

const photographed = computed(() => rooms.filter((room) => room.images.length))
const unphotographed = computed(() => rooms.filter((room) => !room.images.length))
const noPetsRooms = computed(() => rooms.filter((room) => !room.petsAllowed).map((room) => room.name))

function sleeps(room) {
  const capacity = roomCapacity(room)
  if (!capacity) return ''
  return capacity === 1 ? 'Sleeps 1' : `Sleeps up to ${capacity}`
}

function area(room) {
  return room.size?.unit === 'square_metre' ? `${room.size.value} m²` : ''
}
</script>

<template>
  <StayHero />

  <ScrollStory
    label="The feeling of staying at The Beach Park"
    title="Stay by the shore."
    :story="'Stay close enough for the beach to set the pace. Wake slowly, step outside, and let the day begin by the water.\n\nA simple room gives families, friends, and the whole barkada a place to come back together.'"
  />

  <section class="page-section page-shell intro-spread">
    <div><h2 data-lines>Thirteen ways to stay.</h2></div>
    <p data-reveal>Whether you are travelling as a couple, a family, or a barkada, every room sits within the same short walk of the beach. Monday–Thursday room-only starting rates are shown below; <RouterLink to="/rates/">see all rate plans</RouterLink> for breakfast, weekends, and day use.</p>
  </section>

  <section id="rooms" class="room-grid page-shell" aria-label="Room types" data-sequence>
    <article v-for="room in photographed" :key="room.slug" class="room-card">
      <RouterLink class="room-card__link" :to="`/stay/room-details/${room.slug}/`">
        <div class="room-card__image" data-image-expand>
          <img :src="roomHeroImageUrl(room)" :alt="`${room.name} at The Beach Park Hadsan`" width="1600" height="1000" loading="lazy" />
          <span v-if="isRoomBestseller(room)" class="room-card__badge">Bestseller</span>
        </div>
        <p class="room-card__meta">{{ [sleeps(room), area(room)].filter(Boolean).join(' · ') }}</p>
        <h2>{{ room.name }}</h2>
        <p class="room-card__rate">{{ roomRateLabel(room) }}</p>
        <p v-if="room.description" class="room-card__summary">{{ room.description }}</p>
        <span class="room-card__cta">View room details</span>
      </RouterLink>
    </article>
    <p class="room-rate-note">Starting rates supplied by The Beach Park in {{ roomRateVerifiedLabel }} for Monday–Thursday room-only stays. <RouterLink to="/rates/">View full rates</RouterLink>. Confirm the final quote and availability with the property.</p>
  </section>

  <section v-if="unphotographed.length" class="page-section page-shell">
    <div class="intro-spread">
      <div><h2>More room options.</h2></div>
      <p>Photos aren’t available for these rooms yet. Contact our team for details and availability.</p>
    </div>
    <ul class="room-plain" data-sequence>
      <li v-for="room in unphotographed" :key="room.slug">
        <RouterLink :to="`/stay/room-details/${room.slug}/`">
          <span class="room-plain__name"><strong>{{ room.name }}</strong><small>{{ roomRateLabel(room) }}</small></span>
          <span>{{ [sleeps(room), area(room)].filter(Boolean).join(' · ') }}</span>
        </RouterLink>
      </li>
    </ul>
  </section>

  <section class="page-section page-shell intro-spread">
    <div><h2>In every room.</h2></div>
    <div data-reveal>
      <ul class="plain-list">
        <li v-for="amenity in roomAmenities" :key="amenity">{{ amenity }}</li>
      </ul>
      <p class="room-note">
        Pets are welcome in most rooms<template v-if="noPetsRooms.length">, though not in {{ noPetsRooms.join(' or ') }}</template>.
        Bed configuration is confirmed at booking.
      </p>
    </div>
  </section>

  <DisclosureList title="Before you book" :items="commonFaqs" />
  <EditorialCta title="Make the beach part of the stay." copy="Check current room availability, rates, inclusions, and policies for your dates." context="stay_footer" />
</template>
