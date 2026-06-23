import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ServicesPageClient } from "@/components/pages/ServicesPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services | Full Stack Development, Next.js, SaaS — Abdo Taher",
  description:
    "Full stack development services by Abdo Taher: Next.js & React applications, Node.js APIs, SaaS architecture, database design, technical SEO, cloud deployment (AWS/Docker), and performance optimization.",
  keywords: [
    "Next.js development services",
    "React application development",
    "Node.js API development",
    "SaaS architecture services",
    "TypeScript full stack developer",
    "technical SEO services",
    "cloud deployment AWS Docker",
    "hire full stack developer",
    "web performance optimization",
    "database design services",
  ],
  alternates: { canonical: "/en/services", languages: { ar: "/services", en: "/en/services" } },
  openGraph: {
    title: "Services | Full Stack Development & SaaS — Abdo Taher",
    description:
      "Next.js, React, Node.js, SaaS architecture, REST APIs, database design, technical SEO, and cloud deployment.",
    url: `${SITE_URL}/en/services`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher Software Engineering Services" }],
  },
};

export default function ServicesPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/services`, "Services | Full Stack Development & SaaS — Abdo Taher", "Next.js, React, Node.js APIs, SaaS architecture, database design, technical SEO, and cloud deployment.")} />
      <JsonLd data={faqSchema([
        { question: "What services does Abdo Taher offer?", answer: "Abdo Taher offers Next.js and React application development, Node.js REST API and GraphQL development, SaaS platform architecture, TypeScript full stack development, database design and optimization (PostgreSQL, MongoDB, MySQL), technical SEO and Core Web Vitals optimization, cloud deployment with AWS and Docker, and CI/CD pipeline setup." },
        { question: "Can Abdo Taher build a SaaS application from scratch?", answer: "Yes. Abdo Taher specializes in SaaS architecture — multi-tenant systems, subscription billing, user authentication (OAuth, JWT), admin dashboards, and scalable backends. He handles the full stack from database to UI." },
        { question: "Does Abdo Taher provide technical SEO services?", answer: "Yes. Abdo Taher offers technical SEO including structured data markup (JSON-LD), Next.js metadata optimization, Core Web Vitals improvements, hreflang, sitemap optimization, and GEO (Generative Engine Optimization) for AI search engines like ChatGPT and Gemini." },
        { question: "What is Abdo Taher's hourly rate?", answer: "Rates vary by project scope and complexity. Contact Abdo Taher at abdotaher093@gmail.com or WhatsApp +201008275881 for a free consultation and project estimate." },
      ])} />
      <ServicesPageClient />
    </SiteShell>
  );
}
