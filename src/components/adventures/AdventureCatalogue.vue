<script setup>
import { computed } from 'vue'
import EditorialImage from '../EditorialImage.vue'
import WaterdogLogo from './WaterdogLogo.vue'

const props = defineProps({
  activities: { type: Array, required: true },
})

const sectionDefinitions = [
  { id: 'together', title: 'Ride together', note: 'More fun in company', layout: 'collage', slugs: ['banana-boat', 'superman', 'bandwagon'] },
  { id: 'faster', title: 'Move faster', note: 'Chase a little spray', layout: 'steps', slugs: ['wakeboarding', 'jet-ski', 'speedboat-ride'] },
  { id: 'farther', title: 'Go farther', note: 'Let the coast open up', layout: 'focus', slugs: ['jet-ski-tour', 'speedboat-tour', 'paddle-kayak-tour'] },
  { id: 'slowly', title: 'Take it slowly', note: 'Stay close to the blue', layout: 'drift', slugs: ['floating-mats', 'kayak', 'parasailing'] },
]

const activityBySlug = computed(() => new Map(props.activities.map((activity) => [activity.slug, activity])))
const editorialSections = computed(() => sectionDefinitions.map((section) => ({
  ...section,
  activities: section.slugs.map((slug) => activityBySlug.value.get(slug)).filter(Boolean),
})))
const rentals = computed(() => ['life-vest-rental', 'snorkeling-mask']
  .map((slug) => activityBySlug.value.get(slug))
  .filter(Boolean))
</script>

<template>
  <section id="all-activities" class="adventure-catalogue">
    <header class="adventure-catalogue__intro page-shell">
      <h2 data-lines>Choose your way onto the water.</h2>
      <p data-reveal>Fourteen ways to go easy, go together, or pick up the pace. Prices from the latest client-provided sheet are shown where listed. <RouterLink to="/rates/#watersports">See the complete water sports rates</RouterLink>.</p>
    </header>

    <div class="adventure-catalogue__groups page-shell">
      <section
        v-for="group in editorialSections"
        :key="group.id"
        class="adventure-catalogue__group"
        :class="`adventure-catalogue__group--${group.layout}`"
      >
        <header class="adventure-catalogue__group-head" data-reveal>
          <h3>{{ group.title }}</h3>
          <p class="script-line">{{ group.note }}</p>
        </header>

        <div class="adventure-catalogue__grid" data-sequence>
          <RouterLink
            v-for="activity in group.activities"
            :key="activity.slug"
            class="adventure-catalogue__item"
            :to="`/adventures/details/${activity.slug}/`"
          >
            <div class="adventure-catalogue__media">
              <EditorialImage :src="activity.image" :alt="activity.alt" :width="1536" :height="1024" />
              <WaterdogLogo v-if="!['bandwagon', 'jet-ski-tour'].includes(activity.slug)" overlay decorative />
            </div>
            <div class="adventure-catalogue__copy">
              <h4>{{ activity.name }}</h4>
              <p>{{ activity.summary }}</p>
              <div>
                <span>{{ activity.duration }}</span>
                <strong>{{ activity.price }}</strong>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M4 10h11M11 6l4 4-4 4" />
                </svg>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>

      <aside class="adventure-rentals" aria-labelledby="rental-title" data-sequence>
        <div>
          <p class="script-line">Before you step in</p>
          <h3 id="rental-title">Water essentials</h3>
          <p>Simple equipment for a safer, easier day by the shore.</p>
        </div>
        <RouterLink
          v-for="activity in rentals"
          :key="activity.slug"
          :to="`/adventures/details/${activity.slug}/`"
        >
          <div class="adventure-rentals__media">
            <EditorialImage :src="activity.image" :alt="activity.alt" :width="640" :height="480" />
            <WaterdogLogo overlay decorative />
          </div>
          <div class="adventure-rentals__copy">
            <span>{{ activity.name }}</span>
            <strong>{{ activity.price }}</strong>
            <small>{{ activity.duration }}</small>
          </div>
        </RouterLink>
      </aside>
    </div>

    <p class="adventure-catalogue__note page-shell">The latest supplied sheet does not list every activity. Unlisted rates are shown as “Rate on request.” Duration, equipment, group size, and weather can affect the final arrangement; confirm with Waterdog.</p>
  </section>
</template>
