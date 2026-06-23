"use client";

import Link from "next/link";
import { Layers, Database, Settings, Rocket, Cpu, Globe2 } from "lucide-react";
import { usePageContext } from "@/components/usePageContext";
import { translations } from "@/src/translations";

const serviceIcons = [Layers, Database, Settings, Rocket, Cpu, Globe2];

const serviceDetails = [
  ["Enterprise API Structure", "Admin Panels & Custom Dashboards", "REST / Webhooks / GraphQL / SDK integrations"],
  ["PGSQL Composite Indexes Tuning", "MySQL raw subqueries refactoring", "Multi-tenant data structures, normalization"],
  ["JWT / OAuth Security & Role Permissions", "Prevent double spending on invoices", "Payment gateways (Mada, Tap, Moyasar, Paymob, Stripe)"],
  ["Redis cache wrappers & buffers", "Active worker queues & task distribution", "Containerization (Docker, AWS ECS)"],
  ["AI Agents & assistant loops (Gemini / OpenAI)", "Structured output & prompt engineering", "Automated background task classification"],
  ["SMS integrations (Twilio, Unifonic, Mobily)", "Maps & Routing (Google Maps API)", "Logistics trackers, Webhook sync buffers"],
];

export function ServicesPageClient() {
  const { lang, isAr, isDark } = usePageContext();
  const t = translations[lang];
  const prefix = isAr ? "" : "/en";

  const services = [
    { title: t.servicesItem1Title, desc: t.servicesItem1Desc },
    { title: t.servicesItem2Title, desc: t.servicesItem2Desc },
    { title: t.servicesItem3Title, desc: t.servicesItem3Desc },
    { title: t.servicesItem4Title, desc: t.servicesItem4Desc },
    { title: t.servicesItem5Title, desc: t.servicesItem5Desc },
    { title: t.servicesItem6Title, desc: t.servicesItem6Desc },
  ];

  return (
    <div className="space-y-10 sm:space-y-12 py-4 sm:py-6">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 px-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">{t.servicesLabel}</span>
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-space ${isDark ? "text-white" : "text-slate-800"}`}>
          {t.servicesTitle}
        </h1>
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.servicesDesc}</p>
      </div>

      {/* Service cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {services.map((svc, idx) => {
          const Icon = serviceIcons[idx];
          return (
            <article key={idx} className={`p-5 sm:p-6 rounded-2xl border transition-all hover:scale-[1.01] ${
              isDark ? "bg-[#13112a] border-indigo-950/60" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <span className="p-2.5 sm:p-3 bg-indigo-500/10 border border-indigo-500/15 rounded-xl text-indigo-400 inline-flex mb-3 sm:mb-4">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
              </span>
              <h2 className={`text-base sm:text-lg font-bold tracking-tight font-space mb-2 ${isDark ? "text-white" : "text-slate-800"}`}>
                {svc.title}
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-3 sm:mb-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {svc.desc}
              </p>
              <div className={`p-3 sm:p-3.5 rounded-lg text-[11px] sm:text-xs font-mono border space-y-1 text-slate-300 ${
                isDark ? "bg-slate-900/40 border-indigo-950/60" : "bg-slate-900/80 border-indigo-950/40"
              }`}>
                {serviceDetails[idx].map((d) => <div key={d}>✔️ {d}</div>)}
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA */}
      <div className={`p-6 sm:p-8 rounded-2xl border text-center ${isDark ? "bg-[#13112a] border-indigo-950/50" : "bg-indigo-50/50 border-indigo-100"}`}>
        <h2 className={`text-base sm:text-lg font-bold font-space ${isDark ? "text-white" : "text-slate-800"}`}>
          {isAr ? "تحتاج خطة تشغيل تفصيلية لتوسيع نظامك؟" : "Looking for scalable API engineering consulting?"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto leading-relaxed">
          {isAr ? "خلال بضعة أيام، يمكنني مراجعة مستودع الأكواد وفهرس قواعد البيانات الحالي."
                 : "I provide rapid, hands-on architectural code diagnostics and API performance refactoring for Laravel and NestJS systems."}
        </p>
        <Link href={`${prefix}/contact`}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-6 rounded-lg mt-4 sm:mt-5 inline-block shadow-sm transition-all">
          {isAr ? "اتصل واحجز جلستك" : "Request Advisory Session"}
        </Link>
      </div>
    </div>
  );
}
