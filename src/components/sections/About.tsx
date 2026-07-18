import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatusReadout } from "@/components/shared/StatusReadout";
import { getSiteContent } from "@/lib/data";
import { AboutIntroClient } from "./AboutIntroClient";

export async function About() {
  const content = await getSiteContent();

  const p1 = content.about_p1 || "";
  const p2 = content.about_p2 || "";
  const p3 = content.about_p3 || "";
  const p4 = content.about_p4 || "";

  const fields = [
    { label: "ROLE", value: content.status_role || "" },
    { label: "BASED IN", value: content.status_based_in || "" },
    { label: "EDUCATION", value: content.status_education || "" },
    {
      label: "FOCUS",
      value: content.status_focus || "",
    },
    { label: "CGPI", value: content.status_cgpi || "" },
  ];

  return (
    <section
      id="about"
      className="relative mx-auto max-w-content px-6 py-24 md:pl-24 md:pr-10"
      aria-labelledby="about-heading"
    >
      <SectionHeader code="MOD-01 · ABOUT" title="About" />

      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <AboutIntroClient>
          <div className="space-y-5 text-[15px] leading-relaxed text-text-muted md:text-base">
            <p dangerouslySetInnerHTML={{ __html: p1 }} />
            <p dangerouslySetInnerHTML={{ __html: p2 }} />
            <p dangerouslySetInnerHTML={{ __html: p3 }} />
            <p className="text-sm text-text-muted/80" dangerouslySetInnerHTML={{ __html: p4 }} />
          </div>
        </AboutIntroClient>

        <div className="md:col-span-5">
          <StatusReadout fields={fields} />
        </div>
      </div>
    </section>
  );
}
