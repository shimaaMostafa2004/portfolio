import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ContactPageClient } from "@/components/pages/ContactPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Abdo Taher | Hire Backend Engineer — Laravel & NestJS",
  description:
    "Contact Abdo Taher to discuss your backend project, request a free 30-minute architecture review, or hire a Backend Engineer specializing in Laravel, NestJS, scalable REST APIs, and database optimization.",
  keywords: [
    "hire backend engineer",
    "contact Laravel developer",
    "contact NestJS developer",
    "book backend consultation",
    "free API architecture review",
    "remote backend developer",
    "hire Abdo Taher",
  ],
  alternates: { canonical: "/en/contact", languages: { ar: "/contact", en: "/en/contact" } },
  openGraph: {
    title: "Contact Abdo Taher | Hire Backend Engineer",
    description:
      "Book a free 30-min architecture review or discuss your scalable backend project with Abdo Taher — Laravel & NestJS specialist.",
    url: `${SITE_URL}/en/contact`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Abdo Taher — Backend Engineer" }],
  },
};

export default function ContactPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/contact`, "Contact Abdo Taher | Hire Backend Engineer — Laravel & NestJS", "Book a free architecture review or hire Abdo Taher for your scalable backend project.")} />
      <JsonLd data={faqSchema([
        { question: "How can I contact Abdo Taher?", answer: "Email: abdotaher093@gmail.com | WhatsApp: +201008275881. He typically responds within 24 hours." },
        { question: "Does Abdo Taher offer a free consultation?", answer: "Yes — a free 30-minute backend architecture review covering your API design, database schema, or system bottlenecks is available for new clients." },
        { question: "What kind of projects can I hire Abdo Taher for?", answer: "You can hire Abdo Taher for Laravel REST API development, NestJS microservice architecture, database performance tuning, payment gateway integration, SaaS backend systems, and AWS/Docker cloud deployments." },
      ])} />
      <ContactPageClient />
    </SiteShell>
  );
}
