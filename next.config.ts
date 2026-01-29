import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    unoptimized: isDev, //  dev 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    workerThreads: !isDev, // dev 
    cpus: isDev ? 1 : undefined, // dev 
  },
};

export default nextConfig;
