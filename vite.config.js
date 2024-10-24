import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: process.env.PORT || 3000,  // Bind to Render's PORT or default to 3000 for local development
    host: true,  // Ensures the server listens on all available network interfaces (not just localhost)
  },
})
