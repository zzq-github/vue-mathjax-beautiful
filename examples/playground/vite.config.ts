import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // GitHub Pages部署配置
  base: process.env.VITE_BASE_URL || '/',
  
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
    open: false
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['lucide-vue-next', 'vue-i18n']
        }
      }
    }
  }
}) 