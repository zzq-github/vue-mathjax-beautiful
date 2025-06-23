import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@vue-mathjax-editor/core': resolve(__dirname, '../../packages/core/src')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 使用现代编译器API
      }
    }
  },

  server: {
    port: 3000,
    open: true
  }
}) 