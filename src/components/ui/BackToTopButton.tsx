"use client";

import { useEffect, useState } from "react";
import { HiOutlineArrowUp } from "react-icons/hi2";
import { cn } from "@/lib/utils";

/** 超過此距離才顯示（含錨點跳轉後瀏覽器捲動到的位置） */
const SHOW_AFTER_PX = 200;

type BackToTopButtonProps = {
  ariaLabel?: string;
};

export default function BackToTopButton({
  ariaLabel = "回到頁面頂端",
}: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  const scrollToServiceTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const { pathname, search } = window.location;
    if (window.location.hash) {
      window.history.replaceState(null, "", pathname + search);
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToServiceTop}
      aria-label={ariaLabel}
      className={cn(
        "fixed z-[55] flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-black/20 transition-[opacity,transform] hover:opacity-90 active:scale-95",
        "bottom-24 left-6 md:bottom-8 md:left-auto md:right-24",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-1 opacity-0",
      )}
    >
      <HiOutlineArrowUp className="h-4 w-4" />
    </button>
  );
}
