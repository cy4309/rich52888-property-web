import Link from "next/link";

const NAV_LINKS = [
  { href: "/#services", label: "服務項目" },
  { href: "/#news", label: "最新消息" },
  { href: "/#faq", label: "貸款學堂" },
  { href: "/#about", label: "關於我們" },
];

export default function Footer() {
  return (
    <footer>
      <div className="bg-neutral-100 text-neutral-600 py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <nav className="hidden lg:flex flex-wrap gap-6">
              <div className="text-sm">
                <p>© RICH52888</p>
              </div>
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm hover:text-[#C8A25A] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
