import React from "react";
import { Project, TranslationDict } from "../types";
import { motion } from "motion/react";
import { Server, Database, CloudLightning, ArrowUpRight, Cpu } from "lucide-react";

interface Props {
  project: Project;
  t: TranslationDict;
  isAr: boolean;
  theme: "light" | "dark";
}

export const ProjectCard: React.FC<Props> = ({ project, t, isAr, theme }) => {
  const isBackend = project.category === "Backend";
  const isDB = project.category === "DB";
  const isDark = theme === "dark";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all group relative overflow-hidden ${
        isDark
          ? "bg-[#13112a] border border-indigo-950/60 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:border-indigo-500/40"
          : "bg-white border border-slate-200 text-slate-700 shadow-md hover:border-indigo-500/30 hover:shadow-lg"
      }`}
    >
      {/* Decorative Accent Background */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full filter blur-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
        isDark ? "bg-indigo-500/10" : "bg-indigo-500/5"
      }`} />

      <div>
        {/* Category Badge & Icon */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className={`p-2 rounded-lg border ${
              isDark
                ? "bg-indigo-950/50 border-indigo-800/40 text-indigo-400"
                : "bg-indigo-50 border-indigo-100 text-indigo-600"
            }`}>
              {isBackend ? (
                <Server className="w-4 h-4" />
              ) : isDB ? (
                <Database className="w-4 h-4" />
              ) : (
                <CloudLightning className="w-4 h-4" />
              )}
            </span>
            <span className={`text-[11px] font-mono uppercase tracking-widest font-semibold px-3.5 py-1 rounded-full border ${
              isDark
                ? "bg-slate-900 border-indigo-950/80 text-slate-300"
                : "bg-slate-100 border-slate-200 text-slate-600"
            }`}>
              {isBackend ? t.projectsFilterBackend : isDB ? t.projectsFilterDB : t.projectsFilterCloud}
            </span>
          </div>
          
          {/* Accent Metric Flag */}
          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border ${
            isDark
              ? "text-indigo-350 bg-indigo-950/60 border-indigo-800/40"
              : "text-indigo-600 bg-indigo-50 border-indigo-100"
          }`}>
            {isAr ? project.metricsAr : project.metricsEn}
          </span>
        </div>

        {/* Project Title */}
        <h4 className={`text-lg sm:text-xl font-bold tracking-tight leading-snug font-space group-hover:text-indigo-500 transition-colors ${
          isDark ? "text-white" : "text-slate-800"
        }`}>
          {isAr ? project.titleAr : project.titleEn}
        </h4>

        {/* Problem Sector */}
        <div className="mt-5 space-y-4 text-sm leading-relaxed">
          <div className={`p-4 rounded-lg border ${
            isDark
              ? "bg-rose-950/15 border-rose-900/30"
              : "bg-rose-50/40 border-rose-100"
          }`}>
            <strong className={`block text-xs font-mono uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-bold ${
              isDark ? "text-rose-400" : "text-rose-750"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-rose-400 animate-pulse" : "bg-rose-500"}`} />
              {t.projectsProblem}
            </strong>
            <p className={`leading-relaxed text-[13.5px] ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {isAr ? project.problemAr : project.problemEn}
            </p>
          </div>

          {/* Solution Sector */}
          <div className={`p-4 rounded-lg border ${
            isDark
              ? "bg-indigo-950/15 border-indigo-900/30"
              : "bg-[#f0f4ff]/50 border-slate-200/60"
          }`}>
            <strong className={`block text-xs font-mono uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-bold ${
              isDark ? "text-indigo-400" : "text-indigo-750"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              {t.projectsSolution}
            </strong>
            <p className={`leading-relaxed text-[13.5px] ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              {isAr ? project.solutionAr : project.solutionEn}
            </p>
          </div>

          {/* Result Sector */}
          <div className={`p-4 rounded-lg border ${
            isDark
              ? "bg-emerald-950/15 border-emerald-900/30"
              : "bg-emerald-50/40 border-emerald-100"
          }`}>
            <strong className={`block text-xs font-mono uppercase tracking-wider mb-1.5 flex items-center gap-1.5 font-bold ${
              isDark ? "text-emerald-400" : "text-emerald-750"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {t.projectsResult}
            </strong>
            <p className={`leading-relaxed text-[13.5px] font-semibold ${isDark ? "text-emerald-300" : "text-emerald-800"}`}>
              {isAr ? project.resultAr : project.resultEn}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Footer Detail */}
      <div className={`mt-6 pt-4 border-t flex justify-between items-center text-xs font-mono ${
        isDark ? "border-slate-900/80 text-slate-500" : "border-slate-100 text-slate-500"
      }`}>
        <span className="flex items-center gap-2">
          <Cpu className={`w-3.5 h-3.5 ${isDark ? "text-indigo-400" : "text-indigo-500"}`} />
          <span>PRODUCTION-PROVEN</span>
        </span>
        <span className={`opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex items-center gap-1 font-bold ${
          isDark ? "text-indigo-400" : "text-indigo-600"
        }`}>
          <span>{isAr ? "نظام فعال" : "ONLINE"}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
};
export default ProjectCard;
