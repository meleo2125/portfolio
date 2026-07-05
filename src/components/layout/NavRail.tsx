"use client";

import { useEffect, useState } from "react";
import {
  Home,
  User,
  Cpu,
  Activity,
  FolderGit2,
  BadgeCheck,
  Terminal,
} from "lucide-react";

const modules = [
  { id: "hero", label: "Home", code: "00", icon: Home },
  { id: "about", label: "About", code: "01", icon: User },
  { id: "skills", label: "Skills", code: "02", icon: Cpu },
  { id: "experience", label: "Experience", code: "03", icon: Activity },
  { id: "projects", label: "Projects", code: "04", icon: FolderGit2 },
  { id: "credentials", label: "Credentials", code: "05", icon: BadgeCheck },
  { id: "contact", label: "Contact", code: "06", icon: Terminal },
];

export function NavRail() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    modules.forEach((m) => {
      const el = document.getElementById(m.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(m.id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Desktop left rail */}
      <nav
        aria-label="Section navigation"
        className="fixed left-0 top-0 z-30 hidden h-screen w-16 flex-col items-center justify-center border-r border-white/5 bg-bg/70 backdrop-blur md:flex"
      >
        <div className="mb-6 flex flex-col items-center gap-1">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber">
            MP
          </span>
          <span className="h-6 w-px bg-white/10" />
        </div>
        <ul className="flex flex-col gap-1">
          {modules.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.id;
            return (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  aria-label={m.label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-sm border border-transparent transition-colors hover:border-white/10"
                >
                  {isActive && (
                    <span
                      className="absolute left-0 h-6 w-[2px] rounded-r-sm bg-amber"
                      style={{ boxShadow: "0 0 8px var(--color-accent-amber)" }}
                    />
                  )}
                  <Icon
                    size={16}
                    className={`transition-colors ${
                      isActive ? "text-amber" : "text-text-muted group-hover:text-text"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-sm border border-white/10 bg-panel-raised px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-amber">{m.code}</span> · {m.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-4 flex flex-col items-center gap-1">
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber"
            style={{ boxShadow: "0 0 6px var(--color-accent-amber)" }}
          />
          <span className="font-mono text-[9px] text-text-muted">LIVE</span>
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-0 left-0 right-0 z-30 flex justify-around border-t border-white/5 bg-bg/85 px-2 py-2 backdrop-blur md:hidden"
      >
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = active === m.id;
          return (
            <a
              key={m.id}
              href={`#${m.id}`}
              aria-label={m.label}
              className="flex h-10 w-10 items-center justify-center rounded-sm"
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                className={isActive ? "text-amber" : "text-text-muted"}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
