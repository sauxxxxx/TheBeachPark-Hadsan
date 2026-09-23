<script setup>
import { computed } from 'vue'
import DisclosureList from '../components/shared/DisclosureList.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import ScrollStory from '../components/home/ScrollStory.vue'
import StayHero from '../components/stay/StayHero.vue'
import { commonFaqs, roomAmenities, roomHeroImageUrl, rooms } from '../data/siteContent'

const photographed = computed(() => rooms.filter((room) => room.images.length))
const unphotographed = computed(() => rooms.filter((room) => !room.images.length))
const noPetsRooms = computed(() => rooms.filter((room) => !room.petsAllowed).map((room) => room.name))

function sleeps(room) {
  if (!room.maxOccupancy) return ''
  return room.maxOccupancy === 1 ? 'Sleeps 1' : `Sleeps up to ${room.maxOccupancy}`
}

function area(room) {
  return room.size?.unit === 'square_metre' ? `${room.size.value} m²` : ''
}
</script>

<template>
  <StayHero />

  <ScrollStory
    compact
    label="The feeling of staying at The Beach Park"
    story="Stay close enough for the beach to set the pace. Wake slowly, step outside, and let a simple room become the place where families, friends, and the whole barkada come back together."
  />

  <section class="page-section page-shell intro-spread">
    <div><h2 data-lines>Thirteen ways to stay.</h2></div>
    <p data-reveal>Whether you are travelling as a couple, a family, or a barkada, every room sits within the same short walk of the beach. Live rates and availability are held in the booking system rather than fixed here.</p>
  </section>

  <section id="rooms" class="room-grid page-shell" aria-label="Room types" data-sequence>
    <article v-for="room in photographed" :key="room.slug" class="room-card">
      <RouterLink class="room-card__link" :to="`/stay/room-details/${room.slug}/`">
        <div class="room-card__image" data-image-expand>
          <img :src="roomHeroImageUrl(room)" :alt="`${room.name} at The Beach Park Hadsan`" width="1600" height="1000" loading="lazy" />
        </div>
        <p class="room-card__meta">{{ [sleeps(room), area(room)].filter(Boolean).join(' · ') }}</p>
        <h2>{{ room.name }}</h2>
        <p v-if="room.description" class="room-card__summary">{{ room.description }}</p>
        <span class="room-card__cta">View room details</span>
      </RouterLink>
    </article>
  </section>

  <section v-if="unphotographed.length" class="page-section page-shell">
    <div class="intro-spread">
      <div><h2>Also bookable.</h2></div>
      <p>These room types are available in the booking system. We have not published photographs of them yet.</p>
    </div>
    <ul class="room-plain" data-sequence>
      <li v-for="room in unphotographed" :key="room.slug">
        <RouterLink :to="`/stay/room-details/${room.slug}/`">
          <strong>{{ room.name }}</strong>
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
