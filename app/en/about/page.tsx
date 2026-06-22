import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AboutPageClient } from "@/components/pages/AboutPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Abdulrahman Taher | Senior Backend Engineer Egypt",
  description:
    "Abdulrahman Taher is a Senior Backend Engineer from Cairo with 5+ years engineering Laravel APIs, PostgreSQL databases, and cloud microservices for GCC enterprises.",
  keywords: [
    "Abdulrahman Taher profile",
    "Senior Backend Engineer Egypt biography",
    "Laravel developer 5 years GCC",
    "backend engineer Cairo",
    "Node.js PostgreSQL specialist",
  ],
  alternates: { canonical: "/en/about", languages: { ar: "/about", en: "/en/about" } },
  openGraph: {
    title: "About Abdulrahman Taher | Senior Backend Engineer",
    description:
      "5+ years building scalable backend systems with Laravel, Node.js, PostgreSQL, and Redis for GCC clients.",
    url: `${SITE_URL}/en/about`,
    images: [{ url: "/image.png", width: 1200, height: 630, alt: "Abdulrahman Taher - Backend Engineer" }],
  },
};

export default function AboutPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/about`, "About Abdulrahman Taher | Senior Backend Engineer", "5+ years engineering scalable backend systems, APIs, and PostgreSQL databases for GCC clients.")} />
      <JsonLd data={faqSchema([
        { question: "Where is Abdulrahman Taher based?", answer: "He is based in Cairo, Egypt and works fully remote with GCC clients across Saudi Arabia, UAE, Kuwait, Qatar, Oman, and Egypt." },
        { question: "What is Abdulrahman Taher's primary tech stack?", answer: "Laravel (PHP), Node.js (TypeScript), PostgreSQL, Redis, RabbitMQ, Docker, and AWS. He also has experience with MySQL, Next.js, and GCP." },
      ])} />
      <AboutPageClient />
    </SiteShell>
  );
}
