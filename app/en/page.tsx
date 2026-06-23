import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { HomePageClient } from "@/components/pages/HomePageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Abdo Taher | Software Engineer & Full Stack Developer",
  description:
    "Abdo Taher is a Software Engineer and Full Stack Developer from Egypt specializing in Next.js, React, TypeScript, Node.js, SaaS platforms, REST APIs, and modern web applications. Available globally for freelance and contract work.",
  keywords: [
    "Abdo Taher",
    "Abdulrahman Taher",
    "Software Engineer Egypt",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "SaaS Developer",
    "REST API Developer",
    "Freelance Software Engineer",
    "Full Stack Developer Egypt",
    "Web Application Developer",
    "Technical SEO Engineer",
    "Remote Software Engineer Middle East",
  ],
  alternates: {
    canonical: "/en",
    languages: { ar: "/", en: "/en", "x-default": "/en" },
  },
  openGraph: {
    title: "Abdo Taher | Software Engineer & Full Stack Developer",
    description:
      "Software Engineer from Egypt specializing in Next.js, React, TypeScript, Node.js, SaaS development, REST APIs, and web performance.",
    url: `${SITE_URL}/en`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher — Software Engineer & Full Stack Developer" }],
  },
};

const enFaqs = [
  {
    question: "Who is Abdo Taher?",
    answer:
      "Abdo Taher (Abdulrahman Taher) is a Software Engineer and Full Stack Developer from Cairo, Egypt. He specializes in Next.js, React, TypeScript, Node.js, REST API development, SaaS architecture, and modern web application development. He is available globally for freelance and contract work.",
  },
  {
    question: "What does Abdo Taher specialize in?",
    answer:
      "Abdo Taher specializes in building scalable SaaS platforms, enterprise web applications, admin dashboards, e-commerce systems, and high-performance websites using Next.js, React, TypeScript, Node.js, PostgreSQL, MongoDB, Docker, and AWS.",
  },
  {
    question: "Is Abdo Taher available for freelance or remote work?",
    answer:
      "Yes. Abdo Taher works fully remote and is available globally for freelance projects, contract work, and part-time engagements. You can reach him via email at abdotaher093@gmail.com or WhatsApp at +201008275881.",
  },
  {
    question: "What technologies does Abdo Taher use?",
    answer:
      "Abdo Taher's primary stack includes Next.js, React, TypeScript, Node.js, Express.js, NestJS, PostgreSQL, MongoDB, MySQL, Docker, AWS, CI/CD pipelines, GraphQL, and REST APIs. He also has deep expertise in Technical SEO and Core Web Vitals optimization.",
  },
  {
    question: "Has Abdo Taher built SaaS applications?",
    answer:
      "Yes. Abdo Taher has built multiple SaaS platforms including multi-tenant systems, subscription billing platforms, enterprise dashboards, and B2B web applications. His focus is on scalable architecture, clean code, and high performance.",
  },
];

export default function HomePageEn() {
  const schema = baseSchema(
    `${SITE_URL}/en`,
    "Abdo Taher | Software Engineer & Full Stack Developer",
    "Software Engineer from Egypt specializing in Next.js, React, TypeScript, Node.js, SaaS development, REST APIs, and modern web applications."
  );

  return (
    <SiteShell initialLang="en">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(enFaqs)} />
      <HomePageClient />
    </SiteShell>
  );
}
