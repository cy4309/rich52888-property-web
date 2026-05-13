"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  HiOutlineUser,
  HiOutlineTruck,
  HiOutlineHome,
  HiOutlineCurrencyDollar,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi2";
import SectionTitle from "@/components/ui/SectionTitle";

const FAQ_CATEGORIES = [
  { id: "house-second-mortgage", label: "房屋二胎", icon: HiOutlineHome },
  { id: "vehicle-loan", label: "汽機車借款", icon: HiOutlineTruck },
  { id: "scrivener-credit", label: "代書信貸", icon: HiOutlineUser },
  { id: "small-loan", label: "小額借款", icon: HiOutlineCurrencyDollar },
];

const FAQ_DATA: Record<string, { question: string; answer: string }[]> = {
  // "house-second-mortgage": [
  //   {
  //     question: "房屋二胎可以貸多少？",
  //     answer:
  //       "實際額度會依房屋鑑價、原房貸餘額、信用條件與收入狀況評估。一般會先試算可貸空間，再規劃最適合的期數與月付金。",
  //   },
  //   {
  //     question: "房屋二胎審核重點是什麼？",
  //     answer:
  //       "重點通常包含房屋條件、借款人信用紀錄、收入穩定度與負債比。資料越完整，越有助於提高核准效率與條件。",
  //   },
  //   {
  //     question: "房屋二胎的申辦速度快嗎？",
  //     answer:
  //       "相較傳統金融機構，部分房屋二胎方案流程通常較快，若文件齊全且擔保條件明確，常可在短時間內完成審核與撥款。",
  //   },
  //   {
  //     question: "申請房屋二胎要注意什麼？",
  //     answer:
  //       "建議先確認年利率、總費用年百分率、違約條款與提前清償規定，並比較不同方案，避免後續還款壓力過大。",
  //   },
  // ],
  "house-second-mortgage": [
    {
      question: "信用瑕疵、沒薪轉證明也可以辦理房屋二胎嗎？",
      answer:
        "可以。民間二胎或專業融資公司主要評估的是「房屋剩餘價值」。即便您有負債比過高、信用評分不佳或無法提供薪資單的情況，只要房屋有殘值，都有極高機會成功核貸。",
    },
    {
      question: "辦理房屋二胎的額度大約是多少？",
      answer:
        "額度取決於房屋的市場價值扣除一胎房貸的設定金額。一般而言，二胎貸款額度在 50 萬至 500 萬之間，若房屋地段佳且殘值高，額度甚至可達千萬，不設上限。",
    },
    {
      question: "房屋二胎的申請流程需要多久？",
      answer:
        "銀行二胎約需 7-14 個工作天；而透過我們專業管道辦理，最快 24 小時內完成評估，2-3 天即可撥款，大幅縮短急用資金的等待期。",
    },
    {
      question: "二胎房貸會被家人知道嗎？流程是否保密？",
      answer:
        "我們非常重視客戶隱私。整個諮詢與審核過程皆採秘密進行，除非必要（如需保證人，依客戶意願決定），否則不會主動聯繫家人或公司，確保您的財務規劃完全保密。",
    },
  ],
  "vehicle-loan": [
    {
      question: "我的機車還在分期繳款中，還可以再借錢嗎？",
      answer:
        "可以的。這就是所謂的「機車二貸」或「機車增貸」。只要您的原貸款（不論是購車分期或融資借款）已穩定繳款超過 6~8 個月以上，且機車仍有殘值空間，我們就能協助您申請一筆額外資金，甚至能幫您代償舊貸款，調降月付金。",
    },
    {
      question: "申請機車貸款，家人會知道嗎？車子會被拖走或留置嗎？",
      answer:
        "完全不會。\n\n1. 保密性：審核過程可要求「保密照會」，除非您提供家人當保人，否則不會主動聯繫家人。\n2. 免留車：貸款核准後，我們僅會到監理站辦理「動保設定」（確保貸款期間不轉讓過戶），車子您可以繼續照常使用，完全不影響通勤生活。",
    },
    {
      question: "我有信用瑕疵（如信用卡遲繳、信用小白、負債比偏高），可以過件嗎？",
      answer:
        "機會很大。機車貸款屬於「擔保品貸款」，審核門檻比銀行信用貸款寬鬆許多。只要您有穩定的工作收入證明（如勞保、薪轉或固定往來存摺），即便信用分數不理想，融資管道通常都能彈性核貸。",
    },
    {
      question: "我的機車已經超過 10 年了，這樣還能貸款嗎？有沒有車種限制？",
      answer:
        "老車也可以辦理。融資公司的機車貸款主要看的是「人的還款能力」加上「車的剩餘價值」。\n\n1. 不限車齡：只要車子還能正常騎乘、有行照，老車一樣能申請小額週轉（通常約 5-10 萬）。\n2. 不限車種：油車、電動車（如 Gogoro）、黃紅牌重機皆可申辦，且重機的額度最高可達 150 萬。",
    },
    {
      question: "我的車貸還在繳，可以再申請額外資金嗎？（汽車增貸／轉貸）",
      answer:
        "絕對可以。\n\n只要您的原貸款已穩定繳款超過 6~8 個月，且車輛仍有殘值空間，就可以申請「汽車增貸」。我們會協助您評估目前的車輛市值，扣除原貸款餘額後，剩下的空間就是您可以提領的現金。此外，若目前利率太高，我們也能透過「轉貸」幫您代償舊債並爭取更優的還款條件。",
    },
    {
      question: "信用瑕疵、負債比過高或沒薪轉證明，還能辦理車貸嗎？",
      answer:
        "機會非常高。汽車貸款屬於「擔保品貸款」，銀行或融資公司主要看的是車輛價值。\n\n1. 信用微瑕疵：只要不是強迫停卡或目前有呆帳，融資管道通常可以彈性核准。\n2. 無薪轉證明：若您是領現族或自營商，只要提供常用存摺明細、勞保或財力證明（如不動產），我們都能協助您補強信用。",
    },
    {
      question: "辦理貸款後，車子一定要留置在公司嗎？可以過戶或賣掉嗎？",
      answer:
        "車子您可以照常使用，且不影響生活。\n\n1. 免留車：貸款核准後，僅會在監理站辦理「動產抵押權設定」，確保債權。車子您照樣開，完全不影響代步。\n2. 過戶限制：在貸款清償（結清）前，由於車輛已被設定，是無法直接辦理過戶或買賣的。\n3. 解套方案：若您中途想賣車，可由買方或我們協助清償餘額，取得「清償證明」後即可辦理塗銷並過戶。",
    },
    {
      question: "汽車貸款的額度是怎麼計算的？我的老車或進口車能貸到多少？",
      answer:
        "額度主要是根據「車輛權威價」與「申請人條件」綜合評估而成。\n\n車輛殘值：我們會參考當月最新的《天書》或《權威車訊》對您的車種進行鑑價。\n\n1. 貸款成數：\n(1) 銀行管道：通常為鑑價的 80% - 100%。\n(2) 融資管道：額度較高，最高可達鑑價的 150% - 220%。\n\n2. 實際金額：\n(1) 一般國產車／老車：視車況殘值，通常落在 10 萬至 100 萬之間。\n(2) 進口車／重機：最高額度可達 350 萬甚至更高。\n(3) 增貸空間：若為二貸，則是「核貸總額」扣除「原貸款餘額」後的剩餘空間。",
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
      question: "申請民間小額借款會限制資金用途嗎？",
      answer: "不會，可自行決定用於個人消費、房屋修繕、短期投資資金等。",
    },
    {
      question: "我的工作沒有薪轉證明，也可以申請民間小額借款嗎？",
      answer:
        "可以，無薪轉證明者只要工作滿 3 個月且有勞保投保紀錄，就可以申請民間小額借款。",
    },
  ],
};

export default function FAQList() {
  const [activeCategory, setActiveCategory] = useState("house-second-mortgage");
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
        <div className="mb-8 grid grid-cols-4 gap-2 md:flex md:justify-center md:gap-4">
          {FAQ_CATEGORIES.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCategoryChange(item.id)}
                className={cn(
                  "flex w-full flex-col items-center gap-2 rounded-2xl border-2 p-2 transition-colors md:min-w-[100px] md:p-4",
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
                    "text-[11px] font-medium leading-tight md:text-sm",
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
