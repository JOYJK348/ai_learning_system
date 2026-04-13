import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['10.161.162.228', '10.32.182.228', 'localhost:3000'],
} as any;

export default withNextIntl(nextConfig);
