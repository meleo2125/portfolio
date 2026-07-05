"use client";

import { motion } from "framer-motion";

type Props = {
  code: string;
  title: string;
  description?: string;
};

export function SectionHeader({ code, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8"
    >
      <div className="mb-2 flex items-center gap-3">
        <span className="label-mono text-amber">{code}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-amber/40 via-white/10 to-transparent" />
      </div>
      <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-text-muted md:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
