"use client";

import { HiCheckBadge } from "react-icons/hi2";

export interface MarqueeItem {
  text: string;
}

export interface MarqueeBannerProps {
  items?: MarqueeItem[];
  duration?: number;
  className?: string;
}

/** 未傳入 items 時的展示用預設（格式同全站核准喜訊跑馬燈） */
const defaultItems: MarqueeItem[] = [
  { text: "賀! 桃園陳小姐申貸成功!" },
  { text: "賀! 新北林先生申貸成功!" },
  { text: "賀! 台中黃先生申貸成功!" },
  { text: "賀! 高雄張小姐申貸成功!" },
  { text: "賀! 台北蔡先生申貸成功!" },
  { text: "賀! 台南楊小姐申貸成功!" },
];

export function MarqueeBanner({
  items = defaultItems,
  duration = 60,
  className = "",
}: MarqueeBannerProps) {
  const rowContent = (
    <div className="flex items-center gap-4 w-max py-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 shrink-0 whitespace-nowrap px-4"
        >
          <HiCheckBadge className="w-6 h-6 shrink-0 text-primary" aria-hidden />
          <span className="text-lg font-medium leading-normal">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className={`overflow-hidden w-full ${className}`}>
      <div className="w-full">
        <div
          className="flex w-max animate-marquee"
          style={{ animationDuration: `${duration}s` }}
        >
          {rowContent}
          {rowContent}
        </div>
      </div>
    </section>
  );
}
