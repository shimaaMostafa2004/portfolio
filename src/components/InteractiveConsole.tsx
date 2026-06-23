"use client";

import React, { useState, useEffect } from "react";
import { Play, Terminal, Database, Cpu, Zap, Radio, ShieldCheck } from "lucide-react";

interface InteractiveConsoleProps {
  isAr: boolean;
  isDark: boolean;
}

export const InteractiveConsole: React.FC<InteractiveConsoleProps> = ({ isAr, isDark }) => {
  const [activeTab, setActiveTab] = useState<"database" | "api" | "queues" | "security">("api");
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [latencyVal, setLatencyVal] = useState<number>(3.4);

  // Active logs based on active tab
  const getInitialLogs = (tab: typeof activeTab) => {
    if (tab === "api") {
      return isAr 
        ? [
            "Ready to audit secure REST API throughput...",
            "Host: api.abdotaher.me  | Environment: Production",
            "Caching layer: Redis Sentinel Node Active",
            "Click 'Execute Speed Test' below to simulate +10,000 concurrent user requests."
          ]
        : [
            "Ready to audit secure REST API throughput...",
            "Host: api.abdotaher.me  | Environment: Production",
            "Caching layer: Redis Sentinel Node Active",
            "Click 'Execute Speed Test' below to simulate +10,000 concurrent user requests."
          ];
    } else if (tab === "database") {
      return isAr
        ? [
            "Connecting to Database DB Instance (Partitioned Ledger)...",
            "Checking indexing performance on table 'orders' (1.4M rows)...",
            "Missing indexes detected on foreign_key_id. Latency is high.",
            "Click 'Optimize database' to run query analyzer."
          ]
        : [
            "Connecting to Database DB Instance (Partitioned Ledger)...",
            "Checking indexing performance on table 'orders' (1.4M rows)...",
            "Missing indexes detected on foreign_key_id. Latency is high.",
            "Click 'Optimize database' to run query analyzer."
          ];
    } else if (tab === "queues") {
      return isAr
        ? [
            "Horizon Queue Monitor: Connected to Bull-Redis Broker...",
            "Pending background newsletters: 45,000 tasks.",
            "Allocated workers: 4 instances on server group.",
            "Click 'Scale Background Workers' to fire batch tasks."
          ]
        : [
            "Horizon Queue Monitor: Connected to Bull-Redis Broker...",
            "Pending background newsletters: 45,000 tasks.",
            "Allocated workers: 4 instances on server group.",
            "Click 'Scale Background Workers' to fire batch tasks."
          ];
    } else {
      return isAr
        ? [
            "WAF Shield checking incoming packet headers...",
            "Rate limiter: IP-throttle active (100req/min limit).",
            "No SSL vulnerabilities detected. CSP Rules enforced strictly.",
            "Click 'Secure Core Gate' to execute simulated Pen-test."
          ]
        : [
            "WAF Shield checking incoming packet headers...",
            "Rate limiter: IP-throttle active (100req/min limit).",
            "No SSL vulnerabilities detected. CSP Rules enforced strictly.",
            "Click 'Secure Core Gate' to execute simulated Pen-test."
          ];
    }
  };

  useEffect(() => {
    setConsoleLogs(getInitialLogs(activeTab));
    setIsRunning(false);
  }, [activeTab]);

  const handleRunTest = () => {
    if (isRunning) return;
    setIsRunning(true);
    setConsoleLogs((prev) => [...prev, ">>> Booting benchmark sequence...", ">>> Spinning up isolated test threads..."]);

    setTimeout(() => {
      if (activeTab === "api") {
        setConsoleLogs((prev) => [
          ...prev,
          "HTTP GET /api/v1/checkout  -  200 OK  (3,500 RPS simulated)",
          "Data size: 1.2 MB  |  Payload response format: JSON gzip",
          "Compression status: brotli optimized",
          "Result: API successfully cached and delivered in sub-millisecond range!",
          "✔ Success: Global CDN Latency dropped to 0.72 ms."
        ]);
        setLatencyVal(0.72);
      } else if (activeTab === "database") {
        setConsoleLogs((prev) => [
          ...prev,
          "EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 93826 LIMIT 10;",
          "-> Index Scan matching pk_user_orders on orders table (cost=0.15..1.42 rows=10)",
          "Optimization: Composite covering index applied successfully to (user_id, status, created_at)",
          "✔ Success: DB Query Latency compressed from 240 ms to 1.15 ms!"
        ]);
        setLatencyVal(1.15);
      } else if (activeTab === "queues") {
        setConsoleLogs((prev) => [
          ...prev,
          "node dist/queue-worker.cjs --queue=high,default --concurrency=12",
          "Processing: task -> SendGulfMadaInvoice [Mada Gateway Ok]",
          "Scale signal sent: Worker count upgraded to 16 runner instances.",
          "✔ Success Speed: Empty queue in 2.8 seconds instead of 45 minutes!"
        ]);
        setLatencyVal(18.5);
      } else {
        setConsoleLogs((prev) => [
          ...prev,
          "Simulated pen-test payload block injected: SQL Injection payload bypassed safely.",
          "Sanitizes input fields securely with prepared statements and query validation.",
          "XSS headers check: X-XSS-Protection enabled.",
          "✔ Security Grade: A+ System Integrity certified."
        ]);
        setLatencyVal(1.0);
      }
      setIsRunning(false);
    }, 2200);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto rounded-2xl border overflow-hidden relative shadow-2xl transition-all ${
      isDark ? "bg-[#0c0a1a] border-indigo-950/80" : "bg-white border-slate-200"
    }`}>
      {/* Top Console Bar */}
      <div className={`px-4 py-3 flex items-center justify-between border-b ${
        isDark ? "bg-[#070512] border-indigo-950/50" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className={`text-[10px] font-mono ml-2 font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            CORE ARCHITECT SHELL v2.4 (STABLE CORE)
          </span>
        </div>
        <div className="flex items-center gap-1 bg-indigo-950/20 text-indigo-400 font-mono text-[9px] px-2 py-0.5 rounded border border-indigo-900/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>ESTIMATED LATENCY: {latencyVal}ms</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={`grid grid-cols-4 font-mono text-[11px] font-bold border-b ${
        isDark ? "bg-[#110e26] border-indigo-950/60" : "bg-slate-100 border-slate-200"
      }`}>
        <button
          onClick={() => setActiveTab("api")}
          className={`py-3.5 flex items-center justify-center gap-2 border-r last:border-r-0 transition-colors ${
            activeTab === "api"
              ? isDark ? "bg-[#0c0a1a] text-indigo-400 border-b-2 border-b-indigo-500" : "bg-white text-indigo-600 border-b-2 border-b-indigo-500"
              : isDark ? "text-slate-400 hover:bg-[#15112e] border-indigo-950/40" : "text-slate-600 hover:bg-slate-200 border-slate-200"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">API PERFORMANCE</span>
          <span className="sm:hidden">API</span>
        </button>

        <button
          onClick={() => setActiveTab("database")}
          className={`py-3.5 flex items-center justify-center gap-2 border-r last:border-r-0 transition-colors ${
            activeTab === "database"
              ? isDark ? "bg-[#0c0a1a] text-indigo-400 border-b-2 border-b-indigo-500" : "bg-white text-indigo-600 border-b-2 border-b-indigo-500"
              : isDark ? "text-slate-400 hover:bg-[#15112e] border-indigo-950/40" : "text-slate-600 hover:bg-slate-200 border-slate-200"
          }`}
        >
          <Database className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden sm:inline">DATABASE INDEX</span>
          <span className="sm:hidden">DB</span>
        </button>

        <button
          onClick={() => setActiveTab("queues")}
          className={`py-3.5 flex items-center justify-center gap-2 border-r last:border-r-0 transition-colors ${
            activeTab === "queues"
              ? isDark ? "bg-[#0c0a1a] text-indigo-400 border-b-2 border-b-indigo-500" : "bg-white text-indigo-600 border-b-2 border-b-indigo-500"
              : isDark ? "text-slate-400 hover:bg-[#15112e] border-indigo-950/40" : "text-slate-600 hover:bg-slate-200 border-slate-200"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-[#a855f7]" />
          <span className="hidden sm:inline">QUEUES & REDIS</span>
          <span className="sm:hidden">QUEUES</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`py-3.5 flex items-center justify-center gap-2 border-r last:border-r-0 transition-colors ${
            activeTab === "security"
              ? isDark ? "bg-[#0c0a1a] text-indigo-400 border-b-2 border-b-indigo-500" : "bg-white text-indigo-600 border-b-2 border-b-indigo-500"
              : isDark ? "text-slate-400 hover:bg-[#15112e] border-indigo-950/40" : "text-slate-600 hover:bg-slate-200 border-slate-200"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">SECURITY LEVEL</span>
          <span className="sm:hidden">SECURITY</span>
        </button>
      </div>

      {/* Terminal Screen inside */}
      <div className={`p-5 min-h-[195px] font-mono text-[11px] leading-relaxed flex flex-col justify-between ${
        isDark ? "bg-[#060410] text-[#a5b4fc]" : "bg-slate-900 text-[#c7d2fe]"
      }`}>
        <div className="space-y-1.5 select-all">
          {consoleLogs.map((log, index) => {
            const isSuccess = log.startsWith("✔");
            const isAction = log.startsWith(">>>");
            const colorClass = isSuccess 
              ? "text-emerald-400 font-bold" 
              : isAction 
                ? "text-amber-300 animate-pulse" 
                : log.includes("HTTP GET") 
                  ? "text-cyan-300 font-semibold" 
                  : "text-slate-300";

            return (
              <div key={index} className="flex gap-2">
                <span className="text-[#6366f1] font-bold shrink-0">$</span>
                <span className={colorClass}>{log}</span>
              </div>
            );
          })}
          {isRunning && (
            <div className="flex items-center gap-2 text-indigo-400 font-bold mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping inline-block" />
              <span>[SIMULATING TRAFFIC & BENCHMARKING... PLEASE WAIT]</span>
            </div>
          )}
        </div>

        {/* Console control line */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-indigo-950/20">
          <div className="text-[10px] text-slate-500 font-semibold">
            {isAr
              ? "* يتم تنفيذ هذه الفحوصات لمحاكاة أداء الـ API ومطابقة جودة الأرشفة والاستجابة."
              : "* Executed simulation tests verifying sub-millisecond API response times and cache efficiency."}
          </div>
          
          <button
            onClick={handleRunTest}
            disabled={isRunning}
            className={`font-bold text-[10px] uppercase font-mono py-1.5 px-3.5 rounded flex items-center gap-1.5 transition-all w-fit ${
              isRunning 
                ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95"
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>
              {isRunning 
                ? (isAr ? "يجري الفحص..." : "BENCHMARKING...") 
                : (activeTab === "api" 
                    ? (isAr ? "محاكاة حمولة API" : "Execute Speed Test") 
                    : activeTab === "database"
                      ? (isAr ? "تشغيل فحص الفهرسة" : "Optimize database")
                      : activeTab === "queues"
                        ? (isAr ? "تحجيم الكيو والعمال" : "Scale Background Workers")
                        : (isAr ? "تشغيل اختبار الاختراق" : "Secure Core Gate")
                  )
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
