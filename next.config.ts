import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactStrictMode: true
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/v1/**",
      },
    ],
  },
};

export default nextConfig;
