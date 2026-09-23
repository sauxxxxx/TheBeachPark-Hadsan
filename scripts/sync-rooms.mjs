/**
 * Pull room types and photography from the booking system into the repo.
 *
 *   npm run sync:rooms
 *
 * The room list on thebeachpark.com/rooms/ renders inside an iframe served by
 * ph-ibe.hopenapi.com, so the page HTML carries none of it. This reads the same
 * public API that iframe uses, keyed by the property code already stored in
 * siteContent.js — there is no second copy of that code to drift.
 *
 * Output is a generated data module plus WebP photographs. Re-running overwrites
 * cleanly and should produce no diff when nothing has changed upstream.
 */
import { execFile } from 'node:child_process'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const run = promisify(execFile)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const imageDir = join(root, 'src/assets/images/real/rooms')
const dataFile = join(root, 'src/data/rooms.generated.js')

// Occupancy 1, no photographs, and not a room a guest can book — an operational
// placeholder in the booking system rather than a room type.
const EXCLUDE = new Set(['buffer room'])
const TARGET_WIDTH = 1600
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

function findFfmpeg() {
  const candidates = [
    process.env.FFMPEG_PATH,
    'C:/Users/Joyno IT/Downloads/ffmpeg/bin/ffmpeg.exe',
    'ffmpeg',
  ].filter(Boolean)
  for (const c of candidates) {
    if (c === 'ffmpeg' || existsSync(c)) return c
  }
  throw new Error('ffmpeg not found; set FFMPEG_PATH')
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** The property code lives in siteContent.js; read it rather than duplicating it. */
async function propertyCode() {
  const src = await readFile(join(root, 'src/data/siteContent.js'), 'utf8')
  const match = src.match(/exelyPropertyId:\s*'([^']+)'/)
  if (!match) throw new Error('exelyPropertyId not found in siteContent.js')
  return match[1]
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Referer: 'https://thebeachpark.com/' } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

/**
 * Read average luma and chroma. Neutral chroma is 128 on both axes, so the
 * distance from 128 is the colour cast.
 */
async function measure(file, ffprobeBin, ffmpeg) {
  const { stderr } = await run(ffmpeg, [
    '-v', 'info', '-i', file, '-vf', 'signalstats,metadata=print', '-f', 'null', '-',
  ]).catch((e) => ({ stderr: e.stderr ?? '' }))
  const grab = (key) => {
    const m = stderr.match(new RegExp(key + '=([0-9.]+)'))
    return m ? Number(m[1]) : null
  }
  return { y: grab('YAVG'), u: grab('UAVG'), v: grab('VAVG') }
}

/**
 * Pull white balance toward neutral and lift very dark frames.
 *
 * These are phone snapshots taken under different light and uploaded to a
 * booking engine, so the set reads as several photographers. Corrections are
 * capped rather than forced to identical numbers — a genuinely warm evening
 * shot should stay warm, just less wildly so.
 */
function gradeFilter({ y, u, v }) {
  if (y == null) return null
  const cap = (n, limit) => Math.max(-limit, Math.min(limit, n))
  // colorbalance only nudges midtones and barely moved the average chroma, so
  // shift the U and V planes directly. Correcting 75% of the deviation pulls the
  // set together while leaving each room a little of its own light; the cap stops
  // a heavily tinted frame from being forced all the way to grey.
  const uShift = cap((128 - u) * 0.75, 26)
  const vShift = cap((128 - v) * 0.75, 26)
  const parts = []
  if (Math.abs(uShift) > 1 || Math.abs(vShift) > 1) {
    parts.push(`lutyuv=u='clip(val+${uShift.toFixed(1)},0,255)':v='clip(val+${vShift.toFixed(1)},0,255)'`)
  }
  // Only lift genuinely dark frames; never pull a bright one down.
  const TARGET_Y = 140
  if (y < TARGET_Y - 12) {
    const brightness = cap((TARGET_Y - y) / 255, 0.16)
    parts.push(`eq=brightness=${brightness.toFixed(3)}:contrast=1.04:saturation=1.02`)
  }
  return parts.length ? parts.join(',') : null
}

async function downloadImage(url, outPath, ffmpeg) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Referer: 'https://thebeachpark.com/' } })
  if (!res.ok) throw new Error(`${res.status} for ${url}`)
  const tmp = `${outPath}.src`
  await writeFile(tmp, Buffer.from(await res.arrayBuffer()))

  // Only downscale. Enlarging a small original would repeat the softness that
  // came from upscaling elsewhere on this site.
  const { stdout } = await run(ffmpeg.replace(/ffmpeg(\.exe)?$/, 'ffprobe$1'), [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0', tmp,
  ])
  const [width, height] = stdout.trim().split(',').map(Number)
  const scale = width > TARGET_WIDTH ? `scale=${TARGET_WIDTH}:-2` : 'scale=iw:ih'

  const before = await measure(tmp, null, ffmpeg)
  const grade = gradeFilter(before)
  const vf = grade ? `${grade},${scale}` : scale

  await run(ffmpeg, ['-y', '-v', 'error', '-i', tmp, '-vf', vf, '-c:v', 'libwebp', '-quality', '82', outPath])
  const after = await measure(outPath, null, ffmpeg)
  await rm(tmp, { force: true })
  return { width, height, before, after, graded: Boolean(grade) }
}

/**
 * Keep the property's own image order, with one narrow exception: if the first
 * frame is a night shot, fall through to the first daylight one.
 *
 * An earlier version scored every image on exposure and neutrality and picked the
 * best. That was worse — a brightly lit bathroom or an exterior wall scores well
 * and a dim but correct bedroom scores badly, so cards ended up led by toilets.
 * Brightness cannot tell a bed from a sink; the property's ordering can.
 */
const NIGHT_SHOT_Y = 115

function leadFirst(shot) {
  if (shot.length < 2) return shot.map((s) => s.file)
  const isNight = (s) => s.stats?.y != null && s.stats.y < NIGHT_SHOT_Y
  if (!isNight(shot[0])) return shot.map((s) => s.file)
  const daylight = shot.find((s) => !isNight(s))
  if (!daylight) return shot.map((s) => s.file)
  return [daylight.file, ...shot.filter((s) => s !== daylight).map((s) => s.file)]
}

const code = await propertyCode()
const api = `https://ph-ibe.hopenapi.com/ApiWebDistribution/BookingForm/hotel_info?hotels%5B0%5D.code=${code}&language=en-gb`
console.log(`Property ${code} — fetching room types…`)

const data = await fetchJson(api)
const hotel = data.hotels?.[0]
if (!hotel) throw new Error('no hotel in API response')

const ffmpeg = findFfmpeg()
await mkdir(imageDir, { recursive: true })

// Clear previous output so a room removed upstream leaves nothing behind.
for (const file of await readdir(imageDir).catch(() => [])) {
  await rm(join(imageDir, file), { force: true })
}

const rooms = []
let smallest = Infinity

for (const rt of hotel.room_types ?? []) {
  const name = (rt.name ?? '').trim()
  if (!name || EXCLUDE.has(name.toLowerCase())) {
    console.log(`  skip   ${name} (excluded)`)
    continue
  }
  const slug = slugify(name)
  const shot = []

  for (const [i, img] of (rt.images ?? []).entries()) {
    const file = `${slug}-${i + 1}.webp`
    try {
      const r = await downloadImage(img.url, join(imageDir, file), ffmpeg)
      smallest = Math.min(smallest, Math.min(r.width, TARGET_WIDTH))
      shot.push({ file, stats: r.after })
      if (r.graded) {
        const fmt = (m) => `Y${Math.round(m.y)} U${Math.round(m.u)} V${Math.round(m.v)}`
        console.log(`         ${file}: ${fmt(r.before)} -> ${fmt(r.after)}`)
      }
    } catch (error) {
      console.warn(`  warn   ${slug} image ${i + 1}: ${error.message}`)
    }
  }

  // Pool Villa's first frame is a night shot under green LEDs — the real room,
  // but it reads as a broken photo beside eight daylight ones.
  const images = leadFirst(shot)
  if (images.length && images[0] !== shot[0].file) {
    console.log(`         lead: ${images[0]} (was ${shot[0].file})`)
  }

  const amenities = (rt.amenities ?? []).map((a) => a.name)
  // Amenity lists are only populated on some room types upstream, so the pets
  // flag is the one fact that is reliably present per room.
  const petsAllowed = amenities.some((a) => /^pets allowed$/i.test(a))

  rooms.push({
    slug,
    name,
    description: (rt.description ?? '').trim() || null,
    maxOccupancy: rt.max_occupancy ?? null,
    size: rt.size?.value ? { value: rt.size.value, unit: rt.size.unit } : null,
    petsAllowed,
    images,
  })
  console.log(`  room   ${name} — occ ${rt.max_occupancy ?? '?'}, ${images.length} photo(s)`)
}

const header = `// GENERATED FILE — do not edit by hand.
// Source: booking system hotel_info for property ${code}.
// Refresh with: npm run sync:rooms
`
const body = `${header}
export const rooms = ${JSON.stringify(rooms, null, 2)}

export const roomImages = import.meta.glob('../assets/images/real/rooms/*.webp', {
  eager: true,
  import: 'default',
})

/** Resolve a generated filename to its bundled URL. */
export function roomImageUrl(file) {
  return roomImages[\`../assets/images/real/rooms/\${file}\`] ?? null
}
`
await writeFile(dataFile, body, 'utf8')

const withPhotos = rooms.filter((r) => r.images.length).length
console.log(
  `\n${rooms.length} rooms written (${withPhotos} with photos, ${rooms.length - withPhotos} without).` +
    `\nNarrowest synced image: ${smallest === Infinity ? 'n/a' : smallest + 'px'} wide.`,
)
