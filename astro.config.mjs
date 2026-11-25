import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://daveandnam.com',
  // pages stay static; only /api/* runs on the server (RSVP needs to read and write the sheet)
  adapter: vercel(),
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
