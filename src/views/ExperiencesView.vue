<script setup>
import { computed, ref } from 'vue'
import EditorialImage from '../components/EditorialImage.vue'
import ExperienceCard from '../components/experiences/ExperienceCard.vue'
import DayTimeline from '../components/home/DayTimeline.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import {
  experienceFilters,
  experiences,
  experiencesHero,
} from '../data/experiencesContent'

const activeFilter = ref('all')
const visibleExperiences = computed(() => (
  activeFilter.value === 'all'
    ? experiences
    : experiences.filter(({ category }) => category === activeFilter.value)
))
</script>

<template>
  <header class="experiences-hero">
    <EditorialImage
      class="experiences-hero__media"
      :src="experiencesHero.image"
      :alt="experiencesHero.alt"
      :width="2560"
      :height="1600"
      eager
      data-parallax="0.05"
    />
    <div class="experiences-hero__wash" aria-hidden="true"></div>
    <div class="experiences-hero__content page-shell">
      <h1>One park. Many ways to spend the day.</h1>
      <a href="#discover-experiences">Discover the experiences <span aria-hidden="true"></span></a>
    </div>
  </header>

  <div class="experiences-intro page-shell" data-reveal>
    <p>Come for open water, an easy meal, a family afternoon, or no plan at all. The Beach Park brings the shoreline, pool, cafés, activities, and rooms together in one place. Schedules and availability can change, so confirm the details that matter to your visit directly with the property.</p>
  </div>

  <section id="discover-experiences" class="experiences-discovery" aria-labelledby="experiences-title">
    <header class="experiences-discovery__head page-shell">
      <h2 id="experiences-title">Find your kind of day.</h2>
      <nav class="experiences-filters" aria-label="Filter experiences">
        <button
          v-for="filter in experienceFilters"
          :key="filter.value"
          type="button"
          :class="{ 'is-active': activeFilter === filter.value }"
          :aria-pressed="activeFilter === filter.value"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </nav>
    </header>

    <div class="experience-journal page-shell" data-sequence>
      <ExperienceCard
        v-for="experience in visibleExperiences"
        :key="experience.id"
        :experience="experience"
      />
    </div>

    <footer class="experiences-discovery__foot page-shell">
      <p>{{ visibleExperiences.length }} experiences shown</p>
      <RouterLink to="/explore/contact/">Ask what is available during your visit</RouterLink>
    </footer>
  </section>

  <DayTimeline />

  <EditorialCta
    title="Build the day around your people."
    copy="Pair the water, cafés, pool, and a room in whatever order feels right. Confirm current access and activity details before arriving."
    context="experiences_footer"
    secondary-label="Talk to the property"
    secondary-to="/explore/contact/"
  />
</template>
