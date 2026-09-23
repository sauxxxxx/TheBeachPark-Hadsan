<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EditorialImage from '../components/EditorialImage.vue'
import WaterdogLogo from '../components/adventures/WaterdogLogo.vue'
import EditorialCta from '../components/shared/EditorialCta.vue'
import PageHero from '../components/shared/PageHero.vue'
import { activities, activityCategories, waterdogContact } from '../data/siteContent'

const route = useRoute()
const activity = computed(() => activities.find((item) => item.slug === route.params.slug) || activities[0])
const category = computed(() => activityCategories.find((item) => item.id === activity.value.category))
const relatedActivities = computed(() => {
  const alternatives = activities.filter((item) => item.slug !== activity.value.slug)
  return [
    ...alternatives.filter((item) => item.category === activity.value.category),
    ...alternatives.filter((item) => item.category !== activity.value.category),
  ].slice(0, 3)
})
</script>

<template>
  <PageHero
    class="activity-page-hero"
    eyebrow=""
    :title="activity.name"
    :lede="activity.summary"
    :image="activity.image"
    :image-alt="activity.alt"
  >
    <dl class="activity-hero-facts">
      <div><dt>Price</dt><dd>{{ activity.price }}</dd></div>
      <div><dt>Duration</dt><dd>{{ activity.duration }}</dd></div>
      <div><dt>Group</dt><dd>{{ activity.capacity }}</dd></div>
    </dl>
  </PageHero>

  <section class="activity-detail page-shell">
    <div class="activity-detail__story" data-reveal>
      <RouterLink class="activity-detail__back" to="/adventures/#all-activities">Back to all activities</RouterLink>
      <h2 data-lines>What to expect.</h2>
      <p class="activity-detail__lede">{{ activity.details }}</p>
      <p>Availability depends on weather, water conditions, and the operating team’s safety assessment. Contact Waterdog before your visit to confirm the day’s schedule and participation requirements.</p>
    </div>

    <aside class="activity-detail__facts" data-reveal>
      <dl>
        <div><dt>Activity type</dt><dd>{{ category?.name }}</dd></div>
        <div><dt>Brochure price</dt><dd>{{ activity.price }}<small v-if="activity.priceNote">{{ activity.priceNote }}</small></dd></div>
        <div><dt>Time</dt><dd>{{ activity.duration }}</dd></div>
        <div><dt>Group size</dt><dd>{{ activity.capacity }}</dd></div>
        <div v-if="activity.operator"><dt>Arrangement</dt><dd>{{ activity.operator }}</dd></div>
      </dl>

      <div v-if="activity.options?.length" class="activity-detail__options">
        <h3>Available equipment</h3>
        <ul>
          <li v-for="option in activity.options" :key="option">{{ option }}</li>
        </ul>
      </div>

      <a class="button" :href="waterdogContact.phoneHref">Ask about {{ activity.name }}</a>
      <a class="activity-detail__email" :href="waterdogContact.emailHref">{{ waterdogContact.email }}</a>
    </aside>
  </section>

  <section class="activity-related page-shell">
    <header data-reveal>
      <h2>More ways onto the water.</h2>
      <RouterLink class="text-link" to="/adventures/#all-activities">See all 14 activities</RouterLink>
    </header>
    <div class="activity-related__list" data-sequence>
      <RouterLink
        v-for="item in relatedActivities"
        :key="item.slug"
        :to="`/adventures/details/${item.slug}/`"
      >
        <div class="activity-related__media">
          <EditorialImage :src="item.image" :alt="item.alt" :width="960" :height="640" />
          <WaterdogLogo v-if="!['bandwagon', 'jet-ski-tour'].includes(item.slug)" overlay decorative />
        </div>
        <div class="activity-related__copy">
          <span>{{ item.duration }}</span>
          <strong>{{ item.name }}</strong>
          <small>{{ item.price }}</small>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M4 10h11M11 6l4 4-4 4" />
          </svg>
        </div>
      </RouterLink>
    </div>
  </section>

  <EditorialCta
    title="Turn one ride into a whole day."
    copy="Connect your activity with coffee, beach time, food, and a room if you want to stay longer."
    context="activity_detail_footer"
    secondary-label="Browse every activity"
    secondary-to="/adventures/#all-activities"
  />
</template>
