<script setup>
import PageHero from '../components/shared/PageHero.vue'
import speedboatBeach from '../assets/images/real/speedboat-beach.webp'
import { property } from '../data/siteContent'
</script>

<template>
  <PageHero eyebrow="Contact & directions" title="See you in Hadsan." lede="Ask us about stays, day visits, or water activities." :image="speedboatBeach" image-alt="The Beach Park shoreline with a Waterdog boat in clear water" />
  <section class="contact-grid page-shell">
    <article><p class="overline">Call</p><a :href="property.phoneHref">{{ property.phone }}</a><p>For visit details and time-sensitive questions.</p></article>
    <article><p class="overline">Email</p><a :href="property.emailHref">{{ property.email }}</a><p>For reservations and general enquiries.</p></article>
    <article><p class="overline">Find us</p><strong>{{ property.location }}</strong><a class="text-link" :href="property.googleMapsUrl" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></article>
  </section>
  <section class="contact-map" aria-labelledby="contact-map-title">
    <div class="page-shell contact-map__header" data-reveal>
      <div>
        <p class="overline">Directions</p>
        <h2 id="contact-map-title">Find the shoreline.</h2>
      </div>
      <div class="contact-map__address">
        <p>{{ property.location }}</p>
        <a class="text-link" :href="property.googleMapsUrl" target="_blank" rel="noopener noreferrer">Get directions ↗</a>
      </div>
    </div>
    <div class="page-shell contact-map__frame" data-reveal>
      <iframe
        :src="property.googleMapsEmbedUrl"
        title="Google Map showing The Beach Park Hadsan"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
  <section class="page-section page-shell direction-panel">
    <div><p class="overline">Before you leave</p><h2>Confirm the details that can change.</h2></div>
    <ul class="plain-list"><li>Current entrance rules and prices</li><li>Water activity operating hours</li><li>Room availability and booking conditions</li><li>Special arrangements for groups or pets</li></ul>
  </section>
</template>
