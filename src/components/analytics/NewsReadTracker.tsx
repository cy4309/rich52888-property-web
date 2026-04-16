"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/ga";

type NewsReadTrackerProps = {
  slug: string;
};

export default function NewsReadTracker({ slug }: NewsReadTrackerProps) {
  useEffect(() => {
    trackEvent("news_read", {
      news_slug: slug,
    });
  }, [slug]);

  return null;
}
