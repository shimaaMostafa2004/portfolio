import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export is NOT used because we want SSG + dynamic routes.
  // Next.js default handles both SSG (generateStaticParams) and SSR.

  // Allow images from Unsplash and abdotaher.me
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "abdotaher.me" },
    ],
  },

  // Trailing slash for cleaner canonical URLs (optional, consistent with Firebase hosting)
  trailingSlash: false,
};

export default nextConfig;
