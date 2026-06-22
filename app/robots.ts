import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — full access
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
        crawlDelay: 1,
      },
      // Google Bots — explicit allow, no delay
      {
        userAgent: ["Googlebot", "Googlebot-Image", "Googlebot-Video"],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Bing / Microsoft
      { userAgent: "Bingbot", allow: "/", disallow: ["/api/", "/_next/"] },
      // AI / LLM crawlers — explicitly allow so ChatGPT, Perplexity, Claude etc. can index
      {
        userAgent: [
          "GPTBot",           // OpenAI / ChatGPT
          "ChatGPT-User",     // ChatGPT browsing
          "Claude-Web",       // Anthropic Claude
          "anthropic-ai",     // Anthropic
          "CCBot",            // Common Crawl (used by many LLMs)
          "PerplexityBot",    // Perplexity AI
          "YouBot",           // You.com
          "Applebot",         // Apple Siri / Spotlight
          "cohere-ai",        // Cohere
        ],
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://abdotaher.me/sitemap.xml",
    host: "https://abdotaher.me",
  };
}
