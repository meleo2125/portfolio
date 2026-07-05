"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BootLoader — a first-visit boot sequence that fits the portfolio's
 * control-room / telemetry aesthetic.
 *
 * Design notes:
 * - Reuses the site's tokens (--color-bg / --color-accent-amber / --color-accent-cyan),
 *   typography (JetBrains Mono labels, Space Grotesk display) and surface treatments
 *   (panel, panel-corners, scanlines, grid-backdrop).
 * - Central focal element is a "sys-graph" style rotating diamond that echoes the
 *   Hero's NodeGraph vocabulary (amber node, cyan links, mono corner marks).
 * - Status readout streams mono log lines like the Hero's `SYS:BOOT · v25.07 · online`.
 * - Progress is shown as a telemetry bar (amber → cyan gradient) with a mono ETA
 *   readout — no generic browser spinner.
 * - Exit is a top-to-bottom reveal wipe (clip-path) combined with an opacity fade,
 *   so the homepage is disclosed rather than "snapped in".
 * - Respects `prefers-reduced-motion` — the sigil holds a still frame and messages
 *   appear instantly.
 *
 * Timing is configurable via props; defaults land in the ~3.6s window.
 */
export type BootLoaderProps = {
  /** Total duration of the boot sequence in ms. Default 3600. */
  duration?: number;
  /** Fade / reveal duration when exiting, in ms. Default 550. */
  exitDuration?: number;
  /** Status log messages to stream during the sequence. */
  messages?: string[];
  /** Label rendered under the sigil. */
  systemLabel?: string;
  /** Called after the exit animation finishes. */
  onFinish?: () => void;
};

const DEFAULT_MESSAGES = [
  "SYS:BOOT · v25.07",
  "LINK · MUKESH@PORTFOLIO",
  "CH:01 automation · ONLINE",
  "CH:02 fullstack · ONLINE",
  "HANDSHAKE · portfolio",
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function BootLoader({
  duration = 3600,
  exitDuration = 550,
  messages = DEFAULT_MESSAGES,
  systemLabel = "portfolio.sys",
  onFinish,
}: BootLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const reducedMotion = useReducedMotion();
  const startedAt = useRef<number>(0);

  // Progress ticker — RAF-driven for smoothness, capped by `duration`
  useEffect(() => {
    let raf = 0;
    startedAt.current = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - startedAt.current) / duration);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // Small settle before beginning exit
        window.setTimeout(() => setVisible(false), 120);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  // Stream in status messages evenly across the duration
  useEffect(() => {
    if (reducedMotion) {
      setVisibleMessages(messages);
      return;
    }
    const step = duration / (messages.length + 1);
    const timers = messages.map((m, i) =>
      window.setTimeout(() => {
        setVisibleMessages((prev) => (prev.includes(m) ? prev : [...prev, m]));
      }, step * (i + 1) * 0.65) // front-load a little so the log fills before 100%
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [messages, duration, reducedMotion]);

  const percent = Math.round(progress * 100);

  // Fake "packet" counter for telemetry flavor — deterministic from progress
  const packets = useMemo(
    () => 128 + Math.round(progress * 872),
    [progress]
  );

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          key="boot-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={false}
          exit={{
            opacity: 0,
            // Reveal wipe from top → bottom, so the homepage is unveiled
            clipPath: reducedMotion
              ? "inset(0% 0% 0% 0%)"
              : "inset(100% 0% 0% 0%)",
          }}
          transition={{
            duration: exitDuration / 1000,
            ease: EASE,
          }}
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-bg"
          style={{ willChange: "opacity, clip-path" }}
        >
          {/* Ambient layers — same treatments used elsewhere in the site */}
          <div className="grid-backdrop" />
          <div className="scanlines" />

          {/* Soft amber vignette from center */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(232, 163, 61, 0.06), transparent 55%)",
            }}
          />

          {/* Top-left system tag — mirrors Hero's SYS:BOOT strip */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute left-6 top-6 flex items-center gap-2 md:left-10 md:top-10"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-amber"
              style={{ boxShadow: "0 0 10px var(--color-accent-amber)" }}
            />
            <span className="label-mono">SYS:BOOT · v25.07</span>
          </motion.div>

          {/* Top-right session tag */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="absolute right-6 top-6 hidden items-center gap-2 md:right-10 md:top-10 md:flex"
          >
            <span className="label-mono">SESSION · {systemLabel}</span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-cyan"
              style={{ boxShadow: "0 0 8px var(--color-accent-cyan)" }}
            />
          </motion.div>

          {/* Central column */}
          <div className="relative z-10 flex w-full max-w-content flex-col items-center px-6">
            <BootSigil reducedMotion={reducedMotion} />

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              className={`mt-8 text-center font-display text-2xl font-medium tracking-tight md:text-3xl ${
                reducedMotion ? "" : "boot-flicker"
              }`}
            >
              Establishing link
              <span className="caret" aria-hidden="true" />
            </motion.div>

            {/* Telemetry / progress panel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="panel panel-corners mt-10 w-full max-w-md p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="label-mono">TELEMETRY</span>
                <span className="flex items-center gap-2 font-mono text-xs text-amber">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-amber"
                    style={{ boxShadow: "0 0 8px var(--color-accent-amber)" }}
                  />
                  {percent.toString().padStart(3, "0")}%
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="relative h-[3px] w-full overflow-hidden rounded-sm bg-white/5"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: `${percent}%`,
                    background:
                      "linear-gradient(90deg, var(--color-accent-cyan), var(--color-accent-amber))",
                    boxShadow: "0 0 10px rgba(232, 163, 61, 0.5)",
                    transition: reducedMotion
                      ? "none"
                      : "width 120ms linear",
                  }}
                />
                {/* Scan head */}
                {!reducedMotion && percent < 100 && (
                  <div
                    className="absolute top-1/2 h-3 w-[2px] -translate-y-1/2 bg-amber"
                    style={{
                      left: `calc(${percent}% - 1px)`,
                      boxShadow: "0 0 8px var(--color-accent-amber)",
                      transition: "left 120ms linear",
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Meta line */}
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span>PKT · {packets.toString().padStart(4, "0")}</span>
                <span>CH · 02 / 02</span>
                <span>LAT · {Math.max(4, 42 - Math.round(progress * 38))}ms</span>
              </div>
            </motion.div>

            {/* Streaming log */}
            <div
              className="mt-6 min-h-[88px] w-full max-w-md text-left font-mono text-[11px] leading-relaxed text-text-muted"
              aria-hidden="true"
            >
              <AnimatePresence initial={false}>
                {visibleMessages.map((m) => (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-amber">◉</span>
                    <span className="uppercase tracking-widest">{m}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom-left signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-text-muted md:bottom-10 md:left-10"
          >
            <span className="text-amber">◉</span> mukesh.prajapat · rev.01
          </motion.div>

          {/* Bottom-right link indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="absolute bottom-6 right-6 hidden font-mono text-[10px] uppercase tracking-widest text-text-muted md:bottom-10 md:right-10 md:block"
          >
            link · {percent === 100 ? "stable" : "syncing"}
            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
              style={{
                background:
                  percent === 100
                    ? "var(--color-accent-amber)"
                    : "var(--color-accent-cyan)",
                boxShadow:
                  percent === 100
                    ? "0 0 8px var(--color-accent-amber)"
                    : "0 0 8px var(--color-accent-cyan)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Focal element — a rotating diamond sigil built from the site's node-graph
   vocabulary (amber core, cyan links, mono corner ticks). No canvas, so it
   stays crisp on any DPR and costs almost nothing on the main thread.        */
/* -------------------------------------------------------------------------- */
function BootSigil({ reducedMotion }: { reducedMotion: boolean }) {
  // Static coords — mirrors the NodeGraph "sys-graph" language
  const nodes = [
    { cx: 60, cy: 8, kind: "cyan" as const },
    { cx: 112, cy: 60, kind: "cyan" as const },
    { cx: 60, cy: 112, kind: "cyan" as const },
    { cx: 8, cy: 60, kind: "cyan" as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative"
      style={{ width: 168, height: 168 }}
      aria-hidden="true"
    >
      {/* Panel frame around the sigil, echoing panel-corners */}
      <div
        className="absolute inset-0 rounded-md border border-white/5"
        style={{
          background:
            "radial-gradient(circle at center, rgba(63,143,166,0.08), transparent 70%)",
        }}
      />
      {/* Corner ticks (cyan) — reused motif from .panel-corners */}
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-l border-b",
        "right-0 bottom-0 border-r border-b",
      ].map((cls, i) => (
        <span
          key={i}
          className={`absolute h-2.5 w-2.5 ${cls}`}
          style={{ borderColor: "var(--color-accent-cyan)", opacity: 0.6 }}
        />
      ))}

      {/* Rotating diamond of links + a pulsing amber core */}
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)]"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Faint circular guides */}
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="var(--color-grid-line)"
          strokeOpacity="0.25"
          strokeDasharray="2 6"
        />
        <circle
          cx="60"
          cy="60"
          r="36"
          fill="none"
          stroke="var(--color-grid-line)"
          strokeOpacity="0.2"
        />

        {/* Links from center to each outer node */}
        {nodes.map((n, i) => (
          <line
            key={`l-${i}`}
            x1="60"
            y1="60"
            x2={n.cx}
            y2={n.cy}
            stroke="var(--color-accent-cyan)"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        ))}

        {/* Diamond edges */}
        <polygon
          points="60,8 112,60 60,112 8,60"
          fill="none"
          stroke="var(--color-accent-cyan)"
          strokeOpacity="0.4"
          strokeWidth="1"
        />

        {/* Outer nodes */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r="5"
              fill="var(--color-accent-cyan)"
              fillOpacity="0.15"
            />
            <circle
              cx={n.cx}
              cy={n.cy}
              r="2.4"
              fill="var(--color-accent-cyan)"
            />
          </g>
        ))}

        {/* Amber core — pulses subtly (uses the CSS signal-pulse keyframe) */}
        <g style={{ animation: reducedMotion ? undefined : "signal-pulse 1.8s ease-in-out infinite" }}>
          <circle cx="60" cy="60" r="14" fill="var(--color-accent-amber)" fillOpacity="0.14" />
          <circle cx="60" cy="60" r="8" fill="var(--color-accent-amber)" fillOpacity="0.35" />
          <circle cx="60" cy="60" r="4" fill="var(--color-accent-amber)" />
        </g>
      </motion.svg>

      {/* Counter-rotating ring so the whole element doesn't drift as one */}
      <motion.div
        className="pointer-events-none absolute inset-6 rounded-full border border-dashed"
        style={{
          borderColor: "rgba(232, 163, 61, 0.35)",
        }}
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      />

      {/* Corner mono labels — echoes NodeGraph's SYS-GRAPH · rev.01 */}
      <div className="absolute -bottom-6 left-0 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        <span className="text-amber">◉</span> sys-graph
      </div>
      <div className="absolute -bottom-6 right-0 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        rev.01
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hook — SSR-safe prefers-reduced-motion listener                            */
/* -------------------------------------------------------------------------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}
