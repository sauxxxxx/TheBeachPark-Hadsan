import { computed, onMounted, reactive, shallowRef } from 'vue'
import { roomTypeIds } from '../data/exelyIntegration.js'
import { roomImageFiles, roomImageSourceLabel, roomImageUrl, rooms } from '../data/roomMedia.js'
import { getExelyRoomCatalog } from '../services/exelyRoomCatalog.js'

const bundledRooms = rooms.map((room) => ({ ...room, id: roomTypeIds[room.slug] }))
const bundledBySlug = new Map(bundledRooms.map((room) => [room.slug, room]))
const liveRooms = shallowRef(null)
const status = shallowRef('idle')
const catalog = computed(() => liveRooms.value ?? bundledRooms)
let pendingRefresh

function refreshRoomCatalog() {
  if (pendingRefresh) return pendingRefresh
  status.value = 'loading'
  pendingRefresh = getExelyRoomCatalog({ signal: AbortSignal.timeout(5000) })
    .then((rooms) => {
      liveRooms.value = rooms.map((room) => ({
        ...room,
        petsAllowed: room.petsAllowed ?? bundledBySlug.get(room.slug)?.petsAllowed,
      }))
      status.value = 'ready'
    })
    .catch(() => { status.value = 'unavailable' })
    .finally(() => { pendingRefresh = undefined })
  return pendingRefresh
}

function bundledPhotos(slug) {
  const room = bundledBySlug.get(slug)
  return (room ? roomImageFiles(room) : []).flatMap((file) => {
    const src = roomImageUrl(file)
    return src ? [{ src, thumbnail: src, canBeCover: true, sourceLabel: roomImageSourceLabel(file) }] : []
  })
}

export function useRoomCatalog() {
  const failedRooms = reactive(new Set())
  onMounted(refreshRoomCatalog)

  function photosFor(room) {
    const published = failedRooms.has(room.slug) ? undefined : room.photos
    return published ?? bundledPhotos(room.slug)
  }

  function coverFor(room) {
    return photosFor(room).find((photo) => photo.canBeCover)
  }

  function useBundledPhotos(room, event) {
    if (event.target.src.startsWith('https://cdn.behopenapi.com/')) {
      failedRooms.add(room.slug)
    }
  }

  return { rooms: catalog, status, photosFor, coverFor, useBundledPhotos }
}
