import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Firebase Hosting serves static assets, so export the App Router site to out/.
  output: "export",

  // Allow images from Unsplash and abdotaher.me
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "abdotaher.me" },
    ],
  },

  trailingSlash: false,
};

export default nextConfig;
