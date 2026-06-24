/**
 * Shared SEO utilities:
 * - Person / WebSite / ProfilePage / ProfessionalService / FAQ / BreadcrumbList JSON-LD schemas
 * - Per-page Metadata helpers
 * - GEO / AI Search optimised structured data (speakable, mentions, expertise)
 */

export const SITE_URL = "https://abdotaher.me";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const TWITTER_HANDLE = "@abdotaher_dev";

/** ─── Canonical Person node — reused across ALL schemas ─── */
export const personNode = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Abdo Taher",
  alternateName: [
    "عبده طاهر",
    "عبدو طاهر",
    "عبدالرحمن طاهر",
    "Abdulrahman Taher",
    "AbdulRahman Taher",
    "Abdurhman taher",
    "abdotaher",
  ],
  jobTitle: "Software Engineer",
  description:
    "Abdo Taher is a Backend Engineer and Software Engineer specializing in Laravel, NestJS, Node.js, REST APIs, database design, cloud deployment, and scalable system architecture. He builds SaaS platforms, enterprise backend systems, and high-performance APIs with a strong focus on clean architecture, SOLID principles, and software engineering best practices.",
  url: SITE_URL,
  image: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#person-image`,
    url: OG_IMAGE,
    contentUrl: OG_IMAGE,
    width: 1200,
    height: 630,
    caption: "Abdo Taher — Software Engineer & Full Stack Developer",
  },
  email: "abdotaher093@gmail.com",
  telephone: "+201008275881",
  nationality: { "@type": "Country", name: "Egypt" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
    addressRegion: "Cairo Governorate",
  },
  sameAs: [
    "https://www.linkedin.com/in/abdelrhman-taher",
    "https://github.com/abdo-taher",
    "https://x.com/Abderhman_taher",
    "https://twitter.com/Abderhman_taher",
    "https://www.upwork.com/freelancers/~018ae3e5cfaa1804d1",
    "https://wa.me/201008275881",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Arabic", alternateName: "ar" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
  knowsAbout: [
    "Software Engineering",
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "Web Development",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "REST API Development",
    "GraphQL",
    "Authentication Systems",
    "OAuth",
    "JWT Authentication",
    "Database Design",
    "Database Optimization",
    "Cloud Computing",
    "AWS",
    "Docker",
    "CI/CD",
    "DevOps",
    "Technical SEO",
    "Core Web Vitals",
    "Performance Optimization",
    "Responsive Web Design",
    "Accessibility",
    "UI Engineering",
    "UX Optimization",
    "SaaS Development",
    "Enterprise Software Development",
    "E-commerce Development",
    "Admin Dashboard Development",
    "System Design",
    "Software Architecture",
    "Design Patterns",
    "SOLID Principles",
    "Testing",
    "Git",
    "GitHub",
    "Modern Web Development",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationalCategory: "15-1252.00",
    occupationLocation: { "@type": "Country", name: "Egypt" },
    skills:
      "Laravel, NestJS, Node.js, TypeScript, REST API, PostgreSQL, MySQL, Redis, Docker, AWS, CI/CD, SaaS Architecture",
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "Freelance / Contract Rate",
      currency: "USD",
      duration: "P1H",
      percentile10: 50,
      percentile25: 75,
      median: 100,
      percentile75: 150,
      percentile90: 200,
    },
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Remote",
    url: SITE_URL,
  },
  award: [
    "Upwork Top Rated Plus — Top 3% Technical Class",
    "AWS Database Specialty Certified",
    "GCP Professional Cloud Architect",
  ],
  alumniOf: [],
};

/** ─── WebSite node — referenced by all pages ─── */
const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Abdo Taher | Backend Engineer — Laravel & NestJS",
  alternateName: [
    "عبده طاهر | مهندس باك-إند",
    "abdotaher.me",
  ],
  description:
    "Portfolio and technical blog of Abdo Taher — Backend Engineer specializing in Laravel, NestJS, Node.js, REST APIs, database optimization, and scalable cloud architecture.",
  publisher: { "@id": `${SITE_URL}/#person` },
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: ["ar", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** ─── ProfilePage node — signals to AI that this is a person's portfolio ─── */
const profilePageNode = {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Abdo Taher — Software Engineer Portfolio",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString(),
  inLanguage: ["ar", "en"],
};

/** Base JSON-LD graph nodes that appear on every page */
export function baseSchema(pageUrl: string, pageTitle: string, pageDesc: string) {
  const breadcrumbItems = buildBreadcrumbs(pageUrl);
  const isHome = pageUrl === SITE_URL || pageUrl === `${SITE_URL}/` || pageUrl === `${SITE_URL}/en`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
      websiteNode,
      // ProfilePage only on home/en home — reduces noise on inner pages
      ...(isHome ? [profilePageNode] : []),
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        author: { "@id": `${SITE_URL}/#person` },
        description: pageDesc,
        inLanguage: ["ar", "en"],
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".speakable"],
        },
        breadcrumb: breadcrumbItems.length > 1 ? { "@id": `${pageUrl}#breadcrumb` } : undefined,
      },
      // BreadcrumbList as a top-level graph node (required by Google's spec)
      ...(breadcrumbItems.length > 1
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: breadcrumbItems,
            },
          ]
        : []),
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/#service`,
        name: "Abdo Taher — Software Engineering Services",
        alternateName: "Abdulrahman Taher Full Stack Development Services",
        image: OG_IMAGE,
        telephone: "+201008275881",
        email: "abdotaher093@gmail.com",
        url: SITE_URL,
        founder: { "@id": `${SITE_URL}/#person` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        priceRange: "$$",
        currenciesAccepted: "USD, EGP, SAR, AED",
        areaServed: [
          { "@type": "Country", name: "Egypt" },
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Kuwait" },
          { "@type": "Country", name: "Qatar" },
          { "@type": "Country", name: "Oman" },
          { "@type": "AdministrativeArea", name: "Global / Remote" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Engineering & Full Stack Development Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Laravel REST API Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "NestJS Microservice & API Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Platform Architecture & Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "PostgreSQL & MySQL Performance Tuning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Payment Gateway Integration (Mada, Moyasar, Tap, Paymob, Stripe)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Redis Caching & Queue Worker Architecture" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Deployment & DevOps (AWS, Docker, CI/CD)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backend Architecture Consulting & Code Audits" } },
          ],
        },
      },
    ],
  };
}

/** Locale prefixes to skip as breadcrumb steps */
const LOCALE_PREFIXES = new Set(["en", "ar"]);

/** Build breadcrumb items from a URL, skipping locale-prefix segments */
function buildBreadcrumbs(pageUrl: string) {
  const path = pageUrl.replace(SITE_URL, "");
  const segments = path.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }];
  let accumulated = SITE_URL;
  let position = 2;
  segments.forEach((seg) => {
    accumulated += `/${seg}`;
    // Skip bare locale segments (e.g. /en, /ar) — they're not meaningful breadcrumb steps
    if (LOCALE_PREFIXES.has(seg)) return;
    items.push({
      "@type": "ListItem",
      position: position++,
      name: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      item: accumulated,
    });
  });
  return items;
}

/** JSON-LD for a blog article page */
export function articleSchema(
  article: {
    id: string;
    titleEn: string;
    titleAr: string;
    excerptEn: string;
    excerptAr: string;
    dateEn: string;
    image: string;
    keywords: string[];
  },
  lang: "ar" | "en" = "ar"
) {
  const articleUrl = `${SITE_URL}/blogs/${article.id}`;
  const articleTitle = lang === "en" ? article.titleEn : article.titleAr;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${articleUrl}#article`,
        headline: article.titleEn,
        alternativeHeadline: article.titleAr,
        description: article.excerptEn,
        abstract: article.excerptAr,
        image: {
          "@type": "ImageObject",
          url: article.image,
          width: 800,
          height: 533,
        },
        url: articleUrl,
        datePublished: article.dateEn,
        dateModified: article.dateEn,
        inLanguage: ["ar", "en"],
        keywords: article.keywords.join(", "),
        articleSection: "Software Engineering",
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${articleUrl}#webpage`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".article-intro"],
        },
        breadcrumb: { "@id": `${articleUrl}#breadcrumb` },
        mentions: article.keywords.slice(0, 8).map((kw) => ({
          "@type": "Thing",
          name: kw,
        })),
      },
      // BreadcrumbList as a top-level graph node
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
          { "@type": "ListItem", position: 3, name: articleTitle, item: articleUrl },
        ],
      },
      personNode,
    ],
  };
}

/** FAQ schema — captures PAA boxes and feeds AI answer engines directly */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** HowTo schema — great for technical blog posts and AI step-by-step answers */
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    author: { "@id": `${SITE_URL}/#person` },
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** ─── GLOBAL entity schema — inject on home page only ─── *
 *  This is the primary AI/Knowledge Graph anchor for Abdo Taher.
 *  It consolidates all identity signals in one place so LLMs can
 *  build a coherent entity model from a single crawl.
 */
export function globalEntitySchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...personNode,
        // Extra signals specifically for AI entity recognition
        mainEntityOfPage: { "@id": `${SITE_URL}/#profilepage` },
        subjectOf: { "@id": `${SITE_URL}/#website` },
      },
      websiteNode,
      profilePageNode,
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Abdo Taher — Freelance Software Engineering",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: OG_IMAGE,
          width: 1200,
          height: 630,
        },
        founder: { "@id": `${SITE_URL}/#person` },
        sameAs: [
          "https://www.linkedin.com/in/abdelrhman-taher",
          "https://github.com/abdo-taher",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+201008275881",
          email: "abdotaher093@gmail.com",
          contactType: "customer support",
          availableLanguage: ["English", "Arabic"],
        },
      },
    ],
  };
}


