"use client";

import Image from "next/image";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export const LINE_ADD_URL =
  process.env.NEXT_PUBLIC_LINE_ADD_FRIEND_URL ?? "https://line.me/ti/p/@030iqqht";

type LineQrContactPanelProps = {
  title?: string;
  className?: string;
};

export default function LineQrContactPanel({
  title = "加入 LINE 由專員為您確認方案",
  className,
}: LineQrContactPanelProps) {
  const qrSrc = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(LINE_ADD_URL)}`,
    [],
  );

  return (
    <div className={cn("border-t border-neutral-100 pt-4 text-center", className)}>
      <p className="text-sm font-semibold text-deep">{title}</p>
      <p className="mt-1 break-all text-xs text-neutral-500">{LINE_ADD_URL}</p>
      <div className="relative mx-auto mt-3 h-[220px] w-[220px]">
        <Image
          src={qrSrc}
          alt="LINE 官方帳號 QR Code"
          fill
          className="rounded-lg border border-neutral-200 bg-white object-contain p-2"
          sizes="220px"
          unoptimized
        />
      </div>
    </div>
  );
}
