import SectionTitle from "@/components/ui/SectionTitle";
// import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AboutIntro() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="關於我們" subtitle="認識謙謙資產管理顧問" />
        <div className="md:max-w-3xl md:mx-auto md:text-center">
          <p className="text-neutral-600 mb-6">
            {/* 公司簡介文字內容，介紹謙謙資產管理顧問的成立背景、經營理念與核心價值。 */}
            我們提供房屋融資二胎、代書信貸、房屋融資二胎、民間融資二胎、汽機車借款、小額借款等服務。
          </p>
          {/* <p className="text-neutral-600 mb-8">
            更多關於團隊、服務範圍與專業能力的說明。
          </p> */}
          {/* <Button>了解更多</Button> */}
          {/* Contact info */}
          {/* <div className="grid sm:grid-cols-2 gap-6 max-md:max-w-sm max-md:mx-auto">
            {[
              { label: "公司地址", value: "新北市板橋區長安街307號" },
              { label: "公司電話", value: "02-2901-2345" },
              { label: "公司Email", value: "rich52888@gmail.com" },
              { label: "公司統編", value: "00064112" },
            ].map((item) => (
              <Card key={item.label}>
                <div className="p-6 text-center">
                  <div className="text-sm text-neutral-500 mb-2">
                    {item.label}
                  </div>
                  <div className="font-medium text-deep">{item.value}</div>
                </div>
              </Card>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
