"use client";

import { motion } from "framer-motion";
import { Trophy, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { achievements, certifications } from "@/lib/data/experience";

export function Credentials() {
  return (
    <section
      id="credentials"
      className="relative mx-auto max-w-content px-6 py-24 md:pl-24 md:pr-10"
      aria-labelledby="credentials-heading"
    >
      <SectionHeader
        code="MOD-05 · CREDENTIALS"
        title="Achievements & Certifications"
      />

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="panel panel-corners p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Trophy size={14} className="text-amber" strokeWidth={1.5} />
            <h3 className="font-display text-base text-text">Achievements</h3>
          </div>
          <ul className="space-y-2.5">
            {achievements.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2 border-b border-white/5 pb-2.5 text-sm text-text-muted last:border-b-0 last:pb-0"
              >
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-amber" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="panel panel-corners p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-cyan" strokeWidth={1.5} />
            <h3 className="font-display text-base text-text">Certifications</h3>
          </div>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 font-mono text-xs text-text-muted"
              >
                <span className="text-cyan/70">›</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
