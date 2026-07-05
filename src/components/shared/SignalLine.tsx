"use client";

import { useEffect, useState } from "react";

/**
 * A thin vertical "signal line" that runs down the right edge of the viewport.
 * Its glow intensity is coupled to scroll progress — it brightens as the visitor
 * approaches meaningful content, per the blueprint's "wayfinding, not decoration"
 * rule.
 */
export function SignalLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p =
        (h.scrollTop || document.body.scrollTop) /
        Math.max(1, h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const glow = 0.25 + progress * 0.75; // 0.25 → 1

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-0 z-20 hidden h-screen md:block"
    >
      <div className="relative h-full w-[2px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-accent-cyan) 25%, var(--color-accent-amber) 75%, transparent)",
            opacity: glow * 0.6,
          }}
        />
        <div
          className="absolute left-1/2 h-8 w-[6px] -translate-x-1/2 rounded-full blur-md"
          style={{
            top: `${progress * 100}%`,
            transform: `translate(-50%, -50%)`,
            background: "var(--color-accent-amber)",
            opacity: glow,
          }}
        />
      </div>
    </div>
  );
}
