import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ContactPageClient } from "@/components/pages/ContactPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "تواصل واحجز استشارة | عبدالرحمن طاهر مهندس باك اند",
  description:
    "تواصل مع المهندس عبدالرحمن طاهر عبر واتساب أو البريد الإلكتروني لمناقشة مشروعك، طلب مراجعة معمارية مجانية لقواعد البيانات والـ APIs، أو احجز جلسة استشارة تقنية.",
  keywords: [
    "تواصل مهندس باك اند",
    "استشارة تقنية مجانية",
    "contact backend developer Egypt",
    "hire Laravel developer remotely",
    "book API architecture consultation",
  ],
  alternates: {
    canonical: "/contact",
    languages: { ar: "/contact", en: "/en/contact" },
  },
  openGraph: {
    title: "تواصل واستشارة | عبدالرحمن طاهر",
    description:
      "احجز جلسة استشارة تقنية مجانية أو ناقش مشروعك مع مهندس باك اند متخصص.",
    url: `${SITE_URL}/contact`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contact Abdulrahman Taher - Backend Engineer" }],
  },
};

const contactFaqs = [
  {
    question: "كيف يمكنني التواصل مع عبدالرحمن طاهر؟",
    answer:
      "يمكنك التواصل عبر البريد الإلكتروني abdotaher093@gmail.com أو واتساب +201008275881. يُرد عادةً خلال 24 ساعة.",
  },
  {
    question: "Do you offer a free consultation?",
    answer:
      "Yes — I offer a free 30-minute architecture review for new clients. This includes a quick audit of your database schema, API structure, or payment flow.",
  },
];

export default function ContactPage() {
  const schema = baseSchema(
    `${SITE_URL}/contact`,
    "تواصل واستشارة | عبدالرحمن طاهر",
    "تواصل مع المهندس عبدالرحمن طاهر لمناقشة مشروعك أو طلب مراجعة معمارية مجانية."
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(contactFaqs)} />
      <ContactPageClient />
    </SiteShell>
  );
}
