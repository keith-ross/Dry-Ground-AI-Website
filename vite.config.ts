
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    host: true,  // Listen on all addresses
    port: 3000,  // Default port for frontend
  },
})
