"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HiOutlineUser,
  HiOutlineArrowsRightLeft,
  HiOutlineTruck,
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi2";
import SectionTitle from "@/components/ui/SectionTitle";

const FAQ_CATEGORIES = [
  { id: "finance-mortgage", label: "房屋融資二胎", icon: HiOutlineHome },
  {
    id: "private-mortgage",
    label: "民間融資二胎",
    icon: HiOutlineArrowsRightLeft,
  },
  { id: "vehicle-loan", label: "汽機車借款", icon: HiOutlineTruck },
  { id: "scrivener-credit", label: "代書信貸", icon: HiOutlineUser },
  { id: "small-loan", label: "小額借款", icon: HiOutlineCurrencyDollar },
];

const FAQ_DATA: Record<string, { question: string; answer: string }[]> = {
  "finance-mortgage": [
    {
      question: "房屋融資二胎可以貸多少？",
      answer:
        "實際額度會依房屋鑑價、原房貸餘額、信用條件與收入狀況評估。一般會先試算可貸空間，再規劃最適合的期數與月付金。",
    },
    {
      question: "房屋融資二胎審核重點是什麼？",
      answer:
        "重點通常包含房屋條件、借款人信用紀錄、收入穩定度與負債比。資料越完整，越有助於提高核准效率與條件。",
    },
  ],
  "private-mortgage": [
    {
      question: "民間融資二胎的申辦速度快嗎？",
      answer:
        "相較傳統金融機構，民間融資二胎流程通常較快，若文件齊全且擔保條件明確，常可在短時間內完成審核與撥款。",
    },
    {
      question: "申請民間融資二胎要注意什麼？",
      answer:
        "建議先確認年利率、總費用年百分率、違約條款與提前清償規定，並比較不同方案，避免後續還款壓力過大。",
    },
  ],
  "vehicle-loan": [
    {
      question: "汽機車借款一定要留車嗎？",
      answer:
        "不一定，依方案可分為留車與免留車。可依用車需求與資金急迫性，選擇適合的借款方式。",
    },
    {
      question: "汽機車借款額度怎麼評估？",
      answer:
        "額度通常依車齡、車況、品牌、市場殘值與借款人信用條件綜合評估，文件完整可加速審核。",
    },
  ],
  "scrivener-credit": [
    {
      question: "代書信貸適合哪些人？",
      answer:
        "常見於短期資金周轉需求、希望簡化流程，且具還款能力的借款人。是否適合仍需依個人條件評估。",
    },
    {
      question: "代書信貸需要準備哪些資料？",
      answer:
        "通常需身分證明、收入或工作證明、存摺資料等，實際文件依方案與合作單位規範而定。",
    },
  ],
  "small-loan": [
    {
      question: "小額借款大約可以借多少？",
      answer:
        "常見額度為數萬到數十萬元不等，會依信用條件、收入與目前負債狀況綜合評估。",
    },
    {
      question: "小額借款多久可以撥款？",
      answer:
        "若資料齊全且審核順利，通常可在短時間內完成。實際撥款時程仍會依申辦管道與案件條件而異。",
    },
  ],
};

export default function FAQList() {
  const [activeCategory, setActiveCategory] = useState("finance-mortgage");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const faqs = FAQ_DATA[activeCategory] ?? [];

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setExpandedIndex(0);
  };

  return (
    <section id="faq" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="常見問題" />
        <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
          {FAQ_CATEGORIES.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCategoryChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-colors min-w-[100px]",
                  isActive
                    ? "border-primary shadow-lg shadow-black/5"
                    : "border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-neutral-300",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-neutral-200 text-neutral-400",
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive ? "text-deep" : "",
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white shadow-lg shadow-black/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <h3
                    className={cn(
                      "font-bold text-lg",
                      isExpanded ? "text-primary" : "text-deep",
                    )}
                  >
                    {faq.question}
                  </h3>
                  {isExpanded ? (
                    <HiOutlineChevronUp className="w-5 h-5 shrink-0 text-primary" />
                  ) : (
                    <HiOutlineChevronDown className="w-5 h-5 shrink-0 text-neutral-400" />
                  )}
                </button>
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
