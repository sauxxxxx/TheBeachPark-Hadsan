<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EditorialCta from '../components/shared/EditorialCta.vue'
import PageHero from '../components/shared/PageHero.vue'
import { property, verifiedImages } from '../data/siteContent'

const route = useRoute()
const isBeans = computed(() => route.meta.venue === 'beans')
const venue = computed(() => isBeans.value ? {
  eyebrow: 'Beans & Paddles Café', title: 'Coffee, then coast.',
  lede: 'A cheerful café stop for easing into your Beach Park day.',
  image: verifiedImages.beansCafe, alt: 'Authentic exterior of Beans & Paddles Café',
} : {
  eyebrow: 'Sharky’s Café', title: 'An easy table in the middle of it all.',
  lede: 'A casual dining stop designed to fit naturally into a day at The Beach Park.',
  image: verifiedImages.beachDay, alt: 'Guests enjoying the shoreline at The Beach Park',
})
</script>

<template>
  <PageHero :eyebrow="venue.eyebrow" :title="venue.title" :lede="venue.lede" :image="venue.image" :image-alt="venue.alt" />
  <section class="page-section page-shell venue-details">
    <div>
      <p class="overline">The mood</p>
      <h2 data-lines>{{ isBeans ? 'A warm pause before the next splash.' : 'Casual food, Beach Park energy.' }}</h2>
      <p>{{ isBeans ? 'Drop in for coffee and an unhurried break. Authentic café photography remains at the center of this page.' : 'Sharky’s is presented without borrowed restaurant imagery or an unverified menu. Official local photography will be added once approved.' }}</p>
    </div>
    <aside class="fact-panel">
      <p class="overline">Plan your visit</p>
      <dl>
        <div><dt>Hours</dt><dd>{{ isBeans ? '10:00 AM–7:00 PM' : 'Confirm directly' }}</dd></div>
        <div><dt>Location</dt><dd>{{ property.location }}</dd></div>
        <div><dt>Menu & tables</dt><dd>Confirm directly</dd></div>
      </dl>
      <a class="button button--outline button--small" :href="property.phoneHref">Call {{ property.phone }}</a>
    </aside>
  </section>
  <EditorialCta title="Put it on your beach-day plan." copy="Build a relaxed itinerary around food, water, and time together." context="venue_footer" secondary-label="Build your beach day" secondary-to="/experiences/" />
</template>
