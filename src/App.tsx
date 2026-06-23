import React, { useState, useEffect, FormEvent } from "react";
import { translations, sampleProjects } from "./translations";
import { blogArticles, BlogArticle } from "./data/blogs";
import { BottleneckEstimator } from "./components/BottleneckEstimator";
import { ProjectCard } from "./components/ProjectCard";
import { CyberFingersBackground } from "./components/CyberFingersBackground";
import { InteractiveConsole } from "./components/InteractiveConsole";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  User, 
  Layers,
  Database,
  Settings, 
  History, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Rocket, 
  MessageSquare, 
  Award, 
  Github, 
  Linkedin, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Info,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Globe2,
  Sun,
  Moon,
  Search,
  BookOpen,
  Clock,
  Shield,
  Cpu,
  Bookmark,
  Code,
  Zap,
  Radio
} from "lucide-react";

// SSR-safe check: returns true only when running in the browser
const isBrowser = typeof window !== 'undefined';

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

export default function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar"); 
  const t = translations[lang];
  const isAr = lang === "ar";

  // Safe Image Fallbacks
  const handleProfileError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80";
  };

  const handleBlogImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80";
  };

  // Separation of Pages / Tab Router state
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "services" | "projects" | "blogs" | "contact" | "404">("home");
  
  // Compliance Modals State
  const [activePolicyModal, setActivePolicyModal] = useState<"privacy" | "security" | "sla" | null>(null);

  // Two Themes Support (Light / Dark Model Toggle)
  // The initializer is guarded for SSR: on the server there is no localStorage,
  // so we default to "dark" and let the client hydrate with the persisted value.
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (!isBrowser) return "dark";
    const saved = localStorage.getItem("abdu-portfolio-theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });

  // Blog states
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [blogSearch, setBlogSearch] = useState("");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<"all" | "backend" | "database" | "scaling" | "seo" | "business">("all");

  // Project state
  const [activeFilter, setActiveFilter] = useState<"All" | "Backend" | "DB" | "Cloud">("All");

  // SEO Schema States 
  const [seoTargetCompany, setSeoTargetCompany] = useState("SaaS Provider Ltd");
  
  // Handling Contact Form States
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Theme synchronization (browser-only)
  useEffect(() => {
    if (!isBrowser) return;
    localStorage.setItem("abdu-portfolio-theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Smooth scroll to top when page navigation or selected blog changes (browser-only)
  useEffect(() => {
    if (!isBrowser) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedBlogId]);

  // Client-side SEO: Dynamic Title, html attributes, and dynamic JSON-LD Schema
  // On the server this is handled by entry-server.tsx.
  useEffect(() => {
    if (!isBrowser) return;
    const seoTitle = isAr 
      ? `عبدالرحمن طاهر | مهندس برمجيات باك اند ومستشار تقني محترف - ${currentPage.toUpperCase()}`
      : `Abdulrahman Taher | Senior Backend & Database Architect - ${currentPage.toUpperCase()}`;
    document.title = seoTitle;
    
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";

    // Dynamic Graph-based JSON-LD Structured Schema Injection for pristine search indexing
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://abdotaher.me/#person",
          "name": "Abdulrahman Taher",
          "alternateName": "عبدالرحمن طاهر",
          "jobTitle": "Senior Backend & Database Architect",
          "url": "https://abdotaher.me",
          "sameAs": [
            "https://www.upwork.com/freelancers/~018ae3e5cfaa1804d1",
            "https://wa.me/201008275881",
            "mailto:abdotaher093@gmail.com"
          ],
          "knowsLanguage": ["Arabic", "English"],
          "knowsAbout": [
            "High-Performance API Architecture",
            "Database Performance Tuning",
            "RabbitMQ & Redis queue processors",
            "Payment integration Saudi Arabia Mada Gateway"
          ],
          "description": "Professional Backend developer in Egypt building custom systems and low-latency APIs for GCC business enterprises."
        },
        {
          "@type": "WebSite",
          "@id": "https://abdotaher.me/#website",
          "url": "https://abdotaher.me",
          "name": "عبدالرحمن طاهر | مهندس برمجيات باك اند ومطور قواعد بيانات",
          "publisher": { "@id": "https://abdotaher.me/#person" },
          "inLanguage": ["ar", "en"]
        },
        {
          "@type": "WebPage",
          "@id": `https://abdotaher.me/#${currentPage}`,
          "url": `https://abdotaher.me/#${currentPage}`,
          "name": isAr ? `عبدالرحمن طاهر | مهندس برمجيات باك اند ومستشار تقني محترف - ${currentPage.toUpperCase()}` : `Abdulrahman Taher | Senior Backend & Database Architect - ${currentPage.toUpperCase()}`,
          "isPartOf": { "@id": "https://abdotaher.me/#website" },
          "about": { "@id": "https://abdotaher.me/#person" },
          "description": isAr ? "عبدالرحمن طاهر، مهندس برمجيات باك اند وقواعد بيانات محترف لبناء أنظمة و APIs قوية وسريعة خالية من المشاكل البرمجية." : "Abdulrahman Taher | Senior Backend & Database Architect in Egypt building scalable, high-performance APIs and database applications.",
          "inLanguage": ["ar", "en"]
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://abdotaher.me/#service",
          "name": "Abdulrahman Taher Backend Engineering Services",
          "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
          "telePhone": "+201008275881",
          "url": "https://abdotaher.me",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Cairo",
            "addressCountry": "EG"
          },
          "priceRange": "$$",
          "areaServed": ["SA", "AE", "EG", "KW", "QA", "OM"]
        }
      ]
    };

    const scriptId = "developer-seo-schema";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);
  }, [lang, isAr, currentPage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitStatus("success");
      setFormName("");
      setFormEmail("");
      setFormMsg("");
    }, 1200);
  };

  const filteredProjects = activeFilter === "All" 
    ? sampleProjects 
    : sampleProjects.filter(p => p.category === activeFilter);

  // Filter Blog posts
  const filteredBlogs = blogArticles.filter(blog => {
    const title = isAr ? blog.titleAr : blog.titleEn;
    const excerpt = isAr ? blog.excerptAr : blog.excerptEn;
    const keywordMatch = blog.keywords.some(kw => kw.toLowerCase().includes(blogSearch.toLowerCase()));
    const matchesSearch = title.toLowerCase().includes(blogSearch.toLowerCase()) || 
                          excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
                          keywordMatch;
    const matchesCategory = blogCategoryFilter === "all" || blog.category === blogCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-300 pb-16 ${
      isDark ? "bg-[#0b0918] text-slate-100" : "bg-[#f8fafc] text-slate-700"
    }`}>
      {/* Cyber fingers & active mouse background animations */}
      <CyberFingersBackground isDark={isDark} />

      {/* Dynamic Glowing Background Orbs */}
      <div className={`glowing-orb top-20 left-[10%] w-[350px] h-[350px] float-animation ${isDark ? "bg-indigo-500/10" : "bg-indigo-500/5"}`} />
      <div className={`glowing-orb top-[40%] right-[5%] w-[450px] h-[450px] float-animation ${isDark ? "bg-purple-500/5" : "bg-purple-500/3"}`} style={{ animationDelay: "2s" }} />
      <div className={`glowing-orb bottom-20 left-[20%] w-[400px] h-[400px] float-animation ${isDark ? "bg-indigo-400/8" : "bg-indigo-400/3"}`} style={{ animationDelay: "4s" }} />

      {/* --- PREMIUM NAVIGATION HEADER --- */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-colors border-b ${
        isDark ? "bg-[#0e0c21]/95 border-indigo-950/60" : "bg-white/90 border-slate-200/60"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Brand / Developer Identity */}
          <div 
            id="brand-header"
            onClick={() => { setCurrentPage("home"); setSelectedBlogId(null); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className={`p-2 rounded-lg border transition-colors ${
              isDark ? "bg-indigo-950/50 border-indigo-900/50 text-indigo-400 group-hover:bg-indigo-900" : "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-100"
            }`}>
              <Terminal className="w-5 h-5" />
            </span>
            <div className="flex flex-col">
              <h1 className={`font-space font-extrabold text-base tracking-tight leading-tight transition-colors ${
                isDark ? "text-white group-hover:text-indigo-400" : "text-slate-800 group-hover:text-indigo-600"
              }`}>
                {isAr ? "عبدالرحمن طاهر" : "Abdulrahman Taher"}
              </h1>
              <span className={`text-[9px] font-mono font-bold uppercase tracking-widest leading-none ${
                isDark ? "text-indigo-400" : "text-indigo-600"
              }`}>
                {t.navBrand}
              </span>
            </div>
          </div>

          {/* Desktop Separated Pages Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-bold">
            {[
              { id: "home", labelAr: "الرئيسية", labelEn: "Home" },
              { id: "about", labelAr: "من أنا", labelEn: "About" },
              { id: "services", labelAr: "الخدمات الهندسية", labelEn: "Services" },
              { id: "projects", labelAr: "معرض المشاريع", labelEn: "Portfolio" },
              { id: "blogs", labelAr: "المدونة", labelEn: "Blog" },
              { id: "contact", labelAr: "تواصل واستشارة", labelEn: "Contact" }
            ].map((page) => {
              const isActive = currentPage === page.id;
              return (
                <a
                  key={page.id}
                  id={`nav-link-${page.id}`}
                  href={`#${page.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page.id as any);
                    setSelectedBlogId(null);
                  }}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? isDark ? "bg-indigo-950/60 text-indigo-400 border border-indigo-900/60" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                      : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {isAr ? page.labelAr : page.labelEn}
                </a>
              );
            })}
          </nav>

          {/* Controls Hub (Lang, Dark Toggle, and Cta) */}
          <div className="flex items-center gap-2.5">
            {/* Lang Toggle */}
            <div className={`flex p-0.5 rounded-lg border ${isDark ? "bg-[#090714] border-indigo-950" : "bg-slate-100 border-slate-200"}`}>
              <button 
                id="header-lang-ar"
                onClick={() => setLang("ar")}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${isAr ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}
              >
                عربي
              </button>
              <button 
                id="header-lang-en"
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${!isAr ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"}`}
              >
                EN
              </button>
            </div>

            {/* Dark/Light Model Toggle Button */}
            <button
              id="theme-toggler"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`p-2.5 rounded-lg border transition-all ${
                isDark 
                  ? "bg-[#13112a] border-indigo-950 text-indigo-400 hover:bg-slate-900" 
                  : "bg-white border-slate-200 text-amber-500 hover:bg-slate-50"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile View Header - Handled cleanly below via the direct sticky navigation rail */}

            {/* Premium Header CTA */}
            <button 
              id="header-cta-btn"
              onClick={() => { setCurrentPage("contact"); setSelectedBlogId(null); }}
              className="hidden sm:inline-flex bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-4.5 rounded-xl transition-all shadow-sm shadow-indigo-600/10 items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isAr ? t.navContact : "Hire Abdu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Inline Navigation Rail */}
      <div className={`lg:hidden flex flex-wrap justify-center gap-1 px-4 py-2.5 border-b sticky top-20 z-40 backdrop-blur-sm ${
        isDark ? "bg-[#090715]/90 border-indigo-950/70" : "bg-slate-50/90 border-slate-200/50"
      }`}>
        {[
          { id: "home", l: "الرئيسية" },
          { id: "about", l: "عني" },
          { id: "services", l: "الخدمات" },
          { id: "projects", l: "المشاريع" },
          { id: "blogs", l: "المدونة" },
          { id: "contact", l: "تواصل" }
        ].map(item => (
          <a
            key={item.id}
            id={`mobile-rail-${item.id}`}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(item.id as any);
              setSelectedBlogId(null);
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-md ${
              currentPage === item.id
                ? "bg-indigo-600 text-white"
                : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-indigo-600"
            }`}
          >
            {isAr ? item.l : item.id.toUpperCase()}
          </a>
        ))}
      </div>

      {/* --- CENTRAL TRANSITION ROUTER PANEL --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedBlogId || "")}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            
            {/* =======================================
                1. HOME PAGE VIEW
                ======================================= */}
            {currentPage === "home" && (
              <div id="page-home" className="space-y-16 py-6">
                
                {/* Hero Pitch Block */}
                <div className="flex flex-col items-center text-center gap-8 pt-6">
                  
                  {/* Status Indicator Launcher Avatar */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full filter blur-xl animate-pulse scale-105" />
                    <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-500 relative z-10 flex items-center justify-center">
                      <img 
                        src="https://abdotaher.me/image.png" 
                        alt="Abdulrahman Taher PHP Developer" 
                        className={`w-full h-full rounded-full object-cover border-2 ${isDark ? "border-[#0b0918] bg-slate-900" : "border-[#f8fafc] bg-white"}`}
                        referrerPolicy="no-referrer"
                        onError={handleProfileError}
                      />
                    </div>
                    <div className="absolute bottom-1 right-2 bg-emerald-500 text-white font-mono font-bold text-[9px] px-2.5 py-0.5 rounded-full border-2 border-[#f8fafc] flex items-center gap-1 shadow-lg z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>{isAr ? "متاح للتعاقد" : "ONLINE"}</span>
                    </div>
                  </div>

                  <div className="max-w-3xl flex flex-col gap-4">
                    <span className={`inline-flex py-1 px-3.5 mx-auto rounded-full font-mono text-xs font-bold tracking-widest uppercase border ${
                      isDark ? "bg-indigo-950/60 border-indigo-800/40 text-indigo-400" : "bg-indigo-50 border-indigo-100 text-indigo-600"
                    }`}>
                      🚀 Senior Backend & Database Architect for GCC
                    </span>

                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight font-space ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}>
                      {t.heroTitle}
                    </h2>

                    <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {t.heroSub}
                    </p>

                    {/* Features checklist */}
                    <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs font-bold">
                      <span className={`px-3 py-1.5 rounded-full border shadow-2xs flex items-center gap-1.5 ${
                        isDark ? "bg-[#13112a] border-indigo-950 text-slate-300" : "bg-white border-slate-200 text-slate-600"
                      }`}>
                        <Check className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{t.heroCheck1}</span>
                      </span>
                      <span className={`px-3 py-1.5 rounded-full border shadow-2xs flex items-center gap-1.5 ${
                        isDark ? "bg-[#13112a] border-indigo-950 text-slate-300" : "bg-white border-slate-200 text-slate-600"
                      }`}>
                        <Check className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{t.heroCheck2}</span>
                      </span>
                      <span className={`px-3 py-1.5 rounded-full border shadow-2xs flex items-center gap-1.5 ${
                        isDark ? "bg-[#13112a] border-indigo-950 text-slate-300" : "bg-white border-slate-200 text-slate-600"
                      }`}>
                        <Check className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{t.heroCheck3}</span>
                      </span>
                    </div>

                    {/* Main Actions layout */}
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                      <button 
                        onClick={() => setCurrentPage("contact")}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3.5 px-6.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                      >
                        <Rocket className="w-4 h-4" />
                        <span>{t.heroCtaHire}</span>
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentPage("blogs");
                          setSelectedBlogId(null);
                        }}
                        className={`font-bold text-xs py-3.5 px-6.5 rounded-xl border transition-all flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] ${
                          isDark ? "bg-[#13112a] border-indigo-950 text-indigo-400 hover:bg-slate-900" : "bg-white border-slate-200 text-indigo-600 hover:bg-slate-50"
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-indigo-500 animate-pulse" />
                        <span>{isAr ? "اقرأ المدونة" : "Read Blog"}</span>
                      </button>
                      <a 
                        href="https://wa.me/201008275881" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`font-bold text-xs py-3.5 px-6.5 rounded-xl border transition-all flex items-center gap-2 ${
                          isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 text-indigo-500" />
                        <span>{t.contactDirectBtn}</span>
                      </a>
                    </div>
                  </div>

                  {/* Core Metrics Cards Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mt-6 text-center">
                    <div className={`p-6 rounded-xl border transition-colors ${
                      isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-xs"
                    }`}>
                      <strong className="block text-3xl font-space font-extrabold text-indigo-500">{t.heroStat1Val}</strong>
                      <span className={`text-[11px] mt-1.5 block font-mono uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {t.heroStat1Desc}
                      </span>
                    </div>

                    <div className={`p-6 rounded-xl border transition-colors ${
                      isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-xs"
                    }`}>
                      <strong className="block text-3xl font-space font-extrabold text-indigo-500">{t.heroStat2Val}</strong>
                      <span className={`text-[11px] mt-1.5 block font-mono uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {t.heroStat2Desc}
                      </span>
                    </div>

                    <div className={`p-6 rounded-xl border transition-colors ${
                      isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-xs"
                    }`}>
                      <strong className="block text-3xl font-space font-extrabold text-indigo-500">{t.heroStat3Val}</strong>
                      <span className={`text-[11px] mt-1.5 block font-mono uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {t.heroStat3Desc}
                      </span>
                    </div>
                  </div>

                  {/* --- ENTERPRISE TRUST & VISIBLE THIRD-PARTY VALIDATION BADGES --- */}
                  <div className="w-full pt-8 pb-4">
                    <div className="flex flex-col gap-1.5 mb-8 text-center max-w-2xl mx-auto">
                      <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest ${
                        isDark ? "text-emerald-400" : "text-emerald-600"
                      }`}>
                        🛡️ {isAr ? "الاعتمادات وموثوقية الطرف الثالث" : "AUTHORIZED ACCREDITATIONS & CORPORATE STANDARDS"}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                        {isAr ? "شهادات الكفاءة الهندسية المعتمدة" : "Verified Credentials & Trust Badges"}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {isAr 
                          ? "تأكيد فني خارجي يعكس ممارستنا لمعايير الأمان وقابيلة التوسع للشركات التقنية والمنصات السحابية."
                          : "Professional validations backing up security, performance optimization, and elite cloud standards under load."}
                      </p>
                    </div>

                    {/* Accreditations Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl mx-auto">
                      <div className={`p-5 rounded-2xl border flex items-start gap-3.5 text-start transition-all relative overflow-hidden group ${
                        isDark ? "bg-[#13112a]/90 border-indigo-950/70 hover:border-indigo-500/50" : "bg-white border-slate-200/80 shadow-xs hover:border-indigo-400"
                      }`}>
                        <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/25">
                          <Award className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xs font-mono font-bold tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                            AWS DB SPECIALTY
                          </h4>
                          <span className="block text-[11px] font-bold text-orange-400">{isAr ? "أخصائي قواعد بيانات AWS" : "Database Specialist"}</span>
                          <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                            {isAr ? "معتمد رسمياً لتخطيط وتأمين وتطوير خوادم Database و Aurora السحابية وضمان الـ replication." : "Certified cloud authority in optimizing sub-second query designs and failover replicas."}
                          </p>
                        </div>
                      </div>

                      <div className={`p-5 rounded-2xl border flex items-start gap-3.5 text-start transition-all relative overflow-hidden group ${
                        isDark ? "bg-[#13112a]/90 border-indigo-950/70 hover:border-indigo-500/50" : "bg-white border-slate-200/80 shadow-xs hover:border-indigo-400"
                      }`}>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xs font-mono font-bold tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                            UPWORK TOP RATED PLUS
                          </h4>
                          <span className="block text-[11px] font-bold text-emerald-400">{isAr ? "النخبة الأعلى تقييماً 3%" : "Top 3% Technical Class"}</span>
                          <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                            {isAr ? "ضمن أفضل الخبراء التقنيين في تطوير الباك اند والـ APIs لشركات الخليج ومصر بـ 100% نجاح." : "Secured with a 100% Job Success Score delivering custom enterprise software solutions."}
                          </p>
                        </div>
                      </div>

                      <div className={`p-5 rounded-2xl border flex items-start gap-3.5 text-start transition-all relative overflow-hidden group ${
                        isDark ? "bg-[#13112a]/90 border-indigo-950/70 hover:border-indigo-500/50" : "bg-white border-slate-200/80 shadow-xs hover:border-indigo-400"
                      }`}>
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/25">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-xs font-mono font-bold tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                            GCP PRO ARCHITECT
                          </h4>
                          <span className="block text-[11px] font-bold text-blue-400">{isAr ? "مهندس معمارية سحابية Google" : "Professional Cloud Architect"}</span>
                          <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                            {isAr ? "القدرة والجاهزية على هيكلة الحاويات Docker ونظم الباك-اند المرنة سريعة التجاوب." : "Specialize in microservice boundaries, container nodes, and hyper-scalable VPC network tunnels."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Elite Endorsement Quotes */}
                    <div className="mt-12 max-w-4xl mx-auto space-y-6">
                      <div className="text-center">
                        <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase font-bold">
                          {isAr ? "توصيات ومراجعات العملاء" : "WHAT REGIONAL FOUNDERS SAY"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
                        <div className={`p-6 rounded-2xl border relative ${
                          isDark ? "bg-indigo-950/30 border-indigo-950" : "bg-indigo-50/20 border-slate-200"
                        }`}>
                          <p className={`text-xs sm:text-sm italic leading-relaxed text-slate-300 font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            {isAr 
                              ? "«عبدالرحمن خبير عبقري في قواعد البيانات وتتبع أعطال الذاكرة. تمكن بكفاءة عالية من تسريع زمن استجابة API الخاص بمتجرنا من 4.2 ثانية إلى 45 جزء من الثانية فقط بفضل تحسين ذكي للجداول والفهارس الكبيرة.»"
                              : "«Abdulrahman Taher is a master systems tuner. He successfully optimized our legacy core platform queries, taking API latency from 4.2 seconds down to 45ms. Our server cloud bills downsized by 35%! Highly competent database consultant.»"}
                          </p>
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-mono font-bold text-xs text-white">
                              AX
                            </div>
                            <div>
                              <strong className={`block text-xs font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                                {isAr ? "الرئيس التنفيذي، شركة اليكسون التقنية" : "CEO, Alexon Technologies"}
                              </strong>
                              <span className="block text-[10px] text-indigo-400 font-mono font-bold">ALEXON COMP_CO</span>
                            </div>
                          </div>
                        </div>

                        <div className={`p-6 rounded-2xl border relative ${
                          isDark ? "bg-indigo-950/30 border-indigo-950" : "bg-indigo-50/20 border-slate-200"
                        }`}>
                          <p className={`text-xs sm:text-sm italic leading-relaxed text-slate-300 font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                            {isAr 
                              ? "«التعامل مع عبدالرحمن كان نقطة تحول لمنظومتنا السحابية. لم يقتصر عمله على كتابة كود PHP نقي ومحكم، بل صمم لنا نظام ويب هوك آمن تماماً للربط مع بوابات الدفع في السعودية مدى وسترايب دون حدوث أي خطأ في الحسابات.»"
                              : "«Integrating Abdulrahman Taher was a turning point for our web services. He designed safe, idempotent webhook handlers for KSA Mada & Stripe channels flawlessly. The system handles spikes under 10k concurrent requests smoothly.»"}
                          </p>
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-650 bg-indigo-500 flex items-center justify-center font-mono font-bold text-xs text-white">
                              AH
                            </div>
                            <div>
                              <strong className={`block text-xs font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                                {isAr ? "مدير التقنية، الأكاديمية العالمية الحرة" : "Technical Dir., Al Almiya Alhura"}
                              </strong>
                              <span className="block text-[10px] text-indigo-400 font-mono font-bold">ALMIYA GULF ENTERPRISE</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SPOTLIGHT CORE TECH PILLARS */}
                  <div className="w-full pt-12">
                    <div className="flex flex-col gap-1 mb-8 text-center max-w-2xl mx-auto">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6366f1]">
                        {isAr ? "الركائز التقنية والمكدس البرمجي" : "ARCHITECTURAL TOOL STACK SPOTLIGHT"}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                        {isAr ? "التقنيات والنظم المفضلة للإنتاج" : "Production-Tested Tooling & Frameworks"}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {isAr 
                          ? "بيئة العمل التي أفضّلها لبناء أنظمة باك اند متكاملة، سريعة الفهم، وخالية من المشاكل البرمجية تحت الضغط العالي."
                          : "The absolute reliable choices for delivering low-latency microservices, responsive API routes, and high-availability database setups."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl mx-auto">
                      {[
                        {
                          titleAr: "بناء المعمارية (Core Architecture)",
                          titleEn: "Core Architecture Support",
                          descAr: "تقنيات متقدمة لهندسة الميدلوير، وحقن الاعتمادات، وبناء معمارية نظيفة قابلة للتعديل والنمو.",
                          descEn: "Advanced middleware engineering, deep dependency injection, and scalable MVC/domain-driven clean architectures.",
                          icon: <Code className="w-5 h-5 text-indigo-500" />
                        },
                        {
                          titleAr: "قاعدة بيانات Database",
                          titleEn: "Database & Indexing",
                          descAr: "تحسين الاستعلامات المعقدة، تقسيم الجداول الكبيرة، مراجعة خطط التنفيذ (EXPLAIN ANALYZE) والتحجيم.",
                          descEn: "Complex subquery tuning, table partitions, composite indexes, and executing EXPLAIN ANALYZE bottlenecks profiling.",
                          icon: <Database className="w-5 h-5 text-indigo-500" />
                        },
                        {
                          titleAr: "ذاكرة كاش Redis",
                          titleEn: "Redis Cache Sentinel",
                          descAr: "التخزين المؤقت للبيانات الساخنة، صمام أمان الجدران الائتمانية وامتصاص ضغط طلبات الـ API المتزامنة.",
                          descEn: "High-capacity in-memory data structures, cache locks, and rate limiters protecting checkout loops.",
                          icon: <Zap className="w-5 h-5 text-amber-500" />
                        },
                        {
                          titleAr: "الكيوهات وبول-ريديس",
                          titleEn: "Queue Horizon Workers",
                          descAr: "معالجة المهام الثقيلة في الخلفية بشكل غير متزامن لتفادي فترات الانتظار الطويلة بالخوادم.",
                          descEn: "Decoupled asynchronous queue processing, transactional mail sends, and scalable cron processing pipelines.",
                          icon: <Radio className="w-5 h-5 text-indigo-500" />
                        }
                      ].map((pillar, pIdx) => (
                        <div 
                          key={pIdx} 
                          className={`p-5 rounded-xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${
                            isDark 
                              ? "bg-[#13112a] border-indigo-950/60 hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]" 
                              : "bg-white border-slate-200 hover:border-indigo-500/30 hover:shadow-lg"
                          }`}
                        >
                          <div>
                            <span className={`p-2.5 rounded-lg border inline-block mb-3.5 ${
                              isDark ? "bg-indigo-950/40 border-indigo-800/20" : "bg-indigo-50 border-indigo-100"
                            }`}>
                              {pillar.icon}
                            </span>
                            <h4 className={`text-sm font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                              {isAr ? pillar.titleAr : pillar.titleEn}
                            </h4>
                            <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              {isAr ? pillar.descAr : pillar.descEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* THE REGIONAL ENTERPRISE WORKFLOW */}
                  <div className="w-full pt-14 pb-4">
                    <div className="flex flex-col gap-1 mb-8 text-center max-w-2xl mx-auto">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6366f1]">
                        {isAr ? "دورة حياة بناء النظم وهندستها" : "THE REGIONAL GULF CO-OPERATION STANDARD"}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                        {isAr ? "خطة العمل الهندسية القياسية للخليج ومصر" : "4-Stage Action Plan for Seamless Engineering"}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {isAr 
                          ? "خطوات مدروسة بدقة تضمن الانتقال الآمن للبيانات، وتلاشي فترات توقف الخوادم وحقن التوسيع بسلاسة تامة."
                          : "A systematic approach to profiling bottlenecks, fixing slow structural queries, securing API threads, and safe pipeline shipping."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto relative">
                      {[
                        {
                          step: "01",
                          titleAr: "تشخيص وقياس الأداء",
                          titleEn: "Database & API Audit",
                          descAr: "قياس زمن الاستجابة الفعلي لطلبات الـ HTTP وتحديد مصايد الاستعلامات البطيئة في Database.",
                          descEn: "Measuring real-time transactional overhead, identifying query loops, and exposing database blocks."
                        },
                        {
                          step: "02",
                          titleAr: "إعادة الهيكلة والتفريع",
                          titleEn: "Reindexing & Layering",
                          descAr: "بناء فهارس مركبة ذكية وتطبيق أنظمة التخزين المؤقت (Redis) وتفريع البيانات دون التسبب بهلاك الخادم.",
                          descEn: "Applying smart composite indexes, introducing cache layers, and structural schema normalization."
                        },
                        {
                          step: "03",
                          titleAr: "معالجة المهام والكيوهات",
                          titleEn: "Asynchronous Pipelines",
                          descAr: "عزل المهام الثقيلة (إصدار الفواتير، الإشعارات الفورية) وتشغيلها في خلفية النظام لتقليص زمن الانتظار لأقل من 50 مللي ثانية.",
                          descEn: "Isolating heavy operations like instant invoice alerts into background processes ensuring ultra-fast API returns."
                        },
                        {
                          step: "04",
                          titleAr: "التأمين الشامل والمثاقلة",
                          titleEn: "Security & Scale Test",
                          descAr: "أرشفة وحماية النظم من ثغرات SQLi وتأمين بوابات الدفع (Mada) وتشغيل سيناريوهات Pen-test مكثفة.",
                          descEn: "Preventing SQLi exposure, deploying secure signature verification webhooks, and ensuring A+ grade integrity."
                        }
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className={`p-6 rounded-xl border relative flex flex-col justify-between transition-all ${
                            isDark 
                              ? "bg-[#13112a] border-indigo-950/60" 
                              : "bg-white border-slate-200 shadow-xs"
                          }`}
                        >
                          <div>
                            <span className="font-mono text-3xl font-extrabold text-indigo-500/30 block mb-2">{item.step}</span>
                            <h4 className={`text-sm sm:text-base font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                              {isAr ? item.titleAr : item.titleEn}
                            </h4>
                            <p className={`text-xs mt-2.5 leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                              {isAr ? item.descAr : item.descEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* INTERACTIVE SERVER SHELL SIMULATOR */}
                  <div className="w-full pt-10 pb-4">
                    <div className="flex flex-col gap-1 mb-8 text-center max-w-2xl mx-auto">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">
                        {isAr ? "مختبر معالجة الأكواد البرمجية الفوري" : "Live Code Architecture Testing Ground"}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                        {isAr ? "اختبر كفاءة وسرعة الباك-إند والـ APIs" : "Live Benchmarking of Backend Services"}
                      </h3>
                      <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {isAr 
                          ? "قم بتشغيل محاكي ضغط البيانات الفني لمعاينة فهارس قواعد البيانات وسرعة ذوبان طلبات الـ HTTP في أجزاء من الميلي ثانية."
                          : "Execute benchmark threads to test high-capacity index scans, fast Redis responses, queues and security filters in real-time."}
                      </p>
                    </div>
                    <InteractiveConsole isAr={isAr} isDark={isDark} />
                  </div>

                </div>

                {/* SLIDER DIAGNOSTICS ARCHITECTURE PANEL */}
                <div id="diagnostics-widget-box" className="pt-4">
                  <div className="flex flex-col gap-1 mb-6 text-center">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">SYSTEM ARCHITECTURE BOTTLENECK FINDER</span>
                    <h2 className={`text-2xl sm:text-3xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                      {isAr ? "افحص أداء الباك-إند وقاعدة البيانات بنفسك" : "Audit Your API and Database Stress Limits"}
                    </h2>
                  </div>
                  <BottleneckEstimator t={t} isAr={isAr} theme={theme} />
                </div>

                {/* TRUST CORPORATE CARDS */}
                <div className="space-y-8">
                  <div className="flex flex-col gap-1 text-center">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6366f1]">{t.trustLabel}</span>
                    <h2 className={`text-2xl sm:text-3xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>{t.trustTitle}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className={`p-6.5 rounded-xl border flex flex-col justify-between h-[250px] ${
                      isDark ? "bg-[#13112a] border-indigo-950/70" : "bg-white border-slate-200 shadow-xs"
                    }`}>
                      <div>
                        <span className="font-mono text-xs font-bold text-indigo-500">01 // STRUCTURAL CAPABILITY</span>
                        <h4 className={`text-lg font-bold font-space mt-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                          {t.trustCard1Title}
                        </h4>
                        <p className={`text-xs sm:text-sm mt-3 font-medium leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          "{t.trustCard1Desc}"
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold border-t border-indigo-950/20 pt-2.5">
                        Enterprise Performance Standard
                      </span>
                    </div>

                    <div className={`p-6.5 rounded-xl border flex flex-col justify-between h-[250px] ${
                      isDark ? "bg-[#13112a] border-indigo-950/70" : "bg-white border-slate-200 shadow-xs"
                    }`}>
                      <div>
                        <span className="font-mono text-xs font-bold text-indigo-500">02 // CO-OPERATION INTEGRITY</span>
                        <h4 className={`text-lg font-bold font-space mt-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                          {t.trustCard2Title}
                        </h4>
                        <p className={`text-xs sm:text-sm mt-3 font-medium leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          "{t.trustCard2Desc}"
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold border-t border-indigo-950/20 pt-2.5">
                        Agile Deliveries & Metrics
                      </span>
                    </div>

                    <div className={`p-6.5 rounded-xl border flex flex-col justify-between h-[250px] ${
                      isDark ? "bg-[#13112a] border-indigo-950/70" : "bg-white border-slate-200 shadow-xs"
                    }`}>
                      <div>
                        <span className="font-mono text-xs font-bold text-indigo-500">03 // CO-PILOT ADVISORY</span>
                        <h4 className={`text-lg font-bold font-space mt-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                          {t.trustCard3Title}
                        </h4>
                        <p className={`text-xs sm:text-sm mt-3 font-medium leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          "{t.trustCard3Desc}"
                        </p>
                      </div>
                      <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold border-t border-indigo-950/20 pt-2.5">
                        Business Alignment Blueprint
                      </span>
                    </div>
                  </div>
                </div>

                {/* RECENT STORIES & RECRUITMENT CALLOUTS */}
                <div className={`p-8 rounded-2xl border text-center relative overflow-hidden ${
                  isDark ? "bg-[#13112a]/40 border-indigo-950/80" : "bg-indigo-50/20 border-indigo-100 shadow-xs"
                }`}>
                  <h3 className={`text-xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                    {isAr ? "هل تبحث عن مهندس متمكن يسرّع تسليم البرمجيات بمصر والخليج؟" : "Need to secure your databases and prevent checkout bottlenecks?"}
                  </h3>
                  <p className={`text-sm mt-2 max-w-2xl mx-auto leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                    {isAr ? "أعمل بنموذج خطة عمل هندسية واضحة لتأمين الاستفسارات، وتوسيع السيرفرات وقواعد البيانات، ومراجعة جاهزية الأنظمة لتطبيقات التوصيل والمدفوعات والمستأجرين المتعددين." : "Deploy clean, production-certified scalable microservice architectures, integrate and reconcile financial ledger webhooks."}
                  </p>
                  <div className="flex justify-center gap-3 mt-6">
                    <button 
                      onClick={() => setCurrentPage("contact")}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl border border-indigo-500/10 transition-colors shadow-sm"
                    >
                      {t.contactFormSubmit}
                    </button>
                    <button 
                      onClick={() => setCurrentPage("services")}
                      className={`font-bold text-xs py-2.5 px-6 rounded-xl border transition-all ${
                        isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:bg-slate-900" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {isAr ? "استعرض الخدمات" : "View Services Manual"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* =======================================
                2. ABOUT ME VIEW
                ======================================= */}
            {currentPage === "about" && (
              <div id="page-about" className="space-y-12 py-6">
                
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">{t.aboutLabel}</span>
                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-855"}`}>
                    {t.aboutTitle}
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {isAr ? "نبذة كاملة ومسار خبرة المهندس عبدالرحمن طاهر في تلبية الاحتياجات التقنية لدول الخليج للباك-إند" : "Detailed corporate briefing on Eng. Abdulrahman Taher's backend specialization profile."}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 space-y-6 ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <h3 className={`text-xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                      {isAr ? "أنا مهندس أنظمة باك-إند حريص على إنتاجية النظم واستقرارها" : "Senior Systems Audit & Optimization Specialist"}
                    </h3>
                    
                    <div className={`text-sm sm:text-base leading-relaxed space-y-4 font-medium ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}>
                      <p>{t.aboutDesc1}</p>
                      <p>{t.aboutDesc2}</p>
                      <p>
                        {isAr ? "بفضل عملي لسنوات مع عملاء وشركات في مصر والسعودية والإمارات والكويت والشرق الأوسط، أفهم تماما متطلبات الحوسبة الإقليمية؛ مثل بوابات مدى المصرفية، فوترة الفاتورة الإلكترونية لزكاة والمبيعات بهيئة الضريبة والدخل في السعودية، وحماية المدفوعات من الاختراق." : "Having designed multiple enterprise SaaS platforms for startups in Egypt, Saudi Arabia, Dubai and Kuwait, I build backend pipelines aligned completely with regional regulations including Mada web validation, corporate ledger records and microservice infrastructure."}
                      </p>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-indigo-950/20">
                      <button 
                        onClick={() => setCurrentPage("contact")}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-5 rounded-lg border border-indigo-500/10 transition-colors shadow-sm"
                      >
                        {t.contactFormSubmit}
                      </button>
                      <button 
                        onClick={() => setCurrentPage("projects")}
                        className={`font-semibold text-xs py-2.5 px-5 rounded-lg border transition-all ${
                          isDark ? "bg-[#13112a] border-indigo-950 text-indigo-400" : "bg-slate-100 border-slate-300 text-slate-700"
                        }`}
                      >
                        {t.heroCtaPortfolio}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-6">
                    {/* The Quick Guide Sidebar */}
                    <div className={`rounded-2xl border p-6 ${
                      isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"
                    }`}>
                      <h3 className={`text-sm font-mono font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${
                        isDark ? "text-[#f8fafc]" : "text-slate-800"
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                        <span>{t.aboutGuideTitle}</span>
                      </h3>
                      <ul className="space-y-4 text-xs sm:text-sm">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                            01
                          </span>
                          <div>
                            <strong className={`block ${isDark ? "text-white" : "text-slate-800"}`}>{t.aboutGuide1Title}</strong>
                            <p className={isDark ? "text-slate-400" : "text-slate-500"}>{t.aboutGuide1Desc}</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                            02
                          </span>
                          <div>
                            <strong className={`block ${isDark ? "text-white" : "text-slate-800"}`}>{t.aboutGuide2Title}</strong>
                            <p className={isDark ? "text-slate-400" : "text-slate-500"}>{t.aboutGuide2Desc}</p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                            03
                          </span>
                          <div>
                            <strong className={`block ${isDark ? "text-white" : "text-slate-800"}`}>{t.aboutGuide3Title}</strong>
                            <p className={isDark ? "text-slate-400" : "text-slate-500"}>{t.aboutGuide3Desc}</p>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Timeline summary card */}
                    <div className={`rounded-2xl border p-6 ${
                      isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"
                    }`}>
                      <h3 className={`text-xs font-mono font-bold uppercase tracking-widest text-[#a5b4fc] mb-3`}>
                        {isAr ? "تلميحات وسنوات الخبرة" : "TECHNICAL CHRONOLOGY"}
                      </h3>
                      <div className="space-y-4">
                        <div className="border-l-2 border-indigo-950/40 pl-3.5 pt-1">
                          <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-900 px-2 py-0.5 rounded font-mono font-bold">2022 — Present</span>
                          <h4 className={`text-xs sm:text-sm font-bold font-space mt-1.5 ${isDark ? "text-white" : "text-slate-800"}`}>{t.exp1Title}</h4>
                          <span className="text-xs text-slate-500 block font-semibold">{t.exp1Company}</span>
                        </div>
                        <div className="border-l-2 border-slate-800 pl-3.5 pt-1">
                          <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-800 px-2 py-0.5 rounded font-mono font-bold">2020 — 2022</span>
                          <h4 className={`text-xs sm:text-sm font-bold font-space mt-1.5 ${isDark ? "text-white" : "text-slate-800"}`}>{t.exp2Title}</h4>
                          <span className="text-xs text-slate-500 block font-semibold">{t.exp2Company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* =======================================
                3. SERVICES VIEW
                ======================================= */}
            {currentPage === "services" && (
              <div id="page-services" className="space-y-12 py-6">
                
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">{t.servicesLabel}</span>
                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-855"}`}>
                    {t.servicesTitle}
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {t.servicesDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Card 1 */}
                  <article className={`p-6 rounded-2xl relative overflow-hidden shadow-sm hover:scale-[1.01] transition-all border ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
                  }`}>
                    <span className="p-3 bg-indigo-500/10 border border-indigo-500/15 rounded-xl text-indigo-400 inline-block mb-4">
                      <Layers className="w-5 h-5 text-indigo-400" />
                    </span>
                    <h3 className={`text-lg font-bold tracking-tight font-space mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                      {t.servicesItem1Title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-4 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                      {t.servicesItem1Desc}
                    </p>
                    <div className="p-3.5 bg-slate-900/40 rounded-lg text-xs font-mono border border-indigo-950/60 space-y-1 text-slate-300">
                      <div>✔️ Enterprise API Structure</div>
                      <div>✔️ Advanced Management Admin Panels & Custom Dashboards</div>
                      <div>✔️ REST API / Webhooks / GraphQL / SDK integrations</div>
                    </div>
                  </article>

                  {/* Service Card 2 */}
                  <article className={`p-6 rounded-2xl relative overflow-hidden shadow-sm hover:scale-[1.01] transition-all border ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
                  }`}>
                    <span className="p-3 bg-indigo-500/10 border border-indigo-500/15 rounded-xl text-indigo-400 inline-block mb-4">
                      <Database className="w-5 h-5 text-indigo-400" />
                    </span>
                    <h3 className={`text-lg font-bold tracking-tight font-space mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                      {t.servicesItem2Title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-4 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                      {t.servicesItem2Desc}
                    </p>
                    <div className="p-3.5 bg-slate-900/40 rounded-lg text-xs font-mono border border-indigo-950/60 space-y-1 text-slate-300">
                      <div>✔️ PGSQL Composite Indexes Tuning</div>
                      <div>✔️ MySQL raw subqueries refactoring for SaaS dashboards</div>
                      <div>✔️ Multi-tenant data structures, database normalization</div>
                    </div>
                  </article>

                  {/* Service Card 3 */}
                  <article className={`p-6 rounded-2xl relative overflow-hidden shadow-sm hover:scale-[1.01] transition-all border ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
                  }`}>
                    <span className="p-3 bg-indigo-500/10 border border-indigo-500/15 rounded-xl text-indigo-400 inline-block mb-4">
                      <Settings className="w-5 h-5 text-indigo-400" />
                    </span>
                    <h3 className={`text-lg font-bold tracking-tight font-space mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                      {t.servicesItem3Title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-4 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                      {t.servicesItem3Desc}
                    </p>
                    <div className="p-3.5 bg-slate-900/40 rounded-lg text-xs font-mono border border-indigo-950/60 space-y-1 text-slate-300">
                      <div>✔️ JWT / Sanctum Security and Role Permissions</div>
                      <div>✔️ Prevent double spending locks on invoices concurrently</div>
                      <div>✔️ Payment gateways (Mada, Tap, Moyasar, Paymob)</div>
                    </div>
                  </article>

                  {/* Service Card 4 */}
                  <article className={`p-6 rounded-2xl relative overflow-hidden shadow-sm hover:scale-[1.01] transition-all border ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
                  }`}>
                    <span className="p-3 bg-indigo-500/10 border border-indigo-500/15 rounded-xl text-indigo-400 inline-block mb-4">
                      <Rocket className="w-5 h-5 text-indigo-400" />
                    </span>
                    <h3 className={`text-lg font-bold tracking-tight font-space mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                      {t.servicesItem4Title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-4 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                      {t.servicesItem4Desc}
                    </p>
                    <div className="p-3.5 bg-slate-900/40 rounded-lg text-xs font-mono border border-indigo-950/60 space-y-1 text-slate-300">
                      <div>✔️ Redis cache wrappers & buffers</div>
                      <div>✔️ Active worker queues & task distribution pipelines</div>
                      <div>✔️ Containerization namespaces (Docker, AWS ECS)</div>
                    </div>
                  </article>

                  {/* Service Card 5 */}
                  <article className={`p-6 rounded-2xl relative overflow-hidden shadow-sm hover:scale-[1.01] transition-all border ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
                  }`}>
                    <span className="p-3 bg-indigo-500/10 border border-indigo-500/15 rounded-xl text-indigo-400 inline-block mb-4">
                      <Cpu className="w-5 h-5 text-indigo-400" />
                    </span>
                    <h3 className={`text-lg font-bold tracking-tight font-space mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                      {t.servicesItem5Title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-4 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                      {t.servicesItem5Desc}
                    </p>
                    <div className="p-3.5 bg-slate-900/40 rounded-lg text-xs font-mono border border-indigo-950/60 space-y-1 text-slate-300">
                      <div>✔️ AI Agents & assistant loops (Gemini SDK / OpenAI API)</div>
                      <div>✔️ Structured output generation & smart prompt engineering</div>
                      <div>✔️ Automated background task tagging & classification</div>
                    </div>
                  </article>

                  {/* Service Card 6 */}
                  <article className={`p-6 rounded-2xl relative overflow-hidden shadow-sm hover:scale-[1.01] transition-all border ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
                  }`}>
                    <span className="p-3 bg-indigo-500/10 border border-indigo-500/15 rounded-xl text-indigo-400 inline-block mb-4">
                      <Globe2 className="w-5 h-5 text-indigo-400" />
                    </span>
                    <h3 className={`text-lg font-bold tracking-tight font-space mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                      {t.servicesItem6Title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-4 ${isDark ? "text-slate-450" : "text-slate-655"}`}>
                      {t.servicesItem6Desc}
                    </p>
                    <div className="p-3.5 bg-slate-900/40 rounded-lg text-xs font-mono border border-indigo-950/60 space-y-1 text-slate-300">
                      <div>✔️ SMS integrations (Twilio, Unifonic, Mobily)</div>
                      <div>✔️ Maps & Routing (Google Maps, Maps Routes API)</div>
                      <div>✔️ Logistics trackers, Webhook sync buffers, log reconcilers</div>
                    </div>
                  </article>
                </div>

                <div className={`p-8 rounded-2xl border text-center ${
                  isDark ? "bg-[#13112a] border-indigo-950/50" : "bg-indigo-50/50 border-indigo-100"
                }`}>
                  <h4 className={`text-lg font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                    {isAr ? "تحتاج خطة تشغيل تفصيلية لتوسيع نظامك؟" : "Looking for scalable API engineering consulting?"}
                  </h4>
                  <p className={`text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed`}>
                    {isAr ? "خلال بضعة أيام، يمكنني مراجعة مستودع الأكواد (Repository Checkup)، وفهرس Database الحالي، وتخليص العمليات المتعرجة لحقن كود أنظف وأكثر أماناً وسرعة." : "I provide rapid, hands-on architectural code diagnostics, DB query indexing refactoring, and asynchronous job optimization blueprints."}
                  </p>
                  <button 
                    onClick={() => setCurrentPage("contact")}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-6 rounded-lg mt-5 shadow-sm transition-all"
                  >
                    {isAr ? "اتصل واحجز جلستك" : "Request Advisory Session"}
                  </button>
                </div>

              </div>
            )}

            {/* =======================================
                4. PROJECTS / PORTFOLIO VIEW
                ======================================= */}
            {currentPage === "projects" && (
              <div id="page-projects" className="space-y-12 py-6">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6366f1]">{t.projectsLabel}</span>
                    <h2 className={`text-3xl font-bold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                      {isAr ? "دراسات حالة فنية وحلول برمجية" : "Technical Case Studies & Scaled Solutions"}
                    </h2>
                    <p className={`text-slate-400 text-xs sm:text-sm max-w-lg mt-1 font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      {t.projectsSub}
                    </p>
                  </div>

                  {/* Filtering Tabs */}
                  <div className={`flex flex-wrap p-1 rounded-xl border ${
                    isDark ? "bg-slate-900/60 border-indigo-950" : "bg-slate-100 border-slate-200"
                  }`}>
                    {[
                      { id: "All", label: t.projectsFilterAll },
                      { id: "Backend", label: t.projectsFilterBackend },
                      { id: "DB", label: t.projectsFilterDB },
                      { id: "Cloud", label: t.projectsFilterCloud }
                    ].map((btn) => (
                      <button 
                        key={btn.id}
                        onClick={() => setActiveFilter(btn.id as any)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                          activeFilter === btn.id 
                            ? "bg-indigo-600 text-white shadow-xs" 
                            : isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project cards grids with filter transitions */}
                <motion.div 
                  layout 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        t={t} 
                        isAr={isAr} 
                        theme={theme}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Direct GCC recruitment guides */}
                <div className={`p-8 rounded-xl border text-center ${
                  isDark ? "bg-slate-950/40 border-indigo-950/70" : "bg-slate-50 border-slate-200"
                }`}>
                  <p className="text-xs text-slate-500 font-semibold inline-flex items-center gap-1.5 flex-wrap justify-center">
                    <span>{t.projectsMore}</span>
                    <a href="https://wa.me/201008275881" className="text-indigo-500 hover:underline">{isAr ? "دليل بناء موقع أو سيستم لفرق الخليج" : "GCC Software Architecture Guide"}</a>
                    <span>•</span>
                    <a href="mailto:abdotaher093@gmail.com" className="text-indigo-500 hover:underline">{isAr ? "مبرمج باك اند مصر | أبي مبرمج يسوي سيستم" : "Backend Developer in Egypt Guide"}</a>
                  </p>
                </div>

              </div>
            )}

            {/* =======================================
                5. BLOGS & SEO TARGET CHECKER VIEW
                ======================================= */}
            {currentPage === "blogs" && (
              <div id="page-blogs" className="space-y-12 py-6">
                
                {/* Check if deep reader detail is active */}
                {selectedBlogId ? (
                  (() => {
                    const article = blogArticles.find(b => b.id === selectedBlogId);
                    if (!article) return null;
                    return (
                      <motion.article 
                        initial={{ opacity: 0, y: 35, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                      >
                        {/* Go Back button */}
                        <button
                          onClick={() => setSelectedBlogId(null)}
                          className={`inline-flex items-center gap-2 text-xs font-bold font-mono py-2 px-4 rounded-xl border transition-all ${
                            isDark 
                              ? "bg-[#13112a] border-indigo-950 text-indigo-400 hover:text-white" 
                              : "bg-white border-slate-200 text-indigo-600 hover:text-indigo-800"
                          }`}
                        >
                          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                          <span>{isAr ? "العودة إلى قائمة المقالات" : "Back to Blog Hub"}</span>
                        </button>

                        <div className="relative h-[250px] sm:h-[400px] w-full rounded-2xl overflow-hidden border border-indigo-950/20">
                          <img 
                            src={article.image} 
                            alt={isAr ? article.titleAr : article.titleEn} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={handleBlogImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                            <span className="text-xs uppercase bg-indigo-600 px-3 py-1 rounded-full font-mono font-bold tracking-widest text-[#a5b4fc]">
                              {article.category.toUpperCase()}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-space leading-tight">
                              {isAr ? article.titleAr : article.titleEn}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                              <span>✍️ {isAr ? article.authorAr : article.authorEn}</span>
                              <span>•</span>
                              <span>📅 {isAr ? article.dateAr : article.dateEn}</span>
                              <span>•</span>
                              <span>⏱️ {isAr ? article.readTimeAr : article.readTimeEn}</span>
                            </div>
                          </div>
                        </div>

                        {/* Article Core Body */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                          <div className={`lg:col-span-8 p-6 sm:p-10 rounded-2xl border leading-relaxed text-sm sm:text-base space-y-6 ${
                            isDark ? "bg-[#13112a] border-indigo-950/60 text-slate-200" : "bg-white border-slate-200 text-slate-700 shadow-sm"
                          }`}>
                            <div 
                              className="prose prose-indigo dark:prose-invert max-w-none space-y-6 blog-body"
                              dangerouslySetInnerHTML={{ __html: isAr ? article.contentAr : article.contentEn }}
                            />
                            
                            {/* Call to Work inside post */}
                            <div className="mt-8 pt-8 border-t border-indigo-950/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                              <div>
                                <h4 className="text-sm font-bold font-space text-indigo-400">
                                  {isAr ? "هل تواجه نفس هذه المشكلات التقنية في مشروعك؟" : "Facing this bottleneck in your production codebase?"}
                                </h4>
                                <p className="text-xs text-slate-400 mt-1">
                                  {isAr ? "المهندس عبدالرحمن جاهز لتقديم مراجعة كود مجانية لجداول قاعدة البيانات والـ APIs." : "Book an advisory audit session directly. Full ledger reconciliations and indices."}
                                </p>
                              </div>
                              <button
                                onClick={() => setCurrentPage("contact")}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-5 rounded-lg transition-colors flex-shrink-0"
                              >
                                {t.contactFormSubmit}
                              </button>
                            </div>
                          </div>

                          {/* Detail view Sidebar */}
                          <div className="lg:col-span-4 space-y-6">
                            <div className={`p-6 rounded-2xl border ${isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"}`}>
                              <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider mb-3">Keywords & SEO Search tags</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {article.keywords.map(kw => (
                                  <span key={kw} className={`text-xs px-2.5 py-1 rounded font-mono font-bold ${
                                    isDark ? "bg-indigo-950/50 border border-indigo-900/40 text-indigo-400" : "bg-indigo-50 border border-indigo-100 text-indigo-600"
                                  }`}>
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className={`p-6 rounded-2xl border ${isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-300"}`}>
                              <h4 className="text-xs font-mono font-bold uppercase text-indigo-400 mb-2">Technical Standards Met</h4>
                              <ul className="text-xs space-y-2 font-mono text-slate-400 font-bold">
                                <li>✔️ GCC payment gate check</li>
                                <li>✔️ Web security standards compliance</li>
                                <li>✔️ ACID transacation isolation level</li>
                                <li>✔️ Composition compound SQL indexing</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                      </motion.article>
                    );
                  })()
                ) : (
                  // List Feed layout
                  <div className="space-y-12">
                    {/* Header Pitch */}
                    <div className="text-center max-w-3xl mx-auto space-y-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6366f1]">{isAr ? "مقالات برمجية وهندسية" : "Technical Backend Articles"}</span>
                      <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-855"}`}>
                        {isAr ? "مدونة الباك-إند وهندسة الأنظمة" : "The Backend & Systems Engineering Blog"}
                      </h2>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {isAr ? "مقالات فنية معمقة تصف لغير التقنيين وأصحاب الشركات الناشئة كيفية تأمين فهارس قواعد البيانات ورفع كفاءة البنية التحتية." : "In-depth corporate analysis of PHP operations, secure mada payment webhooks, and scalable relational ledgers."}
                      </p>
                    </div>

                    {/* INTERACTIVE SEO METRICS & JSON-LD SCHEMA BUILDER PANEL FOR GULF REC-MARKET */}
                    <div className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden ${
                      isDark ? "bg-[#13112a] border-indigo-950/60 shadow-lg" : "bg-slate-50 border-slate-200"
                    }`}>
                      <div className="flex items-center gap-2 text-indigo-500 font-mono text-xs font-bold uppercase mb-4">
                        <Globe2 className="w-4 h-4" />
                        <span>{isAr ? "مختبر وثائق السيو المعمارية ولغة الفوايل" : "Interactive GCC Search Optimization & Schema Lab"}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-7 space-y-4">
                          <h4 className={`text-lg font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                            {isAr ? "التأثير الفعلي للهيكلة البرمجية على محركات البحث (SEO)" : "Technical SEO: Core Structural Optimization Strategy"}
                          </h4>
                          <p className="text-xs leading-relaxed text-slate-400">
                            {isAr ? "أبني كافة المواقع مع هيكلة متكاملة للـ JSON-LD Schema (البيانات المهيكلة) لتزويد محركات البحث بتمثيل مباشر لتصنيفات الشركات وبنود المبيعات. تفاعل مع منشئ المخططات التفاعلية بالجانب لمعاينة كيفية توليد الكود الفني." : "Every system integrates programmatic structured JSON-LD schemas. This informs crawler engines directly about your system identity, improving regional organic reach across Saudi Arabia, UAE, and GCC sectors."}
                          </p>
                          <div className="flex flex-wrap gap-2 text-[10px] font-mono text-indigo-400 font-bold">
                            <span className="bg-slate-900 border border-indigo-950 px-2 py-1 rounded">KEYWORD: مطور لارافيل مصر</span>
                            <span className="bg-slate-900 border border-indigo-950 px-2 py-1 rounded">KEYWORD: مبرمج سيستم الخليج</span>
                            <span className="bg-slate-900 border border-indigo-950 px-2 py-1 rounded">CORE: HTML5 Semantics</span>
                          </div>
                        </div>

                        {/* Interactive Schema preview simulator */}
                        <div className={`lg:col-span-5 p-4 rounded-xl border flex flex-col justify-between ${
                          isDark ? "bg-[#0a0916] border-indigo-950 text-slate-300" : "bg-white border-slate-200 text-slate-800"
                        }`}>
                          <div className="space-y-3">
                            <div className="flex justify-between items-baseline">
                              <span className="text-[10px] font-mono text-slate-500 font-bold">JSON-LD Generator</span>
                              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 rounded font-mono font-bold">Active</span>
                            </div>
                            
                            <div className="flex flex-col gap-1 text-xs">
                              <label className="font-mono text-[10px] text-slate-400">Target Client Organization:</label>
                              <input 
                                type="text"
                                value={seoTargetCompany}
                                onChange={(e) => setSeoTargetCompany(e.target.value)}
                                className={`px-2 py-1 text-xs rounded border focus:outline-none ${
                                  isDark ? "bg-[#13112a] border-indigo-900 text-white" : "bg-slate-50 border-slate-200"
                                }`}
                              />
                            </div>

                            <pre className="p-3 bg-slate-950/80 rounded border border-indigo-950/40 text-[9.5px] font-mono leading-tight max-w-full overflow-x-auto text-emerald-300 h-28">
                              {`{
  "@context": "https://schema.org",
  "@type": "WebDeveloper",
  "name": "Abdu Taher",
  "worksFor": "${seoTargetCompany}",
  "expertise": "High-Performance Backend Scaling",
  "geoTarget": "Saudi Arabia & GCC"
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blog list Filters and Search Area */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      {/* Search */}
                      <div className={`relative w-full sm:max-w-xs rounded-xl border ${
                        isDark ? "bg-slate-900/60 border-indigo-950" : "bg-slate-100 border-slate-200"
                      }`}>
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={blogSearch}
                          onChange={(e) => setBlogSearch(e.target.value)}
                          placeholder={isAr ? "ابحث عن المقالات أو التقنيات..." : "Search scaling articles..."}
                          className="w-full pl-10 pr-4 py-3 bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none border-none"
                        />
                      </div>

                      {/* Filter Categories for Blog */}
                      <div className="flex flex-wrap gap-1 bg-slate-900/40 p-1 rounded-xl border border-indigo-950/40">
                        {[
                          { id: "all", lAr: "الكل", lEn: "All Posts" },
                          { id: "business", lAr: "البيزنس والتوظيف", lEn: "Business & Clients" },
                          { id: "backend", lAr: "الباك إند والأنظمة", lEn: "Backend Hub" },
                          { id: "database", lAr: "قواعد البيانات", lEn: "Database Tune" },
                          { id: "scaling", lAr: "التوسيع", lEn: "Scaling Tips" },
                          { id: "seo", lAr: "السيو والأرشفة", lEn: "SEO & Rankings" }
                        ].map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setBlogCategoryFilter(cat.id as any)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              blogCategoryFilter === cat.id
                                ? "bg-indigo-600 text-white"
                                : isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            {isAr ? cat.lAr : cat.lEn}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Feed list items */}
                    {filteredBlogs.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-slate-500">{isAr ? "لا توجد مقالات تطابق البحث حالياً." : "No posts found matching current filters."}</p>
                      </div>
                    ) : (
                      <motion.div 
                        layout 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6.5"
                      >
                        <AnimatePresence mode="popLayout">
                          {filteredBlogs.map((article, idx) => (
                            <motion.article 
                              layout
                              initial={{ opacity: 0, scale: 0.9, y: 25 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -25 }}
                              transition={{ 
                                duration: 0.4, 
                                ease: [0.16, 1, 0.3, 1],
                                delay: Math.min(idx * 0.04, 0.2)
                              }}
                              key={article.id} 
                              onClick={() => setSelectedBlogId(article.id)}
                              className={`rounded-2xl border overflow-hidden flex flex-col justify-between h-[420px] hover:scale-[1.035] hover:-translate-y-1 hover:shadow-[0_20px_35px_-10px_rgba(99,102,241,0.25)] transition-all duration-300 cursor-pointer group ${
                                isDark ? "bg-[#13112a] border-indigo-950/60 shadow-lg hover:border-indigo-500/40" : "bg-white border-slate-200 shadow-sm"
                              }`}
                            >
                              <div>
                                {/* Post preview image header */}
                                <div className="h-44 overflow-hidden relative">
                                  <img 
                                    src={article.image} 
                                    alt={isAr ? article.titleAr : article.titleEn} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-all"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                    onError={handleBlogImageError}
                                  />
                                  <div className="absolute top-2 right-2 bg-indigo-650/80 bg-indigo-900 border border-indigo-700/30 text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase">
                                    {article.category}
                                  </div>
                                </div>

                                <div className="p-5 space-y-2">
                                  <div className="flex justify-between items-center text-[10.5px] font-mono text-slate-500">
                                    <span>📅 {isAr ? article.dateAr : article.dateEn}</span>
                                    <span>⏱️ {isAr ? article.readTimeAr : article.readTimeEn}</span>
                                  </div>
                                  <h3 className={`text-base font-bold leading-snug group-hover:text-indigo-400 font-space transition-colors ${
                                    isDark ? "text-white" : "text-slate-855"
                                  }`}>
                                    {isAr ? article.titleAr : article.titleEn}
                                  </h3>
                                  <p className={`text-xs leading-relaxed font-semibold line-clamp-3 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                                    {isAr ? article.excerptAr : article.excerptEn}
                                  </p>
                                </div>
                              </div>

                              <div className={`p-5 pt-0 border-t flex justify-between items-center text-xs font-mono ${
                                isDark ? "border-indigo-950/50" : "border-slate-100"
                              }`}>
                                <span className={`font-bold transition-all ${isDark ? "text-indigo-400 group-hover:text-indigo-300" : "text-indigo-600 group-hover:text-indigo-800"}`}>
                                  {isAr ? "اقرأ المقال كلاً ←" : "Read full study →"}
                                </span>
                                <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                              </div>
                            </motion.article>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* =======================================
                6. CONTACT PAGE VIEW
                ======================================= */}
            {currentPage === "contact" && (
              <div id="page-contact" className="space-y-12 py-6">
                
                <div className="text-center max-w-3xl mx-auto space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6366f1]">{t.navContact}</span>
                  <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space uppercase ${isDark ? "text-white" : "text-slate-855"}`}>
                    {t.contactTitle}
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {t.contactSub}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Lead form section */}
                  <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 ${
                    isDark ? "bg-[#13112a] border-indigo-950/60 shadow-xl" : "bg-white border-slate-200 shadow-md"
                  }`}>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5 text-start">
                        <label className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {t.contactFormName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors ${
                            isDark 
                              ? "bg-slate-900/60 border-indigo-950 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-slate-900" 
                              : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500/85 focus:bg-white"
                          }`}
                          placeholder={isAr ? "حسن الرويلي / ريادي تقني" : "Faisal Al-Otaibi / Founder"}
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-1.5 text-start">
                        <label className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {t.contactFormEmail} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          className={`w-full border rounded-xl px-4 py-3 text-sm transition-colors ${
                            isDark 
                              ? "bg-slate-900/60 border-indigo-950 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-slate-900" 
                              : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500/85 focus:bg-white"
                          }`}
                          placeholder="faisal@gulfventures.sa"
                        />
                      </div>

                      {/* Message Input */}
                      <div className="flex flex-col gap-1.5 text-start">
                        <label className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                          {t.contactFormMsg}
                        </label>
                        <textarea
                          value={formMsg}
                          rows={4}
                          onChange={(e) => setFormMsg(e.target.value)}
                          className={`w-full border rounded-xl p-4 text-sm transition-colors resize-none ${
                            isDark 
                              ? "bg-slate-900/60 border-indigo-950 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:bg-slate-900" 
                              : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500/85 focus:bg-white"
                          }`}
                          placeholder={isAr ? "مؤشرات البطء، تفاصيل النظام الحالي، البوابات البنكية المستهدفة..." : "Please describe your current systems architecture, slow tables, or gateway integration tasks..."}
                        />
                      </div>

                      {/* Success / Error notification */}
                      <AnimatePresence mode="wait">
                        {submitStatus === "success" && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5 font-bold leading-relaxed"
                          >
                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600 animate-ping" />
                            <span>{t.contactFormSuccess}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Action Button */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold text-xs py-3.5 px-6 rounded-xl border border-indigo-500/30 transition-all flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>{t.contactFormSubmitting}</span>
                          </>
                        ) : (
                          <span>{t.contactFormSubmit}</span>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* Sidebar Contact details channels */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Instant links card */}
                    <div className={`p-6 rounded-2xl border space-y-5 ${
                      isDark ? "bg-[#13112a] border-indigo-950/60 shadow-lg" : "bg-white border-slate-200"
                    }`}>
                      <h3 className={`text-base font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                        {isAr ? "قنوات التواصل المباشرة والواتساب" : "Direct Channels"}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isAr ? "يفضل رياديو وبناة المشاريع حجز لقاءات هاتفية سريعة. انقر فوق الروابط بالأسفل للمراسلة الفورية." : "Gulf founders prefer messaging instantly via Whatsapp or email. Click links to establish a thread."}
                      </p>

                      <div className="space-y-3.5">
                        <a 
                          href="mailto:abdotaher093@gmail.com"
                          className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                            isDark ? "bg-[#090714] border-indigo-950 hover:bg-indigo-950/35" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-indigo-500" />
                            <div className="flex flex-col text-start">
                              <span className="text-xs text-slate-500 font-mono">EMAIL ADDRESS</span>
                              <span className="text-xs text-slate-300 font-bold">abdotaher093@gmail.com</span>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        </a>

                        <a 
                          href="https://wa.me/201008275881"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                            isDark ? "bg-[#090714] border-indigo-950 hover:bg-indigo-950/35" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-emerald-500" />
                            <div className="flex flex-col text-start">
                              <span className="text-xs text-slate-500 font-mono">WHATSAPP GCC DIRECT</span>
                              <span className="text-xs text-emerald-400 font-bold">+201008275881</span>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        </a>

                        <a 
                          href="https://www.upwork.com/freelancers/~018ae3e5cfaa1804d1?mp_source=share"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                            isDark ? "bg-[#090714] border-indigo-950 hover:bg-indigo-950/35" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-emerald-500" />
                            <div className="flex flex-col text-start">
                              <span className="text-xs text-slate-400 font-mono">UPWORK CONTRACT HUB</span>
                              <span className="text-xs text-emerald-400 font-bold">Verified Account Profile</span>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        </a>
                      </div>
                    </div>

                    {/* Regional location card */}
                    <div className={`p-6 rounded-2xl border space-y-3 ${
                      isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
                    }`}>
                      <h4 className="text-xs font-mono font-bold uppercase text-indigo-400">Timezone Compatibility</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-bold">
                        ✔️ Compatible with Saudi Standard Time (SST) & UAE Gulf Time (GST).
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed font-bold">
                        ✔️ Weekly deliveries over Sprint-logs and Slack/Zoom update sessions.
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {currentPage === "404" && (
              <div id="page-404-simulation" className="py-12 text-center max-w-2xl mx-auto space-y-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-red-950/20 border border-red-500/30 text-red-500 font-mono text-3xl font-bold animate-bounce shadow-lg shadow-red-500/5">
                    404
                  </div>
                  <h2 className={`font-space font-extrabold text-2xl tracking-tight ${isDark ? "text-white" : "text-slate-800"}`}>
                    {isAr ? "عطل افتراضي بمسار الخادم // 404 OBJECT NOT FOUND" : "Virtual Database Connection Loss // 404 NOT FOUND"}
                  </h2>
                  <p className={`text-xs font-mono px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-amber-500 leading-relaxed`}>
                    GET /api/v1/routes/requested-resource <span className="text-red-500">[STATUS 404: FAIL]</span>
                  </p>
                  <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                    {isAr ? "لم يتم العثور على المسار المطلوب. هذا عطل افتراضي ومثالي لإظهار قدرتنا على معالجة الأخطاء وتحويل الزائر إلى وجهات موثوقة ومفيدة!" : "The requested resource has expired or shifted. This interactive 404 panel demonstrates full error handling compliance."}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-900 text-start space-y-4 shadow-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-indigo-400" /> RECOVERY TERMINAL v1.0.8</span>
                    <span className="text-emerald-400">READY</span>
                  </div>
                  
                  {/* Interactive game or script recovery block */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono text-slate-300">
                      &gt; database_replication --verify-checksums
                    </p>
                    <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
                      [INFO] Scanning replica blocks in SST/GST timezone... <br />
                      [OK] Core portfolio databases are safe: <strong>Database Master</strong> and <strong>Redis Cache Hot Buffers</strong> active.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <button
                      id="404-recovery-btn"
                      onClick={() => {
                        setCurrentPage("home");
                      }}
                      className="px-4 py-2 rounded-lg font-mono text-[10px] font-bold bg-indigo-600 hover:bg-indigo-505 text-white transition-all cursor-pointer shadow-sm"
                    >
                      ⚡ Re-connect & Return Home
                    </button>
                    <button
                      id="404-show-audit-btn"
                      onClick={() => setCurrentPage("services")}
                      className="px-4 py-2 rounded-lg font-mono text-[10px] font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-all"
                    >
                      🔍 Launch Services Review
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    {isAr ? "الروابط السريعة الموصى بها للاكتشاف" : "Helpful Paths To Stay on Track"}
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    <button
                      onClick={() => setCurrentPage("projects")}
                      className="px-3.5 py-1.5 text-xs rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-indigo-400 font-bold hover:bg-indigo-950/60"
                    >
                      📁 {isAr ? "استعراض دراسات الحالة" : "Read Case Studies"}
                    </button>
                    <button
                      onClick={() => setCurrentPage("blogs")}
                      className="px-3.5 py-1.5 text-xs rounded-xl bg-indigo-950/20 border border-indigo-900/40 text-indigo-400 font-bold hover:bg-indigo-950/60"
                    >
                      ✍️ {isAr ? "قراءة مقالات الباك-اند" : "Read Technical Blogs"}
                    </button>
                    <button
                      onClick={() => setCurrentPage("contact")}
                      className="px-3.5 py-1.5 text-xs rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 font-bold hover:bg-emerald-950/60"
                    >
                      💬 {isAr ? "حجز جلسة استشارية فوتية" : "Book Fast GCC Call"}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- FOOTER CONTENT --- */}
      <footer className={`mt-20 border-t pt-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs ${
        isDark ? "border-indigo-950/50 text-slate-500" : "border-slate-200 text-slate-500"
      }`}>
        {/* --- PREMIUM INTERACTIVE SOCIAL SHARING & CONNECT PLUGINS --- */}
        <div className={`mb-10 p-6 rounded-2xl border text-start ${
          isDark ? "bg-[#100c28]/70 border-indigo-950/80" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1 max-w-xl">
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                🔗 {isAr ? "نشر المعرض والروابط المهنية" : "SHARE HUB & EXTERNAL REACH"}
              </span>
              <h4 className={`text-base sm:text-lg font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                {isAr ? "توصيل شبكات التواصل الاجتماعي المهنية ومشاركة المعرض" : "Connect Social Handles & Share This Portfolio"}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr 
                  ? "ادعم انتشار المعرض بمشاركته مع مدراء التوظيف والشركات الناشئة في دول الخليج ومصر، أو قم بزيارة مستودع الأكواد والصفحة الشخصية للمهندس عبدالرحمن طاهر مباشرة."
                  : "Help spread the word to hiring managers or engineering executives looking for database and backend experts. Link directly or share on networks."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Copy Link button */}
              <button
                id="copy-portfolio-link-btn"
                onClick={() => {
                  if (isBrowser) {
                    navigator.clipboard.writeText("https://abdotaher.me/");
                    alert(isAr ? "تم إرشاد وحفظ الرابط الحصري بالحافظة!" : "Portfolio link copied to clipboard!");
                  }
                }}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono bg-indigo-600 hover:bg-indigo-500 text-white transition-all cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{isAr ? "نسخ رابط الموقع" : "Copy Link"}</span>
              </button>

              {/* LinkedIn URL anchor */}
              <a
                id="external-linkedin-anchor"
                href="https://www.linkedin.com/in/abdelrhman-taher"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all ${
                  isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-indigo-600"
                }`}
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn</span>
              </a>

              {/* GitHub URL anchor */}
              <a
                id="external-github-anchor"
                href="https://github.com/abdo-taher"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all ${
                  isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-indigo-600"
                }`}
              >
                <GitHubIcon className={`w-3.5 h-3.5 ${isDark ? "text-white" : "text-slate-800"}`} />
                <span>GitHub</span>
              </a>

              {/* X / Twitter Profile */}
              <a
                id="external-x-anchor"
                href="https://x.com/Abderhman_taher"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all ${
                  isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-indigo-600"
                }`}
                title="Follow on X / Twitter"
              >
                <XIcon className={`w-3.5 h-3.5 ${isDark ? "text-white" : "text-slate-800"}`} />
                <span>X / Twitter</span>
              </a>

              {/* Share on X Button */}
              <a
                id="share-twitter-link"
                href="https://x.com/intent/tweet?text=Check%20out%20Abdulrahman%20Taher%27s%20Backend%20Portfolio!%20Laravel%20%7C%20Database%20%7C%20APIs%20%E2%80%94%20https%3A%2F%2Fabdotaher.me"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono border transition-all ${
                  isDark ? "bg-[#13112a] border-indigo-950 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-600 hover:text-indigo-600"
                }`}
                title="Share on X / Twitter"
              >
                <XIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Share</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center py-6 border-b border-dashed border-slate-700/20 mb-6">
          <div className="text-start space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">Trust & Compliance Registry</span>
            <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
              Certified GCC consultancy, aligned with Saudi Personal Data Protection Law (PDPL), secure transactions, and zero-trust engineering standards.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 font-mono font-bold text-[11px]">
            <button 
              id="policy-privacy-btn"
              onClick={() => setActivePolicyModal("privacy")} 
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              🔒 {isAr ? "سياسة الخصوصية وقانون البيانات" : "Privacy Policy"}
            </button>
            <button 
              id="policy-security-btn"
              onClick={() => setActivePolicyModal("security")} 
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              🛡️ {isAr ? "دليل معايير الأمان التقني" : "Database Security Protocol"}
            </button>
            <button 
              id="policy-sla-btn"
              onClick={() => setActivePolicyModal("sla")} 
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              📜 {isAr ? "ضمان استمرارية الخدمة SLA" : "Deployment SLA"}
            </button>
          </div>

          <div className="text-end">
            <button
              id="simulate-404-footer-button"
              onClick={() => { setCurrentPage("404"); setSelectedBlogId(null); }}
              className="px-3.5 py-1.5 rounded-lg font-mono text-[10px] font-bold border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/50 transition-all cursor-pointer"
            >
              💥 {isAr ? "محاكاة خطأ خادم 404" : "Simulate 404 Server Error"}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
          <p className="font-mono font-bold text-slate-500">
            © 2026 {isAr ? "عبدالرحمن طاهر // جميع الحقوق محفوظة لصحفة الباك-اند والخليج" : "Abdulrahman Taher // All Rights Reserved for GCC Backend Engine"}
          </p>
          <div className="flex flex-wrap gap-3 font-mono font-bold text-[11px] text-slate-500">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "projects", label: "Portfolio" },
              { id: "blogs", label: "Blogs" },
              { id: "contact", label: "Contact" }
            ].map(item => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id as any);
                  setSelectedBlogId(null);
                }}
                className="hover:text-indigo-500 uppercase transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* --- TRUST & COMPLIANCE MODAL OVERLAYS --- */}
      <AnimatePresence>
        {activePolicyModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActivePolicyModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`w-full max-w-2xl rounded-2xl border p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto relative ${
                isDark ? "bg-[#110e26] border-indigo-900/60 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActivePolicyModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-850/20 text-slate-400 transition-colors cursor-pointer"
              >
                ✕
              </button>

              {activePolicyModal === "privacy" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Shield className="w-6 h-6" />
                    <h3 className="font-space font-extrabold text-xl">{isAr ? "سياسة خصوصية البيانات والاتفاقية التنظيمية" : "Data Privacy & Regulatory Accord"}</h3>
                  </div>
                  <hr className="border-slate-800" />
                  <div className="text-xs sm:text-sm space-y-3 leading-relaxed text-slate-400 text-start">
                    <p className="font-bold text-slate-300">
                      {isAr ? "1. الالتزام بقانون حماية البيانات الشخصية السعودي (PDPL) والاتحاد الأوروبي (GDPR)" : "1. KSA Personal Data Protection Law (PDPL) & GDPR Alignment"}
                    </p>
                    <p>
                      {isAr ? "نحن نلتزم تماماً بحوكمة وحماية بيانات العملاء والمستخديمن في مصر ودول مجلس التعاون الخليجي. لا يتم حفظ أو تجميع ملفات تعريف حساسة دون موافقة مسبقة ومقررة." : "We are strictly aligned with KSA personal data governance policies. We do not aggregate or distribute any client metadata without prior explicit consent."}
                    </p>
                    <p className="font-bold text-slate-300">
                      {isAr ? "2. حوكمة واختبار الثغرات الأمنية" : "2. Penetration Vetting"}
                    </p>
                    <p>
                      {isAr ? "كجزء من الهندسة المعمارية، نقوم بفحص حقن الاستعلامات وحماية معبر الدفع، وضمان التشفير الكامل بين الخوادم." : "We execute rigorous threat modeling, ensuring that transactional gateways are secured with TLS encryption, double-spent locks, and cryptographic keys."}
                    </p>
                    <p className="font-bold text-slate-300">
                      {isAr ? "3. نطاقات نقل ومعالجة البيانات" : "3. Database Transmission Boundary"}
                    </p>
                    <p>
                      {isAr ? "جميع قواعد البيانات والـ Database تلتزم بقيود الحظر الفوري للكيانات مجهولة الهوية وجدار الحماية المتقدم (WAF) لتقليل هجمات حجب الخدمة." : "All databases employ automated IP whitelisting restrictions and Web Application Firewalls (WAF) to defend against DDOS vectors."}
                    </p>
                  </div>
                </div>
              )}

              {activePolicyModal === "security" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Shield className="w-6 h-6" />
                    <h3 className="font-space font-extrabold text-xl">{isAr ? "بروتوكول الأمان وتأمين قواعد البيانات" : "Database Security & API Protocol"}</h3>
                  </div>
                  <hr className="border-slate-800" />
                  <div className="text-xs sm:text-sm space-y-3 leading-relaxed text-slate-400 text-start">
                    <p className="font-bold text-slate-300">
                      {isAr ? "1. حماية REST APIs من هجمات الحقن والـ XSS" : "1. OWASP Top 10 API Defense"}
                    </p>
                    <p>
                      {isAr ? "تشمل تطبيقاتنا حواجز صارمة وفلترة للمدخلات باستخدام كشافات برمجية مسبقة لمنع حقن السوكيت أو قواعد البيانات SQL Injection." : "We embed parameterized queries, automated data sanitizations, and strict request-throttling middleware to shield API endpoints."}
                    </p>
                    <p className="font-bold text-slate-300">
                      {isAr ? "2. معايير إدارة مفاتيح الـ API وطلبات الدفع" : "2. Secured Key Vault & Webhook Signatures"}
                    </p>
                    <p>
                      {isAr ? "لا نترك سيكريت أو مفتاح تشغيل في كود العميل أبداً. يُدار كل شيء في الخادم السحابي عبر (Env Secrets Vault) مع تشفير المفاتيح والتحقق من توقيع الويب هوك الخاص بمدى وسترايب تلقائياً." : "API keys are safely containerized inside server env variables. Webhook validation signatures for Stripe/Mada undergo double crypt-checking to prevent duplicate payments."}
                    </p>
                    <p className="font-bold text-slate-300">
                      {isAr ? "3. التخزين المؤقت وحظر الكوكيز الخبيثة" : "3. Redis Sanitization"}
                    </p>
                    <p>
                      {isAr ? "ندعم حماية خوادم الـ Redis Sentinel ضد محاولات الاستعلام المكرر والتحميل الزائد لإحباط هجمات حجب الخدمة تماماً." : "Redis database sentinel arrays are reinforced with memory limitations and connection limits to stay resilient during attack vectors."}
                    </p>
                  </div>
                </div>
              )}

              {activePolicyModal === "sla" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Cpu className="w-6 h-6" />
                    <h3 className="font-space font-extrabold text-xl">{isAr ? "اتفاقية ضمان جاهزية الخادم (SLA)" : "Deployment SLA Agreement"}</h3>
                  </div>
                  <hr className="border-slate-800" />
                  <div className="text-xs sm:text-sm space-y-3 leading-relaxed text-slate-400 text-start">
                    <p className="font-bold text-slate-300">
                      {isAr ? "1. معدل توفر وموثوقية %99.9" : "1. 99.9% Server Uptime Guarantee"}
                    </p>
                    <p>
                      {isAr ? "نقوم ببناء المعمارية التقنية للمشاريع مع تهيئة استرداد الكوارث التلقائي (Auto-healing) ومراقبة مستويات المعالجة والذاكرة في السحابة لتبقى خدماتك نشطة 24/7." : "Our engineered backend microservices incorporate cloud health checks and failovers, guaranteeing 99.9% uptime for business critical systems."}
                    </p>
                    <p className="font-bold text-slate-300">
                      {isAr ? "2. استجابة فائقة تحت زمن 200ms" : "2. Sub-200ms Response Constraint"}
                    </p>
                    <p>
                      {isAr ? "نصمم استعلامات قاعدة البيانات ونظم الكاش بطريقة تضمن جلب وتصدير البيانات في زمن قياسي يقل عن 200 ميللي ثانية لسرعة تصفح سلسة للشركات الكبرى." : "We optimize query plans, isolate transaction ledgers, and deploy cache wrappers to enforce sub-200ms TTFB metrics during join traffic peaks."}
                    </p>
                    <p className="font-bold text-slate-300">
                      {isAr ? "3. التوسع السريع (Scale in Seconds)" : "3. Elastic Server Scaling"}
                    </p>
                    <p>
                      {isAr ? "نربط الخوادم بأنظمة Docker و Kubernetes للتوسع التلقائي الفوري لمجابهة زيادة الزوار المتزامنة دون توقف الخدمة ثانية واحدة." : "Architected systems expand automatically using clustered container namespaces to mitigate performance degradation during flash marketing campaigns."}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActivePolicyModal(null)}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono transition-colors cursor-pointer"
                >
                  {isAr ? "أوافق وأغلق" : "Close Compliance Guide"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
