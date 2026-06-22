import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdotaher.me"),
  title: {
    default:
      "عبدالرحمن طاهر | مهندس برمجيات باك اند وقواعد بيانات ومستشار تقني محترف",
    template: "%s | عبدالرحمن طاهر",
  },
  description:
    "عبدالرحمن طاهر | مهندس برمجيات باك اند ومطور قواعد بيانات محترف لبناء أنظمة و APIs قوية وسريعة سحابية رائدة للشركات والمشاريع التقنية المميزة.",
  keywords: [
    // Arabic — primary persona
    "عبدالرحمن طاهر",
    "مبرمج باك اند مصر",
    "مهندس قواعد بيانات الخليج",
    "مطور Laravel محترف",
    "مهندس Node.js الخليج",
    "مستشار تقني سعودية",
    "برمجة APIs قواعد بيانات",
    "تطوير أنظمة SaaS",
    "ربط بوابات دفع مدى",
    "تحسين أداء PostgreSQL",
    // English — discovery & LLMs
    "Senior Backend Engineer Egypt",
    "Remote Laravel Developer Saudi Arabia",
    "Node.js Architect GCC",
    "PostgreSQL Performance Consultant",
    "API Architecture Specialist",
    "Redis Caching Expert",
    "Payment Gateway Integration Mada Moyasar",
    "Multi-Tenant SaaS Developer",
    "Cloud Cost Optimisation AWS",
    "Dubai Backend Consultant",
    "Freelance Backend Engineer Middle East",
    "Abdulrahman Taher backend",
  ],
  authors: [{ name: "Abdulrahman Taher", url: "https://abdotaher.me" }],
  creator: "Abdulrahman Taher",
  publisher: "Abdulrahman Taher",
  category: "Technology",
  classification: "Backend Software Engineering",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    url: "https://abdotaher.me",
    siteName: "عبدالرحمن طاهر | مهندس باك اند",
    title:
      "عبدالرحمن طاهر | مهندس برمجيات باك اند وقواعد بيانات ومستشار تقني محترف",
    description:
      "مهندس برمجيات باك اند ومطور قواعد بيانات محترف — Laravel, Node.js, PostgreSQL, Redis — لبناء أنظمة و APIs قوية للشركات في الخليج ومصر.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Taher - Senior Backend Engineer specialising in Laravel, Node.js, PostgreSQL",
        type: "image/png",
      },
    ],
    countryName: "Egypt",
    emails: ["abdotaher093@gmail.com"],
    phoneNumbers: ["+201008275881"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@abdotaher_dev",
    creator: "@abdotaher_dev",
    title:
      "عبدالرحمن طاهر | مهندس برمجيات باك اند وقواعد بيانات ومستشار تقني محترف",
    description:
      "مهندس باك اند — Laravel, Node.js, PostgreSQL, Redis — يبني APIs وأنظمة سحابية للشركات في الخليج ومصر.",
    images: [{ url: "/image.png", alt: "Abdulrahman Taher - Senior Backend Engineer" }],
  },
  // Search engine verification
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    yandex: "REPLACE_WITH_YANDEX_TOKEN",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_TOKEN",
    },
  },
  // App / PWA
  applicationName: "Abdulrahman Taher Portfolio",
  appleWebApp: {
    capable: true,
    title: "عبدالرحمن طاهر",
    statusBarStyle: "black-translucent",
  },
  // Referrer & format detection
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* ── Theme & PWA ── */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
        <link rel="manifest" href="/manifest.json" />

        {/* ── Canonical hreflang handled by Next.js alternates ── */}

        {/* ── Preconnect for performance ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* ── Fonts ── */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* ── Google Analytics (GA4) ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                cookie_flags: 'SameSite=None;Secure',
                send_page_view: true
              });
            `,
          }}
        />
      </head>
      <body className="bg-[#f8fafc] text-slate-800 selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
