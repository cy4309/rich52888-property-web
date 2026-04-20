import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ServiceGrid from "@/components/sections/ServiceGrid";
import LatestNews from "@/components/sections/LatestNews";
import FAQList from "@/components/sections/FAQList";
import AboutIntro from "@/components/sections/AboutIntro";
import ContactCard from "@/components/sections/ContactCard";
import { generatePageMetadata } from "@/lib/seo";
import { getNews } from "@/lib/sheet";

export const metadata = generatePageMetadata({
  title: "謙謙資產管理顧問",
  description:
    "謙謙資產管理顧問，提供房屋二胎、代書信貸、汽機車借款、小額借款等服務。",
  path: "/",
});

export default async function Home() {
  const allNews = await getNews();
  const latestNews = allNews.slice(0, 3);

  return (
    <div className="bg-neutral-50">
      <Hero />
      <Stats />
      <ServiceGrid />
      <LatestNews items={latestNews} />
      <FAQList />
      <AboutIntro />
      <ContactCard />
    </div>
  );
}
