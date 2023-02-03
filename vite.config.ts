import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@data': '/src/data',
      '@models': '/src/models',
      '@components': '/src/components',
      '@views': '/src/router/views',
      '@router': '/src/router',
      '@store': '/src/store',
      '@assets': '/src/assets',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
    }
  }
})
