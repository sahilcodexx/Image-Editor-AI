import Link from "next/link";
import { Button } from "../ui/button";
import { HeroVideoDialogDemoTopInBottomOut } from "../ui/HeroVideoDialogDemoTopInBottomOut";

const HeroSection = () => {
  return (
    <section className="py-20 text-center min-h-screen flex flex-col items-center justify-center relative  overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 ">
        <h1 className="md:text-7xl sm:text-5xl text-4xl font-semibold mb-6">
          Simple Tools <br /> for <span>Better Images</span>
        </h1>
        <p className="text-xs mx-auto max-w-lg text-neutral-500 dark:text-neutral-400 mb-8 leading-tight">
          Edit images easily using intuitive tools built for{" "}
          <span className="text-black dark:text-white font-medium">speed</span>,{" "}
          <span className="text-black dark:text-white font-medium">
            quality
          </span>
          , and a{" "}
          <span className="text-black dark:text-white font-medium">smooth</span>{" "}
          editing experience.
        </p>

        <div className="flex  sm:flex-row gap-6 justify-center items-center mb-12">
          <Link href={"/dashboard"}>
            <Button variant="custom">Start Creating</Button>
          </Link>
          <Button variant="outline">Watch Demo</Button>
        </div>
      </div>
      <HeroVideoDialogDemoTopInBottomOut />
    </section>
  );
};

export default HeroSection;
