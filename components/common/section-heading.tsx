import React from "react";

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
        <h2 className="mb-2 [font-family:var(--font-atma)] text-2xl font-bold md:text-5xl">
          {title}
        </h2>
        <p className="m-auto mb-8 max-w-md [font-family:var(--font-atma)] text-xl text-neutral-500 md:text-xl dark:text-neutral-400">
          {description}
        </p>
      </div>
    </section>
  );
};

export default SectionHeading;
