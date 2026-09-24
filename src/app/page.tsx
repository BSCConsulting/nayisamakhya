import { BentoGrid } from "@/components/home/BentoGrid";
import { HeroTactical } from "@/components/home/HeroTactical";
import { SocialInsights } from "@/components/home/SocialInsights";
import { StrategicTimeline } from "@/components/home/StrategicTimeline";

export default function HomePage() {
  return (
    <>
      <HeroTactical />
      <BentoGrid />
      <SocialInsights />
      <StrategicTimeline />
    </>
  );
}
