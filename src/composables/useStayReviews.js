import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { featuredReviews } from '../data/featuredReviews.js'
import { getGoogleReviews } from '../services/googleReviews.js'

const preferredAuthors = ['Bayubay, Jhonamei S.', 'Kyle Angelu', 'Regelle Romero']
const orderReviews = (reviews) => preferredAuthors.flatMap((author) => reviews.filter((review) => review.author === author))

export function useStayReviews() {
  const reviews = ref(orderReviews(featuredReviews))
  const index = ref(0)
  const controller = new AbortController()
  const review = computed(() => reviews.value[index.value])

  function move(direction) {
    if (!reviews.value.length) return
    index.value = (index.value + direction + reviews.value.length) % reviews.value.length
  }

  onMounted(async () => {
    try {
      const data = await getGoogleReviews({ signal: controller.signal })
      const fresh = orderReviews(data.reviews || [])
      if (!controller.signal.aborted) {
        reviews.value = fresh
        index.value = 0
      }
    } catch {
      // Keep the checked catalogue when the review endpoint is unavailable.
    }
  })
  onBeforeUnmount(() => controller.abort())

  return { review, reviews, index, move }
}
