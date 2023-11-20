import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'tower',
  build: {
    outDir: '../server/www',
    sourcemap: false,
  },
  server: {
    port: 8080
  }
})
