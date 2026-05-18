import Link from "next/link";
// import SmallLoanMinuteCalculator from "@/components/sections/SmallLoanMinuteCalculator";
import { smallLoanTocItems } from "@/content/services/small-loan-toc";
import {
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
  HiOutlineNewspaper,
} from "react-icons/hi2";

export default function SmallLoanPageContent() {
  const tocItems = smallLoanTocItems;

  const features = [
    {
      icon: HiOutlineBolt,
      title: "不分平假日，小額借款當天撥款",
    },
    {
      icon: HiOutlineGlobeAlt,
      title: "全台各區皆可線上申辦",
    },
    {
      icon: HiOutlineUserGroup,
      title: "無勞保、無薪轉、學生、外送員皆可貸",
    },
    {
      icon: HiOutlineBuildingOffice2,
      title: "合法經營政府立案",
    },
    {
      icon: HiOutlineLockClosed,
      title: "保密審核",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "絕無事前收費",
    },
  ] as const;

  const relatedArticles = [
    {
      label: "民間小額借款指南",
      href: "/news/private-small-loan-guide",
    },
    {
      label: "薪轉貸款指南",
      href: "/news/payroll-transfer-loan-guide",
    },
    {
      label: "勞保貸款指南",
      href: "/news/labor-insurance-loan-guide",
    },
  ] as const;

  return (
    <div className="space-y-8 text-neutral-600 leading-relaxed">
      <nav
        aria-label="小額借款內容索引"
        className="rounded-2xl border border-neutral-200 bg-white p-5"
      >
        <h2 className="text-deep text-base font-bold">內容索引</h2>
        <ul className="mt-3 space-y-2">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-primary underline-offset-2 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="small-loan-intro" className="scroll-mt-28 space-y-3">
        <h2 className="text-deep text-2xl font-bold">小額借款是什麼？</h2>
        <p>
          民間小額借款又稱小額借款、小額借錢，顧名思義就是小金額的信用貸款，額度通常在
          10 萬～50
          萬元內。目前民間小額借款的貸款管道包含代書、當舖、線上借錢平台、地下錢莊和日日會。
        </p>
      </section>

      <section
        id="small-loan-bank-vs-private"
        className="scroll-mt-28 space-y-4"
      >
        <h2 className="text-deep text-2xl font-bold">
          銀行和民間小額借款的差異？
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="font-bold text-deep">1. 銀行小額借款</h3>
            <p className="mt-2 text-sm">
              銀行是多數人申請小額借款時的優先選擇，但審核對信用條件較嚴格，通常會審核個人聯徵紀錄與財力證明；若有信用卡或貸款遲繳等不良紀錄，可能申請失敗。
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="font-bold text-deep">2. 民間小額借款</h3>
            <p className="mt-2 text-sm">
              對信用條件要求相對較低，有些民間貸款機構僅要求工作證明或薪資單，對信用有瑕疵者是取得資金援助的管道之一。申請前仍須仔細評估自身還款能力，避免未繳或遲繳。
            </p>
          </div>
        </div>
      </section>

      <section id="small-loan-pros-cons" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          民間小額借款有什麼優缺點？
        </h2>
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 md:p-5">
          <h3 className="font-bold text-deep">1. 民間小額借款優點</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
            <li>
              申請流程方便：金額較低、機構承擔風險相對較小，申貸流程較寬鬆，評估與對保簽約後即可放款。
            </li>
            <li>
              放款時間快速：除流程較寬鬆外，放款速度常比銀行信用貸款快，部分甚至可
              24 小時內撥款，急需周轉時較有彈性。
            </li>
            <li>
              多元還款方式：可依利率高低、還款期限長短比較方案；若每月還款能力高，可選月付較高、利率較低；若想減輕月付壓力，也可在利率與期數間取得平衡。
            </li>
          </ol>
          <h3 className="mt-6 font-bold text-deep">2. 民間小額借款缺點</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
            <li>
              月付金負擔高：民間小額借款承受的借貸風險較高（例如呆帳），利率與月付負擔通常較高。
            </li>
            <li>
              借貸風險較高：管道多元，並非每個機構都合法；情急之下更難判斷，若誤向地下錢莊借貸，風險極高。
            </li>
          </ol>
        </div>
      </section>

      <section id="small-loan-features" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          謙謙管理顧問公司小額借貸特色
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-4 flex items-start gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <p className="font-semibold text-deep text-sm leading-snug pt-1">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="related-articles" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">你可能會想知道</h2>
        <p className="text-sm">連結到最新消息的文章：</p>
        <div className="space-y-3">
          {relatedArticles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="rounded-2xl border border-neutral-200 bg-white p-4 flex gap-3 transition-colors hover:border-primary/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HiOutlineNewspaper className="h-5 w-5" aria-hidden />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-deep">
                  {article.label}
                </p>
                <p className="text-sm text-primary">前往閱讀最新消息</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
