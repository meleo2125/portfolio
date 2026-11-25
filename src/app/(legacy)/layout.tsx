import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BootGate } from "@/components/loader/BootGate";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mukesh Prajapat — Data systems engineer. Independent builder.",
  description:
    "Portfolio of Mukesh Prajapat — SAP Analytics automation by trade, full-stack product builds by choice.",
  metadataBase: new URL("https://mukesh.portfolio"),
  openGraph: {
    title: "Mukesh Prajapat — Portfolio",
    description:
      "Data systems engineer. Independent builder. SAP automation + AI + full-stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <BootGate>{children}</BootGate>
      </body>
    </html>
  );
}
