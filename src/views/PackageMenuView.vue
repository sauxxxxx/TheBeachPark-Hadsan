<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { PageFlip } from 'page-flip'
import { packageBooks } from '../data/packageBooks'

const bookElement = ref(null)
const activeBook = ref(null)
const currentPage = ref(0)
const isTurning = ref(false)
const readerOrientation = ref('landscape')
const currentSpread = computed(() => {
  if (readerOrientation.value === 'portrait') return currentPage.value + 1
  return currentPage.value === 0 ? 1 : Math.floor((currentPage.value + 1) / 2) + 1
})
const totalSpreads = computed(() => {
  if (!activeBook.value) return 0
  if (readerOrientation.value === 'portrait') return activeBook.value.pages.length
  return 1 + Math.ceil((activeBook.value.pages.length - 1) / 2)
})
const isAtLastSpread = computed(() => currentSpread.value >= totalSpreads.value)
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
    showCover: true,
    usePortrait: true,
    autoSize: true,
    mobileScrollSupport: false,
    swipeDistance: 28,
  })

  pageFlip.on('init', (event) => {
    readerOrientation.value = event.data.mode
  })
  pageFlip.on('flip', (event) => {
    currentPage.value = event.data
  })
  pageFlip.on('changeState', (event) => {
    isTurning.value = event.data === 'flipping'
  })
  pageFlip.on('changeOrientation', (event) => {
    readerOrientation.value = event.data
  })
  const pages = bookElement.value.querySelectorAll('.package-reader__page')
  pageFlip.loadFromHTML(pages)
}

function closeBook() {
  destroyBook()
  activeBook.value = null
  currentPage.value = 0
}

function previousPage() {
  if (isTurning.value || !pageFlip) return
  const bounds = pageFlip.getBoundsRect()
  pageFlip.getFlipController().flip({ x: bounds.left + 10, y: 1 })
}

function nextPage() {
  if (!isTurning.value && !isAtLastSpread.value) pageFlip?.flipNext('top')
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
        <div ref="bookElement" class="package-reader__book" :aria-label="`${activeBook.title} flipbook`">
          <div
            v-for="(page, index) in activeBook.pages"
            :key="page"
            class="package-reader__page"
            :data-density="index === 0 || index === activeBook.pages.length - 1 ? 'hard' : 'soft'"
          >
            <img :src="page" alt="" width="1414" height="2000" />
          </div>
        </div>
      </div>

      <nav class="package-reader__controls" aria-label="Book page controls">
        <button type="button" :disabled="currentPage === 0 || isTurning" aria-label="Previous page" @click="previousPage">←</button>
        <span>{{ currentSpread }} / {{ totalSpreads }}</span>
        <button type="button" :disabled="isAtLastSpread || isTurning" aria-label="Next page" @click="nextPage">→</button>
      </nav>
    </div>
  </section>
</template>
