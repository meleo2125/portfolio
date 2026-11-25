import type { Metadata } from "next";
import { Anybody, Hanken_Grotesk } from "next/font/google";
import "./site.css";

/* Root layout for the redesigned site (Patch bay, docs/DESIGN.md).
   The old site keeps its own root layout in (legacy) until Phase 4 replaces it. */

const anybody = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-anybody",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mukesh Prajapat",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anybody.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
