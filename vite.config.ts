import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      },
      manifest: {
        name: 'Trillarch',
        short_name: 'Trilarch',
        description: 'Trillarch TaskSystem',
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