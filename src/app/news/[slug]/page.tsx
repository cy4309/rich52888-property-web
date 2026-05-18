import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/sheet";
import { generatePageMetadata } from "@/lib/seo";
import BackLink from "@/components/ui/BackLink";
import BackToTopButton from "@/components/ui/BackToTopButton";
import NewsReadTracker from "@/components/analytics/NewsReadTracker";
import SafeImage from "@/components/ui/SafeImage";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  return generatePageMetadata({
    title: item?.seoTitle ?? "新聞詳情",
    description: item?.seoDesc ?? `新聞文章：${slug}`,
    path: `/news/${slug}`,
  });
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);

  if (!item) notFound();

  return (
    <article className="bg-neutral-50 min-h-screen py-20 pb-28">
      <div className="max-w-6xl mx-auto px-6">
        <NewsReadTracker slug={slug} />
        <BackLink target="news" className="mb-6" />
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-deep mb-4">{item.title}</h1>
          <time className="text-neutral-500 text-sm">{item.date}</time>
        </header>
        {item.cover && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <SafeImage
              src={item.cover}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="text-neutral-600 leading-loose whitespace-pre-wrap">
          {item.content}
        </div>
      </div>
      <BackToTopButton ariaLabel="回到文章頂端" />
    </article>
  );
}
