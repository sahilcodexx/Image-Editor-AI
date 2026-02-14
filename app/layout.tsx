import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Atma, Inter } from "next/font/google";
import Header from "@/components/common/header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClientProviders } from "./ClientProviders";
import { Toaster } from "sonner";
import { ReactLenis } from "@/utils/lenis";
import Footer from "@/components/common/footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});
const atma = Atma({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-atma",
});

export const metadata: Metadata = {
  title: "Pixel",
  description: "Ai image editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body className={`${inter.className} ${atma.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientProviders>
              <ConvexClientProvider>
                <Header />
                {children}
                <Footer />
                <Toaster />
              </ConvexClientProvider>
            </ClientProviders>
          </ThemeProvider>
          <Analytics />
        </body>
      </ReactLenis>
    </html>
  );
}
