import { onMounted, reactive, shallowRef } from 'vue'
import { roomImageFiles, roomImageSourceLabel, roomImageUrl } from '../data/roomMedia.js'
import { getExelyRoomPhotos } from '../services/exelyRoomPhotos.js'

const livePhotos = shallowRef({})
let pendingRefresh

function refreshRoomPhotos() {
  pendingRefresh ??= getExelyRoomPhotos({ signal: AbortSignal.timeout(5000) })
    .then((photos) => { livePhotos.value = photos })
    .catch(() => { /* Keep the last successful photos or the bundled photos. */ })
    .finally(() => { pendingRefresh = undefined })
  return pendingRefresh
}

function bundledPhotos(room) {
  return roomImageFiles(room).flatMap((file) => {
    const src = roomImageUrl(file)
    return src ? [{ src, thumbnail: src, canBeCover: true, sourceLabel: roomImageSourceLabel(file) }] : []
  })
}

export function useRoomPhotos() {
  const failedRooms = reactive(new Set())
  onMounted(refreshRoomPhotos)

  function photosFor(room) {
    const published = failedRooms.has(room.slug) ? undefined : livePhotos.value[room.slug]
    return published ?? bundledPhotos(room)
  }

  function coverFor(room) {
    return photosFor(room).find((photo) => photo.canBeCover)
  }

  function useBundledPhotos(room, event) {
    if (event.target.src.startsWith('https://cdn.behopenapi.com/')) {
      failedRooms.add(room.slug)
    }
  }

  return { photosFor, coverFor, useBundledPhotos }
}
