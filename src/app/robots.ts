import type { MetadataRoute } from "next";
import { baseUrl, isProductionSite } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionSite) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https?:\/\//, ""),
  };
}
