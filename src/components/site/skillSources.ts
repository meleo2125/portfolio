/* Shared by the server-rendered SkillsPanel and the client SkillSwitches. */

export type SkillSource = "work" | "thelyst" | "kharcha" | "training";
export type PanelSkill = { name: string; used: SkillSource[] };
export type PanelGroup = { name: string; skills: PanelSkill[] };

export const skillSources: { id: SkillSource; label: string; spoken: string; colour: string }[] = [
  { id: "work", label: "At work", spoken: "used at work", colour: "rgb(var(--cable-1))" },
  { id: "thelyst", label: "TheLyst", spoken: "used in TheLyst", colour: "rgb(var(--cable-2))" },
  { id: "kharcha", label: "Kharcha", spoken: "used in Kharcha", colour: "rgb(var(--cable-3))" },
  { id: "training", label: "Training", spoken: "training at Bristlecone", colour: "rgb(var(--ink))" },
];
