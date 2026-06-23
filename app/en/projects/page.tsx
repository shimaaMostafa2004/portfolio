import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects & Portfolio | Scalable Backend Systems by Abdo Taher",
  description:
    "Portfolio and case studies by Abdo Taher — scalable SaaS backends, performance-driven REST APIs, database-optimized systems, and enterprise applications built with Laravel, NestJS, and Node.js.",
  keywords: [
    "Abdo Taher portfolio",
    "Laravel backend projects",
    "NestJS REST API portfolio",
    "scalable backend case studies",
    "SaaS backend portfolio",
    "database optimization projects",
    "Node.js backend portfolio",
    "performance-driven backend systems",
    "enterprise backend Egypt",
    "backend developer portfolio",
  ],
  alternates: { canonical: "/en/projects", languages: { ar: "/projects", en: "/en/projects" } },
  openGraph: {
    title: "Projects & Portfolio | Scalable Backend Systems by Abdo Taher",
    description:
      "Scalable SaaS backends, performance-driven REST APIs, and database-optimized enterprise systems built with Laravel, NestJS, and Node.js.",
    url: `${SITE_URL}/en/projects`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher — Backend Engineering Portfolio" }],
  },
};

export default function ProjectsPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/projects`, "Projects & Portfolio | Scalable Backend Systems by Abdo Taher", "Scalable SaaS backends, performance-driven REST APIs, and database-optimized systems built with Laravel, NestJS, and Node.js.")} />
      <ProjectsPageClient />
    </SiteShell>
  );
}
