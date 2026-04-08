import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Path to your request configuration
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, 
  }
};

export default withNextIntl(nextConfig);
