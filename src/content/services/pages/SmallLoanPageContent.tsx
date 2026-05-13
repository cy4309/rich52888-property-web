// import SmallLoanMinuteCalculator from "@/components/sections/SmallLoanMinuteCalculator";
import { smallLoanTocItems } from "@/content/services/small-loan-toc";
import {
  HiOutlineBolt,
  HiOutlineGlobeAlt,
  HiOutlineUserGroup,
  HiOutlineBuildingOffice2,
  HiOutlineLockClosed,
  HiOutlineShieldCheck,
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

      <section id="small-loan-channels" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          民間小額借款的管道有哪些？
        </h2>
        <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-4 md:p-5">
          <div>
            <h3 className="font-bold text-deep">1. 代書貸款</h3>
            <p className="mt-2 text-sm">
              向民間代書申請的信用貸款，不看信用狀況即可申請。若名下沒有任何不動產（房屋、土地）或動產（如汽機車）可供抵押借貸，想申請合法小額借款或急需用錢，尋求代書協助是其中一個選擇。貸款利率
              2% 起，條件佳者利率可更低、額度可更高。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-deep">2. 當舖借款</h3>
            <p className="mt-2 text-sm">
              以手上持有的有價物品向當舖抵押借款，例如汽機車、黃金、鑽石、國際精品、名錶、3C
              產品等；不論信用條件，均可持以上物品到當舖典當借款。當舖會依二手市場價格鑑價，並依借款人還款能力評估借款額度，利率約
              2.5%。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-deep">3. 線上借錢平台</h3>
            <p className="mt-2 text-sm">
              包含借錢網、P2P
              借貸，以網路平台作為媒合角色，聚集資金提供者與資金，再貸放給借款人；通常申請條件寬鬆，可省去面談諮詢時間，申貸便利性高。但背後也隱藏一定風險，例如資訊不對稱、利率或收費不透明、詐欺及個資外洩等。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-deep">4. 地下錢莊／日日會</h3>
            <p className="mt-2 text-sm">
              多半為私人小額借款，資金來源不明，也不見得有合法經營店面，標榜可在短時間內借款。兩者多以日計息，若將日利率加上開辦費，常為年息
              30% 以上的高利貸，申請前不可不慎。
            </p>
          </div>
        </div>
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

      <section id="small-loan-legal-check" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          合法民間小額借款 5 大判斷方法
        </h2>
        <p>想找民間申貸又擔心遇到非法業者，可從以下方向初步判斷：</p>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>
            利率在合理範圍內：民間利率雖常高於銀行，但不應偏離合理範圍過多。
          </li>
          <li>
            貸款條件過於簡單：民間條件雖較寬鬆，仍會審核基本條件（如存摺出入明細、勞保異動、薪轉證明等）。若標榜僅憑身分證即可借款，務必提高警覺。
          </li>
          <li>
            不要求先提供證件：合法流程多在核貸後請申貸人出示證件確認身分；若過件前就要求寄送重要證件正本，切勿上當。
          </li>
          <li>
            雙方需要當面對保：與銀行類似，民間借款通常需當面對保簽約；若完全省略，可能有詐騙風險。
          </li>
          <li>
            不過件就不會收費：若要求先繳辦理費、手續費等，並非正常貸款程序，應特別小心。
          </li>
        </ol>
      </section>

      <section id="small-loan-requirements" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">民間小額借款申請條件</h2>
        <p>
          依管道、種類與方案不同，須具備條件不一，但基本上常需滿足以下條件（其餘依方案略有差異，歡迎申辦前與專員聯繫諮詢）：
        </p>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>年滿 18～70 歲。</li>
          <li>工作滿 3 個月且有公司勞保。</li>
          <li>有收入並能提供財力證明；無薪轉證明者可另案辦理。</li>
        </ol>
      </section>

      <section id="small-loan-calculator" className="scroll-mt-28 space-y-3">
        <h2 className="text-deep text-2xl font-bold">一分鐘方案試算器</h2>
        <p className="text-sm">
          填寫資金需求與條件後按下試算，將顯示<strong>月還款金額示意值</strong>
          與 <strong>LINE QR Code</strong>，方便您與專員進一步確認方案。
        </p>
        {/* <SmallLoanMinuteCalculator /> */}
      </section>

      <section id="small-loan-documents" className="scroll-mt-28 space-y-3">
        <h2 className="text-deep text-2xl font-bold">
          申請民間小額借款所需文件
        </h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>戶籍謄本</li>
          <li>收入證明</li>
          <li>財產清冊</li>
          <li>身分證雙證件</li>
          <li>在職證明（須正職）</li>
        </ol>
      </section>

      <section id="small-loan-process" className="scroll-mt-28 space-y-3">
        <h2 className="text-deep text-2xl font-bold">民間小額借款申請流程</h2>
        <p className="text-sm">民間借款流程主要可分為以下 4 步驟：</p>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>準備資料：身分證明、薪資證明、抵押品相關文件等。</li>
          <li>審核評估：依財務條件、信用狀況審核額度及利率。</li>
          <li>對保簽約：確認審核結果後，核對合約內容並簽訂貸款契約。</li>
          <li>確認放款：流程完成後，款項撥入指定帳戶。</li>
        </ol>
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

      <section id="small-loan-notes" className="scroll-mt-28 space-y-4">
        <h2 className="text-deep text-2xl font-bold">
          申請民間小額借款前要注意什麼？
        </h2>
        <p className="text-sm">
          申辦前若事先留意以下事項，對自己較有保障，也能借得較安心：
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li>
            事先規劃並擬定還款計畫：還款金額建議勿超過收入三分之一，熟悉自身財務並擬定完整還款計畫，確保能按時還款。
          </li>
          <li>
            仔細比較並慎選民間機構：市場選擇多，亦不乏非法業者；挑選時應留意公司正當性，必要時多諮詢專業理財顧問。
          </li>
          <li>
            熟悉自身條件並保障自己：充分了解條件後再決策，可避開風險與隱藏陷阱。
          </li>
          <li>
            挑選合法立案的貸款機構：以政府立案為判斷基礎，確認資金來源合法穩定，發生問題時較易追溯。
          </li>
        </ol>
      </section>
    </div>
  );
}
