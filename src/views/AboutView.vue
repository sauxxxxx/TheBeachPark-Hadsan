<script setup>
import EditorialCta from '../components/shared/EditorialCta.vue'
import PageHero from '../components/shared/PageHero.vue'
import ScrollStory from '../components/home/ScrollStory.vue'
import { verifiedImages } from '../data/siteContent'
</script>

<template>
  <PageHero eyebrow="About The Beach Park" title="More clubhouse than hideaway." lede="A warm, cheerful place in Hadsan where a room, a meal, and time on the water belong to the same story." :image="verifiedImages.beachAerial" image-alt="Aerial view of The Beach Park and the Hadsan coast" />
  <ScrollStory
    compact
    label="The Beach Park spirit"
    story="This is a place for arriving as you are. Families settle in, friends gather by the water, and ordinary hours turn into the kind of memories that feel unmistakably Hadsan."
  />
  <section class="page-section page-shell about-manifesto">
    <p class="script-line">Mabuhay by the water.</p>
    <h2 data-lines>Made for together.</h2>
    <div data-reveal><p>The Beach Park is presented as a connected Cebu beach destination: a place to stay, eat, swim, paddle, ride, gather, and slow down without turning the experience into something overly formal.</p><p>Its personality comes from real people and real property photography—family-friendly, barkada-ready, playful, and local.</p></div>
  </section>
  <section class="value-band">
    <div class="page-shell" data-sequence><article><h3>Warm over formal</h3></article><article><h3>Active or easy</h3></article><article><h3>Better together</h3></article></div>
  </section>
  <EditorialCta title="Come for your version of the day." copy="There is room for coffee, a swim, a ride, a meal, or all of it." context="about_footer" />
</template>
