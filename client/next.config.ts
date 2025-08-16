import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@mastra/*"],
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
