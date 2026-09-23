<script setup>
import EditorialImage from '../EditorialImage.vue'
import { diningImages } from '../../data/homeContent'
</script>

<template>
  <section id="eat" class="dining-features section-paper">
    <div class="dining-editorial page-shell" data-sequence>
      <EditorialImage
        class="dining-editorial__image dining-editorial__image--beans sequence-item"
        :src="diningImages.beans.src"
        :alt="diningImages.beans.alt"
        :width="1200"
        :height="1500"
        data-image-expand
      />
      <EditorialImage
        class="dining-editorial__image dining-editorial__image--detail sequence-item"
        :src="diningImages.detail.src"
        :alt="diningImages.detail.alt"
        :width="1000"
        :height="700"
        data-image-expand
      />
      <EditorialImage
        class="dining-editorial__image dining-editorial__image--coffee sequence-item"
        :src="diningImages.coffee.src"
        :alt="diningImages.coffee.alt"
        :width="900"
        :height="1100"
        data-image-expand
      />
      <div
        class="dining-editorial__placeholder sequence-item"
        role="img"
        aria-label="Reserved space for the forthcoming Sharky’s Café photograph"
      >
        <strong>Sharky’s Café</strong>
        <span>Photography coming soon</span>
      </div>

      <div class="dining-editorial__copy sequence-item">
        <h2 data-lines>Coffee. Lunch. Coast.</h2>
        <p>Two easy stops between swims.</p>
        <nav class="dining-editorial__links" aria-label="Explore dining">
          <RouterLink to="/eat/beans-and-paddles/">Beans & Paddles</RouterLink>
          <RouterLink to="/eat/sharkys-cafe/">Sharky’s Café</RouterLink>
        </nav>
      </div>
    </div>
  </section>
</template>
