import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: '../../dist/client',
    emptyOutDir: false,
    rollupOptions: {
      input: './index.html',
    },
  },
});
