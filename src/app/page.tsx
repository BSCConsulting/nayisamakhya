import { DistributionSection } from "@/components/home/DistributionSection";
import { HeroTactical } from "@/components/home/HeroTactical";
import { MetricsGrid } from "@/components/home/MetricsGrid";
import { StrategicTimeline } from "@/components/home/StrategicTimeline";

export default function HomePage() {
  return (
    <>
      <HeroTactical />
      <MetricsGrid />
      <DistributionSection />
      <StrategicTimeline />
    </>
  );
}
