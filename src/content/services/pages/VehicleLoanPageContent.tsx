import Link from "next/link";
import { vehicleLoanTocItems } from "@/content/services/vehicle-loan-toc";
import ScrollableTable from "@/components/ui/ScrollableTable";
import { HiOutlineNewspaper } from "react-icons/hi2";

export default function VehicleLoanPageContent() {
  const tocItems = vehicleLoanTocItems;

  const relatedArticles = [
    {
      label: "汽車貸款完整指南",
      href: "/news/car-loan-complete-guide-2026",
    },
  ] as const;

  return (
    <div className="space-y-8 text-neutral-600 leading-relaxed">
      <nav
        aria-label="汽機車借款內容索引"
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

      <section id="motorcycle-loan" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">機車貸款</h2>
        <p>
          機車貸款是利用機車作為抵押品，向銀行或融資公司申請資金，常見分為機車購車貸款、機車原車融資與機車二貸（增貸/轉貸）。
        </p>
        <ScrollableTable>
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">比較項目</th>
                <th className="px-4 py-3 text-left font-bold">機車分期付款（購車貸款）</th>
                <th className="px-4 py-3 text-left font-bold">機車原車融資（小額週轉）</th>
                <th className="px-4 py-3 text-left font-bold">機車二貸（增貸 / 轉貸）</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">核心目的</td>
                <td className="px-4 py-3">買新車或中古車，資金直接付給車行。</td>
                <td className="px-4 py-3">已有車，需現金，用機車當擔保品借款。</td>
                <td className="px-4 py-3">已有貸款中，申請額外資金或降低月付。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">申請條件</td>
                <td className="px-4 py-3">準備購買機車的消費者。</td>
                <td className="px-4 py-3">名下已有機車（需無貸款或已清償）。</td>
                <td className="px-4 py-3">原貸款已繳超過 6-8 期，尚有殘值空間。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">最高額度</td>
                <td className="px-4 py-3">依車價調整（通常為 100%）。</td>
                <td className="px-4 py-3">最高可貸 10萬 - 30萬（視車價殘值）。</td>
                <td className="px-4 py-3">扣除原貸款餘額後的剩餘價值空間。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">貸款利率</td>
                <td className="px-4 py-3">約 4% - 12%（視車廠促銷而定）。</td>
                <td className="px-4 py-3">約 8% - 15.9%（視信用與車況）。</td>
                <td className="px-4 py-3">與融資利率相似，但包含代償手續。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">撥款方式</td>
                <td className="px-4 py-3">撥給車行。</td>
                <td className="px-4 py-3">直接撥入申請人帳戶。</td>
                <td className="px-4 py-3">代償原銀行/融資後，餘額撥入帳戶。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">常見優勢</td>
                <td className="px-4 py-3">買車門檻低，常有零利率專案。</td>
                <td className="px-4 py-3">不限職業、免留車，審核撥款極快。</td>
                <td className="px-4 py-3">整合負債，一次取得更高額度資金。</td>
              </tr>
            </tbody>
          </table>
        </ScrollableTable>

        <div className="space-y-2 rounded-2xl border border-neutral-200 bg-white p-4">
          <h3 className="text-deep font-bold">機車貸款適合誰</h3>
          <p>
            信用小白、信用瑕疵、負債比過高、有小額資金需求、無工作薪資證明及名下無不動產或汽車者。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="text-deep font-bold">機車貸款申請條件</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>年滿 20 歲本國國民。</li>
              <li>名下有機車且持有滿 6 個月。</li>
              <li>有工作收入。</li>
              <li>無嚴重信用不良狀況。</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="text-deep font-bold">機車貸款申請文件</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>身分證及第二證件（健保卡或駕照）。</li>
              <li>機車行照。</li>
              <li>財力證明（勞保異動明細、薪轉存摺或扣繳憑單）。</li>
              <li>撥款存摺封面。</li>
              <li>銀行 6 個月內存款往來紀錄。</li>
              <li>機車牌照登記書及申請書。</li>
            </ol>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <h3 className="text-deep font-bold">機車貸款流程</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
            <li>提出申請並繳交相關證明文件。</li>
            <li>照會審核：依申貸條件與機車市值核定額度及利率。</li>
            <li>對保簽約：確認方案內容、利率與額度後簽約。</li>
            <li>機車動保設定：至監理站設定抵押權，可由專員代辦。</li>
            <li>撥款：完成簽約與動保設定後，資金匯入指定帳戶。</li>
          </ol>
        </div>
      </section>

      <section id="motorcycle-rate-limit" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">機車貸款利率及額度</h2>
        <ScrollableTable>
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">比較項目</th>
                <th className="px-4 py-3 text-left font-bold">銀行機車貸款</th>
                <th className="px-4 py-3 text-left font-bold">融資公司（如中租、裕富、和潤）</th>
                <th className="px-4 py-3 text-left font-bold">民間代書 / 當鋪</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">年利率</td>
                <td className="px-4 py-3">最低（約 4% - 8%）</td>
                <td className="px-4 py-3">中等（約 8% - 15.9%）</td>
                <td className="px-4 py-3">最高（月息 1%-2.5%，年化較高）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">最高額度</td>
                <td className="px-4 py-3">較低（通常僅車價 8-10 成）</td>
                <td className="px-4 py-3">高（最高可貸 10-30 萬，甚至更高）</td>
                <td className="px-4 py-3">視殘值而定，空間彈性最大</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">審核門檻</td>
                <td className="px-4 py-3">極嚴格（看信用評分、財力證明）</td>
                <td className="px-4 py-3">親民（有工作收入證明即可）</td>
                <td className="px-4 py-3">極鬆（不看信用、不看負債比）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">對聯徵影響</td>
                <td className="px-4 py-3">會查詢聯徵，並列入負債</td>
                <td className="px-4 py-3">不佔聯徵額度，不影響銀行往來</td>
                <td className="px-4 py-3">完全不留紀錄</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">撥款速度</td>
                <td className="px-4 py-3">較慢（約 5-7 個工作日）</td>
                <td className="px-4 py-3">快（約 1-2 個工作日）</td>
                <td className="px-4 py-3">極快（最快當天撥款）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">優點</td>
                <td className="px-4 py-3">利息負擔最輕，安全性最高。</td>
                <td className="px-4 py-3">過件率高、額度大，適合一般週轉。</td>
                <td className="px-4 py-3">隨借隨還，適合極短期救急。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">缺點</td>
                <td className="px-4 py-3">信用小白、負債比高者極難過件。</td>
                <td className="px-4 py-3">利率較銀行稍高，需選合法經銷商。</td>
                <td className="px-4 py-3">負擔較重，需謹慎篩選合法業者。</td>
              </tr>
            </tbody>
          </table>
        </ScrollableTable>
      </section>

      <section id="car-loan" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">汽車貸款</h2>
        <ScrollableTable>
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">貸款種類</th>
                <th className="px-4 py-3 text-left font-bold">原車融資（無貸款車）</th>
                <th className="px-4 py-3 text-left font-bold">汽車轉增貸（二貸）</th>
                <th className="px-4 py-3 text-left font-bold">老車貸款（高齡車）</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">適用對象</td>
                <td className="px-4 py-3">名下車輛已繳清或現金買斷。</td>
                <td className="px-4 py-3">車貸還在繳，且已繳滿 6-8 期。</td>
                <td className="px-4 py-3">車齡 15-20 年以上的車主。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">核心優勢</td>
                <td className="px-4 py-3">額度最高、利率最低。</td>
                <td className="px-4 py-3">整合負債，取得額外現金。</td>
                <td className="px-4 py-3">殘值再利用，不限車齡皆可。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">可貸額度</td>
                <td className="px-4 py-3">市值的 100% - 200%。</td>
                <td className="px-4 py-3">扣除餘額後的剩餘價值空間。</td>
                <td className="px-4 py-3">通常約 10萬 - 30萬。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">常見目的</td>
                <td className="px-4 py-3">創業金、緊急周轉。</td>
                <td className="px-4 py-3">降低月付金、二度資金融通。</td>
                <td className="px-4 py-3">小額急用、生活備用金。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">審核重點</td>
                <td className="px-4 py-3">個人信用與車輛市場鑑價。</td>
                <td className="px-4 py-3">原貸款繳款紀錄、剩餘空間。</td>
                <td className="px-4 py-3">車輛是否能正常行駛。</td>
              </tr>
            </tbody>
          </table>
        </ScrollableTable>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="text-deep font-bold">申請汽車貸款條件</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>年滿 20 歲本國人。</li>
              <li>需有穩定收入。</li>
              <li>汽車需登記在申請人名下。</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <h3 className="text-deep font-bold">需要準備什麼文件</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>身分證及第二證件（健保卡或駕照）。</li>
              <li>汽車行照。</li>
              <li>薪轉存摺影本、扣繳憑單、勞保明細等財力證明。</li>
              <li>撥款帳戶封面影本。</li>
            </ol>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <h3 className="text-deep font-bold">申請汽車貸款流程</h3>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm">
            <li>進行申請：於官網填寫資料或加入官方 LINE 並提供相關文件。</li>
            <li>資料審核與照會：專員審核資料並與申請人確認內容。</li>
            <li>核貸簽約：確認額度、利率及期數後簽約。</li>
            <li>撥款入帳：完成設定程序後，資金匯入指定帳戶。</li>
          </ol>
        </div>
      </section>

      <section id="car-loan-channel-comparison" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">各管道汽車貸款比較表</h2>
        <ScrollableTable>
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-700">
              <tr>
                <th className="px-4 py-3 text-left font-bold">比較項目</th>
                <th className="px-4 py-3 text-left font-bold">銀行汽車貸款</th>
                <th className="px-4 py-3 text-left font-bold">大型融資公司（中租 / 裕融 / 和潤）</th>
                <th className="px-4 py-3 text-left font-bold">民間單位（代書 / 當鋪）</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">年利率區間</td>
                <td className="px-4 py-3">2.88% - 8%（視信用）</td>
                <td className="px-4 py-3">7% - 15.99%（固定年利率）</td>
                <td className="px-4 py-3">12% - 30%（常以月息計）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">額度上限</td>
                <td className="px-4 py-3">市值 80% - 100%（最高約 300 萬）</td>
                <td className="px-4 py-3">市值 130% - 220%（最高約 350 萬）</td>
                <td className="px-4 py-3">視個案彈性調整（空間最大）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">審核門檻</td>
                <td className="px-4 py-3">極高（看薪轉、負債比、聯徵）</td>
                <td className="px-4 py-3">親民（有工作、信用瑕疵可談）</td>
                <td className="px-4 py-3">極低（有車、不看信用）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">撥款速度</td>
                <td className="px-4 py-3">較慢（約 7-10 個工作天）</td>
                <td className="px-4 py-3">快（核准後 1-2 天撥款）</td>
                <td className="px-4 py-3">極快（最快 24H 撥款）</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">聯徵紀錄</td>
                <td className="px-4 py-3">必看，且佔用銀行負債額度。</td>
                <td className="px-4 py-3">不佔銀行聯徵額度，流程保密。</td>
                <td className="px-4 py-3">完全不看聯徵，不留紀錄。</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-deep">手續費 / 設定費</td>
                <td className="px-4 py-3">約 NT$3,500 - NT$9,000</td>
                <td className="px-4 py-3">約 NT$3,500 - NT$5,000</td>
                <td className="px-4 py-3">視各家代辦 / 當鋪規定</td>
              </tr>
            </tbody>
          </table>
        </ScrollableTable>
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
                <p className="text-sm font-semibold text-deep">{article.label}</p>
                <p className="text-sm text-primary">前往閱讀最新消息</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
