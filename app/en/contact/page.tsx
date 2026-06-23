import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ContactPageClient } from "@/components/pages/ContactPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & Consultation | Hire Backend Engineer — Abdulrahman Taher",
  description:
    "Contact Abdulrahman Taher to discuss your project, request a free 30-minute architecture review, or book a backend consulting session for your GCC enterprise.",
  keywords: [
    "hire backend engineer GCC",
    "contact Laravel developer",
    "book backend consultation",
    "free API architecture review",
    "remote backend developer contact",
  ],
  alternates: { canonical: "/en/contact", languages: { ar: "/contact", en: "/en/contact" } },
  openGraph: {
    title: "Contact & Consultation | Abdulrahman Taher",
    description:
      "Book a free 30-min architecture review or discuss your backend project with a GCC-focused engineer.",
    url: `${SITE_URL}/en/contact`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Abdulrahman Taher" }],
  },
};

export default function ContactPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/contact`, "Contact & Consultation | Abdulrahman Taher", "Book a free architecture review or backend consulting session.")} />
      <JsonLd data={faqSchema([
        { question: "How can I contact Abdulrahman Taher?", answer: "Email: abdotaher093@gmail.com | WhatsApp: +201008275881. He typically responds within 24 hours." },
        { question: "Does Abdulrahman Taher offer a free consultation?", answer: "Yes — a free 30-minute architecture review covering your API design, database schema, or payment flow is available for new clients." },
      ])} />
      <ContactPageClient />
    </SiteShell>
  );
}
