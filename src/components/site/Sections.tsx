import Image from "next/image";
import { PatchBay } from "@/components/site/PatchBay";
import { SkillsPanel } from "@/components/site/SkillsPanel";
import { background, bay, contact, footer, links, nav, projects, site, skills, skillsPanel, work, writing } from "@/content/site";

/* Page sections, in the order set by docs/IA_AND_COPY.md. Server components; text comes from src/content/site.ts. */

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function ContactLinks({ resume = false, email = true }: { resume?: boolean; email?: boolean }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 font-semibold">
      {email ? (
        <li>
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </li>
      ) : null}
      <li>
        <ExternalLink href={links.github}>GitHub</ExternalLink>
      </li>
      <li>
        <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>
      </li>
      {resume ? (
        <li>
          <a href={site.resume}>Resume (PDF)</a>
        </li>
      ) : null}
    </ul>
  );
}

/* Heading on the left, content on the right: the quiet sections after the projects. */
function QuietSection({ id, heading, wide = false, children }: { id: string; heading: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="gutter border-t-2 border-ink py-[clamp(3rem,9vh,5.5rem)]">
      <div className="grid gap-6 bay:grid-cols-[4fr_8fr] bay:gap-x-16">
        <h2 id={`${id}-h`} className="t-project m-0">
          {heading}
        </h2>
        <div className={wide ? "" : "max-w-[62ch]"}>{children}</div>
      </div>
    </section>
  );
}

export function SiteHeader() {
  return (
    <header className="gutter">
      <nav className="flex h-[4.5rem] items-center justify-between gap-3 text-[0.9375rem] font-semibold min-[400px]:text-base" aria-label="Sections">
        <ul className="m-0 flex list-none gap-3 p-0 min-[400px]:gap-4 bay:gap-9">
          {nav.map((item) => (
            <li key={item.href}>
              <a className="no-underline hover:underline" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="no-underline hover:underline" href={site.resume}>
          Resume
        </a>
      </nav>
    </header>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="name" className="gutter grid min-h-[calc(100svh-4.5rem)] grid-rows-[auto_1fr] pb-12">
      <div className="grid items-end gap-6 pt-4 bay:grid-cols-[1.3fr_1fr] bay:gap-x-24 bay:pt-12">
        <h1 id="name" className="t-name m-0">
          Mukesh
          <br />
          Prajapat
        </h1>
        <div>
          <p className="t-claim m-0 mb-3 max-w-[28ch]">{site.claim}</p>
          <p className="m-0 mb-4 text-muted">{site.context}</p>
          <ContactLinks />
        </div>
      </div>
      <div className="self-center pt-12">
        <PatchBay label={bay.label} headings={bay.headings} pairs={bay.pairs} targetRows={bay.targetRows} />
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="gutter section bg-field text-on-field">
      <h2 id="work-h" className="t-h2 m-0 mb-5">
        {work.heading}
      </h2>
      <p className="t-lede m-0 mb-12 max-w-[58ch] text-on-field-soft">
        {work.role} at <strong className="text-on-field">{work.company}</strong>. {work.period}
      </p>
      <div className="max-w-[62ch] text-[clamp(1.25rem,1.9vw,1.55rem)] leading-[1.45]">
        {work.body.map((p) => (
          <p key={p.slice(0, 24)} className="m-0 mb-[1em] last:mb-0">
            {p}
          </p>
        ))}
      </div>
      <div className="mt-16 grid gap-x-12 gap-y-6 border-t-2 border-on-field pt-6 bay:grid-cols-2">
        {work.notes.map((n) => (
          <div key={n.heading}>
            <h3 className="m-0 mb-1 font-hanken text-base font-bold">{n.heading}</h3>
            <p className="m-0 text-on-field-soft">{n.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectText({
  id,
  title,
  text,
  stack,
  extra,
}: {
  id: string;
  title: string;
  text: string[];
  stack: string;
  extra?: React.ReactNode;
}) {
  return (
    <div>
      <h3 id={`p-${id}`} className="t-project m-0 mb-4">
        {title}
      </h3>
      {text.map((p) => (
        <p key={p.slice(0, 24)} className="m-0 mb-4 text-muted">
          {p}
        </p>
      ))}
      <p className="m-0 mb-4 text-[0.95rem] font-semibold">{stack}</p>
      {extra}
    </div>
  );
}

export function Projects() {
  const { thelyst, kharcha } = projects;
  return (
    <section id="projects" aria-labelledby="projects-h" className="gutter section">
      <h2 id="projects-h" className="t-h2 m-0">
        {projects.heading}
      </h2>

      <article className="mt-12 grid items-start gap-8 bay:grid-cols-[4fr_8fr] bay:gap-x-16" aria-labelledby={`p-${thelyst.id}`}>
        <ProjectText
          id={thelyst.id}
          title={thelyst.title}
          text={thelyst.text}
          stack={thelyst.stack}
          extra={
            <ul className="m-0 flex list-none gap-6 p-0 font-semibold">
              {thelyst.links.map((l) => (
                <li key={l.href}>
                  <ExternalLink href={l.href}>{l.label}</ExternalLink>
                </li>
              ))}
            </ul>
          }
        />
        <figure className="relative m-0 mr-[calc(-1*var(--gutter))]">
          <Image
            src={thelyst.desktop.src}
            width={1440}
            height={900}
            sizes="(min-width: 820px) 66vw, 100vw"
            alt={thelyst.desktop.alt}
            className="block h-auto w-full rounded-l-xl outline outline-[3px] -outline-offset-1 outline-ink"
          />
          <Image
            src={thelyst.mobile.src}
            width={780}
            height={1688}
            sizes="(min-width: 820px) 15vw, 28vw"
            alt=""
            className="absolute bottom-[-8%] right-[6%] h-auto w-[28%] rounded-2xl shadow-[10px_10px_0_rgb(var(--cable-3))] outline outline-[3px] outline-ink bay:left-[-5%] bay:right-auto bay:w-[22%]"
          />
        </figure>
      </article>

      <article className="mt-28 grid items-start gap-8 bay:grid-cols-[4fr_8fr] bay:gap-x-16" aria-labelledby={`p-${kharcha.id}`}>
        <ProjectText
          id={kharcha.id}
          title={kharcha.title}
          text={kharcha.text}
          stack={kharcha.stack}
        />
        <figure className="m-0 grid grid-cols-3 items-start gap-3 bay:gap-6">
          {kharcha.screens.map((s, i) => (
            <div
              key={s.file}
              className={`overflow-hidden rounded-2xl outline outline-[3px] -outline-offset-1 outline-ink ${
                i === 1 ? "-translate-y-6 shadow-[10px_10px_0_rgb(var(--cable-3))] bay:-translate-y-10" : ""
              }`}
            >
              <Image
                src={`/images/projects/kharcha/${s.file}-light.webp`}
                width={1080}
                height={2400}
                sizes="(min-width: 820px) 18vw, 30vw"
                alt={s.alt}
                className="block h-auto w-full dark:hidden"
              />
              <Image
                src={`/images/projects/kharcha/${s.file}-dark.webp`}
                width={1080}
                height={2400}
                sizes="(min-width: 820px) 18vw, 30vw"
                alt={s.alt}
                className="hidden h-auto w-full dark:block"
              />
            </div>
          ))}
        </figure>
      </article>
    </section>
  );
}

export function Writing() {
  return (
    <QuietSection id="writing" heading={writing.heading}>
      <p className="t-lede m-0 mb-4">
        {writing.role} at <strong>{writing.company}</strong>, {writing.period}
      </p>
      <p className="m-0 text-muted">{writing.text}</p>
    </QuietSection>
  );
}

export function Skills() {
  return (
    <QuietSection id="skills" heading={skills.heading} wide>
      <SkillsPanel groups={skillsPanel} />
    </QuietSection>
  );
}

export function Background() {
  const { education, achievements, certifications } = background;
  return (
    <QuietSection id="background" heading={background.heading}>
      <h3 className="m-0 mb-1 font-hanken text-base font-bold">{education.heading}</h3>
      <p className="m-0 mb-8 text-muted">{education.text}</p>
      <h3 className="m-0 mb-1 font-hanken text-base font-bold">{achievements.heading}</h3>
      <ul className="m-0 mb-8 list-disc pl-5 text-muted">
        {achievements.items.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      <h3 className="m-0 mb-1 font-hanken text-base font-bold">{certifications.heading}</h3>
      <ul className="m-0 list-disc pl-5 text-muted">
        {certifications.items.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </QuietSection>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="gutter section border-t-2 border-ink">
      <h2 id="contact-h" className="t-h2 m-0 mb-6">
        {contact.heading}
      </h2>
      <p className="t-claim m-0 mb-6">
        <a href={`mailto:${links.email}`}>{links.email}</a>
      </p>
      <p className="m-0 mb-6 text-muted">{site.location}</p>
      <ContactLinks resume email={false} />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="gutter pb-10 text-[0.95rem] text-muted">
      <p className="m-0">{footer.text}</p>
    </footer>
  );
}
