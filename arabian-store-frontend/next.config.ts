import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore (if allowedDevOrigins is a custom/experimental extension)
  allowedDevOrigins: ['192.168.1.106'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
