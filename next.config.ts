// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    API_URL: 'http://localhost:9000/api/', // URL do backend DRF
  },
};

export default nextConfig;