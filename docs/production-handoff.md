# Production handoff

## Public page architecture

The current public page architecture is:

1. `/`
2. `/stay/`
3. `/rates/`
4. `/stay/room-details/:slug/`
5. `/adventures/`
6. `/adventures/details/:slug/`
7. `/experiences/`
8. `/offers/`
9. `/explore/souvenir-shop/`
10. `/explore/gallery/`
11. `/explore/about/`
12. `/explore/contact/`

Utility routes: `/booking/`, `/privacy/`, `/terms/`, and the 404 route.

## Exely boundary

- Property ID `507010`, integration context `BE-INT-thebeachpark_2026-10-22`,
  loader hosts, 13 room IDs and three offer IDs come from the supplied Exely ZIPs
  and are maintained in `src/data/exelyIntegration.js`.
- `/booking/` embeds the official engine. Booking links use document navigation
  so Exely receives the complete dates/guests/room/offer query at initialization.
- Search widgets in the home/Stay heroes and prefooter have unique containers.
  Vue mounts enqueue embeds through Exely's supplied command-queue protocol;
  the shared loader and context initialize once per document, with fallback hosts.
- The Stay page shows the official reputation badge below its hero. Its aggregate
  score and review-publishing settings belong to Exely Reputation Manager. The
  separate manually checked Google review carousel is retained.
- The booking page omits the prefooter search/banner, site footer and marketing
  popups. A compact reservation contact and legal links remain below the engine.
- Provider widgets are not subject to the site's optional analytics choice;
  Exely's own policies and storage behaviour are disclosed on the privacy page.
- Live room rates, inventory, rate plans, reservations, payment data, cancellation rules, guest profiles, and loyalty remain Exely responsibilities. The public `/rates/` guide displays the client's October 2026 supplied figures; it is not a live Exely quote.

## Production configuration

Copy `.env.example` into the deployment environment and provide the approved site origin and Exely booking target. The host must serve `index.html` for unknown paths; `public/_redirects` covers hosts supporting Netlify-style rewrite rules.

## Featured Google reviews

`server/reviews/featuredReviews.js` contains five positive five-star reviews
checked against the public Google Maps listing on 22 October 2026. Preserve each
review's full original wording, Google review ID, rating, author profile, avatar,
and individual source link. The array defines the editorial display order. Review
complete wording before adding an entry; a high rating alone is not enough.

The Places API only returns up to five reviews, sorted by relevance. The selector
retains checked entries absent from that batch and also works during API outages.
When Google returns a matching review, current metadata is used only if the text
still matches and the rating is 4–5 stars. Changed wording or lower ratings remove
that entry until checked again. Recheck the catalogue periodically for edits or
removals outside the limited API batch, and update `reviewSelectionCheckedAt`.
Publication dates are omitted where only a relative date was available; do not
store a relative date that will become stale. The footer discloses the selection
criteria and retains the link to all reviews. Overall ratings and review counts
are only supplied when the live Google request succeeds.

## Still requiring approval

- Exely's post-installation quality check, final production-domain configuration,
  account-side reputation publishing preferences, and any separate analytics setup.
- Final legal/privacy/cookie text and controller/processor wording.
- Complete active room list, capacities, amenities, authentic images, and Exely IDs.
- Reconcile the client-supplied October 2026 rate guide with Exely before enabling live booking. The child-height brackets overlap at exactly 4.5 ft, and the small floating mat duration was not specified.
- Current offer validity and unlisted activity rates/rules (including Superman, guest-driven speedboat rides, guided paddle tours, and snorkeling mask rental).
- Pet rules, merchandise inventory, ownership clearance for source photography, and final URL migration/redirect matrix.
- Analytics provider/container ID and stakeholder acceptance criteria.
