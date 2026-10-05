<script setup>
import hadsanLogo from '../assets/images/brands/hadsan-logo.png'
import { primaryNavigation, property } from '../data/siteContent'
</script>

<template>
  <footer class="site-footer">
    <div class="page-shell site-footer__main">
      <RouterLink class="site-footer__brand" to="/" aria-label="The Beach Park home">
        <img class="site-footer__logo" :src="hadsanLogo" alt="" width="500" height="500" />
      </RouterLink>
      <nav class="footer-navigation" aria-label="Footer navigation">
        <RouterLink v-for="item in primaryNavigation" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
        <RouterLink to="/explore/gallery/">Gallery</RouterLink>
        <RouterLink to="/explore/contact/">Contact</RouterLink>
      </nav>
      <address class="footer-contact">
        <a :href="property.phoneHref">{{ property.phone }}</a>
        <a :href="property.emailHref">{{ property.email }}</a>
        <a :href="property.googleMapsUrl" target="_blank" rel="noopener noreferrer">{{ property.location }} ↗</a>
      </address>
    </div>
    <!-- A real element rather than a ::before so it can be hidden from screen
         readers: the brand name is already in the logo and the copyright line,
         and this is purely a graphic. -->
    <span class="site-footer__mark" aria-hidden="true">The Beach Park</span>

    <div class="page-shell site-footer__bottom">
      <span>© {{ new Date().getFullYear() }} The Beach Park Hadsan</span>
      <div><RouterLink to="/privacy/">Privacy Policy</RouterLink><RouterLink to="/terms/">Terms & Conditions</RouterLink></div>
    </div>
  </footer>
</template>
