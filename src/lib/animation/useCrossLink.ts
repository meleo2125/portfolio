"use client";

import { create } from "./tinyStore";

/**
 * A tiny global store to coordinate the skill↔project cross-linking effect
 * without pulling in a state library. `SkillsPanel` writes the hovered skill;
 * `ProjectGrid` reads it and highlights matching cards.
 */
type State = {
  hoveredSkill: string | null;
  setHoveredSkill: (s: string | null) => void;
  selectedSkill: string | null;
  setSelectedSkill: (s: string | null) => void;
};

export const useCrossLink = create<State>((set) => ({
  hoveredSkill: null,
  setHoveredSkill: (hoveredSkill) => set({ hoveredSkill }),
  selectedSkill: null,
  setSelectedSkill: (selectedSkill) => set({ selectedSkill }),
}));
