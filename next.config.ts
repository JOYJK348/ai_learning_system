import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
