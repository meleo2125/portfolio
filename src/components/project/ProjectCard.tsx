"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Github,
  Activity,
} from "lucide-react";
import type { Project } from "@/lib/data";
import { useCrossLink } from "@/lib/animation/useCrossLink";

const statusColor: Record<Project["status"], string> = {
  LIVE: "text-amber border-amber/40 bg-amber/5",
  ACTIVE: "text-amber border-amber/40 bg-amber/5",
  SHIPPED: "text-cyan border-cyan/40 bg-cyan/5",
  "OPEN-SOURCE": "text-cyan border-cyan/40 bg-cyan/5",
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const { hoveredSkill, selectedSkill } = useCrossLink();

  const highlighted = hoveredSkill
    ? project.stack.includes(hoveredSkill)
    : selectedSkill
    ? project.stack.includes(selectedSkill)
    : false;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`panel panel-corners overflow-hidden transition-all ${
        highlighted ? "cross-highlight" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="flex-shrink-0 pt-1">
          <span className="font-mono text-xs text-text-muted">
            0{index + 1}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-lg text-text md:text-xl">
              {project.title}
            </h3>
            <span
              className={`flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                statusColor[project.status]
              }`}
            >
              <Activity size={9} strokeWidth={2} />
              {project.status}
            </span>
          </div>
          <p className="text-sm text-text-muted">{project.tagline}</p>
          {project.headline && (
            <p className="mt-3 font-display text-lg text-amber md:text-xl">
              {project.headline}
            </p>
          )}
        </div>
        <ChevronDown
          size={16}
          className={`mt-1 flex-shrink-0 text-text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-6 pb-6 pt-5">
              <dl className="grid gap-4 md:grid-cols-2">
                <Field label="PROBLEM" value={project.problem} />
                <Field label="DECISION" value={project.decision} />
                <Field label="BUILD" value={project.build} />
                <Field
                  label="OUTCOME"
                  value={project.outcome}
                  accent
                />
              </dl>

              <div className="mt-5">
                <span className="label-mono mb-2 block">STACK</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className={`rounded-sm border px-2 py-1 font-mono text-[11px] transition-colors ${
                        hoveredSkill === s || selectedSkill === s
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-white/10 bg-panel-raised text-text-muted"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-sm border border-amber bg-amber/10 px-3 py-2 font-mono text-xs uppercase tracking-wider text-amber transition-colors hover:bg-amber hover:text-bg"
                  >
                    <ExternalLink
                      size={12}
                      strokeWidth={2}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                    Live demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-sm border border-white/15 bg-panel-raised px-3 py-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-cyan hover:text-cyan"
                  >
                    <Github size={12} strokeWidth={1.5} />
                    Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Field({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <span
        className={`label-mono mb-1.5 block ${
          accent ? "text-amber" : ""
        }`}
      >
        {label}
      </span>
      <p
        className={`text-sm leading-relaxed ${
          accent ? "text-text" : "text-text-muted"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
