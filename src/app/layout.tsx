import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import FloatingContactCard from "@/components/layout/FloatingContactCard";
import { SiteDealMarquee } from "@/components/ui/SiteDealMarquee";
import { appConfig } from "@/lib/app-config";
import { baseUrl } from "@/lib/seo";

/** 讓相對路徑 OG／canonical 解析正確；NEXT_PUBLIC_SITE_URL 使用單一設定 */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
  },
};

/** 避免 iOS 聚焦 input 時自動放大視窗（等同 maximum-scale=1, user-scalable=no） */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = appConfig.gaId;

  return (
    <html lang="zh-Hant">
      <body>
        <Navbar />
        <SiteDealMarquee />
        {/* 往上 1px 與跑馬燈重疊，避免次像素縫隙露出底層而像白線 */}
        <div className="relative -mt-px">{children}</div>
        <Footer />
        <div className="h-16 lg:hidden" aria-hidden />
        <BottomNav />
        <FloatingContactCard />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
