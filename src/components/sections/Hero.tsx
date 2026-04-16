"use client";

import { buttonVariants } from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa";
import TrackedLink from "@/components/analytics/TrackedLink";

export default function Hero() {
  return (
    <section id="hero" className="pt-10 pb-20 bg-deep">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-4">
          <p className="text-xs text-primary tracking-widest font-bold">
            PREMIUM ADVISORY
          </p>
          <p className="text-4xl font-bold text-white">您的專屬</p>
          <div className="flex gap-1">
            <h1 className="text-4xl font-bold text-primary">房產及資金規劃</h1>
            <p className="text-4xl font-bold text-white">方案</p>
          </div>
          <p className="text-neutral-600 max-w-2xl">
            為您提供最精準的資產活化諮詢。無論是房貸優化或資金周轉，我們以專業誠信，助您成就財富增值。
          </p>
          <div className="flex gap-4 justify-center">
            <TrackedLink
              href="/#contact"
              eventName="contact_cta_click"
              eventParams={{ source: "hero", target: "contact_section" }}
              className={buttonVariants(
                "primary",
                "w-2/3 flex items-center justify-center gap-2",
              )}
            >
              立即諮詢
              <FaArrowRight />
            </TrackedLink>
            <TrackedLink
              href="/#services"
              eventName="service_interest_click"
              eventParams={{ source: "hero", target: "services_section" }}
              className={buttonVariants(
                "outline",
                "w-1/3 flex items-center justify-center gap-2",
              )}
            >
              服務
              <FaArrowRight />
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
