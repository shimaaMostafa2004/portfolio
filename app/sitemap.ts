import type { MetadataRoute } from "next";
import { blogArticles } from "@/src/data/blogs";

const BASE_URL = "https://abdotaher.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: { ar: BASE_URL, en: `${BASE_URL}/en` },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: { ar: BASE_URL, en: `${BASE_URL}/en` },
      },
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          ar: `${BASE_URL}/about`,
          en: `${BASE_URL}/en/about`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${BASE_URL}/about`,
          en: `${BASE_URL}/en/about`,
        },
      },
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
      alternates: {
        languages: {
          ar: `${BASE_URL}/services`,
          en: `${BASE_URL}/en/services`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${BASE_URL}/services`,
          en: `${BASE_URL}/en/services`,
        },
      },
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${BASE_URL}/projects`,
          en: `${BASE_URL}/en/projects`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/projects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          ar: `${BASE_URL}/projects`,
          en: `${BASE_URL}/en/projects`,
        },
      },
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${BASE_URL}/blogs`,
          en: `${BASE_URL}/en/blogs`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          ar: `${BASE_URL}/blogs`,
          en: `${BASE_URL}/en/blogs`,
        },
      },
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          ar: `${BASE_URL}/contact`,
          en: `${BASE_URL}/en/contact`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${BASE_URL}/contact`,
          en: `${BASE_URL}/en/contact`,
        },
      },
    },
  ];

  // Blog article pages — both AR and EN variants
  const blogPages: MetadataRoute.Sitemap = blogArticles.flatMap((article) => [
    {
      url: `${BASE_URL}/blogs/${article.id}`,
      lastModified: new Date(article.dateEn),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${BASE_URL}/blogs/${article.id}`,
          en: `${BASE_URL}/en/blogs/${article.id}`,
        },
      },
    },
    {
      url: `${BASE_URL}/en/blogs/${article.id}`,
      lastModified: new Date(article.dateEn),
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          ar: `${BASE_URL}/blogs/${article.id}`,
          en: `${BASE_URL}/en/blogs/${article.id}`,
        },
      },
    },
  ]);

  return [...staticPages, ...blogPages];
}
