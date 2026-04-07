"use client";

import { useState } from "react";
import { SiLine } from "react-icons/si";
import { BsHeadset } from "react-icons/bs";
import {
  HiOutlinePhone,
  HiOutlineXMark,
} from "react-icons/hi2";
import { cn } from "@/lib/utils";

/** 可改為實際聯絡資訊 */
const CONTACTS = [
  {
    id: "A" as const,
    label: "執行顧問",
    name: "吳何謙 Kane",
    lineUrl: "https://line.me/ti/p/@030iqqht",
    lineDisplay: "@030iqqht",
    phoneDisplay: "0931-953-434",
    phoneTel: "+886931953434",
  },
  {
    id: "B" as const,
    label: "執行顧問",
    name: "莊松諺 Syen",
    lineUrl: "https://line.me/ti/p/@030iqqht",
    lineDisplay: "@030iqqht",
    phoneDisplay: "0958-169-162",
    phoneTel: "+886958169162",
  },
];

export default function FloatingContactCard() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const c = CONTACTS[activeIndex];

  return (
    <div
      className="fixed bottom-24 right-4 z-[60] md:bottom-8 md:right-6"
      aria-live="polite"
    >
      {open ? (
        <div
          className="w-[min(calc(100vw-2rem),18.5rem)] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
          role="dialog"
          aria-label="聯絡資訊"
        >
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
            <span className="text-sm font-semibold text-deep">聯絡我們</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-deep"
              aria-label="關閉"
            >
              <HiOutlineXMark className="h-5 w-5" />
            </button>
          </div>

          <div className="px-4 pt-3">
            <p className="mb-2 text-xs text-neutral-500">切換聯絡人</p>
            <div className="relative flex h-10 w-full rounded-full bg-neutral-100 p-1">
              <div
                className="pointer-events-none absolute left-1 top-1 h-8 w-[calc(50%-6px)] rounded-full bg-[#C8A25A] shadow-sm transition-transform duration-200 ease-out"
                style={{
                  transform:
                    activeIndex === 1
                      ? "translateX(calc(100% + 8px))"
                      : "translateX(0)",
                }}
              />
              <button
                type="button"
                onClick={() => setActiveIndex(0)}
                className={cn(
                  "relative z-10 flex-1 rounded-full py-1.5 text-sm font-medium transition-colors",
                  activeIndex === 0 ? "text-white" : "text-neutral-600",
                )}
              >
                {CONTACTS[0].label}
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex(1)}
                className={cn(
                  "relative z-10 flex-1 rounded-full py-1.5 text-sm font-medium transition-colors",
                  activeIndex === 1 ? "text-white" : "text-neutral-600",
                )}
              >
                {CONTACTS[1].label}
              </button>
            </div>
            <p className="mb-2 mt-4 text-center text-sm font-semibold text-deep">
              {c.name}
            </p>
          </div>

          <div className="space-y-3 px-4 py-4">
            <a
              href={c.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/80 px-3 py-3 text-sm text-deep transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#06C755] text-white">
                <SiLine className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-neutral-500">LINE</span>
                <span className="font-medium">{c.lineDisplay}</span>
              </span>
            </a>

            <a
              href={`tel:${c.phoneTel}`}
              className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/80 px-3 py-3 text-sm text-deep transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <HiOutlinePhone className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-neutral-500">電話</span>
                <span className="font-medium">{c.phoneDisplay}</span>
              </span>
            </a>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8A25A] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 hover:opacity-95 active:scale-95"
          aria-label="開啟聯絡資訊"
          aria-expanded={open}
        >
          <BsHeadset className="h-7 w-7" aria-hidden />
        </button>
      )}
    </div>
  );
}
