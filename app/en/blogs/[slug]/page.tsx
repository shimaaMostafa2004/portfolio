import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { BlogPostClient } from "@/components/pages/BlogPostClient";
import JsonLd from "@/components/JsonLd";
import { blogArticles } from "@/src/data/blogs";
import { articleSchema, baseSchema, SITE_URL } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.id === slug);
  if (!article) return {};

  const articleUrl = `${SITE_URL}/en/blogs/${slug}`;

  return {
    title: `${article.titleEn} | Abdulrahman Taher`,
    description: article.excerptEn,
    keywords: [
      ...article.keywords,
      "Abdulrahman Taher",
      "backend engineering blog",
      "Laravel Node.js article",
    ],
    authors: [{ name: "Abdulrahman Taher", url: SITE_URL }],
    alternates: {
      canonical: `/en/blogs/${slug}`,
      languages: { ar: `/blogs/${slug}`, en: `/en/blogs/${slug}` },
    },
    openGraph: {
      type: "article",
      url: articleUrl,
      siteName: "Abdulrahman Taher | Backend Engineer",
      title: article.titleEn,
      description: article.excerptEn,
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
      authors: [`${SITE_URL}/#person`],
      tags: article.keywords,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@abdotaher_dev",
      creator: "@abdotaher_dev",
      title: article.titleEn,
      description: article.excerptEn,
      images: [{ url: article.image, alt: article.titleEn }],
    },
  };
}

export default async function BlogPostPageEn({ params }: Props) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.id === slug);
  if (!article) notFound();

  // article is guaranteed non-null here after notFound() above
  const foundArticle = article!;

  return (
    <SiteShell initialLang="en">
      <JsonLd data={articleSchema(foundArticle, "en")} />
      <JsonLd data={baseSchema(`${SITE_URL}/en/blogs/${slug}`, foundArticle.titleEn, foundArticle.excerptEn)} />

      <div className="sr-only">
        <h1>{foundArticle.titleEn}</h1>
        <p>{foundArticle.excerptEn}</p>
        <p>
          Author: Abdulrahman Taher — Senior Backend Engineer, Cairo, Egypt.
          Published: {foundArticle.dateEn}.
        </p>
        <ul>{foundArticle.keywords.map((kw) => <li key={kw}>{kw}</li>)}</ul>
      </div>

      <BlogPostClient slug={slug} />
    </SiteShell>
  );
}
