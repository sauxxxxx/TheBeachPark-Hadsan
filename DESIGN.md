---
name: The Beach Park Hadsan
description: A calm, image-led editorial system for a cheerful Cebu beach destination.
colors:
  deep-water: "#0a3548"
  coastal-ink: "#16333d"
  tide-text: "#315765"
  warm-sand-paper: "#f5f1e8"
  clean-paper: "#fbf9f4"
  sun-washed-coral: "#d96048"
  sea-glass: "#6eb9b4"
  sunlit-sand: "#dfbd72"
  quiet-text: "#66777b"
typography:
  display:
    fontFamily: "Libre Caslon Display, Georgia, serif"
    fontSize: "clamp(3.375rem, 6.5vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  square: "0"
spacing:
  compact: "18px"
  content: "24px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.sun-washed-coral}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 26px"
    height: "48px"
  button-light:
    backgroundColor: "{colors.clean-paper}"
    textColor: "{colors.coastal-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 26px"
    height: "48px"
---

# Design System: The Beach Park Hadsan

## Overview

**Creative North Star: "The Cebu Coast Journal"**

The system treats The Beach Park as a place to enter, not a brochure to scan. Authentic photography carries the emotion while warm paper, restrained coral accents, and an editorial serif give the content a calm, considered pace. The finish is premium through proportion and restraint, but the identity remains relaxed, local, and welcoming.

The composition alternates cinematic image fields with quiet editorial passages. Motion follows a slow wave rhythm: one entrance sequence, gentle image drift, and measured content reveals. Interactive elements are integrated into the narrative instead of enclosed in dashboard-like cards.

**Key Characteristics:**

- Authentic, full-bleed destination photography
- Warm paper grounds and deep coastal ink
- Editorial display type paired with quiet utility labels
- Asymmetric whitespace and alternating density
- Restrained coral used for actions and wayfinding

## Colors

The palette begins with water, sun-warmed paper, and a single coral signal.

### Primary

- **Deep Water:** The foundation for footer fields, dark passages, and high-contrast overlays.
- **Sun-washed Coral:** Reserved for primary actions, selection feedback, and small navigation signals.

### Secondary

- **Sea Glass:** A supporting coastal accent used sparingly.
- **Sunlit Sand:** The visible keyboard-focus color and occasional warm emphasis.

### Neutral

- **Warm Sand Paper:** The primary page ground.
- **Clean Paper:** A lighter editorial surface and light-on-photo action fill.
- **Coastal Ink:** Main text and structural line color.
- **Quiet Text:** Secondary prose and operational notes.

**The Coral Signal Rule.** Coral identifies action or state; it never becomes a large decorative field.

**The Real Water Rule.** Blue and aqua atmosphere comes from photography first. Interface color supports the image instead of competing with it.

## Typography

**Display Font:** Libre Caslon Display (with Georgia fallback)  
**Body Font:** DM Sans (with Arial fallback)

**Character:** The display face is literary and unhurried; the body face is direct, compact, and highly legible. Together they make the property feel considered without turning formal or exclusive.

### Hierarchy

- **Display** (400, fluid 54–92px on internal heroes, 0.98 line-height): First-view headings and rare closing statements.
- **Headline** (400, generally fluid 44–76px, approximately 1 line-height): Section ideas, usually limited to two or three lines.
- **Title** (400, generally 25–58px): Room names, navigation destinations, and itinerary summaries.
- **Body** (400, 15px, 1.65 line-height): Editorial and operational prose, kept to a readable narrow measure.
- **Label** (600, 9–10px, 0.10–0.15em tracking, uppercase): Compact functional context, states, and actions.

**The Quiet Hierarchy Rule.** A viewport gets one dominant typographic voice. Supporting labels stay small and are omitted when the heading already provides the context.

## Layout

The main content width is capped at 1280px with generous fluid side margins. Desktop layouts favor asymmetric 40/60 or 45/55 relationships; mobile layouts collapse to one clear reading path without preserving decorative offsets.

Home pacing alternates a full-viewport image, an overflow exploration rail, an interactive itinerary, editorial image-and-copy spreads, a full-bleed activity moment, and a compact image collage. Internal pages use an immersive hero followed by long-form alternating rows. Section spacing is intentionally generous, typically around 96–150px on desktop and 62–105px on mobile.

Horizontal scrolling is contained inside the destination rail and exposes a visible next-panel edge. The document itself must never overflow horizontally.

## Elevation & Depth

The system is flat by default. Depth comes from photography, tonal contrast, image overlays, and spatial layering. Shadows appear only on the fixed header and cookie notice, where separation from moving page content is functional.

**The Flat-by-Default Rule.** Content sections never use card shadows to manufacture hierarchy.

## Shapes

Corners are square. Thin one-pixel rules divide navigation and operational content; photographs remain rectangular and unclipped. Circular decoration, pills, floating blobs, and ornamental containers are outside the system.

## Components

### Buttons

- **Shape:** Square, compact rectangle with a one-pixel border.
- **Primary:** Coral field with white uppercase label and 26px horizontal padding.
- **Hover / Focus:** A slight upward translation and deeper coral on hover; a two-pixel sand outline on keyboard focus.
- **Light:** Clean-paper field over photography with coastal-ink text.

### Cards / Containers

- **Corner Style:** Square.
- **Background:** Transparent or inherited; content is not wrapped in floating white cards.
- **Shadow Strategy:** None.
- **Border:** Only when a line communicates structure or state.

### Navigation

The fixed header presents Menu, a centered compact brand mark, and Book. The full-screen menu uses numbered editorial links, fine divider rules, and one authentic photo. It closes after navigation or Escape and locks body scroll while open.

### Destination Rail

Large photographic panels use native horizontal scroll and snap behavior. Captions sit in the image's darkened lower field with one title, one sentence, and one action. Hover and focus add only subtle image scale and caption movement.

### Selectable Experience Rows

Itinerary options are open rows divided by thin rules rather than cards. Selection changes the label and coral state line, and the summary updates in place. Activity tabs use understated underlines over a photographic field.

## Do's and Don'ts

### Do:

- **Do** let one authentic photograph dominate important viewports.
- **Do** use whitespace to separate ideas before introducing a border or background.
- **Do** keep motion slow, bounded, and meaningful, with a reduced-motion equivalent.
- **Do** keep Exely booking actions visually clear while preserving `/booking/` as the handoff route.
- **Do** label unknown operational facts honestly instead of filling them with plausible copy.
- **Do** label AI-assisted photographic edits clearly and retain their verified source files and provenance.

### Don't:

- **Don't** rebuild the page from repeated card grids or bordered boxes.
- **Don't** use oversized display type in every section; scale is reserved for the main idea.
- **Don't** add generic eyebrow copy above headings that already make sense on their own.
- **Don't** substitute illustrations, generated scenes, gradients, or decorative effects for authentic property photography.
- **Don't** imitate ultra-luxury formality or erase the property's cheerful local character.
