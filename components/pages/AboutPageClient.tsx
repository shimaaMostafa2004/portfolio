"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { usePageContext } from "@/components/usePageContext";
import { translations } from "@/src/translations";

export function AboutPageClient() {
  const { lang, isAr, isDark } = usePageContext();
  const t = translations[lang];
  const prefix = isAr ? "" : "/en";

  return (
    <div className="space-y-10 sm:space-y-12 py-4 sm:py-6">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 px-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">{t.aboutLabel}</span>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
          {t.aboutTitle}
        </h1>
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {isAr ? "نبذة كاملة ومسار خبرة المهندس عبدالرحمن طاهر في تلبية الاحتياجات التقنية لدول الخليج"
                 : "Detailed briefing on Eng. Abdulrahman Taher's backend specialization profile."}
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">

        {/* Bio card */}
        <div className={`lg:col-span-7 rounded-2xl border p-5 sm:p-8 space-y-5 sm:space-y-6 ${
          isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"
        }`}>
          <h2 className={`text-lg sm:text-xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
            {isAr ? "أنا مهندس أنظمة باك-إند حريص على إنتاجية النظم واستقرارها"
                   : "Senior Systems Audit & Optimization Specialist"}
          </h2>
          <div className={`text-sm leading-relaxed space-y-3 sm:space-y-4 font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            <p>{t.aboutDesc1}</p>
            <p>{t.aboutDesc2}</p>
            <p>
              {isAr ? "بفضل عملي لسنوات مع عملاء وشركات في مصر والسعودية والإمارات والكويت، أفهم تماما متطلبات الحوسبة الإقليمية؛ مثل بوابات مدى المصرفية وحماية المدفوعات من الاختراق."
                     : "Having designed multiple enterprise SaaS platforms for startups in Egypt, Saudi Arabia, Dubai and Kuwait, I build backend pipelines aligned with regional regulations."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-4 border-t border-indigo-950/20">
            <Link href={`${prefix}/contact`}
              aria-label={isAr ? "تواصل لمناقشة مشروعك مع عبده طاهر" : "Contact Abdo Taher to discuss your backend project"}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-5 rounded-lg transition-colors shadow-sm">
              {isAr ? "ناقش مشروعك معي" : "Discuss Your Project"}
            </Link>
            <Link href={`${prefix}/projects`}
              aria-label={isAr ? "استعرض أعمال ومشاريع عبده طاهر" : "View Abdo Taher backend project portfolio"}
              className={`font-semibold text-xs py-2.5 px-5 rounded-lg border transition-all ${
                isDark ? "bg-[#13112a] border-indigo-950 text-indigo-400" : "bg-slate-100 border-slate-300 text-slate-700"
              }`}>
              {isAr ? "استعرض أعمالي السابقة" : "View Backend Projects"}
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">

          {/* Quick guide */}
          <div className={`rounded-2xl border p-5 sm:p-6 ${isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"}`}>
            <h3 className={`text-xs sm:text-sm font-mono font-bold uppercase tracking-widest mb-3 sm:mb-4 flex items-center gap-2 ${isDark ? "text-white" : "text-slate-800"}`}>
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
              {t.aboutGuideTitle}
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
              {[
                { title: t.aboutGuide1Title, desc: t.aboutGuide1Desc },
                { title: t.aboutGuide2Title, desc: t.aboutGuide2Desc },
                { title: t.aboutGuide3Title, desc: t.aboutGuide3Desc },
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2.5 sm:gap-3">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong className={`block text-xs sm:text-sm ${isDark ? "text-white" : "text-slate-800"}`}>{item.title}</strong>
                    <p className={`text-[11px] sm:text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Timeline */}
          <div className={`rounded-2xl border p-5 sm:p-6 ${isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"}`}>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 mb-3 sm:mb-4">
              {isAr ? "تلميحات وسنوات الخبرة" : "TECHNICAL CHRONOLOGY"}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { date: t.exp1Date, title: t.exp1Title, company: t.exp1Company },
                { date: t.exp2Date, title: t.exp2Title, company: t.exp2Company },
                { date: t.exp3Date, title: t.exp3Title, company: t.exp3Company },
              ].map((exp, idx) => (
                <div key={idx} className="border-l-2 border-indigo-950/40 pl-3 sm:pl-3.5 pt-0.5">
                  <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-900 px-2 py-0.5 rounded font-mono font-bold">{exp.date}</span>
                  <h4 className={`text-xs sm:text-sm font-bold font-space mt-1 sm:mt-1.5 ${isDark ? "text-white" : "text-slate-800"}`}>{exp.title}</h4>
                  <span className="text-xs text-slate-500 font-semibold">{exp.company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
