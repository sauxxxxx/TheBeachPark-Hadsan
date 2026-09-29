# Production handoff

## Public page architecture

The current public page architecture is:

1. `/`
2. `/stay/`
3. `/stay/room-details/:slug/`
4. `/adventures/`
5. `/adventures/details/:slug/`
6. `/experiences/`
7. `/offers/`
8. `/explore/souvenir-shop/`
9. `/explore/gallery/`
10. `/explore/about/`
11. `/explore/contact/`

Utility routes: `/booking/`, `/privacy/`, `/terms/`, and the 404 route.

## Exely boundary

- Property ID `507010` remains fixed in `src/services/exely.js`.
- `/booking/` remains the stable first-party booking path.
- The adapter reads `VITE_EXELY_BOOKING_URL` and does not invent an Exely URL.
- Until an official URL/package is configured, the booking route shows direct reservation contact options instead of a simulated booking form.
- Rates, inventory, rate plans, reservations, payment data, cancellation rules, guest profiles, and loyalty remain Exely responsibilities.

## Production configuration

Copy `.env.example` into the deployment environment and provide the approved site origin and Exely booking target. The host must serve `index.html` for unknown paths; `public/_redirects` covers hosts supporting Netlify-style rewrite rules.

## Still requiring approval

- Exely's official custom-site package, exact allowed origins, integration mode, production URL, analytics events, and API scope.
- Final legal/privacy/cookie text and controller/processor wording.
- Complete active room list, capacities, amenities, authentic images, and Exely IDs.
- Current day-pass, local-discount, furniture/cabana, activity, event, and offer prices/rules.
- Pet rules, merchandise inventory, ownership clearance for source photography, and final URL migration/redirect matrix.
- Analytics provider/container ID and stakeholder acceptance criteria.
