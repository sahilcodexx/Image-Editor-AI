"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useStoreUserEffect } from "@/hooks/use-storeuser-effect";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  const { theme } = useTheme();
  const path = usePathname();
  const { isLoading } = useStoreUserEffect();

  if (path.startsWith("/editor")) {
    return null;
  }
  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-300 bg-neutral-200/20 backdrop-blur-2xl dark:border-neutral-600/50 dark:bg-neutral-950/50">
      <div className="m-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 md:px-15">
        <Link href={"/"}>
          <Image
            src={"/whitelogo.webp"}
            alt="logo"
            width={50}
            height={40}
            priority
            className="min-w-24 object-cover invert dark:invert-0"
          ></Image>
        </Link>
        <div className="hidden md:flex">
          <ul className="flex gap-4 text-sm">
            <li>
              <Link
                href={"/feature"}
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
            <li>
              <Link
                href={"/contact"}
                className="cursor-pointer transition-all duration-200 hover:text-neutral-500 dark:hover:text-neutral-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
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

          <Link href={"/dashboard"}>
            <Button className="hidden sm:flex">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:flex">Dashboard</span>
            </Button>
          </Link>

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
              height={"2px"}
              width={"100%"}
              color={theme === "light" ? "#0a0a0a" : "#fafafa"}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
