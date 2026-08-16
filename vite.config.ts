import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves project pages from /<repo-name>/, not the domain root,
// so root-relative paths (assets, manifest start_url/scope) need this prefix.
const base = '/BusMate/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'BusMate',
        short_name: 'BusMate',
        description: 'Quick links to live departures for your favourite Reading Buses stops.',
        theme_color: '#2563eb',
        background_color: '#f5f7fa',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
