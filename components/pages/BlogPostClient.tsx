"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePageContext } from "@/components/usePageContext";
import { blogArticles } from "@/src/data/blogs";
import { translations } from "@/src/translations";

interface Props { slug: string; }

export function BlogPostClient({ slug }: Props) {
  const { lang, isAr, isDark } = usePageContext();
  const t = translations[lang];
  const prefix = isAr ? "" : "/en";

  const article = blogArticles.find((a) => a.id === slug);
  if (!article) return null;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6 sm:space-y-8 py-4 sm:py-6"
    >
      {/* Back link */}
      <Link href={`${prefix}/blogs`}
        className={`inline-flex items-center gap-2 text-xs font-bold font-mono py-2 px-3.5 sm:px-4 rounded-xl border transition-all ${
          isDark ? "bg-[#13112a] border-indigo-950 text-indigo-400 hover:text-white"
                 : "bg-white border-slate-200 text-indigo-600 hover:text-indigo-800"
        }`}>
        {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{isAr ? "رجوع للمدونة" : "Back to Blog"}</span>
      </Link>

      {/* Hero image */}
      <div className="relative h-[200px] sm:h-[320px] md:h-[400px] w-full rounded-xl sm:rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={isAr ? article.titleAr : article.titleEn}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={handleImgError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1.5 sm:space-y-2">
          <span className="text-[10px] sm:text-xs uppercase bg-indigo-600 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-mono font-bold tracking-widest text-indigo-200">
            {article.category.toUpperCase()}
          </span>
          <h1 className="text-lg sm:text-2xl md:text-4xl font-extrabold tracking-tight font-space leading-tight">
            {isAr ? article.titleAr : article.titleEn}
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-slate-300">
            <span>✍️ {isAr ? article.authorAr : article.authorEn}</span>
            <span className="hidden xs:inline">•</span>
            <span>📅 {isAr ? article.dateAr : article.dateEn}</span>
            <span className="hidden xs:inline">•</span>
            <span>⏱️ {isAr ? article.readTimeAr : article.readTimeEn}</span>
          </div>
        </div>
      </div>

      {/* Body + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

        {/* Article body */}
        <div className={`lg:col-span-8 p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border leading-relaxed text-sm space-y-4 sm:space-y-6 ${
          isDark ? "bg-[#13112a] border-indigo-950/60 text-slate-200" : "bg-white border-slate-200 text-slate-700 shadow-sm"
        }`}>
          <div
            className="prose prose-sm sm:prose-base prose-indigo dark:prose-invert max-w-none blog-body"
            dangerouslySetInnerHTML={{ __html: isAr ? article.contentAr : article.contentEn }}
          />

          {/* In-article CTA */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-indigo-950/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div>
              <h3 className="text-sm font-bold font-space text-indigo-400">
                {isAr ? "هل تواجه نفس هذه المشكلات في مشروعك؟" : "Facing this bottleneck in your codebase?"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {isAr ? "المهندس عبدالرحمن جاهز لتقديم مراجعة كود مجانية." : "Book an advisory audit session directly."}
              </p>
            </div>
            <Link href={`${prefix}/contact`}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-5 rounded-lg transition-colors shrink-0 self-start sm:self-auto">
              {t.contactFormSubmit}
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">

          {/* Keywords */}
          <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"}`}>
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-2.5 sm:mb-3">
              Keywords & SEO Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {article.keywords.map((kw) => (
                <span key={kw} className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded font-mono font-bold ${
                  isDark ? "bg-indigo-950/50 border border-indigo-900/40 text-indigo-400"
                         : "bg-indigo-50 border border-indigo-100 text-indigo-600"
                }`}>
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Standards */}
          <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"}`}>
            <h3 className="text-xs font-mono font-bold uppercase text-indigo-400 mb-2 sm:mb-2.5">Technical Standards Met</h3>
            <ul className="text-xs space-y-1.5 sm:space-y-2 font-mono text-slate-400 font-bold">
              <li>✔️ GCC payment gate check</li>
              <li>✔️ Web security standards compliance</li>
              <li>✔️ ACID transaction isolation level</li>
              <li>✔️ Compound SQL indexing</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
