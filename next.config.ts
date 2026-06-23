import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Firebase Hosting serves static assets, so export the App Router site to out/.
  output: "export",

  // www → non-www 301 redirect (active in non-static/SSR deployments; Firebase handles it via firebase.json)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.abdotaher.me" }],
        destination: "https://abdotaher.me/:path*",
        permanent: true,
      },
    ];
  },

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
