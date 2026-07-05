"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Award, Radio } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  primaryRole,
  earlierRoles,
  education,
} from "@/lib/data/experience";

export function ExperienceLog() {
  const [primaryOpen, setPrimaryOpen] = useState(true);
  const [earlierOpen, setEarlierOpen] = useState(false);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-content px-6 py-24 md:pl-24 md:pr-10"
      aria-labelledby="experience-heading"
    >
      <SectionHeader
        code="MOD-03 · DEPLOYMENT LOG"
        title="Experience"
      />

      {/* Primary role */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="panel panel-corners overflow-hidden"
      >
        <button
          type="button"
          onClick={() => setPrimaryOpen((o) => !o)}
          aria-expanded={primaryOpen}
          className="flex w-full items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
        >
          <div className="flex-shrink-0">
            <span
              className="flex h-2 w-2 rounded-full bg-amber"
              style={{ boxShadow: "0 0 10px var(--color-accent-amber)" }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-display text-lg text-text md:text-xl">
                  {primaryRole.title}{" "}
                  <span className="text-amber">· {primaryRole.company}</span>
                </h3>
                <p className="mt-0.5 font-mono text-xs text-text-muted">
                  {primaryRole.location}
                </p>
              </div>
              <span className="font-mono text-xs text-cyan">
                {primaryRole.dates}
              </span>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`flex-shrink-0 text-text-muted transition-transform ${
              primaryOpen ? "rotate-180" : ""
            }`}
            strokeWidth={1.5}
          />
        </button>

        <AnimatePresence initial={false}>
          {primaryOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/5 px-6 pb-6 pt-5">
                <div className="mb-4 border-l-2 border-amber/60 pl-4">
                  <span className="label-mono mb-1 block text-amber">
                    OUTCOME
                  </span>
                  <p className="text-[15px] leading-relaxed text-text">
                    {primaryRole.outcome}
                  </p>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-text-muted">
                  {primaryRole.detail}
                </p>

                <div className="mb-5">
                  <span className="label-mono mb-2 block">TOOLS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {primaryRole.tools.map((t) => (
                      <span
                        key={t}
                        className="rounded-sm border border-white/10 bg-panel-raised px-2 py-1 font-mono text-[11px] text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {primaryRole.awards && (
                  <div>
                    <span className="label-mono mb-2 block">RECOGNITION</span>
                    <ul className="flex flex-wrap gap-2">
                      {primaryRole.awards.map((a) => (
                        <li
                          key={a}
                          className="flex items-center gap-1.5 rounded-sm border border-amber/30 bg-amber/5 px-2.5 py-1 font-mono text-[11px] text-amber"
                        >
                          <Award size={11} strokeWidth={1.5} />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>

      {/* Earlier deployments (compressed) */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setEarlierOpen((o) => !o)}
          aria-expanded={earlierOpen}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-amber"
        >
          <Radio size={12} strokeWidth={1.5} />
          Earlier deployments ({earlierRoles.length})
          <ChevronDown
            size={12}
            className={`transition-transform ${earlierOpen ? "rotate-180" : ""}`}
            strokeWidth={1.5}
          />
        </button>

        <AnimatePresence initial={false}>
          {earlierOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 space-y-2 overflow-hidden"
            >
              {earlierRoles.map((r) => (
                <li
                  key={r.id}
                  className="panel flex flex-col gap-1 px-4 py-3 md:flex-row md:items-baseline md:justify-between md:gap-4"
                >
                  <div>
                    <span className="text-sm text-text">
                      {r.title}{" "}
                      <span className="text-text-muted">· {r.company}</span>
                    </span>
                    <p className="mt-0.5 text-xs text-text-muted">{r.summary}</p>
                  </div>
                  <span className="font-mono text-[11px] text-cyan">
                    {r.dates}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Education inline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="label-mono text-cyan">EDU · 01</span>
          <span className="h-px flex-1 bg-white/5" />
        </div>
        <div className="panel px-5 py-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-base text-text">
              {education.degree}
            </h3>
            <span className="font-mono text-xs text-cyan">
              {education.dates}
            </span>
          </div>
          <p className="mt-1 text-sm text-text-muted">
            {education.institution} · CGPI{" "}
            <span className="text-amber">{education.cgpi}</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
