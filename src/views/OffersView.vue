<script setup>
import BookingLink from '../components/shared/BookingLink.vue'
import PageHero from '../components/shared/PageHero.vue'
import oceanfrontDeck from '../assets/images/real/rooms/oceanfront-deck-room-4.webp'
import trayCover from '../assets/images/packages/beach-barkada-tray-cover.jpeg'
import barkadaCover from '../assets/images/packages/beach-barkada-cover.jpeg'
import { foodPackageFamilies } from '../data/foodPackages'
import { property, specialOffers } from '../data/siteContent'

const packageImages = {
  'beach-barkada-tray': trayCover,
  'beach-barkada': barkadaCover,
}

function packageEnquiryHref(packageName) {
  const subject = encodeURIComponent(`Beach food package enquiry: ${packageName}`)
  return `${property.emailHref}?subject=${subject}`
}
</script>

<template>
  <PageHero eyebrow="Offers" title="Offers & packages." lede="Stay a little longer, or bring a feast to the beach." :image="oceanfrontDeck" image-alt="Oceanfront deck overlooking the water at The Beach Park">
    <BookingLink label="Check dates" context="offers_hero" variant="light" />
  </PageHero>

  <section class="package-intro page-shell" aria-labelledby="food-packages-title">
    <div><p class="meta">Beach food packages</p><h2 id="food-packages-title">Good food, ready for the whole group.</h2></div>
    <p>Choose a sharing set based on your group size, then contact The Beach Park for the current price and availability.</p>
  </section>

  <section class="package-families" aria-label="Beach Barkada food packages">
    <article v-for="(family, index) in foodPackageFamilies" :key="family.id" class="package-family" :class="{ 'package-family--reverse': index % 2 }">
      <figure class="package-family__visual">
        <img :src="packageImages[family.id]" :alt="`${family.name} package cover — ${family.serves.toLowerCase()}`" loading="lazy" width="1414" height="2000" />
      </figure>
      <div class="package-family__content">
        <header>
          <p class="package-family__meta">{{ family.serves }} · {{ family.traySize }}</p>
          <h2>{{ family.name }}</h2>
          <p>{{ family.intro }}</p>
        </header>

        <div class="package-options">
          <details v-for="(foodPackage, packageIndex) in family.packages" :key="foodPackage.name" class="package-option" :open="packageIndex === 0">
            <summary>
              <span>{{ String(packageIndex + 1).padStart(2, '0') }}</span>
              <strong>{{ foodPackage.name }}</strong>
              <small>{{ foodPackage.serves }}</small>
              <span class="package-option__mark" aria-hidden="true"></span>
            </summary>
            <div class="package-option__body">
              <div><h3>On the table</h3><ul><li v-for="dish in foodPackage.dishes" :key="dish">{{ dish }}</li></ul></div>
              <div><h3>Also included</h3><ul><li v-for="item in family.inclusions" :key="item">{{ item }}</li></ul></div>
            </div>
          </details>
        </div>

        <div class="package-family__action">
          <a class="button" :href="packageEnquiryHref(family.name)">Ask about this package</a>
          <span>Current price confirmed on enquiry</span>
        </div>
      </div>
    </article>
  </section>

  <div class="offer-divider page-shell"><span>Stay offers</span></div>

  <section class="offer-list page-shell" aria-label="Special offers">
    <article v-for="offer in specialOffers" :key="offer.slug" class="offer">
      <div class="offer__head">
        <h2>{{ offer.name }}</h2>
        <!-- Dates are shown so a lapsed promotion reads as dated, not silently wrong. -->
        <p v-if="offer.period" class="offer__period">{{ offer.period }}</p>
      </div>
      <div class="offer__body">
        <p class="offer__lede">{{ offer.lede }}</p>
        <p v-if="offer.detail">{{ offer.detail }}</p>
        <ul v-if="offer.includes.length" class="plain-list">
          <li v-for="item in offer.includes" :key="item">{{ item }}</li>
        </ul>
        <BookingLink label="Book now" context="offer_card" variant="outline" />
      </div>
    </article>
  </section>

  <section class="source-note page-shell"><p>Package dishes and inclusions follow the supplied Beach Barkada materials. Package prices are intentionally withheld until confirmed by The Beach Park. Stay offers can change with dates and availability.</p></section>

  <section class="editorial-cta"><div class="page-shell editorial-cta__inner"><div><h2>See what is bookable now.</h2></div><div><p>Continue to the booking connection for current rate plans, inclusions, and terms.</p><BookingLink label="Check dates &amp; offers" context="offers_footer" /></div></div></section>
</template>
