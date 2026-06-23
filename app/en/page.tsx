import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { HomePageClient } from "@/components/pages/HomePageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Abdulrahman Taher | Senior Backend Engineer — Laravel, Node.js, Database",
  description:
    "Abdulrahman Taher is a Senior Backend Engineer from Egypt with 5+ years building scalable APIs, Database-optimised databases, and cloud microservices for GCC enterprises in Saudi Arabia, UAE, and Kuwait.",
  keywords: [
    "Abdulrahman Taher",
    "Senior Backend Engineer Egypt",
    "Remote Laravel Developer GCC",
    "Node.js architect Saudi Arabia",
    "Database performance expert",
    "API architecture consultant",
    "payment gateway integration Mada Moyasar",
    "freelance backend developer Middle East",
    "scalable SaaS architecture",
    "Redis caching expert",
  ],
  alternates: {
    canonical: "/en",
    languages: { ar: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: "Abdulrahman Taher | Senior Backend Engineer",
    description:
      "5+ years building scalable APIs, Database databases, and cloud systems for GCC enterprises — Laravel, Node.js, Redis, Docker.",
    url: `${SITE_URL}/en`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdulrahman Taher - Senior Backend Engineer" }],
  },
};

const enFaqs = [
  {
    question: "Who is Abdulrahman Taher?",
    answer:
      "Abdulrahman Taher is a Senior Backend Engineer from Cairo, Egypt. He specialises in Laravel, Node.js, Database, Redis, and payment gateway integrations for GCC enterprises, with over 5 years of production experience.",
  },
  {
    question: "Is Abdulrahman Taher available for remote work in Saudi Arabia or UAE?",
    answer:
      "Yes. He works fully remote with clients across Saudi Arabia, UAE, Kuwait, Qatar, Oman, and Egypt. You can reach him via WhatsApp or email to discuss your project.",
  },
  {
    question: "What payment gateways has Abdulrahman Taher integrated?",
    answer:
      "Mada (Saudi Arabia), Moyasar, Tap Payments, Paymob (Egypt), and Stripe — with full webhook validation, idempotency keys, and double-debit prevention.",
  },
];

export default function HomePageEn() {
  const schema = baseSchema(
    `${SITE_URL}/en`,
    "Abdulrahman Taher | Senior Backend & Database Architect",
    "Senior Backend Engineer building scalable, high-performance APIs and database systems for GCC enterprises."
  );

  return (
    <SiteShell initialLang="en">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(enFaqs)} />
      <HomePageClient />
    </SiteShell>
  );
}
