/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    // Оптимизация для development режима
    if (process.env.NODE_ENV === 'development') {
      config.optimization = {
        ...config.optimization,
        minimize: false,
        splitChunks: false,
        runtimeChunk: false
      };
    }
    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      type: 'asset/resource'
    });
    return config;
  }
};

module.exports = nextConfig;
