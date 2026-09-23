<script setup>
import AdventureCatalogue from '../components/adventures/AdventureCatalogue.vue'
import WaterdogLogo from '../components/adventures/WaterdogLogo.vue'
import EditorialImage from '../components/EditorialImage.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import adventuresHero from '../assets/images/generated/adventures-hero-v2.webp'
import { activities, waterdogContact } from '../data/siteContent'
</script>

<template>
  <header class="adventures-hero">
    <EditorialImage
      class="adventures-hero__media"
      data-parallax="0.05"
      :src="adventuresHero"
      alt="Aerial perspective of the Waterdog speedboat leaving The Beach Park shore"
      :width="1800"
      :height="1013"
      eager
    />
    <div class="adventures-hero__content page-shell">
      <WaterdogLogo />
      <h1 data-lines>Take the day offshore.</h1>
      <p>From a quiet paddle to a faster ride, Waterdog brings a different rhythm to the coast.</p>
      <a class="adventures-hero__jump" href="#choose-your-pace">
        Choose your pace
        <span aria-hidden="true"></span>
      </a>
    </div>
  </header>

  <section id="choose-your-pace" class="adventures-intro page-shell" data-reveal>
    <p>The water, at your own pace. Bring the barkada, take the family close to shore, or trade calm water for a little spray. Every activity starts with the same simple decision: how do you want the day to feel? Brochure prices and ride details are listed below. Daily schedules, guest requirements, and weather conditions are confirmed directly with the Waterdog team.</p>
  </section>

  <AdventureCatalogue :activities="activities" />

  <section class="adventures-confirm page-shell">
    <h2 data-lines>Ask first. Then make waves.</h2>
    <div data-reveal>
      <p>Conditions can change throughout the day. Contact the property before arrival to confirm which Waterdog activities are operating and which safety requirements apply.</p>
      <a class="button button--outline" :href="waterdogContact.phoneHref">Confirm with Waterdog</a>
    </div>
  </section>

  <EditorialCta
    title="Water first, then whatever feels right."
    copy="Add an adventure to your day plan, then contact the property to confirm operating details."
    context="adventures_footer"
    secondary-label="Plan your day"
    secondary-to="/experiences/"
  />
</template>
