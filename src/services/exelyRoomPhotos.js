const photoOrigin = 'https://cdn.behopenapi.com'
const bathroomPhotos = {
  'double-room': '639300768302597908-b4f31dbc-8f77-44db-bd21-836b63e285c7',
  'double-deluxe': '639300769327253390-d15e976a-af19-4f43-9c38-df3629046b53',
  'lagoon-room': '639300769823622978-49ea6836-4791-40cc-ae4c-e197c217004c',
}
const lagoonBedroom = '639300769841582830-e5a69ccf-f968-45ad-8a7f-a509232fc345'

function photoId(image, roomId) {
  const prefix = `${photoOrigin}/resource/images/rt/${roomId}/`
  const url = image?.url
  if (typeof url !== 'string' || !url.startsWith(prefix)) return null
  const id = url.slice(prefix.length)
  return /^[\w-]+$/.test(id) ? id : null
}

export function normalizeRoomPhotos(slug, roomId, images) {
  if (!Array.isArray(images)) return undefined
  const ids = [...new Set(images.map((image) => photoId(image, roomId)).filter(Boolean))]
  if (images.length && !ids.length) return undefined

  if (ids.length > 1 && ids[0] === bathroomPhotos[slug]) {
    ids.push(ids.shift())
    // Keep the approved Lagoon bedroom cover while the old bathroom leads Exely's gallery.
    if (slug === 'lagoon-room' && ids.includes(lagoonBedroom)) {
      ids.splice(ids.indexOf(lagoonBedroom), 1)
      ids.unshift(lagoonBedroom)
    }
  }

  return ids.map((id) => ({
    src: `${photoOrigin}/resource/images/rt/${roomId}/${id}`,
    thumbnail: `${photoOrigin}/resource/thumb/800x500/rt/${roomId}/${id}`,
    canBeCover: id !== bathroomPhotos[slug],
    sourceLabel: 'Property photograph',
  }))
}
