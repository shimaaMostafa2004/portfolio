"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Terminal, Sun, Moon, Smartphone,
  Radio, Menu, X,
} from "lucide-react";
import { translations } from "@/src/translations";
import { CyberFingersBackground } from "@/src/components/CyberFingersBackground";

/* ── Brand SVG icons ─────────────────────────────────────────────── */
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" aria-label="LinkedIn">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" aria-label="GitHub">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" aria-label="X (Twitter)">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);
/* ─────────────────────────────────────────────────────────────────── */

const isBrowser = typeof window !== "undefined";

interface Props {
  children: React.ReactNode;
  initialLang?: "ar" | "en";
}

export function SiteShell({ children, initialLang = "ar" }: Props) {
  const pathname = usePathname();
  const isEnPath = pathname.startsWith("/en");

  const [lang, setLang] = useState<"ar" | "en">(initialLang);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (!isBrowser) return "dark";
    const saved = localStorage.getItem("abdu-portfolio-theme");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[lang];
  const isAr = lang === "ar";
  const isDark = theme === "dark";

  useEffect(() => { setLang(isEnPath ? "en" : "ar"); }, [isEnPath]);
  useEffect(() => {
    if (!isBrowser) return;
    localStorage.setItem("abdu-portfolio-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [theme, lang, isAr]);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  const prefix = isEnPath ? "/en" : "";
  const navLinks = [
    { href: `${prefix}/`,        labelAr: "الرئيسية",        labelEn: "Home" },
    { href: `${prefix}/about`,   labelAr: "من أنا",          labelEn: "About" },
    { href: `${prefix}/services`,labelAr: "الخدمات",         labelEn: "Services" },
    { href: `${prefix}/projects`,labelAr: "المشاريع",        labelEn: "Portfolio" },
    { href: `${prefix}/blogs`,   labelAr: "المدونة",         labelEn: "Blog" },
    { href: `${prefix}/contact`, labelAr: "تواصل",           labelEn: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" || href === "/en/") return pathname === "/" || pathname === "/en";
    return pathname.startsWith(href);
  };

  const arHref = pathname.replace(/^\/en/, "") || "/";
  const enHref = `/en${pathname.startsWith("/en") ? pathname.replace(/^\/en/, "") : pathname}`;

  return (
    <div className={`min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-300 ${
      isDark ? "bg-[#0b0918] text-slate-100" : "bg-[#f8fafc] text-slate-700"
    }`}>
      <CyberFingersBackground isDark={isDark} />

      {/* Decorative orbs — hidden on very small screens to avoid layout noise */}
      <div aria-hidden className={`glowing-orb top-20 left-[5%] sm:left-[10%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] float-animation ${isDark ? "bg-indigo-500/10" : "bg-indigo-500/5"}`} />
      <div aria-hidden className={`glowing-orb top-[40%] right-[2%] sm:right-[5%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] float-animation ${isDark ? "bg-purple-500/5" : "bg-purple-500/3"}`} style={{ animationDelay: "2s" }} />

      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors border-b ${
        isDark ? "bg-[#0e0c21]/95 border-indigo-950/60" : "bg-white/90 border-slate-200/60"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">

          {/* Brand */}
          <Link href={`${prefix}/`} className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <span className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
              isDark ? "bg-indigo-950/50 border-indigo-900/50 text-indigo-400 group-hover:bg-indigo-900"
                     : "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-100"
            }`}>
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="flex flex-col">
              <span className={`font-space font-extrabold text-sm sm:text-base tracking-tight leading-tight transition-colors ${
                isDark ? "text-white group-hover:text-indigo-400" : "text-slate-800 group-hover:text-indigo-600"
              }`}>
                {isAr ? "عبدالرحمن طاهر" : "Abdulrahman Taher"}
              </span>
              <span className={`hidden sm:block text-[9px] font-mono font-bold uppercase tracking-widest leading-none ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}>
                {t.navBrand}
              </span>
            </div>
          </Link>

          {/* Desktop nav (lg+) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[12px] xl:text-[13px] font-bold">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-2.5 xl:px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  isActive(link.href)
                    ? isDark ? "bg-indigo-950/60 text-indigo-400 border border-indigo-900/60"
                              : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                    : isDark ? "text-slate-400 hover:text-white"
                              : "text-slate-600 hover:text-indigo-600"
                }`}>
                {isAr ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Lang toggle */}
            <div className={`flex p-0.5 rounded-lg border ${isDark ? "bg-[#090714] border-indigo-950" : "bg-slate-100 border-slate-200"}`}>
              <Link href={arHref} className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${!isEnPath ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}>
                ع
              </Link>
              <Link href={enHref} className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${isEnPath ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}>
                EN
              </Link>
            </div>

            {/* Theme toggle */}
            <button onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2 sm:p-2.5 rounded-lg border transition-all ${
                isDark ? "bg-[#13112a] border-indigo-950 text-indigo-400 hover:bg-slate-900"
                       : "bg-white border-slate-200 text-amber-500 hover:bg-slate-50"
              }`}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
              {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* CTA — visible sm+ on desktop */}
            <Link href={`${prefix}/contact`}
              className="hidden sm:inline-flex lg:hidden xl:inline-flex bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl transition-all shadow-sm items-center gap-1.5 whitespace-nowrap">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isAr ? "تواصل" : "Hire Me"}</span>
            </Link>

            {/* Hamburger (below lg) */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-all ${
                isDark ? "bg-[#13112a] border-indigo-950 text-slate-300" : "bg-white border-slate-200 text-slate-700"
              }`}
              aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t ${
            isDark ? "bg-[#0e0c21] border-indigo-950/60" : "bg-white border-slate-200"
          }`}>
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive(link.href)
                      ? "bg-indigo-600 text-white"
                      : isDark ? "text-slate-300 hover:bg-indigo-950/40 hover:text-white"
                                : "text-slate-700 hover:bg-slate-100"
                  }`}>
                  {isAr ? link.labelAr : link.labelEn}
                </Link>
              ))}
              <Link href={`${prefix}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all text-center">
                {isAr ? "تواصل واستشارة" : "Contact / Hire Me"}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-16 relative z-10">
        <div data-theme={theme} data-lang={lang}>
          {children}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className={`border-t mt-16 sm:mt-20 ${
        isDark ? "border-indigo-950/50" : "border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* Share hub */}
          <div className={`p-5 sm:p-6 rounded-2xl border ${
            isDark ? "bg-[#100c28]/70 border-indigo-950/80" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1.5 md:max-w-md">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                  🔗 {isAr ? "نشر المعرض والروابط المهنية" : "SHARE HUB & EXTERNAL REACH"}
                </span>
                <h2 className={`text-sm sm:text-base font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                  {isAr ? "توصيل شبكات التواصل الاجتماعي ومشاركة المعرض" : "Connect & Share This Portfolio"}
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isAr ? "ادعم انتشار المعرض بمشاركته مع مدراء التوظيف والشركات الناشئة."
                         : "Help spread the word to hiring managers looking for backend experts."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { if (isBrowser) { navigator.clipboard.writeText("https://abdotaher.me/"); alert(isAr ? "تم حفظ الرابط!" : "Copied!"); } }}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono bg-indigo-600 hover:bg-indigo-500 text-white transition-all">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>{isAr ? "نسخ الرابط" : "Copy Link"}</span>
                </button>
                <a href="https://www.linkedin.com/in/abdelrhman-taher" target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all ${
                    isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600"
                  }`}>
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/abdo-taher" target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all ${
                    isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600"
                  }`}>
                  <GitHubIcon className={`w-3.5 h-3.5 ${isDark ? "text-white" : "text-slate-800"}`} />
                  <span>GitHub</span>
                </a>
                <a href="https://x.com/Abderhman_taher" target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all ${
                    isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600"
                  }`}>
                  <XIcon className={`w-3.5 h-3.5 ${isDark ? "text-white" : "text-slate-800"}`} />
                  <span>X / Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`pt-6 border-t border-dashed ${isDark ? "border-slate-700/20" : "border-slate-200"} flex flex-col sm:flex-row justify-between items-center gap-4 text-xs`}>
            <p className="font-mono font-bold text-slate-500 text-center sm:text-start">
              © 2026 {isAr ? "عبدالرحمن طاهر" : "Abdulrahman Taher"} — {isAr ? "جميع الحقوق محفوظة" : "All Rights Reserved"}
            </p>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono font-bold text-[11px] text-slate-500">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-indigo-500 uppercase transition-colors">
                  {isAr ? link.labelAr : link.labelEn}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
