import type { NextConfig } from "next";

///how to get env variables


const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // increase as needed
    },
  },
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_IMAGE_URL}/**`)],
  }
};

export default nextConfig;
