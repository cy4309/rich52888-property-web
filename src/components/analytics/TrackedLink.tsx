"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { trackEvent } from "@/lib/ga";

type TrackedLinkProps = LinkProps & {
  className?: string;
  children: ReactNode;
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

export default function TrackedLink({
  className,
  children,
  eventName,
  eventParams,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      className={className}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </Link>
  );
}
