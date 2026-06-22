import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { BlogsListClient } from "@/components/pages/BlogsListClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "مدونة الباك اند وهندسة الأنظمة | عبدالرحمن طاهر",
  description:
    "مقالات فنية معمقة في هندسة الباك اند وقواعد البيانات والتوسع وتحسين التكلفة السحابية وبوابات الدفع — للمطورين وأصحاب المشاريع في مصر والخليج.",
  keywords: [
    "مدونة باك اند عربي",
    "مقالات Laravel Node.js",
    "تحسين قواعد بيانات PostgreSQL",
    "backend engineering blog Arabic",
    "Laravel tutorial GCC",
    "Node.js performance articles",
    "API security best practices",
  ],
  alternates: {
    canonical: "/blogs",
    languages: { ar: "/blogs", en: "/en/blogs" },
  },
  openGraph: {
    title: "مدونة الباك اند وهندسة الأنظمة | عبدالرحمن طاهر",
    description:
      "مقالات تقنية في Laravel وNode.js وPostgreSQL وبوابات الدفع الخليجية وتحسين السيرفرات.",
    url: `${SITE_URL}/blogs`,
    type: "website",
    images: [{ url: "/image.png", width: 1200, height: 630, alt: "Backend Engineering Blog" }],
  },
};

export default function BlogsPage() {
  const schema = baseSchema(
    `${SITE_URL}/blogs`,
    "مدونة الباك اند وهندسة الأنظمة | عبدالرحمن طاهر",
    "مقالات فنية معمقة في هندسة الباك اند وقواعد البيانات والتوسع وتحسين التكلفة السحابية."
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <BlogsListClient />
    </SiteShell>
  );
}
