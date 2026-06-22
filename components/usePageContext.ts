"use client";

import { useEffect, useState } from "react";

/**
 * Reads the lang and theme from the nearest [data-theme] / [data-lang] ancestor
 * injected by SiteShell. This avoids prop-drilling through every page component.
 */
export function usePageContext() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const el = document.querySelector("[data-theme][data-lang]") as HTMLElement | null;
    if (!el) return;

    const read = () => {
      setLang((el.dataset.lang as "ar" | "en") || "ar");
      setTheme((el.dataset.theme as "light" | "dark") || "dark");
    };

    read();

    // MutationObserver watches for attribute changes (lang/theme toggle)
    const obs = new MutationObserver(read);
    obs.observe(el, { attributes: true, attributeFilter: ["data-lang", "data-theme"] });
    return () => obs.disconnect();
  }, []);

  return {
    lang,
    theme,
    isAr: lang === "ar",
    isDark: theme === "dark",
  };
}
