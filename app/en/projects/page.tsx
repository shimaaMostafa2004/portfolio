import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies | Backend Projects — Abdulrahman Taher",
  description:
    "Real production case studies: scalable ride-hailing backends, financial SaaS platforms, healthcare systems, and e-commerce built for GCC clients using Laravel, Node.js, and PostgreSQL.",
  keywords: [
    "backend portfolio GCC",
    "Laravel case studies",
    "Node.js production projects",
    "scalable API projects",
    "ride-hailing backend",
    "fintech SaaS backend",
    "e-commerce backend Egypt",
  ],
  alternates: { canonical: "/en/projects", languages: { ar: "/projects", en: "/en/projects" } },
  openGraph: {
    title: "Portfolio & Case Studies | Abdulrahman Taher",
    description:
      "Real case studies: ride-hailing, financial platforms, healthcare, and e-commerce backends for GCC clients.",
    url: `${SITE_URL}/en/projects`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Backend Engineering Portfolio" }],
  },
};

export default function ProjectsPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/projects`, "Portfolio & Case Studies | Abdulrahman Taher", "Real production case studies for GCC clients — Laravel, Node.js, PostgreSQL.")} />
      <ProjectsPageClient />
    </SiteShell>
  );
}
