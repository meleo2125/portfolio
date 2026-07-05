"use client";

import { useEffect, useState } from "react";
import { BootLoader } from "./BootLoader";

/**
 * BootGate — mounts the BootLoader only on the first page of a browser session.
 *
 * Anti-flicker strategy:
 *  - We start in an `undecided` state and only *after* mount do we read
 *    `sessionStorage`. That prevents a flash-of-loader for returning visitors.
 *  - When the loader is undecided, we render children with `opacity: 0` so the
 *    homepage is already laid out (no layout shift on reveal) but invisible.
 *  - When the loader finishes, we mark it done and fade children in with a
 *    short overlap for a seamless hand-off.
 *
 * SessionStorage key is intentionally scoped to this app.
 */
const STORAGE_KEY = "mukesh.portfolio.booted";

type Phase = "undecided" | "loading" | "done";

export function BootGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("undecided");

  useEffect(() => {
    try {
      const alreadyBooted =
        typeof window !== "undefined" &&
        window.sessionStorage.getItem(STORAGE_KEY) === "1";
      setPhase(alreadyBooted ? "done" : "loading");
    } catch {
      // If sessionStorage is unavailable (private mode, etc.), just show it once.
      setPhase("loading");
    }
  }, []);

  const handleFinish = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setPhase("done");
  };

  const contentVisible = phase === "done";

  return (
    <>
      {/*
        Homepage is always mounted so the loader is only an overlay. This keeps
        the DOM ready and avoids any layout thrash when the loader unmounts.
        We only toggle opacity + pointer-events + aria-hidden.
      */}
      <div
        style={{
          opacity: contentVisible ? 1 : 0,
          transition:
            phase === "done"
              ? "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
          pointerEvents: contentVisible ? "auto" : "none",
        }}
        aria-hidden={!contentVisible}
      >
        {children}
      </div>

      {phase === "loading" && <BootLoader onFinish={handleFinish} />}
    </>
  );
}
