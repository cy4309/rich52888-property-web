import type { ReactNode } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import type { ServiceIcon } from "@/content/services";

type Props = {
  title: string;
  icon: ServiceIcon;
  children: ReactNode;
};

export default function ServiceDetailShell({ title, icon: Icon, children }: Props) {
  return (
    <article className="bg-neutral-50 min-h-screen py-20 pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/#services"
          className="text-primary hover:opacity-90 mb-6 flex items-center gap-2"
        >
          <FaArrowLeft /> 返回服務項目
        </Link>
        <header className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-deep">{title}</h1>
        </header>
        <div className="text-sm md:text-base">{children}</div>
      </div>
    </article>
  );
}
