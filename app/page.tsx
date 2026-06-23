import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { HomePageClient } from "@/components/pages/HomePageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
  description:
    "عبدالرحمن طاهر، مطور Laravel وخبير PostgreSQL في مصر والخليج. أبني REST APIs وأنظمة باك إند عالية الأداء مع تكامل بوابات الدفع وتحسين قواعد البيانات.",
  keywords: [
    "عبدالرحمن طاهر",
    "مطور Laravel",
    "مهندس باك اند مصر",
    "خبير PostgreSQL",
    "قواعد البيانات",
    "باك إند",
    "REST APIs",
    "تكامل بوابات الدفع",
    "تحسين أداء PostgreSQL",
    "Laravel Developer Egypt",
    "Backend Developer GCC",
    "PostgreSQL Expert",
    "Freelance Backend Developer",
    "Payment Gateway Integration",
    "API Development",
    "Backend Engineer Egypt",
  ],
  alternates: {
    canonical: "https://abdotaher.me/",
    languages: { ar: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
    description:
      "مطور Laravel وخبير PostgreSQL في مصر والخليج، متخصص في REST APIs وأنظمة الباك إند وتحسين الأداء.",
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "عبدالرحمن طاهر - مطور Laravel وخبير PostgreSQL" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
    description:
      "مطور Laravel وخبير PostgreSQL متخصص في REST APIs وأنظمة الباك إند وتحسين الأداء.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const homeFaqs = [
  {
    question: "من هو عبدالرحمن طاهر وما تخصصه؟",
    answer:
      "عبدالرحمن طاهر مهندس برمجيات باك اند أول ومطور Laravel وخبير PostgreSQL من مصر، يعمل عن بُعد مع شركات في مصر والخليج. متخصص في بناء REST APIs عالية الأداء وتحسين قواعد البيانات وتكامل بوابات الدفع والأنظمة السحابية. خبرة تتجاوز 5 سنوات في هندسة البرمجيات للشركات الإقليمية.",
  },
  {
    question: "ما هي خدمات هندسة الباك اند التي يقدمها عبدالرحمن طاهر؟",
    answer:
      "يقدم عبدالرحمن طاهر خدمات شاملة: تطوير Laravel وNode.js، بناء REST APIs، تحسين أداء PostgreSQL، تكامل بوابات الدفع (Mada وMoyasar وTap وPaymob وStripe)، بناء الأنظمة السحابية بـ Docker وAWS، إعداد Redis Caching وQueue Workers، والاستشارات التقنية لمراجعة المعمارية البرمجية.",
  },
  {
    question: "هل يعمل عبدالرحمن طاهر مع شركات في السعودية والإمارات؟",
    answer:
      "نعم، يعمل عبدالرحمن طاهر عن بُعد مع شركات وعملاء في المملكة العربية السعودية والإمارات العربية المتحدة والكويت وقطر وسلطنة عُمان ومصر. يقبل المشاريع بالدولار الأمريكي والريال السعودي والدرهم الإماراتي والجنيه المصري.",
  },
  {
    question: "ما خبرة عبدالرحمن طاهر في تكامل بوابات الدفع؟",
    answer:
      "يملك عبدالرحمن طاهر خبرة عملية في تكامل بوابات الدفع المحلية والعالمية: Mada وMoyasar وTap Payments وPaymob وStripe. يُطبّق معايير أمان المدفوعات الصارمة بما فيها Webhook Verification وIdempotency Keys والحماية من الخصم المزدوج لضمان موثوقية 100% في كل معاملة.",
  },
  {
    question: "كيف يُحسّن عبدالرحمن طاهر أداء قواعد بيانات PostgreSQL؟",
    answer:
      "يُحسّن عبدالرحمن طاهر أداء PostgreSQL من خلال: تحليل خطط التنفيذ بـ EXPLAIN ANALYZE، بناء فهارس مركّبة ذكية، تقسيم الجداول الضخمة (Table Partitioning)، تحسين الاستعلامات الفرعية المعقدة، إعداد Connection Pooling، واستخدام Redis لتخفيف الضغط على قاعدة البيانات.",
  },
  {
    question: "هل يقدم عبدالرحمن طاهر استشارة تقنية مجانية؟",
    answer:
      "نعم، يقدم عبدالرحمن طاهر جلسة تشخيص تقني أولى مجانية لتقييم وضع النظام البرمجي وتحديد نقاط الضعف والاختناقات. يمكن التواصل عبر نموذج الاتصال على الموقع أو مباشرة عبر WhatsApp على الرقم +201008275881.",
  },
  {
    question: "ما الفرق بين مهندس الباك اند ومطور الويب Full Stack؟",
    answer:
      "مهندس الباك اند متخصص في بناء الجانب الخادمي: قواعد البيانات، APIs، منطق الأعمال، الأمان، والأداء. عبدالرحمن طاهر متخصص حصراً في الباك اند مما يمنحه عمقاً تقنياً أكبر في تحسين الأداء وهندسة الأنظمة وحل الاختناقات مقارنة بمطوري Full Stack.",
  },
  {
    question: "What does Abdulrahman Taher specialise in as a Backend Engineer?",
    answer:
      "Abdulrahman Taher is a Senior Backend Engineer and Laravel Developer specialising in PostgreSQL database tuning, REST API architecture, Redis caching, payment gateway integration (Mada, Moyasar, Tap, Paymob), Node.js microservices, and scalable cloud architecture for GCC and Egyptian enterprises. He has 5+ years of production experience building systems that handle 10,000+ concurrent users.",
  },
];

export default function HomePage() {
  const schema = baseSchema(
    SITE_URL,
    "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
    "عبدالرحمن طاهر، مطور Laravel وخبير PostgreSQL في مصر والخليج. أبني REST APIs وأنظمة باك إند عالية الأداء مع تكامل بوابات الدفع وتحسين قواعد البيانات."
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <JsonLd data={faqSchema(homeFaqs)} />
      <HomePageClient />
    </SiteShell>
  );
}
