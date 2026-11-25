import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://daveandnam.com',
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
