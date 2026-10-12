// Prepares the auto-traced Hadsan logo (one compound path per colour) for the
// dark splash. Shared by the crisp SVG and the sand particles so both match.
import logoSource from '../../assets/images/brands/hadsan-logo.svg?raw'

// Crop to the artwork; the source canvas has wide empty margins.
export const LOGO_VIEWBOX = [195, 105, 670, 840]
export const IVORY = '#f5f1e8'

const BROWN = '#3f281c'
const WHITE = '#ffffff'

function centre(subpath) {
  const n = subpath.match(/-?\d+(?:\.\d+)?/g).map(Number)
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (let i = 0; i < n.length; i += 2) {
    x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i])
    y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1])
  }
  return { cx: (x0 + x1) / 2, cy: (y0 + y1) / 2 }
}

// White outside the character is paper left by the trace; it shows on a dark ground.
function isPaper({ cx, cy }) {
  return cy >= 560 || (cx < 488 && cy >= 398) || (cy < 350 && (cx < 540 || cx > 700))
}

let layers

// [{ fill, d }] in source order, with the HADSAN wordmark lifted to ivory.
export function logoLayers() {
  if (layers) return layers
  layers = []
  const add = (fill, subpath) => {
    let layer = layers.find((l) => l.fill === fill)
    if (!layer) layers.push((layer = { fill, d: '' }))
    layer.d += subpath
  }
  for (const [, d, fill] of logoSource.matchAll(/<path d="([^"]+)" fill="(#[0-9a-f]{6})"/g)) {
    for (const subpath of d.split(/(?=M)/)) {
      const box = centre(subpath)
      if (fill === WHITE && isPaper(box)) continue
      add(fill === BROWN && box.cy >= 880 ? IVORY : fill, subpath)
    }
  }
  return layers
}

// Standalone markup at a fixed pixel size, for rasterising into a canvas.
export function logoMarkup(width, height) {
  const paths = logoLayers()
    .map(({ fill, d }) => `<path d="${d}" fill="${fill}" fill-rule="evenodd"/>`)
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX.join(' ')}" width="${width}" height="${height}">${paths}</svg>`
}
