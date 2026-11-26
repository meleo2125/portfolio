import Link from "next/link";
import type { Metadata } from "next";
import { notFound as copy } from "@/content/site";

export const metadata: Metadata = { title: copy.heading, robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="gutter grid min-h-[100svh] content-center">
      <h1 className="t-h2 m-0 mb-6">{copy.heading}</h1>
      <p className="t-lede m-0">
        {copy.text} <Link href="/">{copy.link}</Link>.
      </p>
    </main>
  );
}
