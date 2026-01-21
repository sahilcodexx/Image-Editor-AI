import HeroSection from "@/components/layouts/hero";
import { MarqueeDemo } from "@/components/ui/marquee-demo";

const page = () => {
  return (
    <div className="md:py-40 py-20">
      <HeroSection />
      <section className="py-20 text-center ">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">
            A Better <span>Way to Edit Images Online</span>
          </h2>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-8">
            Edit and improve images quickly with easy-to-use tools that deliver
            clean, reliable results online.
          </p>
        </div>
      </section>
      <MarqueeDemo />
    </div>
  );
};

export default page;
