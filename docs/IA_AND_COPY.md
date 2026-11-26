# Phase 3: Structure and copy

Status: approved 2026-11-26. Later owner edits: no Kharcha status line, no screenshot caption (2026-11-26).
Sources: docs/CONTENT.md only. Design: docs/DESIGN.md (Patch bay). Voice: plain, first person in body text, short sentences, no clichés ("passionate", "team player", "results-driven", "innovative", "cutting-edge").

## 1. Pages
| URL | What it is | Indexed |
|---|---|---|
| `/` | The whole portfolio, one page, sections below | yes |
| `/resume.pdf` | The resume (needs a new PDF first, see §5) | yes |
| 404 | "Page not found" | no |
| `/design-system` | Owner preview of the design system | no; proposed: removed from the production build |

Removed with the old site (needs D-007 confirmed, see §5): `/admin`, `/admin/login`, `/api/admin-login`, the Postgres database, the boot loader.

## 2. Section order on `/`
1. **Hero:** name, what I do, how to reach me, the patch bay. Everything a recruiter needs in five seconds.
2. **At work:** Bristlecone, at resume level, in sentences (D-015). It's the job, so it comes first.
3. **Things I've built:** TheLyst, Kharcha. The images carry the page.
4. **Writing:** GeeksforGeeks. Short, because it's an internship.
5. **Skills:** the resume groups.
6. **Background:** education, achievements, certifications.
7. **Contact:** the same links as the hero, repeated at the end.

Navigation: Work, Projects, Skills, Contact, plus Resume on the right. "Writing" and "Background" are reached by scrolling; with seven items the nav would get crowded on phones.

## 3. The copy

### Page metadata
- Title: `Mukesh Prajapat, software engineer`
- Description: `Software engineer in Mumbai building AI and automation tools for enterprise data platforms, plus full-stack web and Android apps.`
- Open Graph image: the name and the patch bay cables, generated in Phase 4 (no text beyond the name and the claim).

### Nav
Work · Projects · Skills · Contact · Resume
(Shown as separate links; the dots here are only for this document.)

### Hero
- Name: **Mukesh Prajapat**
- Claim: **Software engineer building AI and automation tools for enterprise data platforms.**
- Context: Associate Consultant at Bristlecone in Mumbai. I also build full-stack web and Android apps.
- Links: mukeshprajapat3093@gmail.com, GitHub, LinkedIn
- Patch bay headings: "Where I build" and "What I've built"
- Pairs (approved with Phase 2):
  - Enterprise data platforms → AI and automation tools (gloss: "at Bristlecone")
  - The web → TheLyst (gloss: "one watchlist for movies, TV and anime")
  - Android → Kharcha (gloss: "money tracking and bill splitting")
- Screen-reader label for the bay: "What I've built, by platform"

### At work
- Heading: **At work**
- Lede: Associate Consultant, SAP Analytics at **Bristlecone**. July 2025 to present, Mumbai (hybrid).
- Body:
  > I build AI and automation accelerators for SAP data platforms, the systems many large companies run their data and reporting on.
  >
  > They include a tool that migrates SAP BW (a data warehouse) to SAP Datasphere or Snowflake, an AI assistant for SAP Datasphere built on MCP (Model Context Protocol), and a landscape platform for SAP BusinessObjects used at a customer site. Together they have cut manual effort in migration and development work by up to 70%.
- **Recognition:** Brilliant Beginner Award and SPOT Award, two internal quarterly awards, for contributions to AI and automation initiatives.
- **Training:** SAP Analytics Cloud, Datasphere, BusinessObjects, BW Modeling, HANA Modeling and CPI-DS.

### Things I've built
- Heading: **Things I've built**

**TheLyst**
- One watchlist for movies, TV and anime, with real-time search across thousands of titles (TMDB and Jikan APIs).
- Make your own lists ("Lysts"), then rank, clone and share them publicly or privately. Firestore keeps them in sync in real time; Firebase Authentication handles sign-in.
- Stack: Next.js, Tailwind CSS, Firebase Authentication, Firestore, TMDB API, Jikan API
- Links: Live demo (thelystapp.vercel.app), Source (github.com/meleo2125/thelystapp)
- Image alt: "TheLyst home page: 'Track what you watch. Curate your obsession.' with Start Tracking and Sign In buttons"

**Kharcha**
- An Android app for money tracking and bill splitting in one place. Bank and UPI SMS alerts become transactions, any of them can be split with a group, and nothing leaves the phone.
- Anyone in a group can pay. Bills split equally, by exact amounts, by percent or by shares, with simplified debts and settle-up. The database and backups are encrypted.
- Stack: Kotlin, Jetpack Compose, Room, SQLCipher, Hilt, WorkManager
- Links: none (the repo is going private).
- Image alts:
  - "Kharcha home: a bank alert from Cafe Bloom for ₹480 waiting to be saved, and this month's spending against the budget"
  - "Kharcha splitting a ₹2,800 bill equally between four people, with options to split by exact amounts, percent or shares"
  - "Kharcha insights: November spending by category in a donut chart, led by rent, groceries and food"

### Writing
- Heading: **Writing**
- Technical Writer Intern at **GeeksforGeeks**, April to September 2024, remote.
- I wrote 8 technical articles on Ruby on Rails and statistics for beginners, with 33,000+ total views. Each one has 5–10 FAQs, and the code samples were revised after editorial and peer review.

### Skills
- Heading: **Skills**
- **Languages:** Python, JavaScript, Java, Kotlin, SQL
- **SAP data platforms:** SAP BW, SAP Datasphere, SAP BusinessObjects (WebI), SAP Analytics Cloud, SAP HANA, SAP CPI-DS
- **Backend and APIs:** FastAPI, Node.js, Express.js, REST APIs, Model Context Protocol (MCP)
- **AI:** LLM integration (Gemini API), AI chatbots, AI-assisted development (Claude Code)
- **Frontend and mobile:** Next.js, React, React Native, Tailwind CSS, Jetpack Compose
- **Databases:** SQLite, MongoDB, Firestore
- **Cloud and tools:** Git, GitHub, GitHub Actions (CI), Vercel, AWS S3, Firebase Authentication, JWT

### Background
- Heading: **Background**
- **Education:** B.E. in Computer Science Engineering and Data Science, Honours in AI/ML. Vidyavardhini's College of Engineering and Technology, Mumbai. December 2021 to June 2025. CGPA 9.32/10.
- **Achievements:**
  - 1st Prize, Data Science using AI, Techblitz 2024 (NSDC-VCET)
  - Finalist, LLM using AI, Techblitz 2025 (NSDC-VCET)
  - Finalist, HackScript 6.0 (A.P. Shah Institute of Technology)
- **Certifications:** Java (Basic) Skills Certification; SQL (Intermediate) Skills Certification; GitHub Copilot (Course GH-300T00-A); Data Science Foundations – Level 1

### Contact
- Heading: **Contact**
- Line: Mumbai, India.
- Links: mukeshprajapat3093@gmail.com, GitHub, LinkedIn, Resume (PDF)

### Footer
- © 2026 Mukesh Prajapat

### 404
- Heading: **Page not found**
- Line: There's nothing at this address. Go to the [home page](/).

## 4. Where the site wording differs from the resume
Facts unchanged; only the phrasing is plainer. Each needs the owner's OK.

| Resume | Site |
|---|---|
| Software Engineer \| AI & Automation for SAP Data Platforms | Software engineer building AI and automation tools for enterprise data platforms. |
| (none) | the systems many large companies run their data and reporting on; SAP BW "(a data warehouse)" |
| BW-to-Datasphere/Snowflake migration tool | a tool that migrates SAP BW to SAP Datasphere or Snowflake |
| MCP-based AI assistant for Datasphere | an AI assistant for SAP Datasphere built on MCP (Model Context Protocol) |
| BusinessObjects landscape platform used at a customer site | a landscape platform for SAP BusinessObjects used at a customer site |
| reducing manual effort in migration and development activities by up to 70% | Together they have cut manual effort in migration and development work by up to 70% |
| Awarded the Brilliant Beginner Award and SPOT Award for … | … two internal quarterly awards, for … (the "internal quarterly" note is from CONTENT.md, not the resume) |
| SAC | SAP Analytics Cloud |
| Authored 8 technical articles … that generated 33,000+ total views by simplifying complex concepts for a beginner audience | I wrote 8 technical articles on Ruby on Rails and statistics for beginners, with 33,000+ total views |
| Built a full-stack media-tracking platform unifying movies, TV, and anime into one watchlist system | One watchlist for movies, TV and anime |
| Kharcha: two technical bullets | the plain line from CONTENT.md plus one plain sentence on splitting and encryption |
| Bachelor of Engineering | B.E. |
| (none) | Context line "I also build full-stack web and Android apps." (from TheLyst and Kharcha) |

Left out on purpose:
- the "1+ year of experience" summary line (dates show it);
- Kharcha's parser, deduplication and AES-GCM detail (kept for the resume);
- every item on CONTENT.md's two excluded lists.

## 5. Needs the owner
1. **Approve this copy**, including the rewordings in §4.
2. **Resume PDF.** `public/resume.pdf` is the old version that still lists IPR (now banned). The new one in ~/Documents has Kharcha, but it links to the Kharcha repo, which is going private. Remove that link (the resume agent can do it), then I'll publish the PDF.
3. **D-007: drop the old database and /admin.** Every word on the new site comes from CONTENT.md, so the Postgres tables and the admin panel have nothing left to do. This also fixes the local build. Confirm, and I'll remove them in Phase 4 (along with @vercel/postgres and the middleware).
4. **/design-system on production:** remove it from the production build (my suggestion) or keep it hidden and unindexed.

## 6. Skills as a patch panel (approved for the home page 2026-11-26)
Wording on the panel, approved with it:
- Switches: All, At work, TheLyst, Kharcha, Training. Group label (screen readers): "Show the skills used in".
- Spoken after each used skill: "used at work", "used in TheLyst", "used in Kharcha", "training at Bristlecone".
- Note under the panel: "A hanging cable means the skill was used somewhere on this page. Empty jacks are skills from my resume that no project here shows."

Where each plug comes from (CONTENT.md only):
| Skill | Plugs | Source line |
|---|---|---|
| Python, FastAPI, Next.js | work | Summary: "using Python, FastAPI and Next.js" |
| MCP | work | Accelerator line: "MCP-based AI assistant" |
| SAP BW, SAP Datasphere, SAP BusinessObjects (WebI) | work, training | Accelerator line; training line |
| SAP Analytics Cloud, SAP HANA, SAP CPI-DS | training | Training line (SAC, HANA Modeling, CPI-DS) |
| Next.js, Tailwind CSS, Firestore, Firebase Authentication | TheLyst | TheLyst stack |
| Kotlin, Jetpack Compose | Kharcha | Kharcha stack |
| **React** (inference) | work, TheLyst | Next.js is built on React |
| **SQLite** (inference) | Kharcha | Room and SQLCipher are SQLite |
| Everything else | none | No project on the page names it |

Open question: TheLyst is written in TypeScript (per its public GitHub repo), but TypeScript is on CONTENT.md's excluded list, so JavaScript and TypeScript get no plug.
