import Link from "next/link";
import { Button } from "../ui/button";
import Container from "../common/container";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { ArrowRight } from "lucide-react";
import VideoPlayer from "../ui/video-player";


const HeroSection = () => {
  return (
    <Container className=" relative flex min-h-screen flex-col items-center justify-center overflow-hidden  pb-20 text-center ">
      <div className="bg-primary absolute bottom-94 h-50 w-50 scale-135 opacity-40 blur-3xl"></div>
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-2 rounded-2xl border-2 px-4 py-1 text-xs">
            <AnimatedShinyText>
            Edit images easily with AI
            </AnimatedShinyText>
          <ArrowRight
            size={16}
            className="text-red-600/70 dark:text-primary/80"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl px-6">
        <h1 className="text-primary/50 mt-4 text-center [font-family:var(--font-atma)] text-3xl font-semibold tracking-tight md:text-5xl lg:text-7xl">
          Simple Tools for <br />
          <span className="text-primary font-bold"> Better {""}</span>
          Images
        </h1>
        <p className="mx-auto mt-6 mb-8 max-w-lg [font-family:var(--font-atma)] text-base leading-6 tracking-wide text-neutral-500 md:text-2xl dark:text-neutral-400">
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
      <VideoPlayer src="https://ik.imagekit.io/sahilcodex/sample-video.mp4?updatedAt=1768760211889"/>
    </Container>
  );
};

export default HeroSection;
