"use client";

/* The only client code of the skills panel: five toggle buttons. Choosing one sets data-active on the
   panel; CSS (site.css, "SkillsPanel") fades the other cables and skills. */

import { useState } from "react";
import { skillSources, type SkillSource } from "@/components/site/skillSources";

export function SkillSwitches({ panelId }: { panelId: string }) {
  const [active, setActive] = useState<SkillSource | null>(null);

  const choose = (next: SkillSource | null) => {
    setActive(next);
    const panel = document.getElementById(panelId);
    if (!panel) return;
    if (next) panel.dataset.active = next;
    else delete panel.dataset.active;
  };

  return (
    <div role="group" aria-label="Show the skills used in" className="mb-8 flex flex-wrap gap-2">
      <button type="button" aria-pressed={active === null} onClick={() => choose(null)} className={`skill-switch ${active === null ? "is-on" : ""}`}>
        All
      </button>
      {skillSources.map((s) => (
        <button
          key={s.id}
          type="button"
          aria-pressed={active === s.id}
          onClick={() => choose(active === s.id ? null : s.id)}
          className={`skill-switch ${active === s.id ? "is-on" : ""}`}
        >
          <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full" style={{ background: s.colour }} />
          {s.label}
        </button>
      ))}
    </div>
  );
}
