"use client";
import Link from "next/link";
import Container from "./container";
import { Button } from "../ui/button";
import { Github, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname();

  if (path?.startsWith("/editor")) {
    return null;
  }

  return (
    <div className="pt-20">
      <div className="h-[0.85px] dark:bg-neutral-800 bg-neutral-300/70"></div>
      <Container className="pt-20 pb-0">
        <div className="flex items-end justify-between pb-10 ">
          <div className="flex flex-col gap-0.5">
            <h2 className="[font-family:var(--font-atma)] text-3xl font-semibold">
              Repimly
            </h2>
            <p className="text-xs opacity-70">
              © 2026 Repimly Inc. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div>
              <Link href="https://twitter.com/sahilcodex" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2 rounded-2xl"
                >
                  <Twitter size={10} />
                </Button>
              </Link>
              <Link href="https://github.com/sahilcodexx" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2 rounded-2xl"
                >
                  <Github size={10} />
                </Button>
              </Link>
            </div>
            <p className="text-sm dark:text-white/60 text-black/60">
              Made by
              <Link href="" className="dark:text-white  text-black">
                {" "}
                Sahilcodex
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-linear-to-b dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-600 bg-clip-text text-[160px] font-bold text-transparent from-neutral-100 via-neutral-200 to-neutral-300 ">
          Repimly
        </div>
      </Container>
    </div>
  );
};

export default Footer;
