<script setup>
import EditorialCta from '../components/shared/EditorialCta.vue'
import PageHero from '../components/shared/PageHero.vue'
import { property, verifiedImages } from '../data/siteContent'
</script>

<template>
  <PageHero eyebrow="Souvenir shop" title="Take a little Beach Park feeling home." lede="Leave room for one last stop before the day ends." :image="verifiedImages.beachAerial" image-alt="Aerial view of The Beach Park coast" />
  <section class="page-section page-shell souvenir-story">
    <div class="souvenir-story__mark" aria-hidden="true">Hello,<br />Hadsan.</div>
    <div><p class="overline">On-site stop</p><h2 data-lines>Something to remember the day by.</h2><p>The shop is part of the proposed visitor journey. Current merchandise, stock, prices, payment options, and opening hours still need confirmation, so this page does not present a fictional catalogue.</p><a class="button button--outline button--small" :href="property.phoneHref">Ask what is available</a></div>
  </section>
  <EditorialCta title="Make a memory before the souvenir." copy="Plan the beach, pool, food, and adventure that will give the keepsake its story." context="souvenir_footer" secondary-label="See the gallery" secondary-to="/explore/gallery/" />
</template>
