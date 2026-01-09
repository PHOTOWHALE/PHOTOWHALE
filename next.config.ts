import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 424],
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920],
    qualities: [75, 90, 100],
  },
};

export default nextConfig;
