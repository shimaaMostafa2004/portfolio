import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ProjectsPageClient } from "@/components/pages/ProjectsPageClient";
import JsonLd from "@/components/JsonLd";
import { baseSchema, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "معرض المشاريع والحالات العملية | عبدالرحمن طاهر",
  description:
    "دراسات حالة حقيقية لمشاريع برمجية ناجحة في الخليج ومصر: أنظمة نقل الركاب، منصات مالية، أنظمة رعاية صحية، تجارة إلكترونية — بتقنيات Laravel وNode.js وPostgreSQL.",
  keywords: [
    "مشاريع برمجية الخليج",
    "حالات عملية باك اند",
    "Laravel case studies GCC",
    "Node.js projects portfolio",
    "backend portfolio Middle East",
    "مشاريع تجارة إلكترونية مصر",
  ],
  alternates: {
    canonical: "/projects",
    languages: { ar: "/projects", en: "/en/projects" },
  },
  openGraph: {
    title: "معرض المشاريع | عبدالرحمن طاهر",
    description:
      "دراسات حالة حقيقية: أنظمة نقل ركاب، منصات مالية، تجارة إلكترونية — Laravel وNode.js وPostgreSQL.",
    url: `${SITE_URL}/projects`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Backend Engineering Projects Portfolio" }],
  },
};

export default function ProjectsPage() {
  const schema = baseSchema(
    `${SITE_URL}/projects`,
    "معرض المشاريع والحالات العملية | عبدالرحمن طاهر",
    "دراسات حالة حقيقية لمشاريع برمجية ناجحة في الخليج ومصر تشمل أنظمة باك اند وقواعد بيانات وسحابية."
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <ProjectsPageClient />
    </SiteShell>
  );
}
