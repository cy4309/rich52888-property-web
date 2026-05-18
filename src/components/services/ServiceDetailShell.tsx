import type { ReactNode } from "react";
import type { ServiceIcon } from "@/content/services";
import BackLink from "@/components/ui/BackLink";
import BackToTopButton from "@/components/ui/BackToTopButton";
import HashScrollOnMount from "@/components/ui/HashScrollOnMount";

type Props = {
  title: string;
  icon: ServiceIcon;
  children: ReactNode;
};

export default function ServiceDetailShell({ title, icon: Icon, children }: Props) {
  return (
    <article className="bg-neutral-50 min-h-screen py-20 pb-28">
      <HashScrollOnMount />
      <div className="max-w-6xl mx-auto px-6">
        <BackLink target="services" className="mb-6" />
        <header className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-deep">{title}</h1>
        </header>
        <div className="text-sm md:text-base">{children}</div>
      </div>
      <BackToTopButton ariaLabel="回到本服務頁面頂端" />
    </article>
  );
}
