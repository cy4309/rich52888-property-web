"use client";

import { useEffect, useState } from "react";
import { buildUniqueDealAnnouncements } from "@/data/deal-marquee-seeds";
import type { MarqueeItem } from "@/components/ui/MarqueeBanner";
import { MarqueeBanner } from "@/components/ui/MarqueeBanner";

const PLACEHOLDER_H = "min-h-[3.25rem]";

/**
 * 導覽列下方、非 fixed 跑馬燈；掛載後隨機多則不重複喜訊（避免 SSR 與 client 不一致）。
 */
export function SiteDealMarquee() {
  const [items, setItems] = useState<MarqueeItem[] | null>(null);

  useEffect(() => {
    setItems(buildUniqueDealAnnouncements().map((text) => ({ text })));
  }, []);

  if (!items) {
    return <div className={`${PLACEHOLDER_H} w-full bg-deep`} aria-hidden />;
  }

  return (
    <div
      className="relative z-[1] w-full bg-deep text-white"
      role="status"
      aria-live="polite"
    >
      <MarqueeBanner
        items={items}
        duration={30}
        className="bg-deep [&_span]:text-sm md:[&_span]:text-base"
      />
    </div>
  );
}
