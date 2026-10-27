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

The shared runtime loads Exely once and mounts independent search/reputation
containers as Vue pages change. Search results and booking links use normal page
navigation to preserve the engine's query-string initialization. Exely's supplied
search profile resolves its booking target against the current host.

Run `npm test` for booking-link, loader-queue, fallback-host, and review tests.
Verify real widgets in a browser before publishing, including direct booking links,
multiple search forms, route changes, calendars, children ages, and mobile widths.
