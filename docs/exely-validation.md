# Exely validation — 27 October 2026

## Implementation

The integration is on `codex/exely-integration`. Production remains on the
previous release until the embedded booking engine passes its connection check.
The frontend uses the supplied context `BE-INT-thebeachpark_2026-10-22`, property
`507010`, official loaders, 13 room identifiers and three offer identifiers.

## Branded search and catalogue update

The Exely search embeds have been replaced with first-party Vue forms on home,
Stay and the prefooter. Custom calendars enforce check-out after check-in;
guest controls collect each child's age. A shared session selection also flows
into room-specific buttons, offer links and the header booking action.

Room cards now stack photographs and descriptions vertically with a compact
action row below, restoring the full image width. Unphotographed room entries
also keep their availability buttons separate from the room-detail link.

The search/date and query tests bring the suite to 25 passing tests. Browser QA
confirmed general navigation and a room-specific handoff for 15–18 November,
three adults, children aged seven and eight, and a promo code containing `&`.
These frontend handoffs do not establish successful booking inside Exely.

## Original integration checks

- All 19 automated tests and the production build.
- Independent search widgets in the Stay hero and page footer.
- Search selection of 15–18 November 2026, three adults and one seven-year-old
  child reached `/booking?date=2026-11-15&nights=3&adults=3&children-age=7&access-code=`.
- All 13 room availability links contain their supplied `room-type` identifier.
- Offer links include the supplied `special-offer` identifier.
- Vue navigation back to Stay renders the widgets again through the live queue.
- Local Stay layout at 390 × 844 has no horizontal overflow.
- Reputation rendered locally with a provider score of 7.5/10 from 1,044 reviews.

## Unresolved provider connection

The room-selection iframe remains one pixel high beneath Exely's loading frame.
The provider reports `BE: Error: booking-form connect not established`.
This occurs locally and on the protected HTTPS Vercel preview in Ugsimar Chrome.
The original supplied script reproduces the failure on a standalone HTML page,
without Vue, site styles or the custom runtime. That reproduction is preserved
in `docs/exely-original-embed.html`.

The standalone reproduction was deployed temporarily at:
`https://the-beach-park-hadsan-885zroblk-choyens.vercel.app/exely-check.html`.
This historical preview requires Vercel authentication; it is not a public
support link. The diagnostic page is excluded from the final public build.

The reputation iframe also remained one pixel high on this HTTPS preview,
although it loaded locally in the earlier Chrome session. Its HTTPS behaviour
still needs validation. Search widgets render in both environments.

The provider's standalone booking URL loads a date/guest form without `int=true`.
This narrows the investigation to the embedded connection or browser/environment
behaviour, but does not establish the underlying cause. Exely should check the
integration context and embedded frame connection before production activation.

The frontend now waits for the actual engine frame to resize. A 30-second
timeout replaces an indefinite loader with retry and reservation contact options.
One-pixel reputation frames also receive this fallback. No reservation, guest
details or payment was submitted during testing.

## Remaining acceptance checks

After the connection is resolved, verify real room results, room and offer
filters, mobile booking layout, guest-details progression, and reputation on
HTTPS. Ask Exely to perform its requested post-installation check. No message
has been sent to Exely on the user's behalf.
