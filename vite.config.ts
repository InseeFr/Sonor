import { defineConfig } from 'vitest/config';
import { resolve } from 'node:url';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    include: ['src/**/*.spec.*'],
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'src/setupTests.js', 'tests/', 'build/'],
    },
  },
  resolve: {
    alias: {
      i18n: resolve(__dirname, 'src/i18n/index.ts'),
      utils: resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    outDir: 'build',
    target: 'esnext',
  },
  plugins: [tsconfigPaths(), react()],
});
