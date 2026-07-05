export type Project = {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  decision: string;
  build: string;
  outcome: string;
  headline?: string; // pulled-out stat
  stack: string[]; // matches skill labels for cross-linking
  liveUrl?: string;
  githubUrl?: string;
  status: "LIVE" | "ACTIVE" | "SHIPPED" | "OPEN-SOURCE";
};

export const projects: Project[] = [
  {
    id: "thelyst",
    title: "TheLyst",
    tagline: "Unified movie, TV & anime tracking platform",
    problem:
      "Entertainment tracking is fragmented across separate apps per media type.",
    decision:
      "Unify movies, TV, and anime into one personalized watchlist ecosystem with social ranking.",
    build:
      "Next.js, Tailwind CSS, DaisyUI, Firebase Auth + Firestore, TMDB + Jikan API integration, and a custom 'Lyst' system to create, rank, clone, and share collections.",
    outcome:
      "Live and actively developed — the flagship product build. Design language ties directly into this portfolio.",
    stack: ["Next.js", "Tailwind CSS", "Firebase", "JavaScript"],
    liveUrl: "https://thelystapp.vercel.app",
    githubUrl: "https://github.com/meleo2125/thelystapp",
    status: "LIVE",
  },
  {
    id: "virtual-herbal-garden",
    title: "Virtual Herbal Garden",
    tagline: "Interactive 3D medicinal-plant explorer",
    problem:
      "Traditional medicine systems (Ayurveda, Homeopathy, Unani, Siddha, Naturopathy) are hard to explore meaningfully online.",
    decision: "Build an explorable 3D garden instead of a static reference site.",
    build:
      "Next.js, Three.js, React Three Fiber, categorized virtual tours, search / filter / bookmark / notes.",
    outcome:
      "Live demo with proven experience shipping performant 3D on the web — direct precedent for the systems-graph work in this portfolio.",
    stack: ["Next.js", "React", "JavaScript"],
    liveUrl: "https://virtual-3d-garden.vercel.app/",
    githubUrl: "https://github.com/meleo2125/3D-virtual-herbal-garden",
    status: "LIVE",
  },
  {
    id: "gamified-ipr",
    title: "Gamified IPR Learning Platform",
    tagline: "Mobile app teaching Intellectual Property Rights through play",
    problem: "IPR education is dry and low-retention through traditional formats.",
    decision:
      "Gamify it — interactive chapters, role-play, mini-games, and an AI-personalized path.",
    build:
      "React Native, Node.js / Express, MongoDB, JWT auth, Gemini API for recommendations, AWS S3 for media storage.",
    outcome:
      "80% of users scored perfectly; average quiz score 17.87 / 20 vs. 6.53 / 20 with traditional learning; 4.28 / 5 user rating.",
    headline: "80% of users scored perfectly",
    stack: [
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Gemini API",
      "AWS S3",
    ],
    githubUrl: "https://github.com/meleo2125/ipr-app",
    status: "SHIPPED",
  },
  {
    id: "ai-healthcare",
    title: "AI Healthcare Platform",
    tagline: "Early disease detection + multilingual medical chatbot",
    problem:
      "Early screening for conditions like schizophrenia, TB, and pneumonia needs to be more accessible and explainable.",
    decision:
      "Pair ML diagnostic pipelines with a multilingual chatbot so results come with guidance, not just a number.",
    build:
      "Next.js, Python, Flask, TensorFlow, Gemini API; EEG and X-ray analysis pipelines with explainable-AI outputs.",
    outcome: "90%+ prediction accuracy across the detection models.",
    headline: "90%+ prediction accuracy",
    stack: ["Next.js", "Python", "TensorFlow", "Gemini API"],
    githubUrl: "https://github.com/SM-Sclass/502lostserver_ALGORITHM_9.0",
    status: "SHIPPED",
  },
  {
    id: "auth-starter",
    title: "Next.js Firebase Auth Starter Kit",
    tagline: "Reusable production-ready auth template",
    problem:
      "Developers rebuild the same auth boilerplate — OTP, password reset, protected routes — on every new Next.js project.",
    decision: "Build it once, properly, and make it reusable.",
    build:
      "Next.js, Firebase Auth (email/password + Google), Firestore, Nodemailer / Gmail SMTP for OTP verification.",
    outcome:
      "A genuinely reusable open-source template — signals 'builds tools, not just apps.'",
    stack: ["Next.js", "Firebase", "JavaScript"],
    githubUrl: "https://github.com/meleo2125/next-firebase-auth",
    status: "OPEN-SOURCE",
  },
];
