"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { contact } from "@/lib/data/experience";

const promptText = "> reach_out --email";

export function ContactPrompt() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setTyped(promptText);
      setDone(true);
      return;
    }

    let started = false;
    let i = 0;
    let interval: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            interval = window.setInterval(() => {
              i++;
              setTyped(promptText.slice(0, i));
              if (i >= promptText.length) {
                setDone(true);
                if (interval) window.clearInterval(interval);
              }
            }, 45);
          }
        });
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("contact");
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-content px-6 py-24 md:pl-24 md:pr-10"
      aria-labelledby="contact-heading"
    >
      <SectionHeader code="MOD-06 · TERMINAL" title="Contact" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="panel panel-corners overflow-hidden"
      >
        {/* Terminal chrome */}
        <div className="flex items-center justify-between border-b border-white/5 bg-panel-raised/60 px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-amber/70" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            mukesh@portfolio ~ %
          </span>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6 font-mono text-sm text-amber md:text-base">
            {typed}
            {!done && <span className="caret" />}
          </div>

          <p className="mb-6 max-w-2xl text-sm text-text-muted md:text-base">
            Open to conversations about SAP analytics engineering, data
            platforms, and interesting full-stack builds. Fastest response is
            over email.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-2 rounded-sm border border-amber bg-amber/10 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-amber transition-colors hover:bg-amber hover:text-bg"
            >
              <Mail size={14} strokeWidth={1.5} />
              {contact.email}
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-sm border border-white/15 bg-panel-raised px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <Github size={14} strokeWidth={1.5} />
              GitHub
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-sm border border-white/15 bg-panel-raised px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              <Linkedin size={14} strokeWidth={1.5} />
              LinkedIn
            </a>

          </div>

          <div className="mt-8 border-t border-white/5 pt-4 font-mono text-[11px] text-text-muted">
            <span className="text-cyan">$</span> exit_code:{" "}
            <span className="text-amber">0</span> · session preserved
          </div>
        </div>
      </motion.div>
    </section>
  );
}
