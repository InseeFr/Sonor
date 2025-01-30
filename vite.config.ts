import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:url';

export default defineConfig({
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
