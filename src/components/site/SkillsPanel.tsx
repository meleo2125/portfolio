/* Skills as a patch panel (docs/DESIGN.md, "SkillsPanel"). Server component: all the skills are static HTML.
   Each skill is a jack; a short cable hangs from it for every place on the page that used it.
   Only the switches are client code (SkillSwitches): they set data-active on the panel, and CSS in site.css
   dims the rest. The words carry everything: each skill reads "Python, used at work". */

import { SkillSwitches } from "@/components/site/SkillSwitches";
import { skillSources, type PanelGroup } from "@/components/site/skillSources";

export type { PanelGroup, PanelSkill, SkillSource } from "@/components/site/skillSources";

const PANEL_ID = "skills-panel";

export function SkillsPanel({ groups }: { groups: PanelGroup[] }) {
  return (
    <div id={PANEL_ID} className="skills-panel">
      <SkillSwitches panelId={PANEL_ID} />

      <div className="grid gap-7">
        {groups.map((g) => (
          <section key={g.name} aria-label={g.name}>
            <h3 className="m-0 mb-3 font-hanken text-base font-bold">{g.name}</h3>
            <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-3 border-t-2 border-ink p-0 pt-4 min-[420px]:grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] bay:gap-x-5 bay:gap-y-4">
              {g.skills.map((skill) => {
                const spoken = skill.used.map((u) => skillSources.find((s) => s.id === u)?.spoken).join(", ");
                return (
                  <li
                    key={skill.name}
                    data-used={skill.used.join(" ")}
                    className="skill flex min-h-[3.25rem] gap-2.5 text-[0.95rem] bay:min-h-[4.25rem] bay:gap-3 bay:text-base"
                  >
                    <span className="flex flex-none flex-col items-center">
                      <span
                        aria-hidden="true"
                        className={`skill-jack relative z-[1] block h-7 w-7 rounded-full border-[3px] border-ink ${skill.used.length ? "is-used" : ""}`}
                      />
                      <span className="-mt-1.5 flex gap-1">
                        {skill.used.map((u) => (
                          <span
                            key={u}
                            aria-hidden="true"
                            data-src={u}
                            className="skill-stub block h-6 w-[0.55rem] rounded-b-full bay:h-9 bay:w-[0.6rem]"
                            style={{ background: skillSources.find((s) => s.id === u)!.colour }}
                          />
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
