"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePageContext } from "@/components/usePageContext";
import { translations, sampleProjects } from "@/src/translations";
import { ProjectCard } from "@/src/components/ProjectCard";

type Filter = "All" | "Backend" | "DB" | "Cloud";

export function ProjectsPageClient() {
  const { lang, theme, isAr, isDark } = usePageContext();
  const t = translations[lang];
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? sampleProjects
      : sampleProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="space-y-10 sm:space-y-12 py-4 sm:py-6">

      {/* Header + filters */}
      <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">{t.projectsLabel}</span>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
            {isAr ? "دراسات حالة فنية وحلول برمجية" : "Technical Case Studies & Scaled Solutions"}
          </h1>
          <p className={`text-xs sm:text-sm max-w-lg font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            {t.projectsSub}
          </p>
        </div>

        {/* Filter buttons — scrollable on xs */}
        <div className={`flex p-1 rounded-xl border overflow-x-auto gap-0.5 shrink-0 ${isDark ? "bg-slate-900/60 border-indigo-950" : "bg-slate-100 border-slate-200"}`}>
          {([
            { id: "All",     label: t.projectsFilterAll },
            { id: "Backend", label: t.projectsFilterBackend },
            { id: "DB",      label: t.projectsFilterDB },
            { id: "Cloud",   label: t.projectsFilterCloud },
          ] as { id: Filter; label: string }[]).map((btn) => (
            <button key={btn.id} onClick={() => setActiveFilter(btn.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                activeFilter === btn.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
              }`}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} t={t} isAr={isAr} theme={theme} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Footer note */}
      <div className={`p-5 sm:p-8 rounded-xl border text-center ${isDark ? "bg-slate-950/40 border-indigo-950/70" : "bg-slate-50 border-slate-200"}`}>
        <p className="text-xs text-slate-500 font-semibold flex flex-wrap items-center justify-center gap-1.5">
          <span>{t.projectsMore}</span>
          <a href="https://wa.me/201008275881" className="text-indigo-500 hover:underline">
            {isAr ? "دليل بناء سيستم لفرق من حول العالم" : "Backend Architecture Guide — Laravel & NestJS"}
          </a>
        </p>
      </div>
    </div>
  );
}
