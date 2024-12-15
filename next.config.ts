import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn1.theimageapi.com",
      },
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
      },
      {
        protocol: "https",
        hostname: "30.media.tumblr.com",
      },
    ]
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
