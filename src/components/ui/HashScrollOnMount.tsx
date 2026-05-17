"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** 從其他頁面帶 hash 進入時，等內容掛載後捲動至錨點 */
export default function HashScrollOnMount() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    const scrollToHash = () => {
      const target = document.getElementById(decodeURIComponent(hash));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    requestAnimationFrame(scrollToHash);
    const timer = window.setTimeout(scrollToHash, 150);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
