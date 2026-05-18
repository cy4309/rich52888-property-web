import type { MetadataRoute } from "next";
import { baseUrl, isProductionSite } from "@/lib/seo";
import { getNews, type NewsItem } from "@/lib/sheet";
import { serviceDefinitions } from "@/content/services";

/** 與 sheet `getNews` 的 ISR 一致，新文章才會進 sitemap */
export const revalidate = 120;

/** slug 重複時保留 date 較新的一篇，避免 sitemap 出現相同 URL */
function dedupeNewsBySlug(items: NewsItem[]): NewsItem[] {
  const bySlug = new Map<string, NewsItem>();

  for (const item of items) {
    const existing = bySlug.get(item.slug);
    if (!existing) {
      bySlug.set(item.slug, item);
      continue;
    }
    const existingTime = Date.parse(existing.date);
    const itemTime = Date.parse(item.date);
    if (
      !Number.isNaN(itemTime) &&
      (Number.isNaN(existingTime) || itemTime >= existingTime)
    ) {
      bySlug.set(item.slug, item);
    }
  }

  return [...bySlug.values()];
}

/** 僅列出實際存在的路由。首頁區塊為 /#about、/#services 等，不宜寫成 /about 以免 404。 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProductionSite) {
    return [];
  }

  const news = dedupeNewsBySlug(await getNews());
  const serviceUrls: MetadataRoute.Sitemap = serviceDefinitions.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

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
    ...serviceUrls,
    ...newsUrls,
  ];
}
