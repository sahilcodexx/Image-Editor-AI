"use client";
import { motion } from "motion/react";

const HeroHeading = () => {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-primary/50 mt-4 text-center [font-family:var(--font-atma)] text-3xl font-semibold tracking-tight md:text-5xl lg:text-7xl"
      >
        Simple Tools for <br />
        <span className="text-primary font-bold"> Better {""}</span>
        Images
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.4, delay: 0.4 }}
        viewport={{ once: true }}
        className="mx-auto mt-6 mb-8 max-w-lg [font-family:var(--font-atma)] text-base leading-6 tracking-wide text-neutral-500 md:text-2xl dark:text-neutral-400"
      >
        Edit images easily using AI and intuitive tools built for{" "}
        <span className="font-medium text-black dark:text-white">speed</span>,{" "}
        <span className="font-medium text-black dark:text-white">quality</span>,
        and a{" "}
        <span className="font-medium text-black dark:text-white">smooth</span>{" "}
        editing experience.
      </motion.p>
    </>
  );
};

export default HeroHeading;
