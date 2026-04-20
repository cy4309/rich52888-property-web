// import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import {
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

const SERVICES_DATA = [
  {
    id: "house-second-mortgage",
    title: "房屋二胎",
    description: "整合多元管道，依需求彈性規劃最適合您的房屋二胎方案。",
    icon: HiOutlineHome,
  },
  {
    id: "vehicle-loan",
    title: "汽機車借款",
    description: "汽車與機車皆可評估，提供即時且彈性的借款服務。",
    icon: HiOutlineTruck,
  },
  {
    id: "scrivener-credit-loan",
    title: "代書信貸",
    description: "快速便捷的資金周轉，代書信貸方案。",
    icon: HiOutlineUser,
  },
  {
    id: "small-loan",
    title: "小額借款",
    description: "小額資金需求快速申辦，協助解決短期週轉壓力。",
    icon: HiOutlineCurrencyDollar,
  },
];

export default function ServiceGrid() {
  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <SectionTitle title="服務項目" />
          {/* <Link href="/services" className="text-primary text-sm underline">
            查看更多
          </Link> */}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((item) => (
            <Card key={item.id}>
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-deep text-lg">{item.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
