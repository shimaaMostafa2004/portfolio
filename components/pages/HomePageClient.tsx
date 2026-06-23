"use client";

import React from "react";
import Link from "next/link";
import {
  Rocket, MessageSquare, BookOpen, Check, Zap, Radio,
  Database, Code, Award, CheckCircle2, Cpu, Share2,
} from "lucide-react";
import { usePageContext } from "@/components/usePageContext";
import { translations } from "@/src/translations";
import { BottleneckEstimator } from "@/src/components/BottleneckEstimator";
import { InteractiveConsole } from "@/src/components/InteractiveConsole";

/* ── Brand SVG icons for share buttons ── */
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);
/* ─────────────────────────────────────── */

export function HomePageClient() {
  const { lang, theme, isAr, isDark } = usePageContext();
  const t = translations[lang];
  const prefix = isAr ? "" : "/en";

  const handleProfileError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/profile.jpg";
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
              src="/profile.jpg"
              alt="Abdo Taher — Software Engineer & Full Stack Developer"
              width={128} height={128}
              className={`w-full h-full rounded-full object-cover border-2 ${isDark ? "border-[#0b0918] bg-slate-900" : "border-[#f8fafc] bg-white"}`}
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
            🚀 Backend Engineer — Laravel · NestJS · Database
          </span>

          <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight font-space ${
            isDark ? "text-white" : "text-slate-800"
          }`}>
            {t.heroTitle}
          </h1>

          {/* Intro paragraph — directly under H1 */}
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}>
            {isAr
              ? "مهندس باك-إند من مصر — أبني أنظمة باك-إند قابلة للتوسع وفائقة الأداء باستخدام Laravel وNestJS وقواعد البيانات وواجهات REST APIs لشركات وتطبيقات رقمية حول العالم."
              : "Backend Engineer from Egypt — building scalable, performance-driven backend systems and databases using Laravel, NestJS, Node.js, and REST API architecture."}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-1 text-[11px] sm:text-xs">
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
              aria-label={isAr ? "وظفني الآن — ابدأ مشروعك" : "Hire me now — start your backend project"}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-5 sm:py-3.5 sm:px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
              <Rocket className="w-4 h-4" />
              {t.heroCtaHire}
            </Link>
            <Link href={`${prefix}/blogs`}
              aria-label={isAr ? "اقرأ مدونة الباك-إند والهندسة" : "Read backend engineering articles on the blog"}
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

      {/* ── SOCIAL SHARE ── */}
      <section className="flex flex-wrap justify-center gap-2 sm:gap-3 -mt-4">
        <span className={`self-center text-[11px] font-mono uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          <Share2 className="w-3 h-3 inline mr-1" />
          {isAr ? "شارك المعرض" : "Share Portfolio"}
        </span>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fabdotaher.me"
          target="_blank" rel="noopener noreferrer"
        aria-label="Share Abdo Taher portfolio on LinkedIn"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
            isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:border-blue-500/50 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:border-blue-400"
          }`}>
          <LinkedInIcon className="w-3 h-3 text-[#0A66C2]" />
          {isAr ? "شارك على LinkedIn" : "Share on LinkedIn"}
        </a>
        <a href="https://x.com/intent/tweet?text=Abdo%20Taher%20%E2%80%94%20Software%20Engineer%20%26%20Full%20Stack%20Developer%20%E2%80%94%20https%3A%2F%2Fabdotaher.me"
          target="_blank" rel="noopener noreferrer"
          aria-label="Share Abdo Taher portfolio on X Twitter"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
            isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:border-white/30 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
          }`}>
          <XIcon className="w-3 h-3" />
          {isAr ? "شارك على X" : "Share on X"}
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fabdotaher.me"
          target="_blank" rel="noopener noreferrer"
          aria-label="Share Abdo Taher portfolio on Facebook"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
            isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:border-blue-600/50 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:border-blue-500"
          }`}>
          <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#1877F2]" fill="currentColor" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          {isAr ? "شارك على Facebook" : "Share on Facebook"}
        </a>
        <a href="https://wa.me/?text=Abdo%20Taher%20%E2%80%94%20Software%20Engineer%20%26%20Full%20Stack%20Developer%20%E2%80%94%20https%3A%2F%2Fabdotaher.me"
          target="_blank" rel="noopener noreferrer"
          aria-label="Share Abdo Taher portfolio on WhatsApp"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
            isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:border-emerald-500/50 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:border-emerald-400"
          }`}>
          <MessageSquare className="w-3 h-3 text-emerald-500" />
          {isAr ? "شارك على WhatsApp" : "Share on WhatsApp"}
        </a>
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
            { icon: <Award className="w-5 h-5" />, colorBg: "bg-orange-500/10", colorText: "text-orange-500", colorBorder: "border-orange-500/25", badgeColor: "text-orange-400", title: "AWS DB SPECIALTY", badge: isAr ? "أخصائي قواعد بيانات AWS" : "Database Specialist", desc: isAr ? "معتمد لتخطيط وتأمين Database و Aurora السحابية." : "Certified in optimizing sub-second query designs and failover replicas." },
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
                <p className={`text-[11px] sm:text-xs font-mono font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{b.title}</p>
                <span className={`block text-[11px] font-bold ${b.badgeColor}`}>{b.badge}</span>
                <p className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed">{b.desc}</p>
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
            {isAr ? "الخبرات التقنية — المكدس البرمجي للإنتاج" : "Technical Expertise — Production Stack"}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {[
            { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />, titleAr: "بناء المعمارية", titleEn: "Core Architecture", descAr: "بناء أنظمة باك-إند بـ Laravel وNestJS بمعمارية نظيفة وحقن الاعتمادات ومبادئ SOLID.", descEn: "Laravel & NestJS backend systems with clean architecture, dependency injection, and SOLID principles." },
            { icon: <Database className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />, titleAr: "قواعد البيانات والـ API", titleEn: "Databases & APIs", descAr: "تصميم قواعد بيانات وبناء REST APIs مع تحسين الاستعلامات والفهرسة وConnection Pooling.", descEn: "Database design, REST APIs, query optimization, composite indexes, and connection pooling." },
            { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />, titleAr: "الأداء والكاش", titleEn: "Performance & Caching", descAr: "تحسين أداء التطبيقات باستخدام Redis للكاش وطوابير المهام وتقليل زمن استجابة الـ API.", descEn: "Redis caching, queue workers, API response optimization, and server performance tuning." },
            { icon: <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />, titleAr: "السحابة والـ DevOps", titleEn: "Cloud & DevOps", descAr: "نشر التطبيقات على AWS باستخدام Docker وCI/CD وGitHub Actions.", descEn: "AWS deployment, Docker, CI/CD pipelines, and GitHub Actions for automated delivery." },
          ].map((pillar, i) => (
            <div key={i} className={`p-4 sm:p-5 rounded-xl border flex flex-col transition-all hover:scale-[1.02] ${
              isDark ? "bg-[#13112a] border-indigo-950/60 hover:border-indigo-500/50" : "bg-white border-slate-200 hover:shadow-lg"
            }`}>
              <span className={`p-2 sm:p-2.5 rounded-lg border inline-flex mb-2.5 sm:mb-3.5 w-fit ${
                isDark ? "bg-indigo-950/40 border-indigo-800/20" : "bg-indigo-50 border-indigo-100"
              }`}>
                {pillar.icon}
              </span>
              <p className={`text-xs sm:text-sm font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                {isAr ? pillar.titleAr : pillar.titleEn}
              </p>
              <p className={`text-[11px] sm:text-xs mt-1.5 sm:mt-2 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {isAr ? pillar.descAr : pillar.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE CONSOLE + BOTTLENECK ── */}
      <section className="space-y-8 sm:space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">
            {isAr ? "اختبر الأداء بنفسك" : "Live Performance Testing"}
          </span>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
            {isAr ? "اختبر كفاءة وسرعة تطبيقاتك وواجهاتك البرمجية" : "Test Your Web Application & API Performance"}
          </h2>
        </div>
        <div className="w-full overflow-hidden">
          <InteractiveConsole isAr={isAr} isDark={isDark} />
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
                <span className="font-mono text-[10px] sm:text-xs font-bold text-indigo-500">{card.num} {"//"} {card.cap}</span>
                <p className={`text-base sm:text-lg font-bold font-space mt-2 ${isDark ? "text-white" : "text-slate-800"}`}>{card.title}</p>
                <p className={`text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>"{card.desc}"</p>
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
        <p className={`text-lg sm:text-xl font-extrabold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
          {isAr ? "هل تبحث عن مهندس باك-إند يبني أنظمة قابلة للتوسع وفائقة الأداء؟" : "Need scalable, performance-driven backend systems and databases for your product?"}
        </p>
        <p className={`text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          {isAr ? "أبني منصات SaaS وأنظمة مؤسسية وواجهات REST APIs قابلة للتوسع بـ Laravel وNestJS وقواعد البيانات." : "Building scalable SaaS platforms, enterprise backends, and high-performance REST APIs with Laravel, NestJS, and database optimization."}
        </p>
        <div className="flex flex-col xs:flex-row justify-center gap-2 sm:gap-3 mt-5 sm:mt-6">
          <Link href={`${prefix}/contact`} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-6 rounded-xl border border-indigo-500/10 transition-colors shadow-sm text-center">
            {isAr ? "اطلب بناء API قابل للتوسع" : "Request Scalable Backend Development"}
          </Link>
          <Link href={`${prefix}/services`} className={`text-xs py-3 px-6 rounded-xl border transition-all text-center ${
            isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}>
            {isAr ? "تعرّف على خدماتي" : "Explore Backend Services"}
          </Link>
        </div>
      </section>

      {/* ── SEO CONTENT SECTION ── */}
      <section className={`rounded-2xl border p-6 sm:p-10 space-y-8 text-start ${
        isDark ? "bg-[#0f0d24]/60 border-indigo-950/40" : "bg-white border-slate-200 shadow-xs"
      }`} aria-label={isAr ? "نبذة تفصيلية عن عبدالرحمن طاهر" : "About Abdulrahman Taher"}>

        {isAr ? (
          <div className="space-y-7" dir="rtl">

            <div className="space-y-2">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-space tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                من أنا
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                عبده طاهر — مهندس باك-إند متخصص في بناء أنظمة باك-إند قابلة للتوسع باستخدام Laravel وNestJS وقواعد البيانات وREST APIs. يبني منصات SaaS وتطبيقات مؤسسية وأنظمة دفع متكاملة بمعمارية نظيفة تعتمد SOLID وClean Architecture.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-space tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                الخدمات
              </h2>
              <div className="space-y-3">
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>تطوير Laravel وNestJS وبناء REST APIs</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    تصميم وبناء واجهات برمجية REST API مؤمَّنة بـ Laravel وNestJS بمعمارية نظيفة تعتمد مبادئ SOLID وClean Architecture، قابلة للتوسعة وتدعم بيئات الإنتاج بدون اختناقات.
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>تحسين أداء قواعد البيانات</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    تحليل خطط التنفيذ بـ EXPLAIN ANALYZE، وبناء فهارس مركّبة، وتقسيم الجداول الضخمة، وإعداد Connection Pooling للحصول على أداء قاعدة بيانات مثالي.
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>تكامل بوابات الدفع</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    تكامل Mada وMoyasar وTap Payments وPaymob وStripe مع تطبيق Webhook Verification وIdempotency Keys ومنع الخصم المزدوج.
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>الأنظمة السحابية والميكروسيرفيس</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    تصميم أنظمة سحابية بـ Docker وAWS مع NestJS لتطبيقات تتطلب استجابة فورية وقابلية توسع أفقي.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-space tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                لماذا تختارني
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                نتائج موثقة: تقليص زمن استجابة الـ API بنسبة تصل إلى 40%، خفض تكاليف الخادم، وتسريع دورة التطوير. أعمل عن بُعد مع فرق وعملاء حول العالم بتواصل منتظم وتوثيق كامل.
              </p>
              <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                <Link href="/contact" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">احجز استشارة مجانية</Link>
                {" · "}
                <Link href="/about" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">مساري المهني وخبراتي</Link>
                {" · "}
                <Link href="/services" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">خدمات Laravel وNestJS وقواعد البيانات</Link>
                {" · "}
                <Link href="/projects" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">مشاريع وأنظمة باك-إند منجزة</Link>
              </p>
            </div>

          </div>
        ) : (
          <div className="space-y-7" dir="ltr">

            <div className="space-y-2">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-space tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                About Abdo Taher
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Abdo Taher is a Backend Engineer from Cairo, Egypt with deep expertise in Laravel, NestJS, Node.js, and database architecture. He builds scalable REST APIs, SaaS platforms, and enterprise backend systems with clean architecture and a focus on performance, reliability, and developer experience.
              </p>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Abdo Taher is a Software Engineer specializing in Laravel, NestJS, Node.js, REST APIs, database design, cloud deployment, and modern backend development. He builds scalable SaaS platforms, enterprise applications, and high-performance systems with a strong focus on software architecture and clean code.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-space tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                Services
              </h2>
              <div className="space-y-3">
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>Laravel & NestJS — REST API Development</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>Scalable, secure REST APIs built with Laravel and NestJS — clean architecture, SOLID principles, production-ready for 10K+ concurrent users.</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>Database Performance Tuning</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>EXPLAIN ANALYZE, composite indexes, table partitioning, and connection pooling to eliminate slow queries and cut server costs.</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>Payment Gateway Integration</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>Mada, Moyasar, Tap Payments, Paymob, and Stripe — secured with Webhook Verification, Idempotency Keys, and double-charge prevention.</p>
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-indigo-300" : "text-indigo-700"} mb-0.5`}>Cloud Architecture & DevOps</p>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>Docker, AWS, CI/CD pipelines, Redis caching, and queue workers — full deployment setup for production backend systems.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-space tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                Why Choose Abdo Taher
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                <Link href="/en/contact" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">Book a free backend consultation</Link>
                {" · "}
                <Link href="/en/about" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">Abdo Taher — background & experience</Link>
                {" · "}
                <Link href="/en/services" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">Laravel & NestJS backend services</Link>
                {" · "}
                <Link href="/en/projects" className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2">Scalable backend project portfolio</Link>
              </p>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}
