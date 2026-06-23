import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ServicesPageClient } from "@/components/pages/ServicesPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "خدمات هندسة الباك اند | مطور Laravel وNode.js وDatabase",
  description:
    "خدمات هندسة الباك اند المتخصصة من عبدالرحمن طاهر: تصميم REST APIs، تحسين قواعد البيانات، ربط بوابات الدفع الخليجية (مدى، ميسر، تاب)، Redis Caching، وبنية SaaS قابلة للتوسع.",
  keywords: [
    "خدمات مطور باك اند",
    "ربط بوابات دفع مصر الخليج",
    "تحسين Database",
    "تصميم REST API",
    "Backend Engineering Services GCC",
    "Laravel API development",
    "Redis caching setup",
    "payment gateway integration Saudi Arabia",
  ],
  alternates: {
    canonical: "/services",
    languages: { ar: "/services", en: "/en/services" },
  },
  openGraph: {
    title: "خدمات هندسة الباك اند | عبدالرحمن طاهر",
    description:
      "REST APIs، تحسين Database، بوابات الدفع الخليجية، Redis، وبنية SaaS — خدمات متخصصة للشركات والمشاريع التقنية.",
    url: `${SITE_URL}/services`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Backend Engineering Services" }],
  },
};

const servicesFaqs = [
  {
    question: "ما هي خدمات الباك اند التي تقدمها؟",
    answer:
      "أقدم: تصميم وتطوير REST APIs، تحسين أداء قواعد البيانات Database/MySQL، ربط بوابات الدفع (مدى، ميسر، تاب، باي موب)، إعداد Redis Caching وقوائم انتظار العمل، وتصميم بنية SaaS متعددة المستأجرين.",
  },
  {
    question: "How much does backend consulting cost?",
    answer:
      "Pricing depends on project scope. I offer hourly consulting (API audits, database reviews), fixed-price project contracts, and retainer arrangements for ongoing GCC clients. Contact me for a free 30-min architecture review.",
  },
  {
    question: "هل تعمل عن بُعد مع شركات في السعودية والإمارات؟",
    answer:
      "نعم، أعمل بالكامل عن بُعد مع شركات في المملكة العربية السعودية والإمارات والكويت وقطر وعُمان ومصر. تواصل عبر واتساب أو البريد الإلكتروني لتحديد موعد.",
  },
];

export default function ServicesPage() {
  const schema = baseSchema(
    `${SITE_URL}/services`,
    "خدمات هندسة الباك اند | عبدالرحمن طاهر",
    "خدمات هندسة الباك اند المتخصصة: REST APIs، تحسين قواعد البيانات، بوابات الدفع الخليجية، Redis، بنية SaaS."
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(servicesFaqs)} />
      <ServicesPageClient />
    </SiteShell>
  );
}
