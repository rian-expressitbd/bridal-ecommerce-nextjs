import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [new URL("https://res.cloudinary.com/**")],
    domains: [
      "res.cloudinary.com",
      "calquick.app",
      "calquick.com",
      "avatar.iran.liara.run",
      "backend.calquick.app",
      "upload.wikimedia.org",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
