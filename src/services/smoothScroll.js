import Lenis from 'lenis'
import { prefersReducedMotion } from './scrollEngine'

// Smooth scrolling, owned in one place.
//
// Lenis performs real scrolling — it does not transform the page — so
// window.scrollY, position: sticky and getBoundingClientRect stay accurate and
// the pins, parallax and hero video scrub in scrollEngine need no changes. What
// does change is the tick source: Lenis emits its own scroll event, and letting
// it drive the engine avoids a second rAF loop competing with this one.
//
// Under prefers-reduced-motion nothing is constructed at all, and the site falls
// back to native scrolling.

let lenis = null
let frame = null

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.05,
    // Slightly past-linear so it settles rather than glides to a stop.
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // Touch devices already scroll smoothly and hijacking it costs more than it gives.
    syncTouch: false,
  })

  const raf = (time) => {
    lenis.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return lenis
}

export function getLenis() {
  return lenis
}

/** Pause scrolling behind an overlay. A body overflow lock cannot stop Lenis. */
export function lockScroll(locked) {
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}

/** Used by the router so navigation does not fight the instance. */
export function scrollToTarget(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, options)
    return true
  }
  return false
}

export function destroySmoothScroll() {
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null
  lenis?.destroy()
  lenis = null
}
