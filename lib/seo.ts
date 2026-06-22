/**
 * Shared SEO utilities:
 * - Person / WebSite / ProfessionalService / FAQ / BreadcrumbList JSON-LD schemas
 * - Per-page Metadata helpers
 * - LLM-optimised structured data (speakable, mentions, expertise)
 */

export const SITE_URL = "https://abdotaher.me";
export const OG_IMAGE = `${SITE_URL}/image.png`;
export const TWITTER_HANDLE = "@abdotaher_dev";

/** Canonical Person node — reused across all schemas */
const personNode = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Abdulrahman Taher",
  alternateName: ["عبدالرحمن طاهر", "Abdo Taher", "عبدالرحمن طاهر مبرمج"],
  jobTitle: "Senior Backend & Database Architect",
  description:
    "Senior Backend Engineer with 5+ years of experience building scalable APIs, PostgreSQL-optimised database systems, and microservices for GCC enterprises.",
  url: SITE_URL,
  image: {
    "@type": "ImageObject",
    url: OG_IMAGE,
    width: 1200,
    height: 630,
  },
  email: "abdotaher093@gmail.com",
  telephone: "+201008275881",
  sameAs: [
    "https://www.linkedin.com/in/abdelrhman-taher",
    "https://github.com/abdo-taher",
    "https://www.upwork.com/freelancers/~018ae3e5cfaa1804d1",
    "https://wa.me/201008275881",
  ],
  knowsLanguage: [
    { "@type": "Language", name: "Arabic" },
    { "@type": "Language", name: "English" },
  ],
  knowsAbout: [
    "High-Performance REST API Architecture",
    "PostgreSQL Performance Tuning",
    "Redis Caching & Queue Workers",
    "RabbitMQ Message Broker",
    "Payment Integration — Mada, Moyasar, Tap, Paymob",
    "Laravel Backend Engineering",
    "Node.js Microservices",
    "Docker & Container Orchestration",
    "Multi-Tenant SaaS Architecture",
    "Cloud Cost Optimisation AWS",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Backend Software Engineer",
    occupationalCategory: "15-1252.00",
    skills: "Laravel, Node.js, PostgreSQL, Redis, Docker, REST API, Microservices",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Remote",
    url: SITE_URL,
  },
};

/** Base JSON-LD graph nodes that appear on every page */
export function baseSchema(pageUrl: string, pageTitle: string, pageDesc: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personNode,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "عبدالرحمن طاهر | مهندس برمجيات باك اند",
        alternateName: "Abdulrahman Taher | Senior Backend Engineer",
        description:
          "Portfolio and technical blog of Abdulrahman Taher — Senior Backend Engineer specialising in Laravel, Node.js, PostgreSQL, and GCC payment integrations.",
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
      },
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
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: buildBreadcrumbs(pageUrl),
        },
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": `${SITE_URL}/#service`,
        name: "Abdulrahman Taher Backend Engineering Services",
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
          { "@type": "Country", name: "Saudi Arabia" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "Egypt" },
          { "@type": "Country", name: "Kuwait" },
          { "@type": "Country", name: "Qatar" },
          { "@type": "Country", name: "Oman" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Backend Engineering Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "REST API Architecture & Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "PostgreSQL & Database Performance Tuning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Payment Gateway Integration (Mada, Moyasar, Tap, Paymob)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Redis Caching & Queue Worker Setup" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Cost Optimisation (AWS / GCP)" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Tenant SaaS Architecture" } },
          ],
        },
      },
    ],
  };
}

/** Build breadcrumb items from a URL */
function buildBreadcrumbs(pageUrl: string) {
  const path = pageUrl.replace(SITE_URL, "");
  const segments = path.split("/").filter(Boolean);
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }];
  let accumulated = SITE_URL;
  segments.forEach((seg, i) => {
    accumulated += `/${seg}`;
    items.push({
      "@type": "ListItem",
      position: i + 2,
      name: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
      item: accumulated,
    });
  });
  return items;
}

/** JSON-LD for a blog article page */
export function articleSchema(article: {
  id: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  dateEn: string;
  image: string;
  keywords: string[];
}) {
  const articleUrl = `${SITE_URL}/blogs/${article.id}`;
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
        articleSection: "Backend Engineering",
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
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
            { "@type": "ListItem", position: 3, name: article.titleEn, item: articleUrl },
          ],
        },
      },
      personNode,
    ],
  };
}

/** FAQ schema — use on service/about pages to capture PAA boxes */
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

/** HowTo schema — great for technical blog posts */
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
