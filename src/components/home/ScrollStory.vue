<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { onScroll, prefersReducedMotion } from '../../services/scrollEngine'

const props = defineProps({
  story: {
    type: String,
    default: 'Set along the shores of Hadsan in Lapu-Lapu City, The Beach Park is a relaxed coastal escape for families, friends, and barkadas. Clear water, sandy shores, and tropical surroundings make room for easy days close to Cebu.\n\nStay by the beach, unwind by the pool, or head out with Waterdog for something faster. From quiet afternoons to sunset gatherings, relaxation, adventure, and warm Cebuano hospitality come together here.',
  },
  label: { type: String, default: 'The Beach Park experience' },
  title: { type: String, default: '' },
  revealWords: { type: Boolean, default: true },
})

const paragraphs = computed(() => {
  let offset = 0

  return props.story.trim().split(/\n\s*\n/).filter(Boolean).map((text) => {
    const words = text.trim().split(/\s+/)
    const paragraph = { text, words, offset }
    offset += words.length
    return paragraph
  })
})

const wordCount = computed(() => paragraphs.value.reduce((total, paragraph) => total + paragraph.words.length, 0))

const storySection = ref(null)
const revealedCount = ref(wordCount.value)

let releaseScroll

function updateReveal(_scrollY, viewportHeight) {
  const element = storySection.value
  if (!element) return

  const rect = element.getBoundingClientRect()
  const travel = Math.max(rect.height - viewportHeight, 1)
  const progress = Math.min(Math.max(-rect.top / travel, 0), 1)
  revealedCount.value = Math.round(progress * wordCount.value)
}

onMounted(() => {
  if (!props.revealWords || prefersReducedMotion()) return

  revealedCount.value = 0
  storySection.value.classList.add('is-scroll-ready')
  releaseScroll = onScroll(updateReveal)
})

onBeforeUnmount(() => releaseScroll?.())
</script>

<template>
  <section
    ref="storySection"
    class="scroll-story"
    :class="{ 'scroll-story--static': !revealWords }"
    :aria-label="label"
  >
    <div class="scroll-story__stage">
      <div class="scroll-story__copy">
        <h2 v-if="title" class="scroll-story__title">{{ title }}</h2>
        <span class="sr-only">{{ story }}</span>
        <span class="scroll-story__visual" aria-hidden="true">
          <p v-for="(paragraph, paragraphIndex) in paragraphs" :key="paragraph.text" class="scroll-story__paragraph">
            <span
              v-for="(word, index) in paragraph.words"
              :key="`${paragraphIndex}-${word}-${index}`"
              class="scroll-story__word"
              :class="{ 'is-revealed': paragraph.offset + index < revealedCount }"
            >{{ word }}{{ index < paragraph.words.length - 1 ? ' ' : '' }}</span>
          </p>
        </span>
      </div>
    </div>
  </section>
</template>
