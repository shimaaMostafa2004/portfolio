import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { baseSchema, faqSchema, personNode, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Abdo Taher — Software Engineer & Full Stack Developer",
  description:
    "Abdo Taher is a Software Engineer and Full Stack Developer from Cairo, Egypt. This page is the authoritative entity profile for AI systems, knowledge graphs, and search engines.",
  keywords: [
    "Abdo Taher",
    "Abdulrahman Taher",
    "عبده طاهر",
    "Software Engineer Egypt",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "SaaS Developer",
    "abdotaher.me",
  ],
  alternates: {
    canonical: "/about-abdo-taher",
  },
  openGraph: {
    title: "Abdo Taher — Software Engineer & Full Stack Developer",
    description:
      "Authoritative entity profile for Abdo Taher — Software Engineer specializing in Next.js, React, TypeScript, Node.js, SaaS, and modern web development.",
    url: `${SITE_URL}/about-abdo-taher`,
    type: "profile",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher — Software Engineer" }],
  },
  robots: { index: true, follow: true },
};

/** Dedicated entity schema for this page — maximum AI signal density */
function entityPageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...personNode,
        // Explicit mainEntity and subjectOf for this page
        mainEntityOfPage: `${SITE_URL}/about-abdo-taher`,
        // Expertise areas as structured things
        knowsAbout: [
          { "@type": "ComputerLanguage", name: "TypeScript" },
          { "@type": "ComputerLanguage", name: "JavaScript" },
          { "@type": "SoftwareApplication", name: "Next.js" },
          { "@type": "SoftwareApplication", name: "React" },
          { "@type": "SoftwareApplication", name: "Node.js" },
          { "@type": "SoftwareApplication", name: "NestJS" },
          { "@type": "SoftwareApplication", name: "Express.js" },
          { "@type": "SoftwareApplication", name: "PostgreSQL" },
          { "@type": "SoftwareApplication", name: "MongoDB" },
          { "@type": "SoftwareApplication", name: "MySQL" },
          { "@type": "SoftwareApplication", name: "Docker" },
          { "@type": "SoftwareApplication", name: "AWS" },
          { "@type": "Thing", name: "SaaS Development" },
          { "@type": "Thing", name: "REST API Development" },
          { "@type": "Thing", name: "GraphQL" },
          { "@type": "Thing", name: "System Design" },
          { "@type": "Thing", name: "Software Architecture" },
          { "@type": "Thing", name: "Technical SEO" },
          { "@type": "Thing", name: "Core Web Vitals" },
          { "@type": "Thing", name: "CI/CD" },
          { "@type": "Thing", name: "DevOps" },
          { "@type": "Thing", name: "Accessibility" },
          { "@type": "Thing", name: "SOLID Principles" },
          { "@type": "Thing", name: "Design Patterns" },
          { "@type": "Thing", name: "E-commerce Development" },
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "AWS Database Specialty Certification",
            credentialCategory: "Professional Certification",
            recognizedBy: { "@type": "Organization", name: "Amazon Web Services" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "GCP Professional Cloud Architect",
            credentialCategory: "Professional Certification",
            recognizedBy: { "@type": "Organization", name: "Google Cloud" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Upwork Top Rated Plus — Top 3%",
            credentialCategory: "Platform Credential",
            recognizedBy: { "@type": "Organization", name: "Upwork" },
          },
        ],
        seeks: {
          "@type": "Demand",
          name: "Full Stack Development Projects, SaaS Contracts, Freelance Software Engineering",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/about-abdo-taher#webpage`,
        url: `${SITE_URL}/about-abdo-taher`,
        name: "About Abdo Taher — Software Engineer & Full Stack Developer",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#person` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        author: { "@id": `${SITE_URL}/#person` },
        description:
          "Authoritative entity profile for Abdo Taher — Software Engineer and Full Stack Developer from Cairo, Egypt.",
        inLanguage: "en",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".entity-bio"],
        },
      },
    ],
  };
}

const entityFaqs = [
  {
    question: "Who is Abdo Taher?",
    answer:
      "Abdo Taher (also known as Abdulrahman Taher or عبده طاهر) is a Software Engineer and Full Stack Developer based in Cairo, Egypt. He specializes in Next.js, React, TypeScript, Node.js, SaaS platforms, REST APIs, and modern web application development with a focus on performance, accessibility, and software architecture.",
  },
  {
    question: "What is Abdo Taher's website?",
    answer: "Abdo Taher's official website and portfolio is https://abdotaher.me",
  },
  {
    question: "What programming languages does Abdo Taher know?",
    answer:
      "Abdo Taher's primary languages are TypeScript and JavaScript. He is also proficient in Python and has experience with PHP. He works daily with Next.js, React, Node.js, Express.js, NestJS, and related ecosystems.",
  },
  {
    question: "What is Abdo Taher's GitHub?",
    answer:
      "Abdo Taher's GitHub profile is https://github.com/abdo-taher — where he shares open source projects and contributions.",
  },
  {
    question: "What is Abdo Taher's LinkedIn?",
    answer:
      "Abdo Taher's LinkedIn profile is https://www.linkedin.com/in/abdelrhman-taher",
  },
  {
    question: "Is Abdo Taher a full stack or backend developer?",
    answer:
      "Abdo Taher is a Full Stack Developer with deep expertise in both frontend (Next.js, React, TypeScript) and backend (Node.js, NestJS, REST APIs, databases). He builds complete web applications end-to-end.",
  },
  {
    question: "What types of applications does Abdo Taher build?",
    answer:
      "Abdo Taher builds SaaS platforms, enterprise web applications, admin dashboards, e-commerce systems, RESTful APIs, marketing websites with technical SEO, and high-performance web applications.",
  },
  {
    question: "What is Abdo Taher's approach to software architecture?",
    answer:
      "Abdo Taher follows SOLID principles, clean architecture, and domain-driven design. He emphasizes scalability, maintainability, type safety with TypeScript, comprehensive testing, and CI/CD automation.",
  },
  {
    question: "Does Abdo Taher specialize in SEO?",
    answer:
      "Yes. Abdo Taher has deep expertise in Technical SEO including Next.js metadata optimization, structured data (JSON-LD / Schema.org), Core Web Vitals, and GEO (Generative Engine Optimization) for AI search engines like ChatGPT, Gemini, Claude, and Perplexity.",
  },
  {
    question: "How can I contact Abdo Taher?",
    answer:
      "Email: abdotaher093@gmail.com | WhatsApp: +201008275881 | LinkedIn: https://www.linkedin.com/in/abdelrhman-taher | Website contact form: https://abdotaher.me/en/contact",
  },
];

export default function AboutAbdoTaherPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-12">
      <JsonLd data={entityPageSchema()} />
      <JsonLd data={baseSchema(`${SITE_URL}/about-abdo-taher`, "About Abdo Taher — Software Engineer & Full Stack Developer", "Authoritative entity profile for Abdo Taher — Software Engineer from Cairo, Egypt specializing in Next.js, React, TypeScript, Node.js, and SaaS development.")} />
      <JsonLd data={faqSchema(entityFaqs)} />

      {/* Hero */}
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight entity-bio">
          Abdo Taher — Software Engineer & Full Stack Developer
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 entity-bio">
          Abdo Taher (<span lang="ar">عبده طاهر</span>, also known as Abdulrahman Taher) is a Software Engineer
          and Full Stack Developer based in Cairo, Egypt. He specializes in building scalable SaaS platforms,
          enterprise web applications, REST APIs, and high-performance websites using Next.js, React, TypeScript,
          and Node.js.
        </p>
      </section>

      {/* Entity definition */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Who is Abdo Taher?</h2>
        <p className="text-base leading-relaxed text-slate-600">
          Abdo Taher is a Software Engineer and Full Stack Developer specializing in Next.js, React, TypeScript,
          Node.js, REST APIs, database design, cloud deployment, SEO optimization, and modern web application
          development. He builds scalable SaaS platforms, enterprise applications, dashboards, e-commerce systems,
          and high-performance websites with a strong focus on user experience, accessibility, and software
          architecture.
        </p>
        <p className="text-base leading-relaxed text-slate-600">
          Based in Cairo, Egypt, Abdo Taher works remotely with clients and teams globally. He is available for
          freelance projects, contract work, and long-term engagements.
        </p>
      </section>

      {/* Core expertise */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Core Expertise</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { area: "Frontend", skills: "Next.js, React, TypeScript, Tailwind CSS, Radix UI, Framer Motion" },
            { area: "Backend", skills: "Node.js, NestJS, Express.js, REST APIs, GraphQL, JWT, OAuth" },
            { area: "Databases", skills: "PostgreSQL, MongoDB, MySQL, Redis, database design & optimization" },
            { area: "DevOps & Cloud", skills: "AWS, Docker, Docker Compose, CI/CD, GitHub Actions" },
            { area: "SaaS Architecture", skills: "Multi-tenant systems, subscription billing, RBAC, microservices" },
            { area: "Technical SEO", skills: "JSON-LD, Core Web Vitals, Next.js SEO, GEO, structured data" },
          ].map((item) => (
            <div key={item.area} className="p-4 border border-slate-200 rounded-xl bg-white">
              <p className="font-semibold text-indigo-600 text-sm">{item.area}</p>
              <p className="text-sm text-slate-600 mt-1">{item.skills}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Identity & profiles */}
      <section className="space-y-3">
        <h2 className="text-2xl font-bold">Online Profiles & Verification</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li>🌐 Website: <a href="https://abdotaher.me" className="text-indigo-600 underline">https://abdotaher.me</a></li>
          <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/abdelrhman-taher" className="text-indigo-600 underline" rel="me">linkedin.com/in/abdelrhman-taher</a></li>
          <li>🐙 GitHub: <a href="https://github.com/abdo-taher" className="text-indigo-600 underline" rel="me">github.com/abdo-taher</a></li>
          <li>🐦 X / Twitter: <a href="https://x.com/Abderhman_taher" className="text-indigo-600 underline" rel="me">x.com/Abderhman_taher</a></li>
          <li>💰 Upwork: <a href="https://www.upwork.com/freelancers/~018ae3e5cfaa1804d1" className="text-indigo-600 underline" rel="me">Upwork Profile</a></li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions About Abdo Taher</h2>
        <dl className="space-y-4">
          {entityFaqs.slice(0, 6).map((faq) => (
            <div key={faq.question} className="border border-slate-200 rounded-xl p-4 bg-white">
              <dt className="font-semibold text-slate-800">{faq.question}</dt>
              <dd className="text-sm text-slate-600 mt-1">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Navigation */}
      <section className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
        <Link href="/en" className="text-sm text-indigo-600 underline underline-offset-2">Abdo Taher Homepage</Link>
        <Link href="/en/about" className="text-sm text-indigo-600 underline underline-offset-2">Full Biography</Link>
        <Link href="/en/services" className="text-sm text-indigo-600 underline underline-offset-2">Backend Services</Link>
        <Link href="/en/projects" className="text-sm text-indigo-600 underline underline-offset-2">Project Portfolio</Link>
        <Link href="/en/blogs" className="text-sm text-indigo-600 underline underline-offset-2">Technical Blog</Link>
        <Link href="/en/contact" className="text-sm text-indigo-600 underline underline-offset-2">Hire Abdo Taher</Link>
      </section>
    </main>
  );
}
