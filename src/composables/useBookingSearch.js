import { computed, effectScope, reactive, watch } from 'vue'
import { addDays, bookingSearchFromQuery, bookingSearchQuery, normalizeBookingSearch, todayInManila } from '../services/bookingSearch.js'

const storageKey = 'beachpark_booking_search'
const selection = reactive(normalizeBookingSearch())
let initialized = false
let edited = false

export function useBookingSearch() {
  if (!initialized) {
    initialized = true
    const query = Object.fromEntries(new URLSearchParams(window.location.search))
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(storageKey) || 'null')
      Object.assign(selection, query.date ? bookingSearchFromQuery(query) : normalizeBookingSearch(saved || {}))
    } catch {
      Object.assign(selection, bookingSearchFromQuery(query))
    }
    effectScope(true).run(() => watch(selection, () => {
      edited = true
      try { window.sessionStorage.setItem(storageKey, JSON.stringify(selection)) } catch { /* Storage may be disabled. */ }
    }, { flush: 'sync' }))
  }

  function selectDate(field, value) {
    selection[field] = value
    if (selection.checkOut <= selection.checkIn) selection.checkOut = addDays(selection.checkIn, 1)
  }

  function changeChildren(delta) {
    if (delta > 0 && selection.children.length < 6) selection.children.push('')
    if (delta < 0) selection.children.pop()
  }

  function linkQuery(routeQuery) {
    // Preserve provider-specific/multi-room URL values on an incoming link.
    // A visitor editing our single-room form explicitly replaces that search.
    const current = bookingSearchQuery(selection)
    return edited ? { ...routeQuery, ...current } : { ...current, ...routeQuery }
  }

  return { selection, selectDate, changeChildren, linkQuery, query: computed(() => bookingSearchQuery(selection)), today: todayInManila }
}
