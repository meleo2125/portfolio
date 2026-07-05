"use client";

import { Power } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/5 py-8 pl-0 md:pl-16">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 md:flex-row">
        <p className="font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} Mukesh Prajapat · Built with Next.js on
          Vercel
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 rounded-sm border border-white/10 bg-panel px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-amber hover:text-amber"
          aria-label="Power off — back to top"
        >
          <Power size={12} strokeWidth={1.5} />
          <span>Power off</span>
        </button>
      </div>
    </footer>
  );
}
