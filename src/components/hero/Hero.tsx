"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { TelemetryField } from "./TelemetryField";
import { NodeGraph } from "./NodeGraph";

export function Hero() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setBooted(true);
      return;
    }
    const t = setTimeout(() => setBooted(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Introduction"
    >
      <TelemetryField />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-content flex-col items-stretch px-6 pb-24 pt-20 md:grid md:grid-cols-12 md:gap-8 md:pb-16 md:pl-24 md:pr-10 md:pt-20">
        {/* Left — thesis */}
        <div className="flex flex-col justify-center md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 8 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-amber"
              style={{ boxShadow: "0 0 10px var(--color-accent-amber)" }}
            />
            <span className="label-mono">SYS:BOOT · v25.07 · online</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 12 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl ${
              booted ? "" : "boot-flicker"
            }`}
          >
            <span className="block">Data systems engineer.</span>
            <span className="block text-amber">Independent builder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 12 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base text-text-muted md:text-lg"
          >
            By day I design AI-driven automation for SAP data systems. By choice
            I ship full-stack products. Same instinct in both:{" "}
            <span className="text-text">
              find the manual, repetitive, or fragmented part of a process and
              replace it with something clean and automatic.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: booted ? 1 : 0, y: booted ? 0 : 12 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-sm border border-amber bg-amber/10 px-5 py-3 font-mono text-sm uppercase tracking-wider text-amber transition-colors hover:bg-amber hover:text-bg"
            >
              View work
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
                strokeWidth={2}
              />
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 rounded-sm border border-white/15 bg-panel/60 px-5 py-3 font-mono text-sm uppercase tracking-wider text-text transition-colors hover:border-cyan hover:text-cyan"
            >
              <FileText size={14} strokeWidth={1.5} />
              Resume
            </a>
          </motion.div>

          {/* Uptime strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: booted ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-14 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 md:max-w-lg"
          >
            <StatBlock label="Reduction" value="60–90%" caption="manual effort" />
            <StatBlock label="CGPI" value="9.32" caption="B.E. CSE + DS" />
            <StatBlock label="Shipped" value="5+" caption="production apps" />
          </motion.div>
        </div>

        {/* Right — node graph panel */}
        <div className="mt-10 md:col-span-5 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: booted ? 1 : 0, scale: booted ? 1 : 0.98 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="panel panel-corners relative h-[320px] w-full overflow-hidden md:h-[460px]"
          >
            <NodeGraph />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div>
      <div className="label-mono mb-1">{label}</div>
      <div className="font-display text-2xl font-medium text-text">{value}</div>
      <div className="font-mono text-[11px] text-text-muted">{caption}</div>
    </div>
  );
}
