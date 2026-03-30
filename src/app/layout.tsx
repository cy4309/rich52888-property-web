import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import FloatingContactCard from "@/components/layout/FloatingContactCard";
import { baseUrl } from "@/lib/seo";

/** 讓相對路徑 OG／canonical 解析正確；請將 NEXT_PUBLIC_SITE_URL 設成實際上線網域（含 https，與託管 301 目標一致） */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
  return (
    <html lang="zh-Hant">
      <body>
        <Navbar />
        {children}
        <Footer />
        <div className="h-16 lg:hidden" aria-hidden />
        <BottomNav />
        <FloatingContactCard />
      </body>
    </html>
  );
}
