import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '10.161.162.228', 
    '10.32.182.228', 
    '10.61.144.228', 
    '10.61.144.228:3000',
    'localhost:3000'
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BACKEND_URL || 'http://localhost:3010'}/api/:path*`,
      },
    ];
  },
  webpack(config: any) {
    config.resolve.alias['framer-motion'] = path.resolve(__dirname, './src/core/mocks/framer-motion.tsx');
    return config;
  },
} as any;

export default withNextIntl(nextConfig);
