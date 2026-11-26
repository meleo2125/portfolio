"use client";

/* Skills as a patch panel (docs/DESIGN.md, "SkillsPanel"). Each skill is a jack; a short cable hangs from it for
   every place on the page that used it. The switches light one source and dim the rest.
   The words carry everything: each skill reads "Python, used at work", so colour is never the only signal. */

import { useState } from "react";

export type SkillSource = "work" | "thelyst" | "kharcha" | "training";
export type PanelSkill = { name: string; used: SkillSource[] };
export type PanelGroup = { name: string; skills: PanelSkill[] };

const sources: { id: SkillSource; label: string; spoken: string; colour: string }[] = [
  { id: "work", label: "At work", spoken: "used at work", colour: "rgb(var(--cable-1))" },
  { id: "thelyst", label: "TheLyst", spoken: "used in TheLyst", colour: "rgb(var(--cable-2))" },
  { id: "kharcha", label: "Kharcha", spoken: "used in Kharcha", colour: "rgb(var(--cable-3))" },
  { id: "training", label: "Training", spoken: "training at Bristlecone", colour: "rgb(var(--ink))" },
];

function Stub({ colour, faded }: { colour: string; faded: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="block h-6 w-[0.55rem] rounded-b-full bay:h-9 bay:w-[0.6rem] transition-opacity duration-200 motion-reduce:transition-none"
      style={{ background: colour, opacity: faded ? 0.15 : 1 }}
    />
  );
}

export function SkillsPanel({ groups }: { groups: PanelGroup[] }) {
  const [active, setActive] = useState<SkillSource | null>(null);

  return (
    <div>
      <div role="group" aria-label="Show the skills used in" className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => setActive(null)}
          className={`skill-switch ${active === null ? "is-on" : ""}`}
        >
          All
        </button>
        {sources.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={active === s.id}
            onClick={() => setActive(active === s.id ? null : s.id)}
            className={`skill-switch ${active === s.id ? "is-on" : ""}`}
          >
            <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full" style={{ background: s.colour }} />
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-7">
        {groups.map((g) => (
          <section key={g.name} aria-label={g.name}>
            <h3 className="m-0 mb-3 font-hanken text-base font-bold">{g.name}</h3>
            <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-3 min-[420px]:grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] bay:gap-x-5 bay:gap-y-4 border-t-2 border-ink p-0 pt-4">
              {g.skills.map((skill) => {
                const lit = active === null || skill.used.includes(active);
                const spoken = skill.used.map((u) => sources.find((s) => s.id === u)?.spoken).join(", ");
                return (
                  <li key={skill.name} className="flex min-h-[3.25rem] gap-2.5 text-[0.95rem] bay:min-h-[4.25rem] bay:gap-3 bay:text-base transition-opacity duration-200 motion-reduce:transition-none" style={{ opacity: lit ? 1 : 0.65 }}>
                    <span className="flex flex-none flex-col items-center">
                      <span
                        aria-hidden="true"
                        className="relative z-[1] block h-7 w-7 rounded-full border-[3px] border-ink"
                        style={{ background: skill.used.length ? "radial-gradient(circle, rgb(var(--ink)) 0 45%, rgb(var(--paper)) 47%)" : "rgb(var(--paper))" }}
                      />
                      <span className="-mt-1.5 flex gap-1">
                        {skill.used.map((u) => (
                          <Stub key={u} colour={sources.find((s) => s.id === u)!.colour} faded={active !== null && active !== u} />
                        ))}
                      </span>
                    </span>
                    <span className="pt-[0.2rem] font-semibold leading-snug">
                      {skill.name}
                      {spoken ? <span className="sr-joiner">, {spoken}</span> : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className="m-0 mt-7 text-[0.95rem] text-muted">
        A hanging cable means the skill was used somewhere on this page. Empty jacks are skills from my resume that no project here
        shows.
      </p>
    </div>
  );
}
