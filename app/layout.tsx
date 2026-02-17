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
  title: "Repimly - AI-Powered Image Editor",
  description: "A modern AI-powered image editor with advanced editing tools, background removal, and creative AI features. Transform your images with cutting-edge technology.",
  keywords: "AI image editor, photo editing, background removal, image enhancement, AI tools, photo manipulation, graphic design",
  authors: [{
    name: "Repimly Team",
    url: "https://repimly.com"
  }],
  generator: "Next.js",
  robots: "index, follow",
  openGraph: {
    title: "Repimly - AI-Powered Image Editor",
    description: "Transform your images with AI-powered editing tools and creative features.",
    type: "website",
    url: "https://repimly.com",
    images: [
      {
        url: "/video.webp",
        width: 1200,
        height: 630,
        alt: "Repimly AI Image Editor",
        type: "image/webp"
      }
    ],
    siteName: "Repimly"
  },
  twitter: {
    card: "summary_large_image",
    title: "Repimly - AI-Powered Image Editor",
    description: "Transform your images with AI-powered editing tools and creative features.",
    images: ["/video.webp"]
  },
  alternates: {
    canonical: "https://repimly.com"
  }
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
        </body>
      </ReactLenis>
    </html>
  );
}
