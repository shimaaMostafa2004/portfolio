"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageSquare, Award, ExternalLink, CheckCircle } from "lucide-react";
import { usePageContext } from "@/components/usePageContext";
import { translations } from "@/src/translations";

export function ContactPageClient() {
  const { lang, isAr, isDark } = usePageContext();
  const t = translations[lang];

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitStatus("success");
      setFormName(""); setFormEmail(""); setFormMsg("");
    }, 1200);
  };

  const inputCls = `w-full border rounded-xl px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
    isDark ? "bg-slate-900/60 border-indigo-950 text-white placeholder-slate-500"
           : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
  }`;

  return (
    <div className="space-y-8 sm:space-y-12 py-4 sm:py-6">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 px-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">{t.navContact}</span>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
          {t.contactTitle}
        </h1>
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.contactSub}</p>
      </div>

      {/* Form + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

        {/* Form card */}
        <div className={`lg:col-span-7 rounded-xl sm:rounded-2xl border p-5 sm:p-8 ${
          isDark ? "bg-[#13112a] border-indigo-950/60 shadow-xl" : "bg-white border-slate-200 shadow-md"
        }`}>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

            {[
              { label: `${t.contactFormName} *`, type: "text", required: true, value: formName, set: setFormName, placeholder: isAr ? "حسن الرويلي / ريادي تقني" : "Faisal Al-Otaibi / Founder" },
              { label: `${t.contactFormEmail} *`, type: "email", required: true, value: formEmail, set: setFormEmail, placeholder: "faisal@gulfventures.sa" },
            ].map((field) => (
              <div key={field.label} className="flex flex-col gap-1 sm:gap-1.5">
                <label className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  value={field.value}
                  onChange={(e) => field.set(e.target.value)}
                  className={inputCls}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1 sm:gap-1.5">
              <label className={`text-xs font-mono font-bold tracking-wider uppercase ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {t.contactFormMsg}
              </label>
              <textarea
                value={formMsg}
                rows={4}
                onChange={(e) => setFormMsg(e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder={isAr ? "مؤشرات البطء، تفاصيل النظام الحالي، البوابات البنكية المستهدفة..."
                                   : "Your current systems architecture, slow tables, or gateway integration tasks..."}
              />
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="p-3.5 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5 font-bold">
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                  <span>{t.contactFormSuccess}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-6 rounded-xl border border-indigo-500/30 transition-all flex items-center justify-center gap-2">
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /><span>{t.contactFormSubmitting}</span></>
              ) : (
                <span>{t.contactFormSubmit}</span>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">

          {/* Direct channels */}
          <div className={`p-5 sm:p-6 rounded-xl sm:rounded-2xl border space-y-4 sm:space-y-5 ${
            isDark ? "bg-[#13112a] border-indigo-950/60 shadow-lg" : "bg-white border-slate-200"
          }`}>
            <h2 className={`text-sm sm:text-base font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
              {isAr ? "قنوات التواصل المباشرة والواتساب" : "Direct Channels"}
            </h2>
            <div className="space-y-2.5 sm:space-y-3.5">
              {[
                { href: "mailto:abdotaher093@gmail.com", icon: <Mail className="w-5 h-5 text-indigo-500" />, label: "EMAIL ADDRESS", value: "abdotaher093@gmail.com", valueColor: "text-slate-300" },
                { href: "https://wa.me/201008275881", icon: <MessageSquare className="w-5 h-5 text-emerald-500" />, label: "WHATSAPP GCC DIRECT", value: "+201008275881", valueColor: "text-emerald-400" },
                { href: "https://www.upwork.com/freelancers/~018ae3e5cfaa1804d1", icon: <Award className="w-5 h-5 text-emerald-500" />, label: "UPWORK CONTRACT HUB", value: "Verified Account Profile", valueColor: "text-emerald-400" },
              ].map((ch) => (
                <a key={ch.href} href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-2 transition-colors ${
                    isDark ? "bg-[#090714] border-indigo-950 hover:bg-indigo-950/35" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                  }`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0">{ch.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] sm:text-xs text-slate-500 font-mono">{ch.label}</span>
                      <span className={`text-xs font-bold truncate ${ch.valueColor}`}>{ch.value}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Timezone */}
          <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border space-y-2 sm:space-y-3 ${
            isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200"
          }`}>
            <h3 className="text-xs font-mono font-bold uppercase text-indigo-400">Timezone Compatibility</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-bold">
              ✔️ Compatible with Saudi Standard Time (SST) & UAE Gulf Time (GST).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-bold">
              ✔️ Weekly deliveries via Sprint-logs and Slack/Zoom sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
