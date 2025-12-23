// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://nomudev.com',
  integrations: [react()],
  // Optimized for static generation by default
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});