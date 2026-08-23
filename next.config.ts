import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.corals.studio' },
      { protocol: 'https', hostname: 'corals.studio' },
    ],
  },
};

export default nextConfig;
