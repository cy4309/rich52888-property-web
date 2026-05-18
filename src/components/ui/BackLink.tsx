import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { cn } from "@/lib/utils";

const TARGETS = {
  home: { href: "/", label: "返回首頁" },
  news: { href: "/news", label: "返回最新消息" },
  services: { href: "/#services", label: "返回服務項目" },
} as const;

export type BackTarget = keyof typeof TARGETS;

type BackLinkProps = {
  target: BackTarget;
  className?: string;
  /** link：頁頂文字連結；action：錯誤頁等同尺寸按鈕 */
  variant?: "link" | "action";
};

export default function BackLink({
  target,
  className,
  variant = "link",
}: BackLinkProps) {
  const { href, label } = TARGETS[target];

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium transition",
        variant === "link" &&
          "text-primary hover:opacity-90",
        variant === "action" &&
          "min-w-[10.5rem] justify-center rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-deep hover:bg-neutral-50",
        className,
      )}
    >
      <FaArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}
