import ServiceDetailShell from "@/components/services/ServiceDetailShell";
import { houseSecondMortgageService } from "@/content/services";
import { generatePageMetadata } from "@/lib/seo";

const { title, description, slug, icon, PageContent } = houseSecondMortgageService;

export const metadata = generatePageMetadata({
  title,
  description,
  path: `/services/${slug}`,
});

export default function HouseSecondMortgageServicePage() {
  return (
    <ServiceDetailShell title={title} icon={icon}>
      <PageContent />
    </ServiceDetailShell>
  );
}
