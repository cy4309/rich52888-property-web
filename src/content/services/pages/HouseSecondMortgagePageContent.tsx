import { houseSecondMortgageTocItems } from "@/content/services/house-second-mortgage-toc";
import {
  HiOutlineShieldCheck,
  HiOutlineScale,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlinePhone,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentText,
  HiOutlineBanknotes,
} from "react-icons/hi2";

export default function HouseSecondMortgagePageContent() {
  const tocItems = houseSecondMortgageTocItems;
  const highlights = [
    { icon: HiOutlineScale, title: "合法利率" },
    { icon: HiOutlineShieldCheck, title: "安全專業" },
    { icon: HiOutlineSparkles, title: "彈性客製" },
    { icon: HiOutlineChartBar, title: "資產活化的最佳選擇" },
  ] as const;

  const steps = [
    {
      icon: HiOutlinePhone,
      text: "撥打諮詢專員電話、加入謙謙顧問官方 Line 或填寫表單，待專員與您聯繫。",
    },
    {
      icon: HiOutlineClipboardDocumentCheck,
      text: "審核評估：收受相關資料後，專員在 12 小時內會依照您的需求進行評估。",
    },
    {
      icon: HiOutlineDocumentText,
      text: "簽約對保：核對資金等條件符合需求後，進行簽約對保並確認資料無誤。",
    },
    {
      icon: HiOutlineBanknotes,
      text: "資金入帳：確認資料正確後，最快 24 小時內撥款至您的帳戶。",
    },
  ] as const;

  return (
    <div className="space-y-8 text-neutral-600 leading-relaxed">
      <nav
        aria-label="房屋二胎內容索引"
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

      <section id="house-second-mortgage" className="scroll-mt-28 space-y-3">
        <h2 className="text-deep text-2xl font-bold">房屋二胎</h2>
        <p>
          又稱二順位房貸，就像是把房子當成「提款機」再次提款，讓資產可以進入市場活化或進行資金周轉運用，能貸到的金額會比個人信貸更高，且不須更動原本的房貸，審核彈性，提供更靈活的投資方式。
        </p>
      </section>

      <section id="loan-comparison" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">銀行二胎、融資公司、謙謙管理顧問公司比較</h2>
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">比較項目</th>
                <th className="px-4 py-3 text-left font-bold">銀行二胎</th>
                <th className="px-4 py-3 text-left font-bold">融資公司</th>
                <th className="px-4 py-3 text-left font-bold">謙謙管理顧問公司</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">年利率</td>
                <td className="px-4 py-3">4%~16%</td>
                <td className="px-4 py-3">7%~14%</td>
                <td className="px-4 py-3">12%~24%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">貸款額度</td>
                <td className="px-4 py-3">較保守</td>
                <td className="px-4 py-3">較彈性</td>
                <td className="px-4 py-3">視房屋剩餘價值而定，不設限</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">審核速度</td>
                <td className="px-4 py-3">7-14 個工作天</td>
                <td className="px-4 py-3">3-5 個工作天</td>
                <td className="px-4 py-3">最快 24 小時撥款</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">信用門檻</td>
                <td className="px-4 py-3">極高（信用評分良好）</td>
                <td className="px-4 py-3">中等（可接受輕微信用瑕疵）</td>
                <td className="px-4 py-3">極低（不看信用分數，有房產價值即可）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">財力證明</td>
                <td className="px-4 py-3">須提供較多資料（薪轉、扣繳憑單）</td>
                <td className="px-4 py-3">較寬鬆（認列部分轉帳收入）</td>
                <td className="px-4 py-3">免證明（無固定收入、自營商皆可）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">還款期限</td>
                <td className="px-4 py-3">長達 7-10 年</td>
                <td className="px-4 py-3">約 2-7 年</td>
                <td className="px-4 py-3">依照需求及條件彈性客製</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">手續費 / 開辦費</td>
                <td className="px-4 py-3">固定開辦費 3,000-10,000</td>
                <td className="px-4 py-3">固定比例 3%-5%</td>
                <td className="px-4 py-3">依案件評估</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">適合對象</td>
                <td className="px-4 py-3">受僱職員、高薪族群</td>
                <td className="px-4 py-3">收入多元、銀行二胎額度不足</td>
                <td className="px-4 py-3">有短期周轉、大量或急迫資金需求、信用瑕疵、無法認列收入</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="why-choose-us" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          為什麼選擇謙謙資產管理顧問幫你解決資金需求
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-4 flex items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-deep">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="loan-calculator" className="scroll-mt-28 space-y-3">
        <h2 className="text-deep text-2xl font-bold">房屋二胎試算器</h2>
        <p>此區塊可放入試算器元件，協助快速估算可貸額度與每月還款。</p>
      </section>

      <section id="loan-steps" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">房屋二胎貸款步驟</h2>
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div
              key={step.text}
              className="rounded-2xl border border-neutral-200 bg-white p-4 flex gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-deep">步驟 {idx + 1}</p>
                <p className="text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
