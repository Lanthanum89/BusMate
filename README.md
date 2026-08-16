# BusMate

A simple PWA to check live departures for your favourite Reading Buses stops. Pick
**Home** or **Town**, tap a stop, and it opens that stop's live-departures page on
reading-buses.co.uk in a new tab.

## Why so simple

No accounts, no API keys, no backend, and no data collection - the app itself makes no
network requests at all. Each stop is just a link out to the operator's own public
live-departures page, built from that stop's [NaPTAN/ATCO code](https://www.reading-buses.co.uk),
the same kind of code printed on the stop's physical sign and used in reading-buses.co.uk's
own URLs. That's public transport infrastructure data, not personal information, so
listing a few favourite stops is fine to keep public even once this becomes a hosted PWA
- there's just nothing private in the app to worry about.

Light and dark mode are both supported from the start (no separate "add dark mode
later" step), following the system preference by default and remembering your choice
once you toggle it.

## Editing your stops

Stops live in `src/data/stops.ts`:

```ts
export const stops: BusStop[] = [
  { id: 'ikea', code: '030054700001', label: 'Towards IKEA', group: 'home' },
  { id: 'home-station', code: '030054700002', label: 'Towards Station', group: 'home' },
  { id: 'town-station', code: '039028150004', label: 'Station', group: 'town' },
  { id: 'blagrave', code: '039028150001', label: 'Blagrave', group: 'town' },
]
```

Add, remove, or re-group stops by editing this list - `group` is either `'home'` or
`'town'` and controls which toggle tab a stop shows up under. `code` is the stop's ATCO
code; find one by searching [reading-buses.co.uk](https://www.reading-buses.co.uk) for
the stop and copying the code from its URL (`/stops/<code>`).

## Setup

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

`.github/workflows/deploy-pages.yml` builds and deploys automatically on every push to
`main` (or on demand from **Actions → Deploy to GitHub Pages → Run workflow**). One-time
setup: **Settings → Pages → Source: GitHub Actions.**

`vite.config.ts` sets `base: '/BusMate/'` to match the resulting project-page URL
(`https://<user>.github.io/BusMate/`). If you ever rename the repo or deploy elsewhere,
update that value to match.

## Possible next steps

- **Live departure times inline**, instead of just linking out - Reading Buses' Open
  Data API doesn't send CORS headers, so this would need a small proxy (Cloudflare
  Worker or similar) to call it from the browser, plus an API key. Skipped for now to
  keep the app fully static and key-free.
- **A real icon design** - `public/icon-*.png` are simple generated placeholders, good
  enough to satisfy PWA installability.
- **Editing stops from the UI** instead of the source file, if that ever gets
  cumbersome.

## Stack

React + TypeScript + Vite, `vite-plugin-pwa` for installability. No state library, no
router, no CSS framework - it's a single page with a handful of custom properties for
theming.
