import { sql } from '@vercel/postgres';

type Project = {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  decision: string;
  build: string;
  outcome: string;
  headline?: string;
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: "LIVE" | "ACTIVE" | "SHIPPED" | "OPEN-SOURCE";
};

const projects: Project[] = [
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
      "Live and actively developed as my flagship product build. The design language ties directly into this portfolio.",
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
      "Live demo demonstrating performant 3D rendering on the web, serving as the direct precedent for the systems-graph work in this portfolio.",
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
      "Gamified learning: interactive chapters, role-play, mini-games, and an AI-personalized learning path.",
    build:
      "React Native, Node.js / Express, MongoDB, JWT auth, Gemini API for recommendations, AWS S3 for media storage.",
    outcome:
      "80% of users scored perfectly; average quiz score 17.87 / 20 vs. 6.53 / 20 with traditional learning; 4.28 / 5 user rating.",
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
    stack: ["Next.js", "Python", "TensorFlow", "Gemini API"],
    githubUrl: "https://github.com/SM-Sclass/502lostserver_ALGORITHM_9.0",
    status: "SHIPPED",
  },
  {
    id: "auth-starter",
    title: "Next.js Firebase Auth Starter Kit",
    tagline: "Reusable production-ready auth template",
    problem:
      "Developers frequently rebuild the same authentication boilerplate (OTP, password reset, protected routes) for every new Next.js project.",
    decision: "Build it once, properly, and make it reusable.",
    build:
      "Next.js, Firebase Auth (email/password + Google), Firestore, Nodemailer / Gmail SMTP for OTP verification.",
    outcome:
      "A genuinely reusable open-source template that highlights a focus on building systems and tools, not just applications.",
    stack: ["Next.js", "Firebase", "JavaScript"],
    githubUrl: "https://github.com/meleo2125/next-firebase-auth",
    status: "OPEN-SOURCE",
  },
];

async function migrate() {
  console.log('Migrating projects...');
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`Migrating: ${p.title} (${p.id})`);
    
    await sql`
      INSERT INTO projects (
        id, title, tagline, problem, decision, build, outcome, headline, stack, live_url, github_url, status, sort_order
      ) VALUES (
        ${p.id}, ${p.title}, ${p.tagline}, ${p.problem}, ${p.decision}, ${p.build}, ${p.outcome}, ${p.headline || null}, ${p.stack as any}, ${p.liveUrl || null}, ${p.githubUrl || null}, ${p.status}, ${i}
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        tagline = EXCLUDED.tagline,
        problem = EXCLUDED.problem,
        decision = EXCLUDED.decision,
        build = EXCLUDED.build,
        outcome = EXCLUDED.outcome,
        headline = EXCLUDED.headline,
        stack = EXCLUDED.stack,
        live_url = EXCLUDED.live_url,
        github_url = EXCLUDED.github_url,
        status = EXCLUDED.status,
        sort_order = EXCLUDED.sort_order;
    `;
  }
  console.log('Projects migration complete successfully.');
}

migrate().catch((err) => {
  console.error('Error migrating projects:', err);
  process.exit(1);
});
