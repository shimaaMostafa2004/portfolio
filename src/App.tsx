import React, { useState, useEffect, FormEvent } from "react";
import { translations, sampleProjects } from "./translations";
import { blogArticles, BlogArticle } from "./data/blogs";
import { BottleneckEstimator } from "./components/BottleneckEstimator";
import { ProjectCard } from "./components/ProjectCard";
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
  Bookmark
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"ar" | "en">("ar"); 
  const t = translations[lang];
  const isAr = lang === "ar";

  // Separation of Pages / Tab Router state
  const [currentPage, setCurrentPage] = useState<"home" | "about" | "services" | "projects" | "blogs" | "contact">("home");

  // Two Themes Support (Light / Dark Model Toggle)
  const [theme, setTheme] = useState<"light" | "dark" | any>(() => {
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

  // Theme synchronization
  useEffect(() => {
    localStorage.setItem("abdu-portfolio-theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Smooth scroll to top when page navigation or selected blog changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedBlogId]);

  // Premium Technical SEO: Dynamic Title, html attributes, and dynamic JSON-LD Schema
  // Hash Routing and Synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#home" || hash === "#") {
        setCurrentPage("home");
        setSelectedBlogId(null);
      } else if (hash === "#about") {
        setCurrentPage("about");
        setSelectedBlogId(null);
      } else if (hash === "#services") {
        setCurrentPage("services");
        setSelectedBlogId(null);
      } else if (hash === "#projects") {
        setCurrentPage("projects");
        setSelectedBlogId(null);
      } else if (hash === "#blogs") {
        setCurrentPage("blogs");
        setSelectedBlogId(null);
      } else if (hash === "#contact") {
        setCurrentPage("contact");
        setSelectedBlogId(null);
      } else if (hash.startsWith("#blog-")) {
        const blogId = hash.replace("#blog-", "");
        setCurrentPage("blogs");
        setSelectedBlogId(blogId);
      } else if (hash.startsWith("#blogs/")) {
        const blogId = hash.replace("#blogs/", "");
        setCurrentPage("blogs");
        setSelectedBlogId(blogId);
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    let targetHash = "";
    if (currentPage === "home") {
      targetHash = "";
    } else if (currentPage === "blogs" && selectedBlogId) {
      targetHash = `#blog-${selectedBlogId}`;
    } else {
      targetHash = `#${currentPage}`;
    }

    const currentHash = window.location.hash;
    const normalizedCurrent = currentHash.replace(/^#/, "");
    const normalizedTarget = targetHash.replace(/^#/, "");

    const isEquivalent = (normalizedCurrent === "" && normalizedTarget === "") || 
                         (normalizedCurrent === "home" && normalizedTarget === "") ||
                         (normalizedCurrent === "" && normalizedTarget === "home") ||
                         (normalizedCurrent === normalizedTarget);

    if (!isEquivalent) {
      window.location.hash = targetHash;
    }
  }, [currentPage, selectedBlogId]);

  // Premium Technical SEO: Dynamic Title, Meta Tags, and Structured JSON-LD Schema
  useEffect(() => {
    let title = "";
    let desc = "";
    let kws = "";
    let image = "https://abdotaher.me/image.png";
    let pageUrl = "https://abdotaher.me/";

    if (currentPage === "blogs" && selectedBlogId) {
      const article = blogArticles.find(b => b.id === selectedBlogId);
      if (article) {
        title = isAr ? `${article.titleAr} | عبدالرحمن طاهر` : `${article.titleEn} | Abdulrahman Taher`;
        desc = isAr ? article.excerptAr : article.excerptEn;
        kws = article.keywords.join(", ");
        image = article.image;
        pageUrl = `https://abdotaher.me/#blog-${article.id}`;
      }
    } else {
      if (currentPage === "home") {
        title = isAr 
          ? "عبدالرحمن طاهر | مطور لارافيل أول ومهندس باك اند محترف"
          : "Abdulrahman Taher | Senior Laravel Developer & Backend Engineer";
        desc = isAr
          ? "مهندس باك اند لارافيل أول متخصص في بناء واجهات برمجية (APIs) قابلة للتوسع، معمارية SaaS، تحسين أداء قواعد البيانات، وتصميم الأنظمة البرمجية النظيفة."
          : "Senior Laravel backend engineer specializing in scalable APIs, SaaS backend architecture, database performance tuning, and clean system design.";
        kws = isAr
          ? "مطور لارافيل, مهندس باك اند, معمارية APIs, تطوير باك اند لارافيل, خبير لارافيل مصر, السعودية, الخليج, دبي"
          : "Laravel Developer, Backend Engineer, API Architecture, SaaS Backend, Remote Laravel Expert, Egypt, GCC, Saudi Arabia, Dubai";
        pageUrl = "https://abdotaher.me/";
      } else if (currentPage === "about") {
        title = isAr
          ? "من أنا | عبدالرحمن طاهر - مبرمج لارافيل أول"
          : "About Me | Abdulrahman Taher - Senior Laravel Developer";
        desc = isAr
          ? "تعرف على عبدالرحمن طاهر، مهندس باك اند ومطور لارافيل أول. أكثر من 5 سنوات من الخبرة في تصميم معمارية برمجية صلبة وآمنة للشركات."
          : "Learn more about Abdulrahman Taher, a senior Laravel backend developer. Over 5 years of experience building secure, scalable backend architectures.";
        kws = isAr
          ? "من هو عبدالرحمن طاهر, خبرة مبرمج لارافيل, مهندس باك اند مصر, سيرة ذاتية مبرمج"
          : "About Abdulrahman Taher, Laravel Developer career, Backend Engineer profile, Egypt Laravel expert";
        pageUrl = "https://abdotaher.me/#about";
      } else if (currentPage === "services") {
        title = isAr
          ? "الخدمات الهندسية | عبدالرحمن طاهر - مهندس باك اند لارافيل"
          : "Backend Services | Abdulrahman Taher - Laravel Developer";
        desc = isAr
          ? "خدمات هندسية متكاملة للباك اند: تطوير Laravel مخصص، تحسين أداء قواعد البيانات، ربط بوابات الدفع الإقليمية (مدى، Moyasar)، وأتمتة الذكاء الاصطناعي."
          : "Professional backend engineering services: custom Laravel development, database performance tuning, payment gateway integration, and AI automation.";
        kws = isAr
          ? "خدمات لارافيل, تحسين قواعد البيانات, ربط بوابة مدى, أتمتة الذكاء الاصطناعي, مبرمج باك اند"
          : "Laravel services, Database tuning, payment integration GCC, Redis caching, AI integration";
        pageUrl = "https://abdotaher.me/#services";
      } else if (currentPage === "projects") {
        title = isAr
          ? "معرض المشاريع ودراسات الحالة | عبدالرحمن طاهر"
          : "Portfolio & Case Studies | Abdulrahman Taher";
        desc = isAr
          ? "استعرض دراسات الحالة الهندسية وأنظمة الباك اند التي قام عبدالرحمن طاهر بتطويرها. نتائج مثبتة في توسيع الأنظمة وتأمين المدفوعات."
          : "Explore technical case studies and backend systems built by Abdulrahman Taher. Proven results in scaling APIs, secure payment systems, and databases.";
        kws = isAr
          ? "مشاريع لارافيل, معرض أعمال مبرمج باك اند, دراسات حالة برمجية, أنظمة الدفع"
          : "Laravel projects, Backend portfolio, Case studies database, SaaS architecture portfolio";
        pageUrl = "https://abdotaher.me/#projects";
      } else if (currentPage === "blogs") {
        title = isAr
          ? "المدونة التقنية ومقالات السيو | عبدالرحمن طاهر"
          : "Backend Engineering Blog & SEO Hub | Abdulrahman Taher";
        desc = isAr
          ? "اقرأ مقالات هندسية معمقة حول توسيع أنظمة Laravel، تحسين أداء قواعد بيانات PostgreSQL، والربط الآمن لبوابات الدفع بالخليج."
          : "Read in-depth articles on scaling Laravel, database performance tuning, secure payment integrations, and cloud architectures.";
        kws = isAr
          ? "مدونة تقنية باك اند, مقالات لارافيل, تحسين أداء PostgreSQL, سيو المواقع التقنية"
          : "Backend blog, Laravel scaling blog, Database optimization articles, technical SEO tips";
        pageUrl = "https://abdotaher.me/#blogs";
      } else if (currentPage === "contact") {
        title = isAr
          ? "تواصل واستشارة فنية | عبدالرحمن طاهر"
          : "Contact & Consultation | Abdulrahman Taher";
        desc = isAr
          ? "تواصل مع المهندس عبدالرحمن طاهر لمناقشة مشروع Laravel جديد، أو طلب مراجعة فنية للأنظمة، أو استشارة لحل مشاكل الأداء وقواعد البيانات."
          : "Get in touch with Abdulrahman Taher for custom Laravel development, architectural audits, database performance optimization, or freelance consultations.";
        kws = isAr
          ? "توظيف مطور لارافيل, تواصل مع مبرمج باك اند, استشارة تقنية مجانية, حجز جلسة استشارية"
          : "Hire Laravel developer, Contact backend engineer, consult Laravel architect, remote PHP developer";
        pageUrl = "https://abdotaher.me/#contact";
      }
    }

    document.title = title;
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";

    const setMetaTag = (attrName: "name" | "property", attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    setMetaTag("name", "description", desc);
    setMetaTag("name", "keywords", kws);
    
    // Open Graph
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", desc);
    setMetaTag("property", "og:image", image);
    setMetaTag("property", "og:url", pageUrl);

    // Twitter
    setMetaTag("property", "twitter:title", title);
    setMetaTag("property", "twitter:description", desc);
    setMetaTag("property", "twitter:image", image);
    setMetaTag("property", "twitter:url", pageUrl);

    // Canonical link
    setLinkTag("canonical", pageUrl);

    // Dynamic JSON-LD Structured Schema Injection
    let schema: any;
    if (currentPage === "blogs" && selectedBlogId) {
      const article = blogArticles.find(b => b.id === selectedBlogId);
      if (article) {
        const isoDate = (() => {
          try {
            const d = new Date(article.dateEn);
            if (!isNaN(d.getTime())) {
              return d.toISOString().split("T")[0];
            }
          } catch (e) {}
          return "2026-06-12";
        })();
        schema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": pageUrl
          },
          "headline": isAr ? article.titleAr : article.titleEn,
          "description": isAr ? article.excerptAr : article.excerptEn,
          "image": article.image,
          "datePublished": isoDate,
          "author": {
            "@type": "Person",
            "name": "Abdulrahman Taher",
            "url": "https://abdotaher.me/"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Abdulrahman Taher Portfolio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://abdotaher.me/image.png"
            }
          },
          "keywords": article.keywords.join(", ")
        };
      }
    }
    
    if (!schema) {
      schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Abdulrahman Taher",
        "jobTitle": "Senior Laravel Backend Engineer",
        "url": "https://abdotaher.me/",
        "sameAs": [
          "https://www.upwork.com/freelancers/~018ae3e5cfaa1804d1",
          "https://wa.me/201008275881",
          "mailto:abdotaher093@gmail.com"
        ],
        "knowsLanguage": ["Arabic", "English"],
        "knowsAbout": [
          "Laravel API Architecture",
          "PostgreSQL Performance Tuning",
          "RabbitMQ & Redis queue processors",
          "Payment integration Saudi Arabia Mada Gateway"
        ],
        "description": isAr 
          ? "مطور باك اند محترف في مصر يبني أنظمة مخصصة وواجهات برمجية منخفضة زمن الاستجابة لمؤسسات الأعمال في الخليج العربي."
          : "Professional Backend developer in Egypt building custom systems and low-latency APIs for GCC business enterprises."
      };
    }

    const scriptId = "developer-seo-schema";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);
  }, [lang, isAr, currentPage, selectedBlogId]);

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
              <span className={`font-space font-extrabold text-base tracking-tight leading-tight transition-colors ${
                isDark ? "text-white group-hover:text-indigo-400" : "text-slate-800 group-hover:text-indigo-600"
              }`}>
                {isAr ? "عبدالرحمن طاهر" : "Abdulrahman Taher"}
              </span>
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
              { id: "blogs", labelAr: "المدونة والسيو", labelEn: "Blog Hub" },
              { id: "contact", labelAr: "تواصل واستشارة", labelEn: "Contact" }
            ].map((page) => {
              const isActive = currentPage === page.id;
              return (
                <button
                  key={page.id}
                  id={`nav-link-${page.id}`}
                  onClick={() => {
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
                </button>
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
          <button
            key={item.id}
            id={`mobile-rail-${item.id}`}
            onClick={() => { setCurrentPage(item.id as any); setSelectedBlogId(null); }}
            className={`px-2.5 py-1 text-xs font-bold rounded-md ${
              currentPage === item.id
                ? "bg-indigo-600 text-white"
                : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-indigo-600"
            }`}
          >
            {isAr ? item.l : item.id.toUpperCase()}
          </button>
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
                      🚀 Senior Laravel Architect for GCC
                    </span>

                    <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight font-space ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}>
                      {t.heroTitle}
                    </h1>

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
                        <span>{isAr ? "اقرأ المدونة والسيو" : "Read Blog & SEO Tools"}</span>
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
                    {isAr ? "أعمل بنموذج خطة عمل هندسية واضحة لتأمين الاستفسارات، وتوسيع سيرفرات PHP/Laravel، ومراجعة جاهزية الأنظمة لتطبيقات التوصيل والمدفوعات والمستأجرين المتعددين." : "Deploy clean, production-certified PHP/Laravel microservice architectures, integrate and reconcile financial ledger webhooks."}
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
                  <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-855"}`}>
                    {t.aboutTitle}
                  </h1>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {isAr ? "نبذة كاملة ومسار خبرة المهندس عبدالرحمن طاهر في تلبية الاحتياجات التقنية لدول الخليج للباك-إند" : "Detailed corporate briefing on Eng. Abdulrahman Taher's backend specialization profile."}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                  <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 space-y-6 ${
                    isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <h3 className={`text-xl font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                      {isAr ? "أنا مطور Laravel مكرس لتأكيد إنتاجية الأنظمة" : "Senior Laravel Specialization Overview"}
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
                  <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-855"}`}>
                    {t.servicesTitle}
                  </h1>
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
                      <div>✔️ Laravel Enterprise Structure</div>
                      <div>✔️ Advanced Laravel Admin Panels & Nova / Filament</div>
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
                      <div>✔️ Active worker queues (Laravel Horizon queues)</div>
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
                    {isAr ? "خلال بضعة أيام، يمكنني مراجعة مستودع الأكواد (Repository Checkup)، وفهرس PostgreSQL الحالي، وتخليص العمليات المتعرجة لحقن كود أنظف وأكثر أماناً وسرعة." : "I provide rapid, hands-on architectural code diagnostics, DB query indexing refactoring, and asynchronous job optimization blueprints."}
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
                    <h1 className={`text-3xl font-bold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
                      {isAr ? "دراسات حالة فنية وحلول برمجية" : "Technical Case Studies & Scaled Solutions"}
                    </h1>
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
                      { id: "Laravel", label: t.projectsFilterLaravel },
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
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                            <span className="text-xs uppercase bg-indigo-600 px-3 py-1 rounded-full font-mono font-bold tracking-widest text-[#a5b4fc]">
                              {article.category.toUpperCase()}
                            </span>
                            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-space leading-tight">
                              {isAr ? article.titleAr : article.titleEn}
                            </h1>
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
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6366f1]">{isAr ? "مقالات هندسية وسيو متكامل" : "Enterprise System Architecture Blogs"}</span>
                      <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-855"}`}>
                        {isAr ? "مدونة الباك-إند وتأصيل السيو الهندسي" : "The Backend & Regional System Engineering Blog"}
                      </h1>
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
  "expertise": "Laravel System Scaling",
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
                          { id: "laravel", lAr: "لارافيل", lEn: "Laravel Hub" },
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
                  <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-space uppercase ${isDark ? "text-white" : "text-slate-855"}`}>
                    {t.contactTitle}
                  </h1>
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

          </motion.div>
        </AnimatePresence>
      </main>

      {/* --- FOOTER CONTENT --- */}
      <footer className={`mt-20 border-t pt-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs ${
        isDark ? "border-indigo-950/50 text-slate-500" : "border-slate-200 text-slate-500"
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
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
              <button 
                key={item.id}
                onClick={() => { setCurrentPage(item.id as any); setSelectedBlogId(null); }}
                className="hover:text-indigo-500 uppercase transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}
