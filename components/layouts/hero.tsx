import Link from "next/link";
import { Button } from "../ui/button";
import Container from "../common/container";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { ArrowRight } from "lucide-react";
import VideoPlayer from "../ui/video-player";
import HeroHeading from "../common/hero-heading";


const HeroSection = () => {
  return (
    <Container className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-20 text-center">
      <div className="bg-primary absolute bottom-94 h-50 w-50 scale-135 opacity-40 blur-3xl"></div>
      <div className="flex w-full items-center justify-center">
        <div className="flex items-center gap-2 rounded-2xl border-2 px-4 py-1 text-xs">
          <AnimatedShinyText>Edit images easily with AI</AnimatedShinyText>
          <ArrowRight
            size={16}
            className="dark:text-primary/80 text-red-600/70"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl px-6">
        
        <HeroHeading />
        <div className="mb-12 flex items-center justify-center gap-6 sm:flex-row">
          <Link href={"/dashboard"}>
            <Button>Start Creating</Button>
          </Link>
          <Link
            href={
              "https://ik.imagekit.io/sahilcodex/Cap%202026-02-05%20at%2013.08.16.webm"
            }
          >
            <Button variant="outline" className="border border-black/20">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
      <VideoPlayer src="https://ik.imagekit.io/sahilcodex/Cap%202026-02-05%20at%2013.08.16.webm" />
    </Container>
  );
};

export default HeroSection;
