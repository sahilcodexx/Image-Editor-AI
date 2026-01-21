import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="py-20 text-center min-h-screen flex items-center justify-center relative  overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 ">
        <h1 className="md:text-8xl sm:text-6xl font-bold mb-6">
          Simple Tools <br /> for <span>Better Images</span>
        </h1>
        <p className="text-xl mx-auto max-w-xl text-neutral-500 dark:text-neutral-400 mb-8 leading-tight">
          Edit images easily using intuitive tools built for{" "}
          <span className="text-black dark:text-white font-medium">speed</span>,{" "}
          <span className="text-black dark:text-white font-medium">
            quality
          </span>
          , and a{" "}
          <span className="text-black dark:text-white font-medium">smooth</span>{" "}
          editing experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <Link href={"/dashboard"}>
            <Button>Start Creating</Button>
          </Link>
          <Button variant={"outline"}>Watch Demo</Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
