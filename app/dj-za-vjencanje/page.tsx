import { ServiceLanding } from "@/components/features/service-landing";
import { landingPages } from "@/config/landing-pages";
import { buildLandingMetadata } from "@/lib/landing-metadata";

const data = landingPages.vjencanje;

export const metadata = buildLandingMetadata(data);

export default function Page() {
  return <ServiceLanding data={data} />;
}
