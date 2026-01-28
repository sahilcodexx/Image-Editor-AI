import Link from "next/link";
import { Button } from "../ui/button";
import { HeroVideoDialogDemoTopInBottomOut } from "../ui/HeroVideoDialogDemoTopInBottomOut";
import Container from "../common/container";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <Container className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-15 pb-20 text-center">
      <div className="bg-primary absolute bottom-94 h-50 w-50 scale-135 opacity-40 blur-3xl"></div>
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-2 rounded-2xl border-2 px-4 py-1">
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
        <h1 className="text-primary/50 mt-4 text-center text-3xl font-normal tracking-tight md:text-5xl lg:text-7xl">
          Simple Tools for <br />
          <span className="text-primary font-semibold"> Better {""}</span>
          Images
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
            <Button>Start Creating</Button>
          </Link>
          <Button variant="outline" className="border border-black/20">
            Watch Demo
          </Button>
        </div>
      </div>
      <HeroVideoDialogDemoTopInBottomOut />
    </Container>
  );
};

export default HeroSection;
