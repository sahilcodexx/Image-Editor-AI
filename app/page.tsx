import Container from "@/components/common/container";
import { FeaturesSection } from "@/components/features-section";
import HeroSection from "@/components/layouts/hero";
import { MarqueeCard } from "@/components/ui/marquee.";
import PricingCards from "@/components/ui/pricing-component";
import { Stats } from "@/components/ui/stats-section";

const page = () => {
  return (
    <Container className="relative overflow-hidden">
      <div className="bg-primary/15 dark:bg-primary/10 absolute top-0 right-1/16 bottom-60 h-60 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"></div>
      <div className="md:pt-40` py-20 md:py-40">
        <HeroSection />
        <Stats />
        <FeaturesSection />
        <PricingCards />
        <MarqueeCard />
      </div>
    </Container>
  );
};

export default page;
