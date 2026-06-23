import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ServicesPageClient } from "@/components/pages/ServicesPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Backend Engineering Services | Laravel, Node.js, PostgreSQL — Abdulrahman Taher",
  description:
    "Professional backend engineering services: REST API design, PostgreSQL performance tuning, payment gateway integration (Mada, Moyasar, Tap), Redis caching, multi-tenant SaaS architecture, and cloud cost optimisation.",
  keywords: [
    "backend engineering services GCC",
    "REST API development",
    "PostgreSQL tuning consultant",
    "payment gateway integration Mada",
    "Redis caching setup",
    "SaaS architecture design",
    "cloud cost optimisation AWS",
    "hire Laravel developer remotely",
  ],
  alternates: { canonical: "/en/services", languages: { ar: "/services", en: "/en/services" } },
  openGraph: {
    title: "Backend Engineering Services | Abdulrahman Taher",
    description:
      "REST APIs, PostgreSQL tuning, payment gateway integration, Redis caching, multi-tenant SaaS — specialised for GCC enterprises.",
    url: `${SITE_URL}/en/services`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Backend Engineering Services" }],
  },
};

export default function ServicesPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/services`, "Backend Engineering Services | Abdulrahman Taher", "REST APIs, PostgreSQL tuning, payment gateways, Redis, multi-tenant SaaS.")} />
      <JsonLd data={faqSchema([
        { question: "What backend services does Abdulrahman Taher offer?", answer: "REST API design and development, PostgreSQL/MySQL performance tuning, payment gateway integration (Mada, Moyasar, Tap, Paymob), Redis caching and queue worker setup, multi-tenant SaaS architecture, and AWS cloud cost optimisation." },
        { question: "Can Abdulrahman Taher integrate local GCC payment gateways?", answer: "Yes. He has production experience integrating Mada (Saudi Arabia), Moyasar, Tap Payments, and Paymob — including webhook validation, idempotency, and reconciliation ledgers." },
      ])} />
      <ServicesPageClient />
    </SiteShell>
  );
}
