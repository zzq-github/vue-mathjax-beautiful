import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*']
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueMathjaxBeautiful',
      fileName: (format) => `vue-mathjax-beautiful.${format === 'es' ? 'js' : format === 'cjs' ? 'umd.cjs' : format}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // 使用现代编译器API
      }
    }
  }
}) 