"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useStoreUserEffect } from "@/hooks/use-storeuser-effect";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const Header = () => {
  const { theme } = useTheme();
  const path = usePathname();
  const { isLoading } = useStoreUserEffect();
  const { has } = useAuth();

  const [scrolled, setScrolled] = useState<boolean>(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (lastest) => {
    if (lastest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  if (path.startsWith("/editor")) {
    return null;
  }
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-2xl">
      <motion.div
        animate={{
          width: scrolled ? "80%" : "100%",
          y: scrolled ? 10 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="m-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 md:px-15"
      >
        <Link href={"/"} className="flex items-end text-2xl font-semibold">
          <h2 className="h-full [font-family:var(--font-atma)]">Repimly</h2>
        </Link>
        {/* <div className="hidden md:flex">
          <ul className="flex gap-4 text-sm">
            <li>
              <Link
                href={"/#features"}
                className="cursor-pointer transition-all duration-200 hover:text-neutral-500 dark:hover:text-neutral-400"
              >
                Feature
              </Link>
            </li>{" "}
            <li>
              <Link
                href={"/pricing"}
                className="cursor-pointer transition-all duration-200 hover:text-neutral-500 dark:hover:text-neutral-400"
              >
                Pricing
              </Link>
            </li>{" "}
          </ul>
        </div> */}
        <div className="flex items-center gap-4">
          <Unauthenticated>
            <SignInButton>
              <Button variant={"outline"} className="hidden sm:flex">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button>Get Started</Button>
            </SignUpButton>
          </Unauthenticated>

          {!has && (
            <Link href={"/dashboard"}>
              <Button variant={"outline"} className="hidden sm:flex">
                <LayoutDashboard className="mr-2" size={18} />
                Dashboard
              </Button>
            </Link>
          )}

          <Authenticated>
            <UserButton />
          </Authenticated>
          <span>
            <ModeToggle />
          </span>
        </div>
        {isLoading && (
          <div className="fixed bottom-0 left-0 z-40 flex w-full justify-center">
            <BarLoader
              height="0.5px"
              width="100%"
              color={theme === "light" ? "#0a0a0a" : "#fafafa"}
            />
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default Header;
