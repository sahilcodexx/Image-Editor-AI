import Link from "next/link";
import { Button } from "../ui/button";
import { HeroVideoDialogDemoTopInBottomOut } from "../ui/HeroVideoDialogDemoTopInBottomOut";
import Container from "../common/container";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <Container className=" pt-15 pb-20 text-center min-h-screen flex flex-col items-center justify-center relative  overflow-hidden">
      <div className="w-full flex items-center justify-center">
        <div className=" border-2 shadow-red-400/40 px-4 py-1 gap-2 rounded-2xl shadow-sm flex items-center">
          <AnimatedShinyText>
            For fast moving engineering teams
          </AnimatedShinyText>
          <ArrowRight
            size={18}
            className=" text-red-600/70 dark:text-orange-400/70"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-6">
        <h1 className="text-center text-3xl font-medium tracking-tight text-black md:text-4xl lg:text-6xl dark:text-white mt-4">
          Simple Tools for <br />
          Better
          <span className="text-red-600/80 font-semibold dark:text-orange-600">
            {" "}
            Images
          </span>
        </h1>
        <p className="text-xs md:text-base mx-auto max-w-lg text-neutral-500 dark:text-neutral-400 mb-8 leading-tight mt-6">
          Edit images easily using AI and intuitive tools built for{" "}
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
    </Container>
  );
};

export default HeroSection;
