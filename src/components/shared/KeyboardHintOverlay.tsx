"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const shortcuts = [
  { keys: ["g", "p"], desc: "Jump to Projects" },
  { keys: ["g", "a"], desc: "Jump to About" },
  { keys: ["g", "e"], desc: "Jump to Experience" },
  { keys: ["g", "c"], desc: "Jump to Contact" },
  { keys: ["?"], desc: "Toggle this help panel" },
];

export function KeyboardHintOverlay() {
  const [open, setOpen] = useState(false);
  const [prefix, setPrefix] = useState<string | null>(null);

  useEffect(() => {
    let prefixTimer: number | undefined;

    const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    const onKey = (e: KeyboardEvent) => {
      // Ignore when typing in a field
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      )
        return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        setPrefix(null);
        return;
      }

      if (prefix === "g") {
        const map: Record<string, string> = {
          p: "projects",
          a: "about",
          e: "experience",
          c: "contact",
          s: "skills",
          h: "hero",
        };
        const id = map[e.key.toLowerCase()];
        if (id) {
          e.preventDefault();
          scrollToId(id);
        }
        setPrefix(null);
        if (prefixTimer) window.clearTimeout(prefixTimer);
        return;
      }

      if (e.key.toLowerCase() === "g") {
        setPrefix("g");
        if (prefixTimer) window.clearTimeout(prefixTimer);
        prefixTimer = window.setTimeout(() => setPrefix(null), 900);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (prefixTimer) window.clearTimeout(prefixTimer);
    };
  }, [prefix]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show keyboard shortcuts"
        className="fixed bottom-4 right-6 z-30 hidden h-9 w-9 items-center justify-center rounded-sm border border-white/10 bg-panel/80 font-mono text-xs text-text-muted backdrop-blur transition-colors hover:border-amber hover:text-amber md:flex"
      >
        ?
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="panel panel-corners w-[92%] max-w-md p-6"
              role="dialog"
              aria-label="Keyboard shortcuts"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="label-mono text-amber">CTRL-PANEL</span>
                  <h3 className="font-display text-lg">Keyboard shortcuts</h3>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setOpen(false)}
                  className="rounded-sm p-1 text-text-muted hover:text-amber"
                >
                  <X size={16} />
                </button>
              </div>
              <ul className="space-y-2 font-mono text-sm">
                {shortcuts.map((s) => (
                  <li
                    key={s.desc}
                    className="flex items-center justify-between gap-4 border-b border-white/5 pb-2 last:border-b-0"
                  >
                    <span className="text-text-muted">{s.desc}</span>
                    <span className="flex gap-1">
                      {s.keys.map((k) => (
                        <kbd
                          key={k}
                          className="rounded-sm border border-white/15 bg-panel-raised px-1.5 py-0.5 text-xs text-amber"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
