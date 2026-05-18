import type { ReactNode } from "react";

type ErrorPageShellProps = {
  code: string;
  title: string;
  description: string;
  children: ReactNode;
};

export const errorActionBtn =
  "inline-flex min-w-[10.5rem] items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90";

export default function ErrorPageShell({
  code,
  title,
  description,
  children,
}: ErrorPageShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center bg-neutral-50 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-lg px-6 text-center">
        <p
          className="text-7xl font-bold tracking-tight text-primary/30 sm:text-8xl"
          aria-hidden
        >
          {code}
        </p>
        <h1 className="mt-4 text-2xl font-bold text-deep sm:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-base">
          {description}
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
