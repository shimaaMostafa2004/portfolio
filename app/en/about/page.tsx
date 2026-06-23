import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AboutPageClient } from "@/components/pages/AboutPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Abdo Taher | Backend Engineer — Laravel & NestJS",
  description:
    "Learn about Abdo Taher — Backend Engineer from Cairo, Egypt. Specializing in Laravel, NestJS, Node.js, scalable REST APIs, database optimization, and SaaS backend architecture.",
  keywords: [
    "Abdo Taher",
    "About Abdo Taher",
    "Abdulrahman Taher biography",
    "Backend Engineer Egypt",
    "Laravel NestJS developer Cairo",
    "Node.js backend developer",
    "SaaS backend architect",
    "scalable backend systems Egypt",
  ],
  alternates: { canonical: "/en/about", languages: { ar: "/about", en: "/en/about" } },
  openGraph: {
    title: "About Abdo Taher | Backend Engineer — Laravel & NestJS",
    description:
      "Backend Engineer from Egypt specializing in Laravel, NestJS, scalable REST APIs, database optimization, and SaaS backend systems.",
    url: `${SITE_URL}/en/about`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher — Backend Engineer" }],
  },
};

export default function AboutPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/about`, "About Abdo Taher | Backend Engineer — Laravel & NestJS", "Backend Engineer from Egypt specializing in Laravel, NestJS, scalable REST APIs, database optimization, and SaaS backend systems.")} />
      <JsonLd data={faqSchema([
        { question: "Where is Abdo Taher based?", answer: "Abdo Taher is based in Cairo, Egypt and works fully remote with clients globally, including across the MENA region, Europe, and North America." },
        { question: "What is Abdo Taher's primary tech stack?", answer: "Laravel (PHP), NestJS (TypeScript), Node.js, PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, Docker, AWS, and CI/CD pipelines. He builds scalable, performance-driven backend systems and REST APIs." },
        { question: "What types of backend systems has Abdo Taher built?", answer: "Abdo Taher has built scalable SaaS backend platforms, multi-tenant systems, REST APIs handling 10K+ concurrent users, payment gateway integrations, and performance-optimized database architectures." },
        { question: "Does Abdo Taher work on database optimization?", answer: "Yes. Abdo Taher specializes in database performance tuning using EXPLAIN ANALYZE, composite indexes, table partitioning, connection pooling, and Redis caching to build high-performance database systems." },
      ])} />
      <AboutPageClient />
    </SiteShell>
  );
}
