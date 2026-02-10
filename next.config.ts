import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/divebomb', // Match your repo name
  images: {
    unoptimized: true,
  },
};

export default nextConfig;