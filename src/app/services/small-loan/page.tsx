import ServiceDetailShell from "@/components/services/ServiceDetailShell";
import { smallLoanService } from "@/content/services";
import { generatePageMetadata } from "@/lib/seo";

const { title, description, slug, icon, PageContent } = smallLoanService;

export const metadata = generatePageMetadata({
  title,
  description,
  path: `/services/${slug}`,
});

export default function SmallLoanServicePage() {
  return (
    <ServiceDetailShell title={title} icon={icon}>
      <PageContent />
    </ServiceDetailShell>
  );
}
