import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "vercel.app",
        port: "",
        pathname: "/*/**",
      },
      {
        protocol: "https",
        hostname: "media-pxg.vercel.app",
        port: "",
        pathname: "/*/**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
