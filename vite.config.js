import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    hmr: {
      port: 5000
    }
  }
})