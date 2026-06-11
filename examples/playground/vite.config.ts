import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // GitHub Pages部署配置
  base: process.env.VITE_BASE_URL || '/',

  plugins: [vue(), react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@vue-mathjax-editor/core': resolve(__dirname, '../../packages/core/src'),
      '@vue-mathjax-beautiful/shared': resolve(__dirname, '../../packages/shared/src'),
      'react-mathjax-beautiful': resolve(__dirname, '../../packages/react/src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // 使用现代编译器API
      },
    },
  },

  server: {
    port: 3000,
    open: false,
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          react: ['react', 'react-dom'],
          ui: ['lucide-vue-next', 'vue-i18n'],
        },
      },
    },
  },
});
