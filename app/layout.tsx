import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { globalEntitySchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdotaher.me"),
  title: {
    default: "Abdo Taher | Backend Engineer — Laravel & NestJS",
    template: "%s | Abdo Taher",
  },
  description:
    "Abdo Taher is a Backend Engineer specializing in Laravel, NestJS, Node.js, REST APIs, database optimization, and scalable system architecture. Based in Cairo, Egypt — available globally.",
  keywords: [
    // Primary identity
    "Abdo Taher",
    "عبده طاهر",
    "Abdulrahman Taher",
    "abdotaher",
    // Role + tech
    "Backend Engineer",
    "Software Engineer",
    "Laravel Developer",
    "NestJS Developer",
    "Node.js Developer",
    "REST API Developer",
    "SaaS Backend Developer",
    // Services
    "REST API Development",
    "Database Optimization",
    "Backend Architecture",
    "Payment Gateway Integration",
    "Cloud Deployment",
    // Location
    "Backend Engineer Egypt",
    "Laravel Developer Cairo",
    "Remote Backend Engineer",
    "Freelance Backend Developer",
    // Arabic
    "مهندس باك-إند",
    "مطور Laravel",
    "مطور NestJS",
    "مهندس برمجيات",
  ],
  authors: [{ name: "Abdo Taher", url: "https://abdotaher.me" }],
  creator: "Abdo Taher",
  publisher: "Abdo Taher",
  category: "Technology",
  classification: "Software Engineering",
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
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    url: "https://abdotaher.me",
    siteName: "Abdo Taher | Backend Engineer",
    title: "Abdo Taher | Backend Engineer — Laravel & NestJS",
    description:
      "Backend Engineer specializing in Laravel, NestJS, Node.js, REST APIs, database optimization, and scalable cloud architecture.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdo Taher — Software Engineer & Full Stack Developer",
        type: "image/jpeg",
      },
    ],
    countryName: "Egypt",
    emails: ["abdotaher093@gmail.com"],
    phoneNumbers: ["+201008275881"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Abderhman_taher",
    creator: "@Abderhman_taher",
    title: "Abdo Taher | Backend Engineer — Laravel & NestJS",
    description:
      "Backend Engineer specializing in Laravel, NestJS, Node.js, REST APIs, and scalable system architecture.",
    images: [{ url: "/og-image.jpg", alt: "Abdo Taher — Software Engineer & Full Stack Developer" }],
  },
  verification: {
    google: "-WxdYsb9lGJIJ0eTnfYVQf9J6g8UMbTkK4A_uWBTcnA",
  },
  applicationName: "Abdo Taher Portfolio",
  appleWebApp: {
    capable: true,
    title: "Abdo Taher",
    statusBarStyle: "black-translucent",
  },
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

        {/* ── Preconnect for performance ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* ── Fonts ── */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* ── Global entity JSON-LD — primary AI/Knowledge Graph anchor ── */}
        <JsonLd data={globalEntitySchema()} />

        {/* ── Google Analytics (GA4) ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2KBNYVF6C5" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2KBNYVF6C5', {
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


