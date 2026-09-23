import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { onScroll, prefersReducedMotion, viewportProgress } from '../services/scrollEngine'

// Scroll choreography, driven entirely by markup attributes:
//
//   data-lines            heading text splits into real typeset lines that rise out of a mask
//   data-image-expand     a centred square frame opens once to the element's final aspect ratio
//   data-sequence         direct children arrive in order behind the section's own reveal
//   data-parallax="0.12"  the element drifts against the scroll at the given strength
//   data-pin              exposes --pin-progress (0→1) across the element's travel, for CSS to use
//   data-scrub=".video"   on a pinned element: seeks that video across the same travel
//   data-scrub-fps="24"   frame rate of that encode, so seeks quantise correctly
//   data-cue="0.3,0.5"    inside a pinned element: carries .is-cued across that window
//   data-reveal-target    a selector for the element to *measure* instead of this one
//
// An element counts as visible once it covers VISIBLE_FRACTION of the viewport's
// height, so a tall image and a short caption trip at a comparable moment. An
// element too short to ever cover that much is measured against its own height
// instead, once it is fully on screen.
//
// Reveals are one-shot and dropped from the list once played. Parallax and pins
// stay live. Under reduced motion everything renders in its resting state and no
// scroll work is scheduled at all.

const REVEAL_SELECTOR = '[data-reveal], [data-lines], [data-sequence]'
const VISIBLE_FRACTION = 0.25
// Fallback frame rate for a scrub video that does not declare its own. Seeks are
// quantised to frame boundaries so a frame is asked for once rather than
// re-requested at sub-frame offsets. The real value belongs on the element as
// data-scrub-fps, so re-encoding at a different rate cannot silently desync.
const DEFAULT_SCRUB_FPS = 24

/**
 * Nudge a scrub video into a seekable state.
 *
 * Mobile Safari will not honour currentTime on a video that has never started
 * decoding, so kick off playback and immediately pause it. The play() promise
 * rejects when autoplay is refused, which is harmless here and must be caught
 * or it surfaces as an unhandled rejection.
 */
function prepareScrubVideo(video) {
  const settle = () => {
    video.pause()
    video.currentTime = 0
  }
  const kick = () => {
    const attempt = video.play()
    if (attempt && typeof attempt.then === 'function') attempt.then(settle).catch(settle)
    else settle()
  }
  // readyState 0 means metadata has not arrived, so duration is still NaN.
  if (video.readyState >= 1) kick()
  else video.addEventListener('loadedmetadata', kick, { once: true })
}

function splitIntoLines(heading) {
  if (heading.dataset.linesReady === 'true') return
  // Only plain text (optionally broken by <br>) can be re-typeset safely.
  const breakable = [...heading.childNodes].every(
    (node) => node.nodeType === Node.TEXT_NODE || node.nodeName === 'BR',
  )
  if (!breakable) return

  const label = heading.textContent.replace(/\s+/g, ' ').trim()
  const words = []
  heading.childNodes.forEach((node) => {
    if (node.nodeName === 'BR') return
    node.textContent
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => words.push(word))
  })
  if (!words.length) return

  // Measure where the browser actually breaks the line, rather than guessing.
  heading.textContent = ''
  const probes = words.map((word, index) => {
    const probe = document.createElement('span')
    probe.className = 'line-probe'
    probe.textContent = index === words.length - 1 ? word : word + ' '
    heading.appendChild(probe)
    return probe
  })

  const lines = []
  let lastTop = null
  probes.forEach((probe, index) => {
    const top = Math.round(probe.offsetTop)
    if (lastTop === null || Math.abs(top - lastTop) > 2) {
      lines.push([])
      lastTop = top
    }
    lines[lines.length - 1].push(words[index])
  })

  heading.textContent = ''
  heading.setAttribute('aria-label', label)
  lines.forEach((line, index) => {
    const mask = document.createElement('span')
    mask.className = 'line'
    mask.setAttribute('aria-hidden', 'true')
    const inner = document.createElement('span')
    inner.className = 'line__inner'
    inner.style.setProperty('--line-index', String(index))
    inner.textContent = line.join(' ')
    mask.appendChild(inner)
    heading.appendChild(mask)
  })
  heading.dataset.linesReady = 'true'
}

function prepareSequence(container) {
  ;[...container.children].forEach((child, index) => {
    child.classList.add('sequence-item')
    child.style.setProperty('--sequence-index', String(index))
  })
}

/** How much of the viewport this element covers, as a fraction that can reach 1. */
function coverage(element, viewportHeight) {
  if (!viewportHeight) return 0
  const rect = element.getBoundingClientRect()
  if (!rect.height) return 0
  const overlap = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
  if (overlap <= 0) return 0
  const reachable = Math.min(viewportHeight, rect.height / VISIBLE_FRACTION)
  return overlap / reachable
}

/**
 * Wire scroll choreography for everything inside rootRef.
 *
 * `rescanOn` is an optional reactive source (a route path, say). When it
 * changes the previous page's effects are released and the new DOM is armed
 * from scratch, so a single call at the app shell covers every route.
 */
export function useScrollChoreography(rootRef, rescanOn) {
  let releaseScroll
  let resizeHandler

  function teardown() {
    releaseScroll?.()
    releaseScroll = undefined
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    resizeHandler = undefined
  }

  function scan() {
    teardown()
    const root = rootRef.value
    if (!root) return

    const reveals = [...root.querySelectorAll(REVEAL_SELECTOR)]
    const headings = [...root.querySelectorAll('[data-lines]')]
    const sequences = [...root.querySelectorAll('[data-sequence]')]
    const imageExpands = [...root.querySelectorAll('[data-image-expand]')]
    const parallax = [...root.querySelectorAll('[data-parallax]')]
    const pins = [...root.querySelectorAll('[data-pin]')]

    if (prefersReducedMotion()) {
      reveals.forEach((element) => element.classList.add('is-revealed'))
      pins.forEach((element) => element.style.setProperty('--pin-progress', '0'))
      return
    }

    headings.forEach(splitIntoLines)
    sequences.forEach(prepareSequence)
    reveals.forEach((element) => element.classList.add('reveal-armed'))

    // Measure the target, animate the element — a masked element has clipped
    // itself out of existence and cannot report its own visibility.
    let pending = reveals.map((element) => {
      const selector = element.dataset.revealTarget
      const target = (selector && element.querySelector(selector)) || element
      return { element, target }
    })

    const fields = parallax.map((element) => ({
      element,
      strength: Number.parseFloat(element.dataset.parallax) || 0.1,
    }))

    const expandFields = imageExpands.map((element) => ({
      element,
      revealed: false,
      startX: 0,
      startY: 0,
    }))

    // The photograph keeps its final dimensions throughout. Only the visible
    // window changes: begin with a centred square, then open that window on all
    // four sides until the complete composition is visible.
    const measureExpandFields = () => {
      const squareRatio = window.innerWidth < 768 ? 0.58 : 0.46
      const waiting = expandFields.filter((field) => !field.revealed)
      waiting.forEach((field) => {
        field.element.classList.remove('image-expand-armed')
        const { width, height } = field.element.getBoundingClientRect()
        const squareSize = Math.min(width, height) * squareRatio
        field.startX = Math.max((width - squareSize) / 2, 0)
        field.startY = Math.max((height - squareSize) / 2, 0)
        field.element.style.setProperty('--image-expand-x', field.startX.toFixed(2) + 'px')
        field.element.style.setProperty('--image-expand-y', field.startY.toFixed(2) + 'px')
      })
      if (!waiting.length) return
      // Commit the starting crop before enabling its transition. Otherwise the
      // browser can animate backwards from the full image into the square.
      void root.offsetWidth
      waiting.forEach((field) => field.element.classList.add('image-expand-armed'))
    }
    measureExpandFields()
    let pendingExpands = [...expandFields]

    // A pinned element may hand its progress to a video instead of (or as well
    // as) CSS: data-scrub holds a selector for the <video> to scrub.
    const scrubbers = pins
      .map((element) => {
        const selector = element.dataset.scrub
        const video = selector && element.querySelector(selector)
        if (!video) return null
        const fps = Number.parseFloat(element.dataset.scrubFps) || DEFAULT_SCRUB_FPS
        const scrubber = { element, video, fps, lastFrame: -1, wanted: -1 }
        // A seek requested while another is in flight is dropped, and the scroll
        // loop only ticks on scroll — so without this the frame the user stopped
        // on never arrives and the video rests on a stale one.
        video.addEventListener('seeked', () => {
          if (scrubber.wanted < 0 || scrubber.wanted === scrubber.lastFrame) return
          scrubber.lastFrame = scrubber.wanted
          video.currentTime = scrubber.wanted / scrubber.fps
        })
        return scrubber
      })
      .filter(Boolean)
    scrubbers.forEach(({ video }) => prepareScrubVideo(video))

    // Captions keyed to moments in a pinned section's travel. Each cue declares
    // the window it owns; the pin loop below toggles .is-cued as progress
    // crosses it, so nothing here needs its own scroll listener.
    const cues = pins.flatMap((element) =>
      [...element.querySelectorAll('[data-cue]')].map((node) => {
        const [enter, exit] = node.dataset.cue.split(',').map(Number)
        return { element, node, enter, exit, shown: null }
      }),
    )

    releaseScroll = onScroll((scrollY, viewportHeight) => {
      if (pending.length) {
        pending = pending.filter(({ element, target }) => {
          const hasPassedViewport = target.getBoundingClientRect().bottom <= 0
          if (!hasPassedViewport && coverage(target, viewportHeight) < VISIBLE_FRACTION) return true
          element.classList.add('is-revealed')
          return false
        })
      }

      fields.forEach(({ element, strength }) => {
        const progress = viewportProgress(element, viewportHeight)
        const travel = (progress - 0.5) * element.offsetHeight * strength
        element.style.setProperty('--parallax-shift', travel.toFixed(2) + 'px')
      })

      if (pendingExpands.length) {
        pendingExpands = pendingExpands.filter((field) => {
          const { element } = field
          const hasPassedViewport = element.getBoundingClientRect().bottom <= 0
          if (!hasPassedViewport && coverage(element, viewportHeight) < VISIBLE_FRACTION) return true

          field.revealed = true
          element.classList.add('is-expanded')
          element.style.setProperty('--image-expand-x', '0px')
          element.style.setProperty('--image-expand-y', '0px')

          const releaseHint = (event) => {
            if (event.propertyName !== 'clip-path') return
            element.classList.remove('image-expand-armed', 'is-expanded')
            element.removeEventListener('transitionend', releaseHint)
          }
          element.addEventListener('transitionend', releaseHint)
          return false
        })
      }

      pins.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const travel = Math.max(rect.height - viewportHeight, 1)
        const progress = Math.min(Math.max(-rect.top / travel, 0), 1)
        element.style.setProperty('--pin-progress', progress.toFixed(4))
      })

      cues.forEach((cue) => {
        const progress = Number.parseFloat(
          cue.element.style.getPropertyValue('--pin-progress'),
        )
        const active = progress >= cue.enter && progress < cue.exit
        if (active === cue.shown) return
        cue.shown = active
        cue.node.classList.toggle('is-cued', active)
      })

      scrubbers.forEach((scrubber) => {
        const { element, video } = scrubber
        const duration = video.duration
        if (!duration || Number.isNaN(duration)) return

        const rect = element.getBoundingClientRect()
        const travel = Math.max(rect.height - viewportHeight, 1)
        const progress = Math.min(Math.max(-rect.top / travel, 0), 1)

        // Quantise to the source frame rate. Without this every rAF asks for a
        // slightly different time and the decoder never finishes a seek.
        const frame = Math.round(progress * (scrubber.fps * duration - 1))
        scrubber.wanted = frame
        if (frame === scrubber.lastFrame || video.seeking) return
        scrubber.lastFrame = frame
        video.currentTime = frame / scrubber.fps
      })
    })

    // Headings re-typeset on resize only while they are still hidden, so a
    // reveal already in flight is never torn apart mid-animation.
    if (headings.length || expandFields.length) {
      let resizeFrame
      resizeHandler = () => {
        cancelAnimationFrame(resizeFrame)
        resizeFrame = requestAnimationFrame(() => {
          measureExpandFields()
          headings.forEach((heading) => {
            if (heading.classList.contains('is-revealed')) return
            heading.dataset.linesReady = 'false'
            heading.textContent = heading.getAttribute('aria-label') ?? heading.textContent
            heading.removeAttribute('aria-label')
            splitIntoLines(heading)
          })
        })
      }
      window.addEventListener('resize', resizeHandler, { passive: true })
    }
  }

  onMounted(() => {
    scan()
    if (rescanOn) {
      // Wait for the incoming view to render before measuring it.
      watch(rescanOn, () => nextTick().then(scan))
    }
  })

  onBeforeUnmount(teardown)

  // Routes are lazily loaded, so on a cold load the view has not rendered when
  // this composable mounts. The caller re-runs scan once the router settles.
  return { scan }
}
