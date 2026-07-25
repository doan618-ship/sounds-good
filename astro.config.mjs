import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Configure site URL and base path for GitHub Pages deployment
  site: 'https://doan618-ship.github.io',
  base: '/Review-web-app/',
  output: 'static',
});
