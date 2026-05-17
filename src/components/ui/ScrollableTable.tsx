"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

type ScrollableTableProps = {
  children: React.ReactNode;
  className?: string;
  hint?: string;
};

export default function ScrollableTable({
  children,
  className,
  hint = "左右滑動查看更多",
}: ScrollableTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const overflow = maxScroll > 4;
    setHasOverflow(overflow);
    setCanScrollLeft(overflow && el.scrollLeft > 4);
    setCanScrollRight(overflow && el.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    if (el.firstElementChild) {
      resizeObserver.observe(el.firstElementChild);
    }

    return () => {
      el.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  return (
    <div className={cn("space-y-2", className)}>
      <p
        className={cn(
          "flex items-center justify-center gap-1.5 text-xs text-neutral-500 md:hidden",
          !hasOverflow ? "sr-only" : undefined,
        )}
        aria-live="polite"
      >
        <HiOutlineChevronLeft className="h-4 w-4 shrink-0" aria-hidden />
        <span>{hint}</span>
        <HiOutlineChevronRight className="h-4 w-4 shrink-0" aria-hidden />
      </p>

      <div className="relative rounded-2xl border border-neutral-200 bg-white">
        <div
          ref={scrollRef}
          className="overflow-x-auto rounded-2xl [-webkit-overflow-scrolling:touch]"
          tabIndex={0}
          role="region"
          aria-label={hint}
        >
          {children}
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 rounded-l-2xl bg-gradient-to-r from-white via-white/90 to-transparent transition-opacity duration-300 md:hidden",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />

        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-14 rounded-r-2xl bg-gradient-to-l from-white via-white/95 to-transparent transition-opacity duration-300 md:hidden",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />

        <div
          className={cn(
            "pointer-events-none absolute right-2 top-1/2 z-20 flex -translate-y-1/2 items-center gap-0.5 rounded-full border border-neutral-200 bg-white/95 px-2 py-1 text-[10px] font-medium text-primary shadow-sm transition-opacity duration-300 md:hidden",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        >
          <span>更多</span>
          <HiOutlineChevronRight className="h-3.5 w-3.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
