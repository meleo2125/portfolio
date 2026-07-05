export type PrimaryRole = {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  outcome: string;
  detail: string;
  tools: string[];
  awards?: string[];
};

export type EarlierRole = {
  id: string;
  title: string;
  company: string;
  dates: string;
  summary: string;
};

export const primaryRole: PrimaryRole = {
  id: "bristlecone-sap-analytics",
  title: "Associate — SAP Analytics",
  company: "Bristlecone",
  location: "Mumbai (Hybrid)",
  dates: "Jul 2025 – Present",
  outcome:
    "Designed AI-driven automation for SAP migration work (SAP Analytics Cloud, Datasphere, BusinessObjects, BW, HANA, CPIDS) that cut manual effort and execution time by 60–90% across projects.",
  detail:
    "Collaborated cross-functionally to ship automation that simplified migration workflows.",
  tools: [
    "Python",
    "SAP Analytics Cloud",
    "SAP Datasphere",
    "SAP BusinessObjects",
    "SAP HANA",
    "SAP BW",
    "SAP CPIDS",
    "SQLite",
    "Next.js",
    "FastAPI",
  ],
  awards: ["Brilliant Beginner Award", "SPOT Award", "Knowledge Ninja"],
};

export const earlierRoles: EarlierRole[] = [
  {
    id: "geeksforgeeks",
    title: "Technical Writer",
    company: "GeeksforGeeks",
    dates: "Apr – Sep 2024 · Remote",
    summary:
      "8 published articles on Ruby on Rails and statistics — 33,000+ total views.",
  },
  {
    id: "goodgamenation",
    title: "Gaming Manager",
    company: "GoodGameNation",
    dates: "Aug – Dec 2023 · Remote",
    summary:
      "Ran a 2-day, 8-team / 40-participant esports tournament end to end.",
  },
  {
    id: "ypp",
    title: "Project Intern",
    company: "YPP Technologies",
    dates: "Dec 2022 – Jan 2023",
    summary: "Figma and web design.",
  },
  {
    id: "techniche",
    title: "Public Relations Intern",
    company: "Techniche, IIT Guwahati",
    dates: "Aug – Oct 2022 · Remote",
    summary: "Online marketing.",
  },
];

export const education = {
  degree:
    "B.E. in Computer Science Engineering & Data Science (Honours in AIML)",
  institution: "Vidyavardhini's College of Engineering and Technology, Mumbai",
  dates: "Dec 2021 – Jun 2025",
  cgpi: "9.32",
};

export const achievements = [
  "1st Prize, Data Science using AI — Techblitz 2024 (NSDC-VCET)",
  "Finalist, LLM using AI — Techblitz 2025 (NSDC-VCET)",
  "Finalist — HackScript 6.0 (A.P. Shah Institute of Technology)",
];

export const certifications = [
  "AI for India 2.0",
  "Java (Basic) Skills Certification",
  "SQL (Intermediate) Skills Certification",
  "Data Science Foundations – Level 1",
  "The Web Developer Bootcamp",
  "GitHub Copilot (GH-300T00-A)",
];

export const contact = {
  email: "mukeshprajapat3093@gmail.com",
  github: "https://github.com/meleo2125",
  linkedin: "https://www.linkedin.com/in/mukesh-prajapat-/",
  instagram: "https://instagram.com/",
};
