import type { Metadata } from "next";

const siteName = "謙謙資產管理顧問";
const primarySiteUrl = "https://rich52888.com";
/**
 * SEO canonical 一律以主網域為準；備援網域（如 vercel.app）可正常瀏覽，但不作為 canonical。
 */
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? primarySiteUrl;
const ogImagePath = "/logo.png";

type GeneratePageMetadataParams = {
  title: string;
  description: string;
  path?: string;
};

export function generatePageMetadata({
  title,
  description,
  path = "",
}: GeneratePageMetadataParams): Metadata {
  const url = path ? `${baseUrl}${path}` : baseUrl;
  const ogImage = `${baseUrl}${ogImagePath}`;

  return {
    title: `${title} | ${siteName}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "zh_TW",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
