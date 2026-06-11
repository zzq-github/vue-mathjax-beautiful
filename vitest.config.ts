import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages/core/src'),
      '@vue-mathjax-editor/core': resolve(__dirname, './packages/core/src'),
      '@vue-mathjax-beautiful/shared': resolve(__dirname, './packages/shared/src'),
      'vue-mathjax-beautiful': resolve(__dirname, './packages/core/src'),
      'react-mathjax-beautiful': resolve(__dirname, './packages/react/src'),
    }
  }
}) 
