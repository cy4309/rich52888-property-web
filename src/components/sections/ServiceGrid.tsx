import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { serviceDefinitions } from "@/content/services";

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
          {serviceDefinitions.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="block rounded-2xl outline-none transition-shadow hover:shadow-lg hover:shadow-black/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Card className="h-full">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
