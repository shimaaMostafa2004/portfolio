"use client";

import React, { useState } from "react";
import { TranslationDict } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Sliders, AlertTriangle, CheckCircle, Database } from "lucide-react";

interface Props {
  t: TranslationDict;
  isAr: boolean;
  theme: "light" | "dark";
}

export const BottleneckEstimator: React.FC<Props> = ({ t, isAr, theme }) => {
  const [dau, setDau] = useState<number>(2500); // 100 to 50,000
  const [records, setRecords] = useState<number>(500000); // 1,000 to 10M
  const [latency, setLatency] = useState<number>(200); // 50 to 2000
  const isDark = theme === "dark";

  // Calculator formula for system block risk
  const dauFactor = Math.min((dau / 50000) * 40, 40);
  const recFactor = Math.min((records / 10000000) * 30, 30);
  const latFactor = Math.min((latency / 2000) * 30, 30);
  const totalRiskScore = Math.round(dauFactor + recFactor + latFactor);

  let riskLevel: "low" | "medium" | "high" = "low";
  let alertColor = isDark
    ? "text-emerald-400 bg-emerald-950/20 border-emerald-900/40"
    : "text-emerald-800 bg-emerald-50 border-emerald-200";
  let barColor = "bg-emerald-500";
  let textLabel = t.calcRiskLow;

  if (totalRiskScore > 40 && totalRiskScore <= 70) {
    riskLevel = "medium";
    alertColor = isDark
      ? "text-amber-400 bg-amber-950/25 border-amber-900/40"
      : "text-amber-800 bg-amber-50 border-amber-200";
    barColor = "bg-amber-500";
    textLabel = t.calcRiskMedium;
  } else if (totalRiskScore > 70) {
    riskLevel = "high";
    alertColor = isDark
      ? "text-rose-400 bg-rose-950/25 border-rose-900/40"
      : "text-rose-800 bg-rose-50 border-rose-200";
    barColor = "bg-rose-500";
    textLabel = t.calcRiskHigh;
  }

  // Formatting utility
  const formatNum = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  // Advisory responses
  const getRecommendation = () => {
    if (isAr) {
      if (riskLevel === "low") {
        return "البنية مستقرة والقرارات نظيفة. خطتك القادمة هي الاهتمام بهيكل الكود ومراجعة العلاقات والـ Eager Loading بالـ Eloquent لمنع مشكلة N+1 قبل التضخم.";
      }
      if (riskLevel === "medium") {
        return "المشكلة قريبة من قاعدة البيانات والتحميل المتكرر. نوصي بتجهيز خادم Redis لحفظ مخرجات الاستعلامات الشائعة ومراجعة فهارس (Database Indexes) لجداول الخصائص والمصادقة.";
      }
      return "المنظومة تحت خطر الانهيار الفوري والبطء التام! يتطلب عمل خطة طوارئ عاجلة لإدخال طوابير المهام Laravel Queue Workers لتفريغ جهات الدفع وتتبع السائقين وإرسال المراسلات، وتخفيف الحمل على PHP-FPM.";
    } else {
      if (riskLevel === "low") {
        return "System design is intact. Recommended action: Standardize your code formatting, ensure strict Eloquent Eager Loading on nested relations, and isolate API responses to avoid sudden N+1 queries.";
      }
      if (riskLevel === "medium") {
        return "Frequent lag detected. Urgent optimization path: Provision a dedicated Redis Cache cluster, cache high-frequency read operations, and optimize your database index matrices on indexing bottleneck tables.";
      }
      return "Severe downtime warning! Urgent architectural override is necessary: Port background processes, heavy email loops, or payment gateway triggers into asymmetric Redis Job Workers and break up costly relational joins.";
    }
  };

  return (
    <div className={`w-full rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all ${
      isDark
        ? "bg-[#13112a] border border-indigo-950/60 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
        : "bg-white border border-slate-200/80 shadow-xl"
    }`}>
      {/* Background Decorative Element */}
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full filter blur-xl pointer-events-none ${
        isDark ? "bg-indigo-500/5" : "bg-indigo-500/5"
      }`} />

      <div className="flex flex-col gap-1 mb-6 relative">
        <div className="flex items-center gap-2 text-indigo-500 font-mono text-xs tracking-wider uppercase font-bold">
          <Sliders className="w-4 h-4" />
          <span>Interactive Tool</span>
        </div>
        <h3 className={`text-xl sm:text-2xl font-space font-semibold tracking-tight mt-1 ${isDark ? "text-white" : "text-slate-800"}`}>
          {t.calcTitle}
        </h3>
        <p className={`text-sm mt-1 max-w-2xl leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {t.calcSub}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        {/* Sliders Input Area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Slider 1 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className={`font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{t.calcUserSliderLabel}</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
                isDark
                  ? "bg-indigo-950/50 border-indigo-900/40 text-indigo-400"
                  : "bg-indigo-50 border-indigo-100 text-indigo-600"
              }`}>
                {formatNum(dau)} DAU
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={dau}
              onChange={(e) => setDau(Number(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-600 border ${
                isDark
                  ? "bg-[#0c0a1a] border-indigo-950/80"
                  : "bg-slate-100 border-slate-200/50"
              }`}
            />
            <div className={`flex justify-between text-[11px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              <span>100</span>
              <span>25K</span>
              <span>50K</span>
            </div>
          </div>

          {/* Slider 2 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className={`font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{t.calcVolumeSliderLabel}</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
                isDark
                  ? "bg-indigo-950/50 border-indigo-900/40 text-indigo-400"
                  : "bg-indigo-50 border-indigo-100 text-indigo-600"
              }`}>
                {formatNum(records)} {isAr ? "سجل" : "records"}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="10000000"
              step="10000"
              value={records}
              onChange={(e) => setRecords(Number(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-600 border ${
                isDark
                  ? "bg-[#0c0a1a] border-indigo-950/80"
                  : "bg-slate-100 border-slate-200/50"
              }`}
            />
            <div className={`flex justify-between text-[11px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              <span>1K</span>
              <span>5M</span>
              <span>10M</span>
            </div>
          </div>

          {/* Slider 3 */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <span className={`font-medium ${isDark ? "text-slate-300" : "text-slate-700"}`}>{t.calcLatencySliderLabel}</span>
              <span className={`font-mono font-bold px-2 py-0.5 rounded border ${
                isDark
                  ? "bg-indigo-950/50 border-indigo-900/40 text-indigo-400"
                  : "bg-indigo-50 border-indigo-100 text-indigo-600"
              }`}>
                {latency} ms
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="25"
              value={latency}
              onChange={(e) => setLatency(Number(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-600 border ${
                isDark
                  ? "bg-[#0c0a1a] border-indigo-950/80"
                  : "bg-slate-100 border-slate-200/50"
              }`}
            />
            <div className={`flex justify-between text-[11px] font-mono ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              <span>50ms</span>
              <span>1000ms</span>
              <span>2000ms</span>
            </div>
          </div>
        </div>

        {/* Diagnostic Output Area */}
        <div className={`rounded-xl p-6 flex flex-col justify-between self-start w-full min-h-[300px] border lg:col-span-5 ${
          isDark
            ? "bg-[#0a0916] border-indigo-950/80"
            : "bg-slate-50 border-slate-200"
        }`}>
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
              Diagnostics Report
            </div>
            
            {/* Risk Indicator Title & Score */}
            <div className="flex justify-between items-baseline mb-4">
              <span className={`text-[13px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.calcRiskTitle}</span>
              <span className={`text-2xl font-mono font-black ${isDark ? "text-slate-200" : "text-slate-800"}`}>{totalRiskScore}%</span>
            </div>

            {/* Simulated Load Bar */}
            <div className={`w-full h-2.5 rounded-full overflow-hidden mb-6 border ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-slate-200 border-slate-300/30"
            }`}>
              <div 
                className={`h-full rounded-full transition-all duration-300 ${barColor}`} 
                style={{ width: `${totalRiskScore}%` }} 
              />
            </div>

            {/* Conditional Status Box */}
            <div className={`p-4 rounded-lg border flex items-start gap-3 text-xs leading-relaxed transition-all duration-300 ${alertColor}`}>
              <div className="mt-0.5 flex-shrink-0">
                {riskLevel === "low" ? (
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                ) : (
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 animate-bounce" />
                )}
              </div>
              <div>
                <strong className="block font-bold mb-1 uppercase tracking-wider text-[11px]">
                  {riskLevel === "low" ? "Infrastructure Balanced" : riskLevel === "medium" ? "Tension Detected" : "Severe Operational Danger"}
                </strong>
                {textLabel}
              </div>
            </div>
          </div>

          {/* Professional Recommendation */}
          <div className={`mt-6 pt-4 border-t ${isDark ? "border-indigo-950/70" : "border-slate-200"}`}>
            <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-500 uppercase tracking-widest mb-2 font-bold">
              <Database className="w-3.5 h-3.5" />
              <span>{t.calcRecommendationTitle}</span>
            </div>
            <p className={`text-xs leading-relaxed italic p-3 rounded-lg border ${
              isDark
                ? "text-slate-300 bg-indigo-950/30 border-indigo-900/30"
                : "text-slate-700 bg-indigo-50/50 border-indigo-100"
            }`}>
              "{getRecommendation()}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BottleneckEstimator;
