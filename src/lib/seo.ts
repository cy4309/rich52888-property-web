import type { Metadata } from "next";
import { appConfig } from "@/lib/app-config";

export const siteName = "謙謙資產管理顧問";
const primarySiteUrl = "https://www.rich52888.com";

/** SEO canonical 一律以主網域為準；NEXT_PUBLIC_SITE_URL 為單一設定來源 */
export const baseUrl = appConfig.siteUrl ?? primarySiteUrl;

export const defaultSiteDescription =
  "謙謙資產管理顧問，提供房屋二胎、代書信貸、汽機車借款、小額借款等專業資金規劃與諮詢服務。";

const ogImagePath = "/logo.png";

export const isProductionSite = appConfig.stage === "prod";

type GeneratePageMetadataParams = {
  title: string;
  description: string;
  path?: string;
  /** 設為 false 時不索引（如 404） */
  index?: boolean;
};

export function generatePageMetadata({
  title,
  description,
  path = "",
  index = true,
}: GeneratePageMetadataParams): Metadata {
  const url = path ? `${baseUrl}${path}` : baseUrl;
  const ogImage = `${baseUrl}${ogImagePath}`;
  const shouldIndex = isProductionSite && index;

  const pageTitle: Metadata["title"] =
    path === "/"
      ? {
          absolute: `${siteName}｜台北房屋二胎、代書信貸與借款諮詢`,
        }
      : title;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      title:
        path === "/"
          ? `${siteName}｜台北房屋二胎、代書信貸與借款諮詢`
          : `${title} | ${siteName}`,
      description,
      url,
      siteName,
      locale: "zh_TW",
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title:
        path === "/"
          ? `${siteName}｜台北房屋二胎、代書信貸與借款諮詢`
          : `${title} | ${siteName}`,
      description,
      images: [ogImage],
    },
  };
}
