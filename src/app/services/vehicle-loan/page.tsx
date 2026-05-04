import ServiceDetailShell from "@/components/services/ServiceDetailShell";
import { vehicleLoanService } from "@/content/services";
import { generatePageMetadata } from "@/lib/seo";

const { title, description, slug, icon, PageContent } = vehicleLoanService;

export const metadata = generatePageMetadata({
  title,
  description,
  path: `/services/${slug}`,
});

export default function VehicleLoanServicePage() {
  return (
    <ServiceDetailShell title={title} icon={icon}>
      <PageContent />
    </ServiceDetailShell>
  );
}
