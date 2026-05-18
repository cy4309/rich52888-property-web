import { scrivenerCreditLoanTocItems } from "@/content/services/scrivener-credit-loan-toc";
import LineExpandableCta from "@/components/sections/LineExpandableCta";
import ScrollableTable from "@/components/ui/ScrollableTable";
import {
  HiOutlineBanknotes,
  HiOutlineBolt,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentCheck,
  HiOutlineDocumentCheck,
  HiOutlineDocumentText,
  HiOutlineEyeSlash,
  HiOutlineXCircle,
} from "react-icons/hi2";

export default function ScrivenerCreditLoanPageContent() {
  const tocItems = scrivenerCreditLoanTocItems;

  const whyChooseUs = [
    {
      icon: HiOutlineXCircle,
      title: "當你被銀行拒絕時",
      text: "我們不看過去的失誤，我們只看你現在的努力。只要有工作，我們就挺你。",
    },
    {
      icon: HiOutlineBolt,
      title: "當你的錢明天就要用到時",
      text: "銀行還在跑流程，我們已經把錢匯進你戶頭。24 小時撥款，幫你守住信用。",
    },
    {
      icon: HiOutlineEyeSlash,
      title: "當你不想讓家人/銀行知道時",
      text: "過程全程保密，不調聯徵、不留痕跡。讓你的財務壓力，在安靜中獲得解決。",
    },
  ] as const;

  const applicationSteps = [
    {
      icon: HiOutlineChatBubbleLeftRight,
      text: "諮詢了解資金需求及相關資訊",
    },
    {
      icon: HiOutlineClipboardDocumentCheck,
      text: "估價/審核",
    },
    {
      icon: HiOutlineDocumentText,
      text: "對保",
    },
    {
      icon: HiOutlineDocumentCheck,
      text: "設定/簽約",
    },
    {
      icon: HiOutlineBanknotes,
      text: "撥款",
    },
  ] as const;

  return (
    <div className="space-y-8 text-neutral-600 leading-relaxed">
      <nav
        aria-label="代書信貸內容索引"
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

      <section id="scrivener-credit-loan-intro" className="scroll-mt-28 space-y-3">
        <h2 className="text-deep text-2xl font-bold">代書信貸</h2>
        <p>
          又稱民間信貸，當你急需用錢，但因為信用分數不高、負債比過高或沒勞保薪轉，代書信貸就像是一個「救急的轉接頭」，由合法的代書公司或民間金主出資，提供你一個取得資金的機會。
        </p>
      </section>

      <section id="credit-comparison" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          代書信貸與銀行信貸差在哪
        </h2>
        <ScrollableTable>
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">比較項目</th>
                <th className="px-4 py-3 text-left font-bold">銀行信貸</th>
                <th className="px-4 py-3 text-left font-bold">代書信貸</th>
                <th className="px-4 py-3 text-left font-bold">
                  為什麼選擇謙謙管理顧問公司
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">審核門檻</td>
                <td className="px-4 py-3">
                  最嚴格，看聯徵分數、看負債比、看繳款紀錄。
                </td>
                <td className="px-4 py-3">
                  非常寬鬆，只要有固定工作、有還款能力即可。
                </td>
                <td className="px-4 py-3">信用瑕疵、遲繳也能辦！</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">財力證明</td>
                <td className="px-4 py-3">必須提供勞保、薪轉或扣繳憑單。</td>
                <td className="px-4 py-3">
                  較彈性，領現族、無勞保、自營商皆可討論。
                </td>
                <td className="px-4 py-3">沒薪轉、領現族也能貸！</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">撥款速度</td>
                <td className="px-4 py-3">較慢，需 7 ~ 14 個工作天。</td>
                <td className="px-4 py-3">最快速，最快 24 小時內撥款。</td>
                <td className="px-4 py-3">
                  今天申請，明天解決資金缺口！
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">聯徵紀錄</td>
                <td className="px-4 py-3">
                  每查一次就扣分，查超過 3 次直接拒貸。
                </td>
                <td className="px-4 py-3">
                  不看聯徵紀錄，不留紀錄，不影響未來跟銀行往來。
                </td>
                <td className="px-4 py-3">
                  多處被拒也不怕，不傷信用！
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">負債比</td>
                <td className="px-4 py-3">負債超過薪水 22 倍絕對不貸。</td>
                <td className="px-4 py-3">
                  不受限，依據個人還款能力彈性規劃額度。
                </td>
                <td className="px-4 py-3">
                  負債已經很高，還是能借到錢！
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">還款方式</td>
                <td className="px-4 py-3">
                  綁約期長，提前清償可能要付違約金。
                </td>
                <td className="px-4 py-3">
                  隨借隨還，或是本利攤還，彈性極大。
                </td>
                <td className="px-4 py-3">短期救急最划算，壓力更小！</td>
              </tr>
            </tbody>
          </table>
        </ScrollableTable>
      </section>

      <section id="why-choose-us" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          為什麼需要謙謙資產管理顧問幫你解決資金需求
        </h2>
        <div className="space-y-3">
          {whyChooseUs.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-4 flex gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-deep">
                  {idx + 1}. {item.title}
                </p>
                <p className="text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LineExpandableCta
        id="line-evaluation"
        buttonLabel="點我免費評估代書信貸額度，由專業管理人為您服務"
        qrTitle="加入 LINE 由專員為您確認方案"
      />

      <section id="application-process" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          代書信貸申辦流程簡便快速
        </h2>
        <div className="space-y-3">
          {applicationSteps.map((step, idx) => (
            <div
              key={step.text}
              className="rounded-2xl border border-neutral-200 bg-white p-4 flex gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-deep">
                  步驟 {idx + 1}
                </p>
                <p className="text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
