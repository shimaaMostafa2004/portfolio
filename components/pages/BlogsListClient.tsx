"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, Bookmark } from "lucide-react";
import { usePageContext } from "@/components/usePageContext";
import { blogArticles } from "@/src/data/blogs";

type Category = "all" | "backend" | "database" | "scaling" | "seo" | "business";

export function BlogsListClient() {
  const { isAr, isDark } = usePageContext();
  const prefix = isAr ? "" : "/en";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");

  const filtered = blogArticles.filter((b) => {
    const title  = isAr ? b.titleAr  : b.titleEn;
    const excerpt = isAr ? b.excerptAr : b.excerptEn;
    const kwMatch = b.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()));
    const matchSearch = title.toLowerCase().includes(search.toLowerCase())
      || excerpt.toLowerCase().includes(search.toLowerCase()) || kwMatch;
    const matchCat = category === "all" || b.category === category;
    return matchSearch && matchCat;
  });

  const cats = [
    { id: "all",      lAr: "الكل",               lEn: "All" },
    { id: "business", lAr: "البيزنس",            lEn: "Business" },
    { id: "backend",  lAr: "الباك إند",           lEn: "Backend" },
    { id: "database", lAr: "قواعد البيانات",      lEn: "Database" },
    { id: "scaling",  lAr: "التوسيع",             lEn: "Scaling" },
    { id: "seo",      lAr: "السيو",               lEn: "SEO" },
  ];

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div className="space-y-8 sm:space-y-12 py-4 sm:py-6">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 px-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">
          {isAr ? "مقالات برمجية وهندسية" : "Technical Backend Articles"}
        </span>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
          {isAr ? "مدونة الباك-إند — Laravel وNestJS وهندسة الأنظمة" : "Backend Engineering Blog — Laravel, NestJS & System Design"}
        </h1>
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {isAr ? "مقالات فنية معمقة في Laravel وNestJS وقواعد البيانات وهندسة الأنظمة وتحسين الأداء."
                 : "In-depth articles on Laravel, NestJS, Node.js, database optimization, REST APIs, and scalable backend architecture."}
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 sm:gap-4">

        {/* Search input — full width on mobile */}
        <div className={`relative w-full rounded-xl border ${isDark ? "bg-slate-900/60 border-indigo-950" : "bg-slate-100 border-slate-200"}`}>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isAr ? "ابحث عن المقالات أو التقنيات..." : "Search articles..."}
            className="w-full pl-10 pr-4 py-3 bg-transparent text-sm placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Category filters — horizontally scrollable on mobile */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {cats.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id as Category)}
              className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                category === c.id ? "bg-indigo-600 text-white"
                  : isDark ? "bg-slate-900/60 border border-indigo-950/40 text-slate-400 hover:text-white"
                            : "bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800"
              }`}>
              {isAr ? c.lAr : c.lEn}
            </button>
          ))}
        </div>
      </div>

      {/* Blog grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 sm:py-14">
          <p className="text-slate-500 text-sm">{isAr ? "لا توجد مقالات تطابق البحث حالياً." : "No posts match current filters."}</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((article, idx) => (
              <motion.article
                layout key={article.id}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: Math.min(idx * 0.04, 0.2) }}
                className={`rounded-2xl border overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 hover:shadow-[0_16px_30px_-8px_rgba(99,102,241,0.22)] transition-all duration-300 ${
                  isDark ? "bg-[#13112a] border-indigo-950/60 shadow-lg hover:border-indigo-500/40"
                         : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {/* Thumbnail */}
                <div className="h-40 sm:h-44 overflow-hidden relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={isAr ? article.titleAr : article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={handleImgError}
                  />
                  <div className="absolute top-2 right-2 bg-indigo-900/90 border border-indigo-700/30 text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                    {article.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
                  <div className="flex justify-between items-center text-[10px] sm:text-[10.5px] font-mono text-slate-500">
                    <span>📅 {isAr ? article.dateAr : article.dateEn}</span>
                    <span>⏱️ {isAr ? article.readTimeAr : article.readTimeEn}</span>
                  </div>
                  <h2 className={`text-sm sm:text-base font-bold leading-snug group-hover:text-indigo-400 font-space transition-colors ${isDark ? "text-white" : "text-slate-800"}`}>
                    {isAr ? article.titleAr : article.titleEn}
                  </h2>
                  <p className={`text-[11px] sm:text-xs leading-relaxed font-medium line-clamp-3 flex-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    {isAr ? article.excerptAr : article.excerptEn}
                  </p>
                </div>

                {/* Footer */}
                <div className={`px-4 sm:px-5 py-3 border-t flex justify-between items-center text-xs font-mono ${isDark ? "border-indigo-950/50" : "border-slate-100"}`}>
                  <Link href={`${prefix}/blogs/${article.id}`}
                    className={`font-bold transition-all ${isDark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"}`}>
                    {isAr ? "اقرأ المقال ←" : "Read full →"}
                  </Link>
                  <Bookmark className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
