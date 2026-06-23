import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { HomePageClient } from "@/components/pages/HomePageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Abdo Taher | Backend Engineer — Laravel & NestJS",
  description:
    "Abdo Taher is a Backend Engineer from Egypt specializing in Laravel, NestJS, Node.js, scalable REST APIs, database optimization, and SaaS backend systems. Available globally for freelance and contract work.",
  keywords: [
    "Abdo Taher",
    "Abdulrahman Taher",
    "Backend Engineer Egypt",
    "Laravel Developer",
    "NestJS Developer",
    "Node.js Backend Developer",
    "REST API Developer",
    "Scalable Backend Systems",
    "Database Optimization",
    "SaaS Backend Developer",
    "Freelance Backend Engineer",
    "Backend Developer Egypt",
    "Performance-driven Backend",
    "Remote Backend Engineer",
    "Backend Engineer Middle East",
  ],
  alternates: {
    canonical: "/en",
    languages: { ar: "/", en: "/en", "x-default": "/en" },
  },
  openGraph: {
    title: "Abdo Taher | Backend Engineer — Laravel & NestJS",
    description:
      "Backend Engineer from Egypt specializing in Laravel, NestJS, Node.js, scalable REST APIs, database optimization, and SaaS backend systems.",
    url: `${SITE_URL}/en`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher — Backend Engineer, Laravel & NestJS" }],
  },
};

const enFaqs = [
  {
    question: "Who is Abdo Taher?",
    answer:
      "Abdo Taher (Abdulrahman Taher) is a Backend Engineer from Cairo, Egypt specializing in building scalable, performance-driven backend systems and databases using Laravel, NestJS, Node.js, and REST APIs. He is available globally for freelance and contract work.",
  },
  {
    question: "What does Abdo Taher specialize in?",
    answer:
      "Abdo Taher specializes in scalable backend architecture using Laravel and NestJS, REST API development, database design and optimization (PostgreSQL, MySQL), Redis caching, queue workers, payment gateway integration, Docker, AWS deployments, and SaaS backend systems.",
  },
  {
    question: "Is Abdo Taher available for freelance or remote work?",
    answer:
      "Yes. Abdo Taher works fully remote and is available globally for freelance projects, contract work, and part-time engagements. Contact him via email at abdotaher093@gmail.com or WhatsApp at +201008275881.",
  },
  {
    question: "What technologies does Abdo Taher use?",
    answer:
      "Abdo Taher's primary stack includes Laravel (PHP), NestJS (TypeScript), Node.js, Express.js, PostgreSQL, MySQL, MongoDB, Redis, RabbitMQ, Docker, AWS, and CI/CD pipelines. He builds performance-driven REST APIs and scalable backend systems.",
  },
  {
    question: "Has Abdo Taher built SaaS applications?",
    answer:
      "Yes. Abdo Taher has built multiple SaaS platforms with multi-tenant architecture, subscription billing, role-based access control, and scalable performance-driven backend systems using Laravel and NestJS.",
  },
];

export default function HomePageEn() {
  const schema = baseSchema(
    `${SITE_URL}/en`,
    "Abdo Taher | Backend Engineer — Laravel & NestJS",
    "Backend Engineer from Egypt building scalable, performance-driven backend systems and databases using Laravel, NestJS, Node.js, and REST APIs."
  );

  return (
    <SiteShell initialLang="en">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(enFaqs)} />
      <HomePageClient />
    </SiteShell>
  );
}
