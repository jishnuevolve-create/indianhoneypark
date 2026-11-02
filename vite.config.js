import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The folder the site is served from. '/' for local development and Vercel.
  // The GitHub Pages workflow sets BASE_PATH=/indianhoneypark/ because the site
  // lives at https://<user>.github.io/indianhoneypark/.
  base: process.env.BASE_PATH || '/',
});
