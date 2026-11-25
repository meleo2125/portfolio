import type { Metadata } from "next";
import Image from "next/image";
import { PatchBay, type PatchPair } from "@/components/site/PatchBay";

/* Living preview of docs/DESIGN.md. Not linked from the site and not indexed.
   Text is from docs/CONTENT.md; items marked "proposal" still need the owner's approval. */

export const metadata: Metadata = {
  title: "Design system: Patch bay",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "paper", light: "#F0F0EC", dark: "#151517", use: "Page background", contrast: "Every other colour is measured against it", cls: "bg-paper text-ink" },
  { name: "ink", light: "#17171A", dark: "#ECECE6", use: "Text, jack rings, rules", contrast: "15.7 / 15.4 on paper", cls: "bg-ink text-paper" },
  { name: "muted", light: "#55565C", dark: "#A6A7AD", use: "Secondary text, glosses", contrast: "6.4 / 7.6 on paper", cls: "bg-muted text-paper" },
  { name: "field", light: "#F4BE2C", dark: "#E0A818", use: "The work section only", contrast: "on-field 10.4 / 8.3", cls: "bg-field text-on-field" },
  { name: "on-field-soft", light: "#3D3417", dark: "#3D3417", use: "Secondary text on field", contrast: "7.2 / 5.8 on field", cls: "bg-on-field-soft text-field" },
  { name: "cable-1", light: "#D9411E", dark: "#FF6B47", use: "Work cable. Decorative only", contrast: "never text", cls: "bg-cable-1 text-white" },
  { name: "cable-2", light: "#0E7C7B", dark: "#3FC1BF", use: "TheLyst cable. Decorative only", contrast: "never text", cls: "bg-cable-2 text-white" },
  { name: "cable-3", light: "#5B3FD6", dark: "#9B88FF", use: "Kharcha cable, phone offset", contrast: "never text", cls: "bg-cable-3 text-white" },
];

const typeRoles = [
  { role: "Name (h1)", cls: "t-name font-anybody", sample: "Mukesh Prajapat" },
  { role: "Section title (h2)", cls: "t-h2 font-anybody", sample: "Things I've built" },
  { role: "Project title (h3)", cls: "t-project font-anybody", sample: "TheLyst" },
  { role: "Port label", cls: "t-port font-anybody", sample: "Enterprise data platforms" },
  { role: "Claim", cls: "t-claim", sample: "Software engineer building AI and automation tools for enterprise data platforms." },
  { role: "Lede", cls: "t-lede", sample: "Associate Consultant, SAP Analytics at Bristlecone. July 2025 to present, Mumbai (hybrid)." },
  { role: "Body", cls: "", sample: "One watchlist for movies, TV and anime, with real-time search across thousands of titles and custom lists you can rank, clone and share." },
  { role: "Small", cls: "text-[0.95rem] text-muted", sample: "Next.js, Tailwind CSS, Firebase Authentication, Firestore, TMDB API, Jikan API" },
];

/* Proposal (D-015): public pairs only. The workplace accelerators are never cables. */
const pairs: PatchPair[] = [
  { source: "Enterprise data platforms", target: "AI and automation tools", gloss: "at Bristlecone" },
  { source: "The web", target: "TheLyst", gloss: "one watchlist for movies, TV and anime" },
  { source: "Android", target: "Kharcha", gloss: "money tracking and bill splitting" },
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 mt-0 max-w-[60ch] text-muted">{children}</p>;
}

export default function DesignSystemPage() {
  return (
    <main>
      <header className="gutter section pb-8">
        <h1 className="t-h2 m-0">Patch bay</h1>
        <p className="t-lede mt-6 max-w-[60ch] text-muted">
          The design system for the portfolio, as specified in docs/DESIGN.md. This page is a preview for the owner and is
          not linked from the site. Switch the system to dark mode to see the dark tokens.
        </p>
      </header>

      <section className="gutter pb-16" aria-labelledby="colour-h">
        <h2 id="colour-h" className="t-project mb-8 mt-0">Colour</h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {swatches.map((s) => (
            <li key={s.name}>
              <div className={`flex h-28 items-end rounded-none p-3 font-semibold ring-1 ring-ink/15 ${s.cls}`}>{s.name}</div>
              <p className="m-0 mt-2 text-[0.95rem]">
                Light {s.light}, dark {s.dark}
              </p>
              <p className="m-0 text-[0.95rem] text-muted">{s.use}. {s.contrast}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="gutter pb-16" aria-labelledby="type-h">
        <h2 id="type-h" className="t-project mb-8 mt-0">Type</h2>
        <Label>Anybody (width and weight axes) for headings and ports. Hanken Grotesk for everything else. Both self-hosted with next/font.</Label>
        <ul className="m-0 grid list-none gap-10 p-0">
          {typeRoles.map((t) => (
            <li key={t.role} className="grid gap-2 border-t-2 border-ink pt-3 bay:grid-cols-[12rem_1fr] bay:gap-8">
              <p className="m-0 text-[0.95rem] font-semibold text-muted">{t.role}</p>
              <p className={`m-0 max-w-[60ch] ${t.cls}`}>{t.sample}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="hero-h">
        <div className="gutter">
          <h2 id="hero-h" className="t-project m-0 mb-4">Hero and PatchBay</h2>
          <Label>
            The signature. Cables plug in once on load, hovering a port lights its cable. Pairs are a proposal awaiting the
            owner&apos;s approval; the workplace accelerators are never cables (D-015).
          </Label>
        </div>
        <div className="gutter grid min-h-[100svh] grid-rows-[auto_auto_1fr] border-y-2 border-ink pb-12">
          <nav className="flex justify-between py-5 font-semibold" aria-label="Example navigation">
            <ul className="m-0 flex list-none gap-4 p-0 bay:gap-9">
              <li><a className="no-underline hover:underline" href="#work-h">Work</a></li>
              <li><a className="no-underline hover:underline" href="#projects-h">Projects</a></li>
              <li><a className="no-underline hover:underline" href="#type-h">Skills</a></li>
              <li><a className="no-underline hover:underline" href="#links-h">Contact</a></li>
            </ul>
            <a className="no-underline hover:underline" href="/resume.pdf">Resume</a>
          </nav>
          <div className="grid items-end gap-6 pt-4 bay:grid-cols-[1.3fr_1fr] bay:gap-x-24 bay:pt-12">
            <p className="t-name m-0 font-anybody">
              Mukesh
              <br />
              Prajapat
            </p>
            <div>
              <p className="t-claim m-0 mb-3 max-w-[28ch]">Software engineer building AI and automation tools for enterprise data platforms.</p>
              <p className="m-0 mb-4 text-muted">Associate Consultant at Bristlecone, Mumbai. Also builds full-stack web and mobile apps.</p>
              <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 font-semibold">
                <li><a href="mailto:mukeshprajapat3093@gmail.com">mukeshprajapat3093@gmail.com</a></li>
                <li><a href="https://github.com/meleo2125" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/mukesh-prajapat-" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="self-center pt-12">
            <PatchBay
              label="What I've built, by platform"
              headings={["Where I build", "What I've built"]}
              pairs={pairs}
              targetRows={[2, 0, 1]}
            />
          </div>
        </div>
      </section>

      <section className="gutter section bg-field text-on-field" aria-labelledby="work-h">
        <h2 id="work-h" className="t-h2 m-0 mb-5">At work</h2>
        <p className="t-lede m-0 mb-12 max-w-[58ch] text-on-field-soft">
          Associate Consultant, SAP Analytics at <strong className="text-on-field">Bristlecone</strong>. July 2025 to present, Mumbai (hybrid).
        </p>
        <div className="max-w-[62ch] text-[clamp(1.25rem,1.9vw,1.55rem)] leading-[1.45]">
          <p className="m-0 mb-[1em]">
            I build AI and automation accelerators for SAP data platforms, the systems many large companies run their data
            and reporting on.
          </p>
          <p className="m-0">
            They include a tool that migrates SAP BW (a data warehouse) to SAP Datasphere or Snowflake, an AI assistant for
            SAP Datasphere built on MCP (Model Context Protocol), and a landscape platform for SAP BusinessObjects used at a
            customer site. Together they have cut manual effort in migration and development work by up to 70%.
          </p>
        </div>
        <div className="mt-16 grid gap-x-12 gap-y-6 border-t-2 border-on-field pt-6 bay:grid-cols-2">
          <div>
            <h3 className="m-0 mb-1 font-hanken text-base font-bold">Recognition</h3>
            <p className="m-0 text-on-field-soft">Brilliant Beginner Award and SPOT Award, for contributions to AI and automation initiatives.</p>
          </div>
          <div>
            <h3 className="m-0 mb-1 font-hanken text-base font-bold">Training</h3>
            <p className="m-0 text-on-field-soft">SAC, Datasphere, BusinessObjects, BW Modeling, HANA Modeling, CPI-DS.</p>
          </div>
        </div>
      </section>

      <section className="gutter section" aria-labelledby="projects-h">
        <h2 id="projects-h" className="t-h2 m-0">Things I&apos;ve built</h2>
        <article className="mt-12 grid items-start gap-8 bay:grid-cols-[4fr_8fr] bay:gap-x-16" aria-labelledby="p-thelyst">
          <div>
            <h3 id="p-thelyst" className="t-project m-0 mb-4">TheLyst</h3>
            <p className="m-0 mb-4 text-muted">
              One watchlist for movies, TV and anime, with real-time search across thousands of titles and custom lists you can
              rank, clone and share.
            </p>
            <p className="m-0 mb-4 text-[0.95rem] font-semibold">Next.js, Tailwind CSS, Firebase Authentication, Firestore, TMDB API, Jikan API</p>
            <p className="m-0 flex gap-6 font-semibold">
              <a href="https://thelystapp.vercel.app" target="_blank" rel="noopener noreferrer">Live demo</a>
              <a href="https://github.com/meleo2125/thelystapp" target="_blank" rel="noopener noreferrer">Source</a>
            </p>
          </div>
          <figure className="relative m-0 mr-[calc(-1*var(--gutter))]">
            <Image
              src="/images/projects/thelyst-desktop.webp"
              width={1440}
              height={900}
              sizes="(min-width: 820px) 66vw, 100vw"
              alt="TheLyst home page: 'Track what you watch. Curate your obsession.' with Start Tracking and Sign In buttons"
              className="block h-auto w-full rounded-l-xl outline outline-[3px] -outline-offset-1 outline-ink"
            />
            <Image
              src="/images/projects/thelyst-mobile.webp"
              width={780}
              height={1688}
              sizes="22vw"
              alt=""
              className="absolute bottom-[-8%] right-[6%] h-auto w-[28%] rounded-2xl outline outline-[3px] outline-ink shadow-[10px_10px_0_rgb(var(--cable-3))] bay:left-[-5%] bay:right-auto bay:w-[22%]"
            />
          </figure>
        </article>
        <article className="mt-28 grid items-start gap-8 bay:grid-cols-[4fr_8fr] bay:gap-x-16" aria-labelledby="p-kharcha">
          <div>
            <h3 id="p-kharcha" className="t-project m-0 mb-4">Kharcha</h3>
            <p className="m-0 mb-4 text-muted">
              An Android app for money tracking and bill splitting in one place. Bank and UPI SMS alerts become transactions,
              any of them can be split with a group, and nothing leaves the phone.
            </p>
            <p className="m-0 mb-4 text-[0.95rem] font-semibold">Kotlin, Jetpack Compose, Room, SQLCipher, Hilt, WorkManager</p>
            <p className="m-0 flex gap-6 font-semibold">
              <a href="https://github.com/meleo2125/kharcha" target="_blank" rel="noopener noreferrer">Source</a>
            </p>
          </div>
          <div className="mr-[calc(-1*var(--gutter))] grid aspect-video place-items-center rounded-l-xl border-[3px] border-r-0 border-dashed border-muted p-4 text-center text-muted">
            Placeholder: Kharcha screens made with demo data, from the owner.
          </div>
        </article>
      </section>

      <section className="gutter section border-t-2 border-ink" aria-labelledby="links-h">
        <h2 id="links-h" className="t-project m-0 mb-8">Links, focus and motion</h2>
        <Label>Links take the text colour with a 1px underline, 2px on hover. Focus is a 3px outline in the current colour, 4px away. Press Tab to see it.</Label>
        <p className="m-0 mb-10 flex flex-wrap gap-6 font-semibold">
          <a href="#links-h">A text link</a>
          <a href="/resume.pdf">Resume (PDF)</a>
        </p>
        <ul className="m-0 max-w-[60ch] list-disc pl-5 text-muted">
          <li>The one moment: cables plug in once on first load, 1000ms each, 180ms apart.</li>
          <li>Hover a port: its cable stays, the others fade (200ms).</li>
          <li>Nothing animates on scroll. Reduced motion draws the cables complete with no transitions.</li>
        </ul>
      </section>
    </main>
  );
}
