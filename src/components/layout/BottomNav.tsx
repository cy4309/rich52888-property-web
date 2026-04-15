"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineUser,
} from "react-icons/hi2";
import { HiOutlineBriefcase } from "react-icons/hi";
import { cn } from "@/lib/utils";

/** 與首頁 /#xxx 錨點一致（捲動偵測） */
const SECTION_IDS = ["services", "news", "faq", "about", "contact"] as const;

const NAV_ITEMS = [
  {
    href: "/#services",
    label: "服務項目",
    icon: HiOutlineBriefcase,
    section: "services" as const,
  },
  {
    href: "/#news",
    label: "最新消息",
    icon: HiOutlineNewspaper,
    section: "news" as const,
  },
  {
    href: "/#contact",
    label: "立即諮詢",
    icon: HiOutlineChatBubbleLeftRight,
    isCta: true,
    section: "contact" as const,
  },
  {
    href: "/#faq",
    label: "常見問題",
    icon: HiOutlineQuestionMarkCircle,
    section: "faq" as const,
  },
  {
    href: "/#about",
    label: "關於我們",
    icon: HiOutlineUser,
    section: "about" as const,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const isSectionId = (h: string): h is (typeof SECTION_IDS)[number] =>
      SECTION_IDS.includes(h as (typeof SECTION_IDS)[number]);

    const applyHashIfAny = () => {
      const h = window.location.hash.replace(/^#/, "");
      if (h && isSectionId(h)) {
        setActiveSection(h);
        return true;
      }
      return false;
    };

    const setFromScroll = () => {
      let best: { id: string; ratio: number } | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.max(
          0,
          Math.min(rect.bottom, vh) - Math.max(rect.top, 0),
        );
        const denom = Math.min(rect.height || 1, vh);
        const ratio = visible / denom;
        if (ratio > 0.08 && (!best || ratio > best.ratio)) {
          best = { id, ratio };
        }
      }
      if (best) setActiveSection(best.id);
      else setActiveSection(SECTION_IDS[0]);
    };

    if (!applyHashIfAny()) setFromScroll();

    window.addEventListener("scroll", setFromScroll, { passive: true });
    const onHashChange = () => {
      if (!applyHashIfAny()) setFromScroll();
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", setFromScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 lg:hidden">
      <div className="flex items-center justify-around h-16 max-w-6xl mx-auto px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon, isCta, section }) => {
          const onNewsRoute =
            section === "news" &&
            (pathname === "/news" || pathname.startsWith("/news/"));
          const isActive =
            !isCta &&
            (onNewsRoute ||
              (pathname === "/" &&
                section !== undefined &&
                activeSection === section));
          if (isCta) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-14 h-14 rounded-full bg-[#C8A25A] flex items-center justify-center shadow-lg shadow-black/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </Link>
            );
          }

          const linkHref =
            section === "news" ? (pathname === "/" ? "/#news" : "/news") : href;

          return (
            <Link
              key={href}
              href={linkHref}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[4rem]"
            >
              <Icon
                className={cn(
                  "w-6 h-6",
                  isActive ? "text-[#C8A25A]" : "text-neutral-400",
                )}
              />
              <span
                className={cn(
                  "text-xs",
                  isActive ? "text-[#C8A25A] font-medium" : "text-neutral-400",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
