# 謙謙資產管理顧問官網

[RICH52888](https://www.rich52888.com) 官方網站，以 Next.js App Router 建置。內容包含服務介紹、房屋二胎試算器、最新消息（Google 試算表 API）與聯絡表單。

## 技術棧

- Next.js 16（App Router）
- React 18、TypeScript
- Tailwind CSS
- Google Analytics（依環境切換）
- Google Apps Script Web App（新聞列表／聯絡表單）

## 本地開發

```bash
npm install
npm run dev
```

開發伺服器預設為 `http://localhost:3000`（並監聽 `0.0.0.0`，方便手機同網段測試）。

```bash
npm run build
npm run start
npm run lint
```

## 環境變數

在專案根目錄建立 `.env.local`（勿提交版控）：

| 變數 | 說明 |
|------|------|
| `APP_STAGE` | `dev` 或 `prod`。`dev` 時全站 `noindex`、robots 禁止收錄、sitemap 為空 |
| `NEXT_PUBLIC_SITE_URL` | 網站絕對網址，用於 canonical、OG、sitemap（例：`https://www.rich52888.com`） |
| `NEXT_PUBLIC_SHEET_API_DEV` | 開發用 GAS 新聞 API 網址 |
| `NEXT_PUBLIC_SHEET_API_PROD` | 正式用 GAS 新聞 API 網址 |
| `NEXT_PUBLIC_GA_ID_DEV` | 開發用 GA4 Measurement ID（可省略） |
| `NEXT_PUBLIC_GA_ID_PROD` | 正式用 GA4 Measurement ID |
| `NEXT_PUBLIC_LINE_ADD_FRIEND_URL` | LINE 加好友連結 |
| `CONTACT_GAS_URL` | 聯絡表單轉發的 GAS 網址（伺服器端） |
| `CONTACT_GAS_SECRET` | 聯絡表單與 GAS 共用密鑰 |

`APP_STAGE=prod` 且 `NEXT_PUBLIC_SITE_URL` 正確時，SEO 才會對外開放索引。

## 專案結構（精簡）

```
src/
  app/                    # 路由：首頁、服務頁、新聞、API、robots、sitemap
  components/             # UI、版面、區塊、試算器
  content/services/       # 服務文案、TOC、service-definitions
  lib/                    # seo、app-config、sheet API
  styles/globals.css      # 全站樣式（Tailwind）
scripts/
  gas-news-api.js         # 部署至 Google Apps Script 的參考腳本
```

## 路由一覽

| 路徑 | 說明 |
|------|------|
| `/` | 首頁 |
| `/news` | 最新消息列表 |
| `/news/[slug]` | 新聞詳情（slug 請在 Sheet 保持唯一） |
| `/services/house-second-mortgage` | 房屋二胎（含 `#loan-calculator` 試算器） |
| `/services/scrivener-credit-loan` | 代書信貸 |
| `/services/vehicle-loan` | 汽機車借款 |
| `/services/small-loan` | 小額借款 |

## SEO 與收錄

- **Metadata**：`src/lib/seo.ts` 的 `generatePageMetadata()` 統一處理 title、description、canonical、Open Graph、Twitter。
- **首頁標題**：`謙謙資產管理顧問｜台北房屋二胎、代書信貸與借款諮詢`（避免品牌名重複兩次）。
- **子頁標題**：`{頁面標題} | 謙謙資產管理顧問`（由 `layout.tsx` 的 title template 套用）。
- **`/robots.txt`**：`APP_STAGE=prod` 時允許收錄全站、禁止 `/api/`；非 prod 則 `Disallow: /`。
- **`/sitemap.xml`**：僅 prod 產生；含首頁、`/news`、各服務頁與新聞詳情；新聞 slug 重複時只保留日期較新的一筆 URL。
- **404**：`not-found.tsx` 設為不索引。

正式上線前請確認：

1. `APP_STAGE=prod`
2. `NEXT_PUBLIC_SITE_URL=https://www.rich52888.com`（與實際網域一致）
3. Google Search Console 已提交 sitemap：`https://www.rich52888.com/sitemap.xml`

## 新聞資料（Google Sheet）

試算表欄位：`id | title | slug | excerpt | content | cover | date | seoTitle | seoDesc`

- `slug` 全表唯一（建議在 Sheet 設定資料驗證）。
- GAS 腳本參考：`scripts/gas-news-api.js`。

## 部署

建置為靜態／混合渲染的 Next.js 應用，可部署至 Vercel 或任何支援 Node.js 的環境。部署時請在平台設定與 `.env.local` 相同的環境變數，並將 `APP_STAGE` 設為 `prod`。
