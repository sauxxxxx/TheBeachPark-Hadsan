# The Beach Park Hadsan

Vue and Vite website for The Beach Park Hadsan in Lapu-Lapu City, Cebu.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Production website assets live in `src/assets/` and `public/media/`. Original working media is kept locally in `source-assets/` and is intentionally excluded from Git.

## Exely integration

The supplied booking and reputation packages are installed through reusable Vue
widgets. Their property context, loader hosts, room IDs, and offer IDs are in
`src/data/exelyIntegration.js`; the provider renders availability, pricing and
checkout on `/booking/`. No booking API credentials are needed in the frontend.

The shared runtime loads Exely once for its booking widget. The Stay page links
to Exely's full guest-review view near its final booking section.
Our Vue search forms use branded calendars, guest controls and promo-code entry;
they share a selection remembered in session storage. General searches and
room/offer links use normal page navigation to `/booking/`, preserving dates,
guest counts, child ages, promo codes and the supplied room/offer identifiers.

Run `npm test` for search validation, booking-link, loader-queue, fallback-host, and review tests.
Verify real widgets in a browser before publishing, including direct booking links,
multiple search forms, route changes, calendars, children ages, and mobile widths.
Current validation and the embedded provider connection blocker are recorded in
`docs/exely-validation.md`.
