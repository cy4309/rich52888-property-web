"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import LineQrContactPanel from "@/components/sections/LineQrContactPanel";

type LineExpandableCtaProps = {
  id?: string;
  buttonLabel: string;
  qrTitle?: string;
  sectionClassName?: string;
};

export default function LineExpandableCta({
  id,
  buttonLabel,
  qrTitle,
  sectionClassName,
}: LineExpandableCtaProps) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id={id}
      className={cn("scroll-mt-28 flex justify-center", sectionClassName)}
    >
      <div className="flex w-full max-w-md flex-col">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className={buttonVariants(
            "primary",
            "w-full text-center text-sm sm:text-base",
          )}
        >
          {buttonLabel}
        </button>

        {open ? (
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4">
            <LineQrContactPanel title={qrTitle} className="border-t-0 pt-0" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-deep transition hover:bg-neutral-50"
            >
              收起
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
