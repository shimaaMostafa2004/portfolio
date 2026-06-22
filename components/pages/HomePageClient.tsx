"use client";

import React from "react";
import Link from "next/link";
import {
  Rocket, MessageSquare, BookOpen, Check, Zap, Radio,
  Database, Code, Award, CheckCircle2, Cpu,
} from "lucide-react";
import { usePageContext } from "@/components/usePageContext";
import { translations } from "@/src/translations";
import { BottleneckEstimator } from "@/src/components/BottleneckEstimator";
import { InteractiveConsole } from "@/src/components/InteractiveConsole";

export function HomePageClient() {
  const { lang, theme, isAr, isDark } = usePageContext();
  const t = translations[lang];
  const prefix = isAr ? "" : "/en";

  const handleProfileError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80";
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-4 sm:py-6">

      {/* ── HERO ── */}
      <section className="flex flex-col items-center text-center gap-6 sm:gap-8 pt-4 sm:pt-6">

        {/* Avatar */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full filter blur-xl animate-pulse scale-105" />
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-500 relative z-10">
            <img
              src="https://abdotaher.me/image.png"
              alt="Abdulrahman Taher Laravel Backend Developer"
              width={128} height={128}
              className={`w-full h-full rounded-full object-cover border-2 ${isDark ? "border-[#0b0918] bg-slate-900" : "border-[#f8fafc] bg-white"}`}
              referrerPolicy="no-referrer"
              onError={handleProfileError}
            />
          </div>
          <div className="absolute bottom-0 right-0 sm:bottom-1 sm:right-2 bg-emerald-500 text-white font-mono font-bold text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full border-2 border-[#f8fafc] flex items-center gap-1 shadow-lg z-20">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>{isAr ? "متاح" : "ONLINE"}</span>
          </div>
        </div>

        {/* Heading block */}
        <div className="w-full max-w-3xl flex flex-col gap-3 sm:gap-4 px-2">
          <span className={`inline-flex self-center py-1 px-3 rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase border ${
            isDark ? "bg-indigo-950/60 border-indigo-800/40 text-indigo-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
          }`}>
            🚀 Senior Backend & Database Architect — GCC
          </span>

          <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight font-space ${
            isDark ? "text-white" : "text-slate-800"
          }`}>
            {t.heroTitle}
          </h1>

          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}>
            {t.heroSub}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-1 text-[11px] sm:text-xs font-bold">
            {[t.heroCheck1, t.heroCheck2, t.heroCheck3].map((c) => (
              <span key={c} className={`px-2.5 sm:px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                isDark ? "bg-[#13112a] border-indigo-950 text-slate-300" : "bg-white border-slate-200 text-slate-600"
              }`}>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500 shrink-0" />
                <span>{c}</span>
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
            <Link href={`${prefix}/contact`}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
              <Rocket className="w-4 h-4" />
              {t.heroCtaHire}
            </Link>
            <Link href={`${prefix}/blogs`}
              className={`font-bold text-xs py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                isDark ? "bg-[#13112a] border-indigo-950 text-indigo-400 hover:bg-slate-900" : "bg-white border-slate-200 text-indigo-600 hover:bg-slate-50"
              }`}>
              <BookOpen className="w-4 h-4 text-indigo-500" />
              {isAr ? "اقرأ المدونة" : "Read Blog"}
            </Link>
            <a href="https://wa.me/201008275881" target="_blank" rel="noopener noreferrer"
              className={`font-bold text-xs py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}>
              <MessageSquare className="w-4 h-4 text-indigo-500" />
              {t.contactDirectBtn}
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-5 w-full max-w-4xl mt-2 sm:mt-6 text-center">
          {[
            { val: t.heroStat1Val, desc: t.heroStat1Desc },
            { val: t.heroStat2Val, desc: t.heroStat2Desc },
            { val: t.heroStat3Val, desc: t.heroStat3Desc },
          ].map((stat, i) => (
            <div key={i} className={`p-4 sm:p-6 rounded-xl border ${isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-xs"}`}>
              <strong className="block text-2xl sm:text-3xl font-space font-extrabold text-indigo-500">{stat.val}</strong>
              <span className={`text-[10px] sm:text-[11px] mt-1 sm:mt-1.5 block font-mono uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
            🛡️ {isAr ? "الاعتمادات وموثوقية الطرف الثالث" : "VERIFIED ACCREDITATIONS"}
          </span>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
            {isAr ? "شهادات الكفاءة الهندسية المعتمدة" : "Verified Credentials & Trust Badges"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
          {[
            { icon: <Award className="w-5 h-5" />, colorBg: "bg-orange-500/10", colorText: "text-orange-500", colorBorder: "border-orange-500/25", badgeColor: "text-orange-400", title: "AWS DB SPECIALTY", badge: isAr ? "أخصائي قواعد بيانات AWS" : "Database Specialist", desc: isAr ? "معتمد لتخطيط وتأمين PostgreSQL و Aurora السحابية." : "Certified in optimizing sub-second query designs and failover replicas." },
            { icon: <CheckCircle2 className="w-5 h-5" />, colorBg: "bg-emerald-500/10", colorText: "text-emerald-500", colorBorder: "border-emerald-500/25", badgeColor: "text-emerald-400", title: "UPWORK TOP RATED PLUS", badge: isAr ? "النخبة الأعلى تقييماً 3%" : "Top 3% Technical Class", desc: isAr ? "ضمن أفضل الخبراء التقنيين بـ 100% نجاح." : "100% Job Success Score delivering enterprise software." },
            { icon: <Cpu className="w-5 h-5" />, colorBg: "bg-blue-500/10", colorText: "text-blue-500", colorBorder: "border-blue-500/25", badgeColor: "text-blue-400", title: "GCP PRO ARCHITECT", badge: isAr ? "مهندس معمارية سحابية Google" : "Professional Cloud Architect", desc: isAr ? "هيكلة الحاويات Docker ونظم الباك-اند المرنة." : "Container nodes, microservice boundaries, and hyper-scalable VPCs." },
          ].map((b, i) => (
            <div key={i} className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3 text-start transition-all ${
              isDark ? "bg-[#13112a]/90 border-indigo-950/70 hover:border-indigo-500/50" : "bg-white border-slate-200 shadow-xs hover:border-indigo-400"
            }`}>
              <div className={`p-2 sm:p-2.5 rounded-xl ${b.colorBg} ${b.colorText} border ${b.colorBorder} shrink-0`}>
                {b.icon}
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className={`text-[11px] sm:text-xs font-mono font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{b.title}</h3>
                <span className={`block text-[11px] font-bold ${b.badgeColor}`}>{b.badge}</span>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-bold leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH PILLARS ── */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">
            {isAr ? "الركائز التقنية والمكدس البرمجي" : "ARCHITECTURAL TOOL STACK"}
          </span>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
            {isAr ? "التقنيات والنظم المفضلة للإنتاج" : "Production-Tested Tooling & Frameworks"}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {[
            { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />, titleAr: "بناء المعمارية", titleEn: "Core Architecture", descAr: "هندسة الميدلوير وحقن الاعتمادات ومعمارية نظيفة قابلة للنمو.", descEn: "Middleware engineering, dependency injection, and scalable MVC architectures." },
            { icon: <Database className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />, titleAr: "قاعدة بيانات PostgreSQL", titleEn: "PostgreSQL & Indexing", descAr: "تحسين الاستعلامات المعقدة وتقسيم الجداول ومراجعة خطط التنفيذ.", descEn: "Subquery tuning, table partitions, composite indexes, and EXPLAIN ANALYZE." },
            { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />, titleAr: "ذاكرة كاش Redis", titleEn: "Redis Cache Sentinel", descAr: "التخزين المؤقت للبيانات الساخنة وصمام أمان طلبات الـ API.", descEn: "In-memory data structures, cache locks, and rate limiters." },
            { icon: <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />, titleAr: "الكيوهات وبول-ريديس", titleEn: "Queue Horizon Workers", descAr: "معالجة المهام الثقيلة في الخلفية لتفادي فترات الانتظار.", descEn: "Async queue processing, transactional mail sends, and cron pipelines." },
          ].map((pillar, i) => (
            <div key={i} className={`p-4 sm:p-5 rounded-xl border flex flex-col transition-all hover:scale-[1.02] ${
              isDark ? "bg-[#13112a] border-indigo-950/60 hover:border-indigo-500/50" : "bg-white border-slate-200 hover:shadow-lg"
            }`}>
              <span className={`p-2 sm:p-2.5 rounded-lg border inline-flex mb-2.5 sm:mb-3.5 w-fit ${
                isDark ? "bg-indigo-950/40 border-indigo-800/20" : "bg-indigo-50 border-indigo-100"
              }`}>
                {pillar.icon}
              </span>
              <h3 className={`text-xs sm:text-sm font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                {isAr ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className={`text-[11px] sm:text-xs mt-1.5 sm:mt-2 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {isAr ? pillar.descAr : pillar.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE CONSOLE ── */}
      <section className="space-y-5 sm:space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">
            {isAr ? "مختبر معالجة الأكواد الفوري" : "Live Architecture Testing Ground"}
          </span>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
            {isAr ? "اختبر كفاءة وسرعة الباك-إند والـ APIs" : "Live Benchmarking of Backend Services"}
          </h2>
        </div>
        <div className="w-full overflow-hidden">
          <InteractiveConsole isAr={isAr} isDark={isDark} />
        </div>
      </section>

      {/* ── BOTTLENECK ESTIMATOR ── */}
      <section className="space-y-5 sm:space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">SYSTEM BOTTLENECK FINDER</span>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
            {isAr ? "افحص أداء الباك-إند وقاعدة البيانات بنفسك" : "Audit Your API and Database Stress Limits"}
          </h2>
        </div>
        <BottleneckEstimator t={t} isAr={isAr} theme={theme} />
      </section>

      {/* ── TRUST CARDS ── */}
      <section className="space-y-6 sm:space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">{t.trustLabel}</span>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>{t.trustTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { num: "01", cap: "STRUCTURAL CAPABILITY", title: t.trustCard1Title, desc: t.trustCard1Desc, footer: "Enterprise Performance Standard" },
            { num: "02", cap: "CO-OPERATION INTEGRITY", title: t.trustCard2Title, desc: t.trustCard2Desc, footer: "Agile Deliveries & Metrics" },
            { num: "03", cap: "CO-PILOT ADVISORY", title: t.trustCard3Title, desc: t.trustCard3Desc, footer: "Business Alignment Blueprint" },
          ].map((card, i) => (
            <div key={i} className={`p-5 sm:p-6 rounded-xl border flex flex-col justify-between min-h-[200px] sm:min-h-[230px] ${
              isDark ? "bg-[#13112a] border-indigo-950/70" : "bg-white border-slate-200 shadow-xs"
            }`}>
              <div>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-indigo-500">{card.num} // {card.cap}</span>
                <h3 className={`text-base sm:text-lg font-bold font-space mt-2 ${isDark ? "text-white" : "text-slate-800"}`}>{card.title}</h3>
                <p className={`text-xs sm:text-sm mt-2 sm:mt-3 font-medium leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>"{card.desc}"</p>
              </div>
              <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold border-t border-indigo-950/20 pt-2.5 mt-3">{card.footer}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className={`p-6 sm:p-8 rounded-2xl border text-center ${
        isDark ? "bg-[#13112a]/40 border-indigo-950/80" : "bg-indigo-50/20 border-indigo-100 shadow-xs"
      }`}>
        <h2 className={`text-lg sm:text-xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
          {isAr ? "هل تبحث عن مهندس متمكن يسرّع تسليم البرمجيات؟" : "Need to secure databases and prevent checkout bottlenecks?"}
        </h2>
        <p className={`text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          {isAr ? "أعمل بنموذج خطة عمل هندسية واضحة لتأمين الاستفسارات وتوسيع السيرفرات وقواعد البيانات." : "Deploy clean, production-certified scalable microservice architectures and financial ledger webhooks."}
        </p>
        <div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-3 mt-5 sm:mt-6">
          <Link href={`${prefix}/contact`} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-6 rounded-xl border border-indigo-500/10 transition-colors shadow-sm text-center">
            {t.contactFormSubmit}
          </Link>
          <Link href={`${prefix}/services`} className={`font-bold text-xs py-3 px-6 rounded-xl border transition-all text-center ${
            isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}>
            {isAr ? "استعرض الخدمات" : "View Services"}
          </Link>
        </div>
      </section>
    </div>
  );
}
