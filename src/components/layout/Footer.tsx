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
      <div className="bg-neutral-100 text-neutral-600 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="hidden lg:block">
            <nav className="flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="bg-primary text-white rounded-2xl px-3 py-1.5 text-sm font-bold hover:opacity-90 transition-opacity"
              >
                立即諮詢
              </Link>
              {NAV_LINKS.map(({ href, label }) => (
                <div key={href} className="contents">
                  <Link
                    href={href}
                    className="text-sm font-bold text-neutral-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                  {href === "/#services" ? (
                    <div className="basis-full mt-1 mb-2">
                      <div className="flex flex-wrap gap-2">
                        {serviceDefinitions.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs hover:border-primary hover:text-primary transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
