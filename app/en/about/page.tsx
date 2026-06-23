import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AboutPageClient } from "@/components/pages/AboutPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Abdo Taher | Software Engineer & Full Stack Developer",
  description:
    "Learn about Abdo Taher — Software Engineer and Full Stack Developer from Cairo, Egypt. Specializing in Next.js, React, TypeScript, Node.js, SaaS architecture, and modern web development.",
  keywords: [
    "Abdo Taher",
    "About Abdo Taher",
    "Abdulrahman Taher biography",
    "Software Engineer Egypt",
    "Full Stack Developer Cairo",
    "Next.js React TypeScript developer",
    "SaaS developer profile",
    "Node.js developer Egypt",
  ],
  alternates: { canonical: "/en/about", languages: { ar: "/about", en: "/en/about" } },
  openGraph: {
    title: "About Abdo Taher | Software Engineer & Full Stack Developer",
    description:
      "Software Engineer from Egypt specializing in Next.js, React, TypeScript, Node.js, and scalable SaaS development.",
    url: `${SITE_URL}/en/about`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher — Software Engineer" }],
  },
};

export default function AboutPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/about`, "About Abdo Taher | Software Engineer & Full Stack Developer", "Software Engineer from Egypt specializing in Next.js, React, TypeScript, Node.js, and scalable SaaS development.")} />
      <JsonLd data={faqSchema([
        { question: "Where is Abdo Taher based?", answer: "Abdo Taher is based in Cairo, Egypt and works fully remote with clients globally, including across the MENA region, Europe, and North America." },
        { question: "What is Abdo Taher's primary tech stack?", answer: "Next.js, React, TypeScript, Node.js, Express.js, NestJS, PostgreSQL, MongoDB, MySQL, Docker, AWS, Redis, GraphQL, and REST APIs. He also specializes in Technical SEO and Core Web Vitals optimization." },
        { question: "What types of projects has Abdo Taher built?", answer: "Abdo Taher has built SaaS platforms, enterprise web applications, e-commerce systems, admin dashboards, RESTful APIs, and high-performance marketing websites for startups and enterprises globally." },
        { question: "Does Abdo Taher work on technical SEO?", answer: "Yes. Abdo Taher has deep expertise in technical SEO including structured data (JSON-LD), Core Web Vitals optimization, Next.js SEO, and GEO (Generative Engine Optimization) for AI search engines." },
      ])} />
      <AboutPageClient />
    </SiteShell>
  );
}
