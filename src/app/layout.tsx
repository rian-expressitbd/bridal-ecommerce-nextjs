import { AppProviders } from "@/lib/Provider/AppProvider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { AnimatePresence } from "motion/react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export const metadata: Metadata = {
  title: "Shifaul Islam - Aspiring Software Engineer | AI & BCI Enthusiast",
  description:
    "Welcome to the portfolio of Shifaul Islam, an aspiring software engineer passionate about AI and brain-computer interfaces. Explore projects, skills, and insights on technology and innovation.",
  verification: {
    google: "lbyp2dC9_aYxIWYVGEV5cnZ74DaZK40hAyrvvfiZqCQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <AppProviders>
        <body className={"w-full max-w-screen"}>
          <main
            className={
              "bg-linear-to-b from-blue-300  to-orange-100  dark:from-black  dark:to-gray-800 cursor-default"
            }
          >
            <Toaster position='top-right' expand={true} richColors />
            <AnimatePresence>{children}</AnimatePresence>
          </main>
        </body>
      </AppProviders>
      <GoogleTagManager gtmId='GT-552SZ8X' />
      <GoogleAnalytics gaId='G-EQNCKW71HP' />
    </html>
  );
}
