import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects & Portfolio | Full Stack Work by Abdo Taher",
  description:
    "Portfolio and case studies by Abdo Taher — SaaS platforms, enterprise web applications, e-commerce systems, admin dashboards, and REST APIs built with Next.js, React, TypeScript, and Node.js.",
  keywords: [
    "Abdo Taher portfolio",
    "Next.js projects",
    "React applications portfolio",
    "SaaS development case studies",
    "full stack developer portfolio",
    "TypeScript web applications",
    "Node.js API projects",
    "e-commerce development",
    "admin dashboard development",
    "web application portfolio Egypt",
  ],
  alternates: { canonical: "/en/projects", languages: { ar: "/projects", en: "/en/projects" } },
  openGraph: {
    title: "Projects & Portfolio | Abdo Taher",
    description:
      "SaaS platforms, enterprise apps, e-commerce, dashboards, and REST APIs built with Next.js, React, TypeScript, and Node.js.",
    url: `${SITE_URL}/en/projects`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Abdo Taher — Software Engineering Portfolio" }],
  },
};

export default function ProjectsPageEn() {
  return (
    <SiteShell initialLang="en">
      <JsonLd data={baseSchema(`${SITE_URL}/en/projects`, "Projects & Portfolio | Abdo Taher — Full Stack Developer", "SaaS platforms, enterprise web apps, e-commerce, dashboards, and REST APIs built with Next.js, React, TypeScript, and Node.js.")} />
      <ProjectsPageClient />
    </SiteShell>
  );
}
