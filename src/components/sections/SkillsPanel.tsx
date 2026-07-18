"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { skills } from "@/lib/data/skills";
import { useCrossLink } from "@/lib/animation/useCrossLink";
import type { Project } from "@/lib/data";

export function SkillsPanel({ projects }: { projects: Project[] }) {
  const { hoveredSkill, setHoveredSkill, selectedSkill, setSelectedSkill } = useCrossLink();

  // For each skill name, which projects use it
  const skillToProjects = useMemo(() => {
    const map: Record<string, string[]> = {};
    projects.forEach((p) => {
      p.stack.forEach((s) => {
        if (!map[s]) map[s] = [];
        map[s].push(p.title);
      });
    });
    return map;
  }, [projects]);

  const handleSkillClick = (s: string) => {
    if (selectedSkill === s) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(s);
      const el = document.getElementById("projects");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-content px-6 py-24 md:pl-24 md:pr-10"
      aria-labelledby="skills-heading"
    >
      <SectionHeader
        code="MOD-02 · DIAGNOSTICS"
        title="Skills"
        description="Grouped by module. Hover any skill to highlight every project below that uses it."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((group, i) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="panel panel-corners p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg text-text">{group.title}</h3>
              <span className="label-mono text-cyan">{group.code}</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((s) => {
                const isHovered = hoveredSkill === s;
                const isSelected = selectedSkill === s;
                const isActive = isHovered || isSelected;
                const projectsUsing = skillToProjects[s]?.length ?? 0;
                return (
                  <li key={s}>
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredSkill(s)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onFocus={() => setHoveredSkill(s)}
                      onBlur={() => setHoveredSkill(null)}
                      onClick={() => handleSkillClick(s)}
                      className={`group relative rounded-sm border px-3 py-1.5 font-mono text-xs transition-all ${
                        isActive
                          ? "border-amber bg-amber/10 text-amber"
                          : "border-white/10 bg-panel-raised text-text-muted hover:border-white/25 hover:text-text"
                      }`}
                      aria-label={`${s}${
                        projectsUsing
                          ? ` — used in ${projectsUsing} project${
                              projectsUsing > 1 ? "s" : ""
                            }`
                          : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-1 w-1 rounded-full transition-colors ${
                            isActive ? "bg-amber" : "bg-cyan/60"
                          }`}
                        />
                        {s}
                        {projectsUsing > 0 && (
                          <span
                            className={`ml-1 text-[10px] ${
                              isActive ? "text-amber" : "text-text-muted/60"
                            }`}
                          >
                            ×{projectsUsing}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>

      {(hoveredSkill || selectedSkill) && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-sm border border-amber/40 bg-panel-raised/95 px-4 py-2 font-mono text-xs text-amber backdrop-blur hidden md:block"
        >
          <span className="text-text-muted">
            {hoveredSkill ? "> highlighting projects using" : "> selected skill filter:"}
          </span>{" "}
          {hoveredSkill || selectedSkill}
        </div>
      )}
    </section>
  );
}
