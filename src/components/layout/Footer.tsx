import Link from "next/link";
import { serviceDefinitions } from "@/content/services";

const NAV_LINKS = [
  { href: "/#news", label: "最新消息" },
  { href: "/#faq", label: "常見問題" },
  { href: "/#about", label: "關於我們" },
  { href: "/#services", label: "服務項目" },
];

export default function Footer() {
  return (
    <footer>
      <div className="bg-neutral-100 text-neutral-600 py-6 lg:py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="hidden lg:block">
            <nav className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                <Link
                  href="/#contact"
                  className="shrink-0 rounded-2xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  立即諮詢
                </Link>
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-sm font-bold text-neutral-600 transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-neutral-200/80 pt-6">
                <p className="text-xs font-bold tracking-wide text-neutral-500">
                  服務項目
                </p>
                <div className="flex flex-wrap gap-3">
                  {serviceDefinitions.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 transition-colors hover:border-primary hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
