"use client";
import { Calendar, ImagePlay } from "lucide-react";
import Container from "../common/container";
import Link from "next/link";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function PricingCards() {
  const planId = "cplan_38lbLCIiQTjK6kv6sp6hab6hXoX";

  const LightCheckIcon = ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="8" className="fill-neutral-900" />
      <path
        d="M5.5 8.5L7 10L11 6"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const DarkCheckIcon = ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7.5" className="stroke-neutral-500" />
      <path
        d="M5.5 8.5L7 10L11 6"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const starterFeatures = [
    "1 design concept",
    "Custom code",
    "On-time delivery",
    "Email support",
    "3 projects maximum",
  ];
  const proFeatures = [
    "3 design concepts",
    "Custom code",
    "On-time delivery",
    "Priority support",
    "Micro-interactions",
  ];

  return (
    <Container>
      <div className="m-auto max-w-3xl">
        <div className="mx-auto grid w-full max-w-225 grid-cols-1 gap-8 md:grid-cols-2">
          <div
            className={[
              "rounded-3xl p-2",
              "bg-white/65 backdrop-blur-md",
              "border border-neutral-200/70",
              "shadow-[0_12px_40px_-15px_rgba(0,0,0,0.15)]",
              "ring-1 ring-white/40 ring-inset",
            ].join(" ")}
          >
            <div
              className={[
                "mb-2 rounded-2xl p-8",
                "bg-white/80 backdrop-blur-sm",
                "border border-neutral-200/80",
                "ring-1 ring-neutral-900/5 ring-inset",
              ].join(" ")}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-neutral-900">
                    Starter
                  </h2>
                  <p className="mt-1 text-base leading-relaxed text-neutral-600">
                    Launch quickly with a solid landing page.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium text-nowrap text-neutral-700 shadow-sm backdrop-blur">
                  Most Friendly
                </span>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-bold tracking-tighter text-neutral-900">
                  $0
                </span>
                <span className="ml-1 text-lg text-neutral-400">/free</span>
              </div>

              <Link href={"#"}>
                <button
                  className={[
                    "w-full cursor-pointer rounded-xl py-4 text-base font-semibold",
                    "bg-neutral-900 text-white",
                    "transition-opacity duration-200 hover:opacity-95",
                    "flex items-center justify-center gap-2.5",
                    "shadow-[0_4px_18px_-6px_rgba(0,0,0,0.4)]",
                    "ring-1 ring-neutral-900/10 ring-inset",
                  ].join(" ")}
                >
                  Get Started Free
                  <ImagePlay className="h-5 w-5 text-neutral-300" />
                </button>
              </Link>
            </div>

            <div
              className={[
                "px-6 pt-4 pb-6",
                "rounded-2xl bg-white/50 backdrop-blur-sm",
                "border border-neutral-200/70",
                "ring-1 ring-white/30 ring-inset",
              ].join(" ")}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {starterFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <LightCheckIcon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium text-neutral-800">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dark (Pro) Card - glassy with unique border/outline */}
          <div
            className={[
              "rounded-3xl p-2",
              "bg-neutral-900/60 backdrop-blur-md",
              "border border-neutral-800",
              "shadow-[0_12px_50px_-15px_rgba(0,0,0,0.55)]",
              "ring-1 ring-white/5 ring-inset",
              "dark",
            ].join(" ")}
          >
            <div
              className={[
                "mb-2 rounded-2xl p-8",
                "bg-neutral-900/70 backdrop-blur-sm",
                "border border-neutral-800",
                "ring-1 ring-white/10 ring-inset",
              ].join(" ")}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-neutral-50">
                    Pro
                  </h2>
                  <p className="mt-1 text-base leading-relaxed text-neutral-400">
                    Go further with more concepts and polish.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900/50 px-3 py-1 text-xs font-medium text-nowrap text-neutral-300 backdrop-blur">
                  Best Value
                </span>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-bold tracking-tighter text-white">
                  $2299
                </span>
                <span className="ml-1 text-lg text-neutral-500">/fixed</span>
              </div>
              <SignedIn>
                <CheckoutButton planId={planId} planPeriod="month">
                  <button
                    className={[
                      "w-full cursor-pointer rounded-xl py-4 text-base font-semibold",
                      "bg-white text-neutral-900",
                      "transition-opacity duration-200 hover:opacity-95",
                      "flex items-center justify-center gap-2.5",
                      "shadow-[0_4px_18px_-6px_rgba(255,255,255,0.35)]",
                      "ring-1 ring-white/30 ring-inset",
                    ].join(" ")}
                  >
                    Book a call
                    <Calendar className="h-5 w-5 text-neutral-600" />
                  </button>
                </CheckoutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className={[
                      "w-full cursor-pointer rounded-xl py-4 text-base font-semibold",
                      "bg-white text-neutral-900",
                      "transition-opacity duration-200 hover:opacity-95",
                      "flex items-center justify-center gap-2.5",
                      "shadow-[0_4px_18px_-6px_rgba(255,255,255,0.35)]",
                      "ring-1 ring-white/30 ring-inset",
                    ].join(" ")}
                  >
                    Book a call
                    <Calendar className="h-5 w-5 text-neutral-600" />
                  </button>
                </SignInButton>
              </SignedOut>
            </div>

            <div
              className={[
                "px-6 pt-4 pb-6",
                "rounded-2xl bg-neutral-900/55 backdrop-blur-sm",
                "border border-neutral-800",
                "ring-1 ring-white/10 ring-inset",
              ].join(" ")}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {proFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <DarkCheckIcon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium text-neutral-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
