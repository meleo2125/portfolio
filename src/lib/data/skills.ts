export type SkillGroup = {
  id: string;
  title: string;
  code: string;
  items: string[];
};

// Each skill has a stable slug so ProjectCard can cross-link with the skill panel.
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const skills: SkillGroup[] = [
  {
    id: "data-enterprise",
    title: "Data & Enterprise Systems",
    code: "MOD-01",
    items: [
      "SAP Analytics Cloud",
      "SAP Datasphere",
      "SAP BusinessObjects",
      "SAP BW Modeling",
      "SAP HANA Modeling",
      "SAP CPIDS",
      "SQL",
      "FastAPI",
    ],
  },
  {
    id: "product-web",
    title: "Product & Web",
    code: "MOD-02",
    items: [
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
    ],
  },
  {
    id: "ai-ml-cloud",
    title: "AI / ML & Cloud",
    code: "MOD-03",
    items: ["Python", "TensorFlow", "Gemini API", "AWS S3"],
  },
  {
    id: "foundations",
    title: "Foundations",
    code: "MOD-04",
    items: ["Java", "Git", "Ruby on Rails"],
  },
];
