<script setup>
import EditorialImage from '../EditorialImage.vue'

defineProps({ experience: { type: Object, required: true } })
</script>

<template>
  <article
    class="experience-card"
    :class="[
      `experience-card--${experience.layout}`,
      experience.theme && `experience-card--${experience.theme}`,
      { 'experience-card--type': !experience.image },
    ]"
  >
    <RouterLink :to="experience.to" :aria-label="`${experience.cta}: ${experience.title}`">
      <EditorialImage
        v-if="experience.image"
        :src="experience.image"
        :alt="experience.alt"
        :width="1600"
        :height="1100"
        :style="{ '--experience-position': experience.position || 'center' }"
      />
      <div v-else class="experience-card__type" aria-hidden="true">
        <span>{{ experience.title }}</span>
      </div>
      <div class="experience-card__wash" aria-hidden="true"></div>
      <div class="experience-card__content">
        <h3>{{ experience.title }}</h3>
        <div class="experience-card__detail">
          <span>{{ experience.copy }}</span>
          <strong>
            {{ experience.cta }}
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 12 12 4M6 4h6v6" />
            </svg>
          </strong>
        </div>
      </div>
    </RouterLink>
  </article>
</template>
