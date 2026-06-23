import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ServicesPageClient } from "@/components/pages/ServicesPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services | Laravel & NestJS Backend Development — Abdo Taher",
  description:
    "Backend engineering services by Abdo Taher: scalable REST API development with Laravel & NestJS, database performance tuning, payment gateway integration, Redis caching, SaaS architecture, and cloud deployment.",
  keywords: [
    "Laravel backend development services",
    "NestJS REST API development",
    "Node.js backend developer",
    "SaaS backend architecture",
    "database performance tuning",
    "payment gateway integration",
    "Redis caching setup",
    "cloud deployment AWS Docker",
    "hire backend developer",
    "scalable backend systems",
  ],
  alternates: { canonical: "/en/services", languages: { ar: "/services", en: "/en/services" } },
  openGraph: {
    title: "Services | Laravel & NestJS Backend Development — Abdo Taher",
    description:
      "Scalable REST APIs with Laravel & NestJS, database tuning, payment gateways, Redis caching, SaaS architecture, and AWS deployment.",
    url: `${SITE_URL}/en/services`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher Backend Engineering Services" }],
  },
};

export default function ServicesPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/services`, "Services | Laravel & NestJS Backend Development — Abdo Taher", "Scalable REST APIs, database performance tuning, payment gateways, Redis caching, SaaS architecture, and AWS deployment.")} />
      <JsonLd data={faqSchema([
        { question: "What backend services does Abdo Taher offer?", answer: "Abdo Taher offers Laravel REST API development, NestJS microservice architecture, PostgreSQL and MySQL performance tuning, payment gateway integration (Mada, Moyasar, Tap, Paymob, Stripe), Redis caching and queue workers, multi-tenant SaaS backend architecture, AWS and Docker deployment, and backend code audits." },
        { question: "Can Abdo Taher build a scalable backend from scratch?", answer: "Yes. Abdo Taher specializes in designing and building scalable, performance-driven backend systems using Laravel and NestJS — from database schema design to REST API architecture and cloud deployment." },
        { question: "Does Abdo Taher integrate payment gateways?", answer: "Yes. Abdo Taher has production experience integrating Mada, Moyasar, Tap Payments, Paymob, and Stripe with full Webhook verification, idempotency keys, and double-charge prevention." },
        { question: "What is Abdo Taher's hourly rate?", answer: "Rates vary by project scope and complexity. Contact Abdo Taher at abdotaher093@gmail.com or WhatsApp +201008275881 for a free consultation and project estimate." },
      ])} />
      <ServicesPageClient />
    </SiteShell>
  );
}
