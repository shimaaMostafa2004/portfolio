import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { BlogsListClient } from "@/components/pages/BlogsListClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Backend & Systems Engineering Blog | Abdulrahman Taher",
  description:
    "In-depth technical articles on Laravel, Node.js, PostgreSQL optimisation, Redis caching, payment gateway security, cloud cost reduction, and scalable API architecture for GCC developers and founders.",
  keywords: [
    "backend engineering blog",
    "Laravel tutorial",
    "Node.js performance",
    "PostgreSQL indexing",
    "Redis caching tutorial",
    "payment gateway integration guide",
    "GCC SaaS architecture",
    "cloud cost optimisation tips",
  ],
  alternates: { canonical: "/en/blogs", languages: { ar: "/blogs", en: "/en/blogs" } },
  openGraph: {
    title: "Backend & Systems Engineering Blog | Abdulrahman Taher",
    description:
      "Deep-dive articles on Laravel, Node.js, PostgreSQL, Redis, and GCC payment gateways.",
    url: `${SITE_URL}/en/blogs`,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Backend Engineering Blog" }],
  },
};

export default function BlogsPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/blogs`, "Backend Blog | Abdulrahman Taher", "In-depth articles on Laravel, Node.js, PostgreSQL, Redis, and GCC payment gateways.")} />
      <BlogsListClient />
    </SiteShell>
  );
}
