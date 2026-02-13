"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
