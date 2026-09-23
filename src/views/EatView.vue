<script setup>
import EditorialImage from '../components/EditorialImage.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import PageHero from '../components/shared/PageHero.vue'
import ScrollStory from '../components/home/ScrollStory.vue'
import beansCafeDetail from '../assets/images/generated/beans-cafe-detail-v2.webp'
import beansCafeHero from '../assets/images/generated/beans-cafe-hero-v2.webp'
import { property } from '../data/siteContent'
</script>

<template>
  <PageHero
    eyebrow="Eat & drink"
    title="Good days need good stops."
    lede="Start with coffee at Beans & Paddles, then make room for an easy meal as the beach day unfolds."
    :image="beansCafeHero"
    image-alt="Wide exterior view of Beans & Paddles Café at The Beach Park"
  />

  <ScrollStory
    compact
    label="The rhythm of dining at The Beach Park"
    story="Some beach days begin with coffee and find their way back to the table. Between swims, stories grow longer, plates get shared, and nobody needs to hurry."
  />

  <section class="eat-intro page-shell">
    <h2 data-lines>Two places to pause between swims.</h2>
    <div data-reveal>
      <p>Dining here belongs to the beach day—not apart from it. Start slowly, come back when hunger catches up, and keep the water close.</p>
      <nav class="eat-jump-links" aria-label="Dining venues">
        <a href="#beans-and-paddles">Beans & Paddles</a>
        <a href="#sharkys">Sharky’s Café</a>
      </nav>
    </div>
  </section>

  <section id="beans-and-paddles" class="eat-chapter eat-chapter--beans" aria-labelledby="beans-title">
    <div class="eat-chapter__visual" data-image-expand>
      <EditorialImage
        :src="beansCafeDetail"
        alt="Teal façade, timber windows, and entrance of Beans & Paddles Café"
        :width="1600"
        :height="1200"
      />
    </div>
    <div class="eat-chapter__body" data-reveal>
      <h2 id="beans-title" data-lines>Beans & Paddles Café</h2>
      <p class="eat-chapter__lede">Coffee first. The coast can wait a few more minutes.</p>
      <p>A cheerful stop for easing into the day, taking a break from the water, or sitting down before the next adventure.</p>
      <dl class="eat-facts">
        <div><dt>Confirmed hours</dt><dd>10:00 AM–7:00 PM</dd></div>
        <div><dt>Weekend schedule</dt><dd>Confirm directly before visiting</dd></div>
      </dl>
      <RouterLink class="button button--outline" to="/eat/beans-and-paddles/">Explore Beans & Paddles</RouterLink>
    </div>
  </section>

  <section id="sharkys" class="eat-chapter eat-chapter--sharkys" aria-labelledby="sharkys-title">
    <div class="eat-chapter__body" data-reveal>
      <h2 id="sharkys-title" data-lines>Sharky’s Café</h2>
      <p class="eat-chapter__lede">An easy table in the middle of a Beach Park day.</p>
      <p>Sharky’s is part of the on-site dining experience. Its current menu, operating hours, table arrangements, and official local photography still need confirmation.</p>
      <div class="eat-chapter__actions">
        <RouterLink class="button button--outline-light" to="/eat/sharkys-cafe/">Visit Sharky’s page</RouterLink>
        <a class="text-link text-link--light" :href="property.phoneHref">Call for current details</a>
      </div>
    </div>
    <div class="eat-chapter__type" aria-hidden="true">
      <span>Sharky’s</span>
      <small>at The Beach Park</small>
    </div>
  </section>

  <section class="eat-visit page-shell" aria-labelledby="eat-visit-title">
    <header>
      <h2 id="eat-visit-title">Know before you go.</h2>
      <p>Some dining details can change with operations. These are the items worth checking before your visit.</p>
    </header>
    <dl>
      <div><dt>Beans & Paddles</dt><dd>Confirmed hours are 10:00 AM–7:00 PM. Confirm the weekend schedule directly.</dd></div>
      <div><dt>Sharky’s Café</dt><dd>Current menu and operating hours need confirmation.</dd></div>
      <div><dt>Tables and availability</dt><dd>Contact the property for current arrangements, especially for groups.</dd></div>
    </dl>
  </section>

  <EditorialCta
    title="Stay for more than one meal."
    copy="Pair the cafés, shoreline, pool, and rooms in one relaxed Cebu escape."
    context="eat_footer"
  />
</template>
