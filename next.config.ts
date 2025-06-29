import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    domains: ['cdn.dummyjson.com', 'res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
