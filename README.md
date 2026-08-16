# BusMate

A simple PWA to check live departures for my favourite Reading Buses stops. Pick
**Home** or **Town**, tap a stop, and it opens that stop's live-departures page on
reading-buses.co.uk in a new tab.

No accounts, no API keys, no backend, no tracking - each stop is just a link out to
the operator's own public page, built from the stop's ATCO code (the same code printed
on the stop's physical sign). Light and dark mode both work from the start, following
system preference by default.

Stops live in `src/data/stops.ts`.

```bash
npm install
npm run dev
```

Deploys to GitHub Pages automatically on push to `main`.

## Stack

React + TypeScript + Vite, `vite-plugin-pwa` for installability.
