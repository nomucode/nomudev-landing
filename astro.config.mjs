// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nomudev.com',
  // Todas las URLs terminan en "/" (coincide con la salida en directorios de GitHub Pages y con las canónicas)
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en' } },
      filter: (page) => !page.includes('/design-system') && !page.includes('/privacy'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
