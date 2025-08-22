import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My Vite React PWA',
        short_name: 'ReactPWA',
        description: 'A Vite + React Progressive Web App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'trillarch-sq.jpg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'trillarch-sq.jpg',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'trillarch-sq.jpg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})