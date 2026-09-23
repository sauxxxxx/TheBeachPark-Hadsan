// One rAF loop drives every scroll-linked effect on the page. Components register
// a measure/apply pair instead of attaching their own scroll listener, so adding a
// parallax field or a pinned sequence never costs another handler.

const subscribers = new Set()
let frame = null
let running = false
let viewportHeight = 0

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function tick() {
  frame = null
  const scrollY = window.scrollY
  subscribers.forEach((update) => update(scrollY, viewportHeight))
}

function request() {
  if (frame === null) frame = requestAnimationFrame(tick)
}

function measure() {
  viewportHeight = window.innerHeight
  request()
}

// When Lenis is running it emits its own scroll event; subscribing to that
// instead of the window keeps everything on one tick source rather than two
// rAF loops racing. Set by registerScrollSource() before the first start().
let externalSource = null

/**
 * Point the engine at a smooth-scroll instance. Pass null to fall back to the
 * native window scroll event.
 */
export function registerScrollSource(source) {
  if (running) detachSource()
  externalSource = source
  if (running) attachSource()
}

function attachSource() {
  if (externalSource?.on) externalSource.on('scroll', request)
  else window.addEventListener('scroll', request, { passive: true })
}

function detachSource() {
  if (externalSource?.off) externalSource.off('scroll', request)
  else window.removeEventListener('scroll', request)
}

function start() {
  if (running) return
  running = true
  viewportHeight = window.innerHeight
  attachSource()
  window.addEventListener('resize', measure, { passive: true })
  request()
}

function stop() {
  if (!running) return
  running = false
  detachSource()
  window.removeEventListener('resize', measure)
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null
}

/**
 * Register a scroll-linked update. Returns an unsubscribe function.
 * The callback receives (scrollY, viewportHeight) and should only write styles.
 */
export function onScroll(update) {
  subscribers.add(update)
  start()
  request()

  return () => {
    subscribers.delete(update)
    if (!subscribers.size) stop()
  }
}

/** Progress of an element through the viewport, 0 as it enters from below, 1 as it leaves the top. */
export function viewportProgress(element, height) {
  const rect = element.getBoundingClientRect()
  const span = rect.height + height
  if (span <= 0) return 0
  return Math.min(Math.max((height - rect.top) / span, 0), 1)
}
