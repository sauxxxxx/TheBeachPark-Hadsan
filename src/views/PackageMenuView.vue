<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { PageFlip } from 'page-flip'
import { packageBooks } from '../data/packageBooks'

const bookElement = ref(null)
const activeBook = ref(null)
const currentPage = ref(0)
const isTurning = ref(false)
const currentSpread = computed(() => Math.floor(currentPage.value / 2) + 1)
const totalSpreads = computed(() => activeBook.value ? Math.ceil(activeBook.value.pages.length / 2) : 0)
let pageFlip = null

function destroyBook() {
  if (!pageFlip) return
  pageFlip.destroy()
  pageFlip = null
}

async function openBook(book) {
  destroyBook()
  activeBook.value = book
  currentPage.value = 0
  await nextTick()

  pageFlip = new PageFlip(bookElement.value, {
    width: 353,
    height: 500,
    size: 'stretch',
    minWidth: 260,
    maxWidth: 390,
    minHeight: 368,
    maxHeight: 552,
    flippingTime: 850,
    maxShadowOpacity: 0.38,
    showCover: false,
    usePortrait: true,
    autoSize: true,
    mobileScrollSupport: false,
    swipeDistance: 28,
  })

  pageFlip.on('init', () => {
    window.setTimeout(() => pageFlip?.flipNext('top'), 260)
  })
  pageFlip.on('flip', (event) => {
    currentPage.value = event.data
  })
  pageFlip.on('changeState', (event) => {
    isTurning.value = event.data === 'flipping'
  })
  pageFlip.loadFromImages(book.pages)
}

function closeBook() {
  destroyBook()
  activeBook.value = null
  currentPage.value = 0
}

function previousPage() {
  if (!isTurning.value) pageFlip?.flipPrev('top')
}

function nextPage() {
  if (!isTurning.value && currentPage.value < activeBook.value.pages.length - 2) pageFlip?.flipNext('top')
}

function handleKey(event) {
  if (!activeBook.value) return
  if (event.key === 'ArrowLeft') previousPage()
  if (event.key === 'ArrowRight') nextPage()
  if (event.key === 'Escape') closeBook()
}

onMounted(() => window.addEventListener('keydown', handleKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  destroyBook()
})
</script>

<template>
  <section class="package-library" aria-labelledby="package-library-title">
    <header class="package-library__heading">
      <p>The Beach Park Hadsan</p>
      <h1 id="package-library-title">Choose a menu.</h1>
    </header>

    <div v-if="!activeBook" class="package-library__shelf">
      <button
        v-for="book in packageBooks"
        :key="book.id"
        class="package-cover"
        type="button"
        :aria-label="`Open ${book.title}, ${book.audience}`"
        @click="openBook(book)"
      >
        <span class="package-cover__book"><img :src="book.cover" alt="" width="1414" height="2000" /></span>
        <span class="package-cover__caption">{{ book.audience }} <strong>Open book</strong></span>
      </button>
    </div>

    <div v-else class="package-reader">
      <div class="package-reader__topbar">
        <button type="button" @click="closeBook">← Both books</button>
        <span>{{ activeBook.title }}</span>
        <span>Drag or swipe a page</span>
      </div>

      <div class="package-reader__stage">
        <div ref="bookElement" class="package-reader__book" :aria-label="`${activeBook.title} flipbook`"></div>
      </div>

      <nav class="package-reader__controls" aria-label="Book page controls">
        <button type="button" :disabled="currentPage === 0 || isTurning" aria-label="Previous page" @click="previousPage">←</button>
        <span>{{ currentSpread }} / {{ totalSpreads }}</span>
        <button type="button" :disabled="currentPage >= activeBook.pages.length - 2 || isTurning" aria-label="Next page" @click="nextPage">→</button>
      </nav>
    </div>
  </section>
</template>
