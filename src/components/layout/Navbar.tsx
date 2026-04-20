"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/ga";

const NAV_LINKS = [
  { href: "/#services", label: "服務項目" },
  { href: "/#news", label: "最新消息" },
  { href: "/#faq", label: "常見問題" },
  { href: "/#about", label: "關於我們" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** 已在首頁時點 logo：同一路由不會導向，需手動回頂並清掉 #錨點 */
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const { pathname: p, search } = window.location;
    if (window.location.hash) {
      window.history.replaceState(null, "", p + search);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 bg-white/80 backdrop-blur",
        scrolled ? "shadow-md" : "",
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="shrink-0 flex items-center gap-3 min-w-0"
        >
          <img
            src="/logo.png"
            alt="logo"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 object-contain"
            decoding="async"
          />
          <div className="flex flex-col min-w-0">
            <div className="font-bold text-deep">謙謙資產管理顧問</div>
            <div className="text-[8px] font-bold text-neutral-500">
              RICH52888 ASSET MANAGEMENT
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() =>
                  trackEvent("section_nav_click", {
                    source: "navbar_desktop",
                    target: href.replace("/#", ""),
                  })
                }
                className={cn(
                  "font-bold text-neutral-600 hover:text-primary transition-colors",
                  isActive ? "font-semibold text-primary" : undefined,
                )}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            onClick={() =>
              trackEvent("contact_cta_click", {
                source: "navbar_desktop",
                target: "contact_section",
              })
            }
            className="ml-4 bg-primary text-white rounded-2xl px-4 py-2 hover:opacity-90 transition-opacity font-bold"
          >
            立即諮詢
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-neutral-600 hover:text-primary"
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
          >
            {mobileOpen ? (
              <HiOutlineXMark className="w-6 h-6" />
            ) : (
              <HiOutlineBars3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-neutral-100 md:hidden">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => {
                    trackEvent("section_nav_click", {
                      source: "navbar_mobile",
                      target: href.replace("/#", ""),
                    });
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "py-3 px-4 rounded-2xl font-bold text-neutral-600 hover:text-primary hover:bg-neutral-50",
                    isActive
                      ? "font-semibold text-primary bg-primary/5"
                      : undefined,
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              onClick={() => {
                trackEvent("contact_cta_click", {
                  source: "navbar_mobile",
                  target: "contact_section",
                });
                setMobileOpen(false);
              }}
              className="mt-2 py-3 px-4 bg-primary text-white rounded-2xl text-center font-bold hover:opacity-90"
            >
              立即諮詢
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
