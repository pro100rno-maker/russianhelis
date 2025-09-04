/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
  },

  async rewrites() {
    return [
      { source: '/blog', destination: '/ru/blog', locale: false },
      { source: '/market', destination: '/ru/market', locale: false },
    ];
  },

  // важно: НЕ указывать output: 'export'
};

export default nextConfig;