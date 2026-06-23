import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { AboutPageClient } from "@/components/pages/AboutPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "من أنا | عبدالرحمن طاهر — مهندس باك اند +5 سنوات خبرة",
  description:
    "تعرف على عبدالرحمن طاهر، مهندس برمجيات باك اند أول من مصر بخبرة +5 سنوات في Laravel وNode.js وPostgreSQL وتصميم الأنظمة السحابية للشركات في مصر والخليج.",
  keywords: [
    "سيرة ذاتية مهندس باك اند",
    "عبدالرحمن طاهر مهندس برمجيات",
    "Abdulrahman Taher developer profile",
    "Laravel developer 5 years experience",
    "backend engineer Cairo Egypt",
  ],
  alternates: {
    canonical: "/about",
    languages: { ar: "/about", en: "/en/about" },
  },
  openGraph: {
    title: "من أنا | عبدالرحمن طاهر — مهندس باك اند",
    description:
      "مهندس باك اند أول من مصر، خبرة +5 سنوات في Laravel وNode.js وPostgreSQL وتصميم الأنظمة السحابية للشركات في الخليج.",
    url: `${SITE_URL}/about`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdulrahman Taher - Backend Engineer" }],
  },
};

const aboutFaqs = [
  {
    question: "كم سنة خبرة لدى عبدالرحمن طاهر؟",
    answer:
      "لديه أكثر من 5 سنوات من الخبرة العملية في هندسة الباك اند وقواعد البيانات وتطوير APIs للشركات في مصر والخليج.",
  },
  {
    question: "What technologies does Abdulrahman Taher use?",
    answer:
      "Primary stack: Laravel (PHP), Node.js (TypeScript), PostgreSQL, Redis, RabbitMQ, Docker. He also works with MySQL, Next.js, and AWS/GCP infrastructure.",
  },
];

export default function AboutPage() {
  const schema = baseSchema(
    `${SITE_URL}/about`,
    "من أنا | عبدالرحمن طاهر مهندس باك اند",
    "مهندس باك اند أول من مصر، خبرة +5 سنوات في Laravel وNode.js وPostgreSQL وتصميم الأنظمة السحابية."
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(aboutFaqs)} />
      <AboutPageClient />
    </SiteShell>
  );
}
