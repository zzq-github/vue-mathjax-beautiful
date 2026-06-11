import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*'],
      entryRoot: 'src',
      copyDtsFiles: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        shared: resolve(__dirname, 'src/index.ts'),
        latex: resolve(__dirname, 'src/latex.ts'),
        lazyLoad: resolve(__dirname, 'src/lazyLoad.ts'),
        logger: resolve(__dirname, 'src/logger.ts'),
        cache: resolve(__dirname, 'src/cache.ts'),
        sanitizeHtml: resolve(__dirname, 'src/sanitizeHtml.ts'),
        data: resolve(__dirname, 'src/data/index.ts'),
      },
      name: 'MathjaxBeautifulShared',
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
  },
});
