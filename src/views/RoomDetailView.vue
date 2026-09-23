<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BookingLink from '../components/shared/BookingLink.vue'
import EditorialImage from '../components/EditorialImage.vue'
import GalleryLightbox from '../components/gallery/GalleryLightbox.vue'
import { roomAmenities, roomHeroImageUrl, roomImageFiles, roomImageSourceLabel, roomImageUrl, rooms, verifiedImages } from '../data/siteContent'

const route = useRoute()
const room = computed(() => rooms.find((item) => item.slug === route.params.slug) || rooms[0])
const activeIndex = ref(0)
const lightboxOpen = ref(false)

const images = computed(() => roomImageFiles(room.value))
const heroImage = computed(() => images.value.length ? roomImageUrl(images.value[0]) : verifiedImages.poolside)
const area = computed(() => room.value.size?.unit === 'square_metre' ? `${room.value.size.value} m²` : '')
const facts = computed(() => [
  room.value.maxOccupancy ? `Sleeps up to ${room.value.maxOccupancy}` : '',
  area.value,
  room.value.petsAllowed ? 'Pets welcome' : 'No pets',
].filter(Boolean))
const descriptionLines = computed(() => {
  const text = (room.value.description || '').trim()
  if (text) return text.split(/\n+/).map((line) => line.trim()).filter(Boolean)
  const size = area.value ? `A ${area.value} room` : 'A practical room'
  const capacity = room.value.maxOccupancy ? ` for up to ${room.value.maxOccupancy} guests` : ''
  return [`${size}${capacity}, within easy reach of the beach and the rest of the property.`]
})
const introDescription = computed(() => {
  const text = descriptionLines.value[0]
  const sentenceEnd = text.search(/[.!?](?:\s|$)/)
  return sentenceEnd === -1 ? text : text.slice(0, sentenceEnd + 1)
})
const roomDetails = computed(() => [
  { label: 'Capacity', value: room.value.maxOccupancy ? `Up to ${room.value.maxOccupancy} guests` : 'Confirm with the reservations team' },
  { label: 'Floor area', value: area.value || 'Confirm with the reservations team' },
  { label: 'Pet policy', value: room.value.petsAllowed ? 'Pets welcome' : 'Pets are not permitted' },
])
const galleryItems = computed(() => images.value.map((file, index) => ({
  src: roomImageUrl(file),
  alt: `${room.value.name} at The Beach Park Hadsan, photograph ${index + 1}`,
  title: room.value.name,
  sourceLabel: roomImageSourceLabel(file),
})))
const galleryPreviewItems = computed(() => galleryItems.value.slice(0, 4))
const otherRooms = computed(() => rooms
  .filter((item) => item.slug !== room.value.slug && item.images.length)
  .slice(0, 3))

watch(() => room.value.slug, () => {
  activeIndex.value = 0
  lightboxOpen.value = false
})

function showImage(index) {
  const count = images.value.length
  if (!count) return
  activeIndex.value = (index + count) % count
}

function openGallery(index = 0) {
  showImage(index)
  lightboxOpen.value = Boolean(galleryItems.value.length)
}

function roomMeta(item) {
  const capacity = item.maxOccupancy ? `Sleeps up to ${item.maxOccupancy}` : ''
  const size = item.size?.unit === 'square_metre' ? `${item.size.value} m²` : ''
  return [capacity, size].filter(Boolean).join(' · ')
}
</script>

<template>
  <article class="room-page">
    <div class="room-visual-lead page-shell">
      <header class="room-hero">
        <button class="room-hero__media" type="button" :aria-label="`Open photograph 1 of ${Math.max(images.length, 1)}`" :disabled="!galleryItems.length" @click="openGallery(0)">
          <EditorialImage :src="heroImage" :alt="`${room.name} at The Beach Park Hadsan`" :width="2000" :height="1500" eager />
        </button>

        <div class="room-intro">
          <RouterLink class="room-intro__back" to="/stay/">
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true"><path d="m11 4-5 5 5 5" /></svg>
            All rooms
          </RouterLink>
          <h1>{{ room.name }}</h1>
          <ul>
            <li v-for="fact in facts" :key="fact">{{ fact }}</li>
          </ul>
          <p>{{ introDescription }}</p>
          <BookingLink label="Check availability" context="room_detail_intro" />
        </div>
      </header>

      <section v-if="galleryPreviewItems.length" class="room-gallery" aria-label="Room photographs">
        <button type="button" class="room-gallery__open" @click="openGallery(0)">View all {{ galleryItems.length }} photos</button>
        <div class="room-gallery__grid" :class="`has-${galleryPreviewItems.length}`">
          <button v-for="(item, index) in galleryPreviewItems" :key="item.src" type="button" :aria-label="`Open photograph ${index + 1} of ${galleryItems.length}`" @click="openGallery(index)">
            <EditorialImage :src="item.src" :alt="item.alt" :width="index === 0 ? 1600 : 900" :height="index === 0 ? 1800 : 700" />
            <span>{{ String(index + 1).padStart(2, '0') }} / {{ String(galleryItems.length).padStart(2, '0') }}</span>
          </button>
        </div>
      </section>
    </div>

    <section class="room-story page-shell">
      <div class="room-story__copy">
        <h2>A relaxed base by the water.</h2>
        <p>{{ descriptionLines[0] }}</p>
      </div>
      <dl class="room-story__facts">
        <div v-for="detail in roomDetails" :key="detail.label">
          <dt>{{ detail.label }}</dt>
          <dd>{{ detail.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="room-amenities">
      <div class="room-amenities__inner page-shell">
        <div class="room-amenities__copy">
          <h2>Comforts for an easy stay.</h2>
          <p>These property amenities are published across The Beach Park stay experience. Specific room arrangements are confirmed during booking.</p>
        </div>
        <ul>
          <li v-for="amenity in roomAmenities" :key="amenity">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
            <span>{{ amenity }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="room-experience">
      <EditorialImage class="room-experience__image" :src="verifiedImages.beachDay" alt="Guests enjoying the shoreline at The Beach Park Hadsan" :width="1800" :height="1300" />
      <div class="room-experience__copy">
        <h2>The room is only the beginning.</h2>
        <p>Step outside into the same easy-going beach setting as shoreline time, café stops, and Waterdog adventures. Current access, schedules, and activity availability can be confirmed before your visit.</p>
        <div class="room-experience__links">
          <RouterLink class="text-link" to="/experiences/">Explore beach days</RouterLink>
          <RouterLink class="text-link" to="/adventures/">See water activities</RouterLink>
        </div>
      </div>
    </section>

    <section class="room-booking page-shell">
      <div class="room-booking__copy">
        <h2>Ready to check your dates?</h2>
        <p>Current availability, rates, inclusions, and booking policies are maintained in the official booking system.</p>
        <BookingLink label="Check availability" context="room_detail_footer" />
      </div>
      <ul class="room-booking__notes">
        <li><strong>Live availability</strong><span>See current dates and rates in Exely.</span></li>
        <li><strong>Room arrangements</strong><span>Bed configuration and final room assignment are confirmed there.</span></li>
        <li><strong>Booking terms</strong><span>Rate-plan inclusions, payment terms, and policies stay up to date there.</span></li>
      </ul>
    </section>

    <section class="room-related page-shell">
      <div class="room-related__heading">
        <h2>Other rooms</h2>
        <RouterLink class="text-link" to="/stay/">View all rooms</RouterLink>
      </div>
      <div class="room-related__grid">
        <RouterLink v-for="item in otherRooms" :key="item.slug" :to="`/stay/room-details/${item.slug}/`">
          <EditorialImage :src="roomHeroImageUrl(item)" :alt="`${item.name} at The Beach Park Hadsan`" :width="1000" :height="750" />
          <span>{{ roomMeta(item) }}</span>
          <h3>{{ item.name }}</h3>
        </RouterLink>
      </div>
    </section>

    <GalleryLightbox v-if="lightboxOpen" :images="galleryItems" :active-index="activeIndex" @close="lightboxOpen = false" @change="showImage" />
  </article>
</template>
