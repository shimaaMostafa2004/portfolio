import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { HomePageClient } from "@/components/pages/HomePageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "عبدالرحمن طاهر | مهندس برمجيات باك اند وقواعد بيانات ومستشار تقني محترف",
  description:
    "عبدالرحمن طاهر — مهندس باك اند أول وخبير قواعد بيانات في مصر والخليج. متخصص في Laravel وNode.js وPostgreSQL وبوابات الدفع المحلية لبناء APIs سريعة وأنظمة سحابية قابلة للتوسع.",
  keywords: [
    "عبدالرحمن طاهر",
    "مهندس باك اند مصر",
    "مطور Laravel للخليج",
    "Senior Backend Engineer Egypt",
    "Remote Laravel Developer GCC",
    "Node.js PostgreSQL expert",
    "API architecture consultant",
    "payment gateway integration",
    "مستشار تقني سعودية الإمارات",
  ],
  alternates: {
    canonical: "/",
    languages: { ar: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    title: "عبدالرحمن طاهر | مهندس باك اند وقواعد بيانات",
    description:
      "مهندس باك اند أول متخصص في Laravel وNode.js وPostgreSQL لبناء أنظمة APIs للشركات في الخليج ومصر.",
    url: SITE_URL,
    images: [{ url: "/image.png", width: 1200, height: 630, alt: "Abdulrahman Taher - Senior Backend Engineer" }],
  },
};

const homeFaqs = [
  {
    question: "من هو عبدالرحمن طاهر؟",
    answer:
      "عبدالرحمن طاهر مهندس برمجيات باك اند أول من مصر، متخصص في Laravel وNode.js وPostgreSQL مع خبرة +5 سنوات في بناء APIs وأنظمة سحابية قابلة للتوسع لشركات في الخليج ومصر.",
  },
  {
    question: "What does Abdulrahman Taher specialise in?",
    answer:
      "Abdulrahman Taher is a Senior Backend Engineer specialising in Laravel, Node.js, PostgreSQL database tuning, Redis caching, payment gateway integration (Mada, Moyasar, Tap, Paymob), and scalable cloud architecture for GCC enterprises.",
  },
  {
    question: "هل يقدم عبدالرحمن طاهر خدمات للشركات في السعودية والإمارات؟",
    answer:
      "نعم، يعمل عبدالرحمن طاهر عن بُعد مع شركات في المملكة العربية السعودية والإمارات والكويت وقطر وسلطنة عُمان ومصر لتقديم خدمات هندسة الباك اند وتحسين قواعد البيانات وتكامل بوابات الدفع.",
  },
  {
    question: "What payment gateways can Abdulrahman Taher integrate?",
    answer:
      "He has hands-on experience integrating Mada, Moyasar, Tap Payments, Paymob, and Stripe — with a focus on webhook security, idempotency, and double-debit prevention.",
  },
];

export default function HomePage() {
  const schema = baseSchema(
    SITE_URL,
    "عبدالرحمن طاهر | مهندس برمجيات باك اند وقواعد بيانات",
    "مهندس باك اند أول متخصص في Laravel وNode.js وPostgreSQL لبناء APIs وأنظمة سحابية للشركات في الخليج ومصر."
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(homeFaqs)} />
      <HomePageClient />
    </SiteShell>
  );
}
