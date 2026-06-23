import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdotaher.me"),
  title: {
    default: "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
    template: "%s | عبدالرحمن طاهر",
  },
  description:
    "عبدالرحمن طاهر، مطور Laravel وخبير PostgreSQL في مصر والخليج. أبني REST APIs وأنظمة باك إند عالية الأداء مع تكامل بوابات الدفع وتحسين قواعد البيانات.",
  keywords: [
    // Arabic — primary brand + service intent
    "عبدالرحمن طاهر",
    "مطور Laravel",
    "مهندس باك اند مصر",
    "خبير PostgreSQL",
    "مهندس برمجيات",
    "هندسة قواعد البيانات",
    "تكامل بوابات الدفع",
    "مستشار تقني",
    "مطور باك اند فريلانس",
    "أنظمة سحابية",
    "Node.js مطور",
    "تحسين أداء PostgreSQL",
    "استشارات تقنية الخليج",
    "ربط بوابات دفع مدى موياسر تاب",
    "بناء REST APIs",
    // English — discovery & international reach
    "Senior Backend Engineer Egypt",
    "Laravel Developer Egypt",
    "Backend Developer GCC",
    "PostgreSQL Expert",
    "Freelance Backend Developer",
    "API Development",
    "Payment Gateway Integration",
    "Technical Consultant Egypt",
    "Node.js Backend Developer",
    "Database Expert",
    "Remote Laravel Developer Saudi Arabia",
    "Backend Engineer Egypt",
    "Senior Software Engineer Egypt",
    "Abdulrahman Taher developer",
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
    siteName: "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
    title: "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
    description:
      "مطور Laravel وخبير PostgreSQL في مصر والخليج، متخصص في REST APIs وأنظمة الباك إند وتحسين الأداء.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "عبدالرحمن طاهر - مطور Laravel وخبير PostgreSQL",
        type: "image/jpeg",
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
    title: "عبدالرحمن طاهر | مطور Laravel و PostgreSQL",
    description:
      "مطور Laravel وخبير PostgreSQL متخصص في REST APIs وأنظمة الباك إند وتحسين الأداء.",
    images: [{ url: "/og-image.jpg", alt: "عبدالرحمن طاهر - مطور Laravel وخبير PostgreSQL" }],
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
        {/* ── Favicon — all formats ── */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />

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
