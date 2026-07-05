"use client";

import { motion } from "framer-motion";

type Field = {
  label: string;
  value: string;
};

export function StatusReadout({ fields }: { fields: Field[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="panel panel-corners p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="label-mono">STATUS</span>
        <span className="flex items-center gap-2 text-xs font-mono text-amber">
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber"
            style={{ boxShadow: "0 0 8px var(--color-accent-amber)" }}
          />
          ONLINE
        </span>
      </div>
      <dl className="space-y-3">
        {fields.map((f) => (
          <div
            key={f.label}
            className="grid grid-cols-[110px_1fr] gap-3 border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
          >
            <dt className="label-mono pt-0.5">{f.label}</dt>
            <dd className="text-sm text-text">{f.value}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}
