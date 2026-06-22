import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { BlogPostClient } from "@/components/pages/BlogPostClient";
import JsonLd from "@/components/JsonLd";
import { blogArticles } from "@/src/data/blogs";
import { articleSchema, baseSchema, SITE_URL, OG_IMAGE } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Pre-generate all blog post pages at build time (SSG) */
export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.id }));
}

/** Per-article metadata — fully rendered server-side for crawlers */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.id === slug);
  if (!article) return {};

  const articleUrl = `${SITE_URL}/blogs/${slug}`;

  return {
    title: `${article.titleAr} | عبدالرحمن طاهر`,
    description: article.excerptAr,
    keywords: [
      ...article.keywords,
      "عبدالرحمن طاهر",
      "مدونة باك اند",
      "backend engineering article",
      "Abdulrahman Taher blog",
    ],
    authors: [{ name: "Abdulrahman Taher", url: SITE_URL }],
    alternates: {
      canonical: `/blogs/${slug}`,
      languages: {
        ar: `/blogs/${slug}`,
        en: `/en/blogs/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      siteName: "عبدالرحمن طاهر | مهندس باك اند",
      title: article.titleAr,
      description: article.excerptAr,
      images: [
        {
          url: article.image,
          width: 800,
          height: 533,
          alt: article.titleEn,
        },
      ],
      publishedTime: new Date(article.dateEn).toISOString(),
      modifiedTime: new Date(article.dateEn).toISOString(),
      authors: ["https://abdotaher.me/#person"],
      tags: article.keywords,
      locale: "ar_EG",
    },
    twitter: {
      card: "summary_large_image",
      site: "@abdotaher_dev",
      creator: "@abdotaher_dev",
      title: article.titleAr,
      description: article.excerptAr,
      images: [{ url: article.image, alt: article.titleEn }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.id === slug);
  if (!article) notFound();

  const schema = articleSchema(article);
  const pageSchema = baseSchema(
    `${SITE_URL}/blogs/${slug}`,
    article.titleEn,
    article.excerptEn
  );

  return (
    <SiteShell initialLang="ar">
      <JsonLd data={schema} />
      <JsonLd data={pageSchema} />

      {/* Static SEO content — visible to crawlers before JS hydrates */}
      <div className="sr-only">
        <h1>{article.titleAr}</h1>
        <p>{article.excerptAr}</p>
        <p>{article.titleEn}</p>
        <p>{article.excerptEn}</p>
        <p>
          Author: Abdulrahman Taher — Senior Backend Engineer, Cairo, Egypt.
          Published: {article.dateEn}.
        </p>
        <ul>
          {article.keywords.map((kw) => (
            <li key={kw}>{kw}</li>
          ))}
        </ul>
      </div>

      <BlogPostClient slug={slug} />
    </SiteShell>
  );
}
