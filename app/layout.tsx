import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";

import SmoothScroll from "@/components/SmoothScroll";
import MobileNavigation from "@/components/MobileNavigation";

const zti = localFont({
  src: "../fonts/Zodiak-ThinItalic.woff2",
  variable: "--font-zti",
  display: "swap",
});

const zl = localFont({
  src: "../fonts/Zodiak-Light.woff2",
  variable: "--font-zl",
  display: "swap",
});

const nis = localFont({
  src: "../fonts/New-Icon-Script.woff2",
  variable: "--font-nis",
  display: "swap",
});

const jbm = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jbm",
});

export const metadata: Metadata = {
  title: "Aymen Shoteri",
  description:
    "Showcasing the work and achievements of Aymen Shoteri, a professional engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${zti.variable} ${zl.variable} ${nis.variable} ${jbm.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <SmoothScroll />

        <main className="flex-1">
          {children}
        </main>

        <Navigation />
        <MobileNavigation />

      </body>
    </html>
  );
}