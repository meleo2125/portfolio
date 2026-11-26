/* Every word on the site. Source: docs/CONTENT.md, wording approved in docs/IA_AND_COPY.md (2026-11-26).
   To update the site, edit this file (and CONTENT.md), commit and push. See docs/UPDATING.md. */

import type { PatchPair } from "@/components/site/PatchBay";

export const site = {
  url: "https://mukeshprajapat.vercel.app",
  name: "Mukesh Prajapat",
  title: "Mukesh Prajapat, software engineer",
  description:
    "Software engineer in Mumbai building AI and automation tools for enterprise data platforms, plus full-stack web and Android apps.",
  claim: "Software engineer building AI and automation tools for enterprise data platforms.",
  context: "Associate Consultant at Bristlecone in Mumbai. I also build full-stack web and Android apps.",
  location: "Mumbai, India.",
  resume: "/resume.pdf",
};

export const links = {
  email: "mukeshprajapat3093@gmail.com",
  github: "https://github.com/meleo2125",
  linkedin: "https://www.linkedin.com/in/mukesh-prajapat-",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const bay: { label: string; headings: [string, string]; pairs: PatchPair[]; targetRows: number[] } = {
  label: "What I've built, by platform",
  headings: ["Where I build", "What I've built"],
  pairs: [
    { source: "Enterprise data platforms", target: "AI and automation tools", gloss: "at Bristlecone" },
    { source: "The web", target: "TheLyst", gloss: "one watchlist for movies, TV and anime" },
    { source: "Android", target: "Kharcha", gloss: "money tracking and bill splitting" },
  ],
  targetRows: [2, 0, 1],
};

/* D-015: the accelerators are described in sentences only, never as items or cards. */
export const work = {
  heading: "At work",
  role: "Associate Consultant, SAP Analytics",
  company: "Bristlecone",
  period: "July 2025 to present, Mumbai (hybrid).",
  body: [
    "I build AI and automation accelerators for SAP data platforms, the systems many large companies run their data and reporting on.",
    "They include a tool that migrates SAP BW (a data warehouse) to SAP Datasphere or Snowflake, an AI assistant for SAP Datasphere built on MCP (Model Context Protocol), and a landscape platform for SAP BusinessObjects used at a customer site. Together they have cut manual effort in migration and development work by up to 70%.",
  ],
  notes: [
    {
      heading: "Recognition",
      text: "Brilliant Beginner Award and SPOT Award, two internal quarterly awards, for contributions to AI and automation initiatives.",
    },
    { heading: "Training", text: "SAP Analytics Cloud, Datasphere, BusinessObjects, BW Modeling, HANA Modeling and CPI-DS." },
  ],
};

export type ProjectLink = { label: string; href: string };
export type Screen = { file: string; alt: string };

export const projects = {
  heading: "Things I've built",
  thelyst: {
    id: "thelyst",
    title: "TheLyst",
    text: [
      "One watchlist for movies, TV and anime, with real-time search across thousands of titles (TMDB and Jikan APIs).",
      "Make your own lists (“Lysts”), then rank, clone and share them publicly or privately. Firestore keeps them in sync in real time; Firebase Authentication handles sign-in.",
    ],
    stack: "Next.js, Tailwind CSS, Firebase Authentication, Firestore, TMDB API, Jikan API",
    links: [
      { label: "Live demo", href: "https://thelystapp.vercel.app" },
      { label: "Source", href: "https://github.com/meleo2125/thelystapp" },
    ] as ProjectLink[],
    desktop: {
      src: "/images/projects/thelyst-desktop.webp",
      alt: "TheLyst home page: 'Track what you watch. Curate your obsession.' with Start Tracking and Sign In buttons",
    },
    mobile: { src: "/images/projects/thelyst-mobile.webp" },
  },
  kharcha: {
    id: "kharcha",
    title: "Kharcha",
    text: [
      "An Android app for money tracking and bill splitting in one place. Bank and UPI SMS alerts become transactions, any of them can be split with a group, and nothing leaves the phone.",
      "Anyone in a group can pay. Bills split equally, by exact amounts, by percent or by shares, with simplified debts and settle-up. The database and backups are encrypted.",
    ],
    stack: "Kotlin, Jetpack Compose, Room, SQLCipher, Hilt, WorkManager",
    screens: [
      { file: "home", alt: "Kharcha home: a bank alert from Cafe Bloom for ₹480 waiting to be saved, and this month's spending against the budget" },
      { file: "split-bill", alt: "Kharcha splitting a ₹2,800 bill equally between four people, with options to split by exact amounts, percent or shares" },
      { file: "insights", alt: "Kharcha insights: November spending by category in a donut chart, led by rent, groceries and food" },
    ] as Screen[],
  },
};

export const writing = {
  heading: "Writing",
  role: "Technical Writer Intern",
  company: "GeeksforGeeks",
  period: "April to September 2024, remote.",
  text: "I wrote 8 technical articles on Ruby on Rails and statistics for beginners, with 33,000+ total views. Each one has 5–10 FAQs, and the code samples were revised after editorial and peer review.",
};

export const skills = {
  heading: "Skills",
  groups: [
    { name: "Languages", items: ["Python", "JavaScript", "Java", "Kotlin", "SQL"] },
    { name: "SAP data platforms", items: ["SAP BW", "SAP Datasphere", "SAP BusinessObjects (WebI)", "SAP Analytics Cloud", "SAP HANA", "SAP CPI-DS"] },
    { name: "Backend and APIs", items: ["FastAPI", "Node.js", "Express.js", "REST APIs", "Model Context Protocol (MCP)"] },
    { name: "AI", items: ["LLM integration (Gemini API)", "AI chatbots", "AI-assisted development (Claude Code)"] },
    { name: "Frontend and mobile", items: ["Next.js", "React", "React Native", "Tailwind CSS", "Jetpack Compose"] },
    { name: "Databases", items: ["SQLite", "MongoDB", "Firestore"] },
    { name: "Cloud and tools", items: ["Git", "GitHub", "GitHub Actions (CI)", "Vercel", "AWS S3", "Firebase Authentication", "JWT"] },
  ],
};

export const background = {
  heading: "Background",
  education: {
    heading: "Education",
    text: "B.E. in Computer Science Engineering and Data Science, Honours in AI/ML. Vidyavardhini's College of Engineering and Technology, Mumbai. December 2021 to June 2025. CGPA 9.32/10.",
  },
  achievements: {
    heading: "Achievements",
    items: [
      "1st Prize, Data Science using AI, Techblitz 2024 (NSDC-VCET)",
      "Finalist, LLM using AI, Techblitz 2025 (NSDC-VCET)",
      "Finalist, HackScript 6.0 (A.P. Shah Institute of Technology)",
    ],
  },
  certifications: {
    heading: "Certifications",
    items: [
      "Java (Basic) Skills Certification",
      "SQL (Intermediate) Skills Certification",
      "GitHub Copilot (Course GH-300T00-A)",
      "Data Science Foundations – Level 1",
    ],
  },
};

export const contact = { heading: "Contact" };

export const footer = { text: "© 2026 Mukesh Prajapat" };

export const notFound = {
  heading: "Page not found",
  text: "There's nothing at this address.",
  link: "Go to the home page",
};
