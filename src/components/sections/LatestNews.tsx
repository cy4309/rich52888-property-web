import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import TrackedLink from "@/components/analytics/TrackedLink";
import type { NewsItem } from "@/lib/sheet";

type LatestNewsProps = {
  items: NewsItem[];
};

export default function LatestNews({ items }: LatestNewsProps) {
  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="最新消息" subtitle="掌握最新動態" />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <TrackedLink
              key={item.id}
              href={`/news/${item.slug}`}
              eventName="news_card_click"
              eventParams={{ source: "home_latest_news", news_slug: item.slug }}
            >
              <Card>
                <div className="aspect-video bg-neutral-100 overflow-hidden">
                  {item.cover ? (
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-deep mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
                    {item.excerpt}
                  </p>
                  <span className="text-xs text-neutral-400">{item.date}</span>
                </div>
              </Card>
            </TrackedLink>
          ))}
        </div>
        <div className="mt-8 text-center">
          <TrackedLink
            href="/news"
            eventName="section_nav_click"
            eventParams={{ source: "home_latest_news", target: "news_list" }}
            className={buttonVariants("outline")}
          >
            查看更多
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
