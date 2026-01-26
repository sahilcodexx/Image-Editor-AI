import Container from "@/components/common/container";
import { FeaturesSectionDemo } from "@/components/features-section-demo";
import HeroSection from "@/components/layouts/hero";

import { MarqueeDemo } from "@/components/ui/marquee-demo";
import PricingCards from "@/components/ui/pricing-component";
import { Stats } from "@/components/ui/stats-section";

const page = () => {
  return (
    <Container>
      <div className="md:py-40 py-20">
        <HeroSection />
        <Stats />
        <section className="py-20 pb-10 text-center ">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              A Better <span>Way to Edit Images Online</span>
            </h2>
            <p className="text-xl md:text-lg max-w-lg  m-auto  text-neutral-500 dark:text-neutral-400 mb-8">
              Edit and improve images quickly with easy-to-use tools that
              deliver clean, reliable results online.
            </p>
          </div>
        </section>
        <FeaturesSectionDemo />
        <section className="py-20 pb-10 text-center ">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              A Better <span>Way to Edit Images Online</span>
            </h2>
            <p className="text-xl md:text-lg max-w-lg m-auto  text-neutral-500 dark:text-neutral-400 mb-8">
              Edit and improve images quickly with easy-to-use tools that
              deliver clean, reliable results online.
            </p>
          </div>
        </section>
        
        <PricingCards />
        <section className="py-20 pb-10 text-center ">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              A Better <span>Way to Edit Images Online</span>
            </h2>
            <p className="text-xl md:text-lg max-w-lg m-auto  text-neutral-500 dark:text-neutral-400 mb-8">
              Edit and improve images quickly with easy-to-use tools that
              deliver clean, reliable results online.
            </p>
          </div>
        </section>
        <MarqueeDemo />
      </div>
    </Container>
  );
};

export default page;
