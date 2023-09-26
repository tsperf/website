import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { FontaineTransform } from 'fontaine'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), FontaineTransform.vite({
    fallbacks: ['BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans'],
    resolvePath: (id) => new URL(id.slice(1), import.meta.url),
  })],
})
