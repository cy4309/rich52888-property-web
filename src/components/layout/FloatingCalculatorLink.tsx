"use client";

import Link from "next/link";
import { HiOutlineCalculator } from "react-icons/hi2";
import { HOUSE_SECOND_MORTGAGE_CALCULATOR_PATH } from "@/content/services/house-second-mortgage-toc";
import { trackEvent } from "@/lib/ga";

/** 右下角浮動按鈕，樣式對齊 LINE 聯絡我們，位於其上方 */
export default function FloatingCalculatorLink() {
  return (
    <Link
      href={HOUSE_SECOND_MORTGAGE_CALCULATOR_PATH}
      onClick={() =>
        trackEvent("calculator_quick_link_click", {
          source: "floating_button",
          service: "house-second-mortgage",
        })
      }
      className="fixed bottom-[10.5rem] right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 hover:opacity-95 active:scale-95 md:bottom-[7.25rem] md:right-6"
      aria-label="房屋二胎試算"
    >
      <HiOutlineCalculator className="h-7 w-7" aria-hidden />
    </Link>
  );
}
