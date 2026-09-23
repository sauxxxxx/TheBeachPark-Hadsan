<script setup>
import { onMounted, ref } from 'vue'
import { getAnalyticsConsent, setAnalyticsConsent } from '../services/analytics'

const visible = ref(false)

onMounted(() => {
  visible.value = getAnalyticsConsent() === 'unset'
})

function choose(value) {
  setAnalyticsConsent(value)
  visible.value = false
}
</script>

<template>
  <Transition name="consent">
    <aside v-if="visible" class="cookie-notice" aria-label="Analytics preferences">
      <div class="cookie-notice__inner">
        <div class="cookie-notice__copy">
          <strong>Analytics preferences</strong>
          <p>
            Essential storage remembers your choices. With your permission, anonymous analytics help us improve the website.
            <RouterLink to="/privacy/">Privacy details</RouterLink>
          </p>
        </div>
        <div class="cookie-notice__actions">
          <button type="button" class="button button--small button--outline" @click="choose('denied')">Essential only</button>
          <button type="button" class="button button--small" @click="choose('granted')">Allow analytics</button>
        </div>
      </div>
    </aside>
  </Transition>
</template>
