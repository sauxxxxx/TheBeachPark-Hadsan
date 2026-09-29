<script setup>
import BookingLink from '../components/shared/BookingLink.vue'
import PageHero from '../components/shared/PageHero.vue'
import oceanfrontDeck from '../assets/images/real/rooms/oceanfront-deck-room-4.webp'
import { specialOffers } from '../data/siteContent'
</script>

<template>
  <PageHero eyebrow="Offers" title="Current offers." lede="Find the right stay for your dates." :image="oceanfrontDeck" image-alt="Oceanfront deck overlooking the water at The Beach Park">
    <BookingLink label="Check dates" context="offers_hero" variant="light" />
  </PageHero>

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

  <section class="source-note page-shell"><p>Offers apply to direct bookings and can change with dates and availability. The booking system shows the conditions that apply to your stay.</p></section>

  <section class="editorial-cta"><div class="page-shell editorial-cta__inner"><div><h2>See what is bookable now.</h2></div><div><p>Continue to the booking connection for current rate plans, inclusions, and terms.</p><BookingLink label="Check dates &amp; offers" context="offers_footer" /></div></div></section>
</template>
