import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/seo";
import { getNews } from "@/lib/sheet";

/** 與 sheet `getNews` 的 ISR 一致，新文章才會進 sitemap */
export const revalidate = 120;

/** 僅列出實際存在的路由。首頁區塊為 /#about、/#services 等，不宜寫成 /about 以免 404。 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNews();
  const newsUrls: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}/news/${encodeURIComponent(item.slug)}`,
    lastModified: (() => {
      const t = Date.parse(item.date);
      return Number.isNaN(t) ? new Date() : new Date(t);
    })(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...newsUrls,
  ];
}
