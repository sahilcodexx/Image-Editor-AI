import Link from "next/link";
import { Button } from "../ui/button";
import { HeroVideoDialogDemoTopInBottomOut } from "../ui/HeroVideoDialogDemoTopInBottomOut";
import Container from "../common/container";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <Container className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-15 pb-20 text-center">
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-2 rounded-2xl border-2 px-4 py-1 shadow-sm shadow-red-400/40">
          <AnimatedShinyText>
            For fast moving engineering teams
          </AnimatedShinyText>
          <ArrowRight
            size={18}
            className="text-red-600/70 dark:text-orange-400/70"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl px-6">
        <h1 className="mt-4 text-center text-3xl font-medium tracking-tight text-black md:text-5xl lg:text-7xl dark:text-white">
          Simple Tools for <br />
          Better
          <span className="font-semibold text-red-600/80 dark:text-orange-600">
            {" "}
            Images
          </span>
        </h1>
        <p className="mx-auto mt-6 mb-8 max-w-lg text-xs leading-tight text-neutral-500 md:text-base dark:text-neutral-400">
          Edit images easily using AI and intuitive tools built for{" "}
          <span className="font-medium text-black dark:text-white">speed</span>,{" "}
          <span className="font-medium text-black dark:text-white">
            quality
          </span>
          , and a{" "}
          <span className="font-medium text-black dark:text-white">smooth</span>{" "}
          editing experience.
        </p>

        <div className="mb-12 flex items-center justify-center gap-6 sm:flex-row">
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
