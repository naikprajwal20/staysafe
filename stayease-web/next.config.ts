import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist-final",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
