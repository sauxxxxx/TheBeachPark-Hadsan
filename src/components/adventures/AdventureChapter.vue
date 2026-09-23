<script setup>
import EditorialImage from '../EditorialImage.vue'

defineProps({
  activity: { type: Object, required: true },
  image: { type: String, required: true },
  imageAlt: { type: String, required: true },
  variant: { type: String, required: true },
})
</script>

<template>
  <article class="adventure-chapter" :class="`adventure-chapter--${variant}`">
    <RouterLink
      class="adventure-chapter__media"
      :to="`/adventures/details/${activity.slug}/`"
      :aria-label="`Explore ${activity.name}`"
    >
      <EditorialImage data-image-expand :src="image" :alt="imageAlt" :width="1800" :height="1100" />
    </RouterLink>

    <div class="adventure-chapter__copy" data-reveal>
      <h2>{{ activity.name }}</h2>
      <p>{{ activity.summary }}</p>
      <div class="adventure-chapter__foot">
        <span>{{ activity.price }} · {{ activity.duration }}</span>
        <RouterLink class="adventure-chapter__link" :to="`/adventures/details/${activity.slug}/`">
          Explore the activity
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M4 10h11M11 6l4 4-4 4" />
          </svg>
        </RouterLink>
      </div>
    </div>
  </article>
</template>
