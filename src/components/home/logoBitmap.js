// The full-colour Hadsan logo (Canva export, cropped to the artwork) prepared
// for the dark splash scenes, at whatever pixel size a reveal needs.
import logoUrl from '../../assets/images/brands/hadsan-logo-full.webp'

// height / width of the cropped artwork
export const LOGO_ASPECT = 832 / 660
// The sun disc in the artwork, as fractions of the logo box (radius of its width).
export const LOGO_SUN = { x: 0.6376, y: 0.1822, r: 0.2159 }
// Where the sand under the character meets the sea, as a fraction of the height.
export const LOGO_SHORE = 0.475

const IVORY = [245, 241, 232]
// The HADSAN wordmark occupies the bottom band of the artwork.
const WORDMARK_TOP = 0.915

let source

function loadSource() {
  source ||= (async () => {
    const image = new Image()
    image.src = logoUrl
    await image.decode()
    return image
  })()
  return source
}

// A canvas of the logo at width × height px, its dark grey wordmark lifted to
// ivory so it reads on night blues.
export async function loadLogoBitmap(width, height) {
  const image = await loadSource()
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width))
  canvas.height = Math.max(1, Math.round(height))
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  const top = Math.floor(canvas.height * WORDMARK_TOP)
  const band = ctx.getImageData(0, top, canvas.width, canvas.height - top)
  const { data } = band
  for (let i = 0; i < data.length; i += 4) {
    // The orange stars share the band; only the dark letters change.
    if (data[i + 3] && data[i] + data[i + 1] + data[i + 2] < 330) {
      data[i] = IVORY[0]
      data[i + 1] = IVORY[1]
      data[i + 2] = IVORY[2]
    }
  }
  ctx.putImageData(band, 0, top)
  return canvas
}
