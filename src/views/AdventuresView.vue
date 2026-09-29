<script setup>
import AdventureCatalogue from '../components/adventures/AdventureCatalogue.vue'
import WaterdogLogo from '../components/adventures/WaterdogLogo.vue'
import EditorialImage from '../components/EditorialImage.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import ScrollStory from '../components/home/ScrollStory.vue'
import adventuresHero from '../assets/images/generated/adventures-hero-v2.webp'
import { activities, waterdogContact } from '../data/siteContent'

const introStory = 'Take a paddle close to shore, or head out for a faster ride. The water makes room for both kinds of day.\n\nChoose the pace that feels right for you, then check current conditions and ride details with the Waterdog team.'
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
      <h1 data-lines>Out on the water.</h1>
      <p>Paddle and ride with Waterdog.</p>
      <a class="adventures-hero__jump" href="#choose-your-pace">
        Choose your pace
        <span aria-hidden="true"></span>
      </a>
    </div>
  </header>

  <ScrollStory id="choose-your-pace" title="The water, your way." label="Waterdog activities" :story="introStory" />

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
