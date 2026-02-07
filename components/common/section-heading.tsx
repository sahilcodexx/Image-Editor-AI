"use client";
import { motion } from "motion/react";

const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <section className="py-20 pb-10 text-center">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-2 [font-family:var(--font-atma)] text-2xl font-bold md:text-5xl"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="m-auto mb-8 max-w-md [font-family:var(--font-atma)] text-xl text-neutral-500 md:text-xl dark:text-neutral-400"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default SectionHeading;
