"use client";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/project/ProjectCard";

export function ProjectGrid() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-content px-6 py-24 md:pl-24 md:pr-10"
      aria-labelledby="projects-heading"
    >
      <SectionHeader
        code="MOD-04 · PROJECTS"
        title="Projects"
        description="Five flagship builds. Each card follows the same four-beat structure: Problem, Decision, Build, and Outcome."
      />

      <div className="flex flex-col gap-4">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
