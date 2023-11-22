import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tower',
  plugins: [vue()],
  build: {
    outDir: '../TowerCheckpoint/wwwroot',
    sourcemap: false,
  },
  server: {
    port: 8080
  }
})
