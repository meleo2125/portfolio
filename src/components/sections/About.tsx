"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatusReadout } from "@/components/shared/StatusReadout";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-content px-6 py-24 md:pl-24 md:pr-10"
      aria-labelledby="about-heading"
    >
      <SectionHeader code="MOD-01 · ABOUT" title="About" />

      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7"
        >
          <div className="space-y-5 text-[15px] leading-relaxed text-text-muted md:text-base">
            <p>
              I thrive on solving real-world problems through technology —
              combining a foundation in computer science with hands-on work in
              AI, machine learning, and modern web development. My work spans
              two worlds: by day, I design AI-driven automation for enterprise
              SAP systems; by choice, I build full-stack products end to end.
              What connects both is the same instinct — find the manual,
              repetitive, or fragmented part of a process, and replace it with
              something clean and automatic.
            </p>
            <p>
              Currently an{" "}
              <span className="text-text">Associate in SAP Analytics at Bristlecone</span>,
              where I build automation that has cut manual migration effort by{" "}
              <span className="text-amber">60–90%</span> across projects.
              Outside of that, I build my own things — a unified tracker for
              movies, TV, and anime; a 3D explorable garden of medicinal plants;
              an AI healthcare platform that screens for disease from EEG and
              X-ray data.
            </p>
            <p>
              <span className="text-text">
                B.E. in Computer Science Engineering &amp; Data Science
              </span>{" "}
              (Honours in AIML), Vidyavardhini&rsquo;s College of Engineering and
              Technology — CGPI <span className="text-amber">9.32</span>.
            </p>
            <p className="text-sm text-text-muted/80">
              Range beyond engineering: Students&rsquo; Council Creative Head · E-Cell
              Treasurer · CSI Joint Secretary · DataCite Newsletter Creative
              Director.
            </p>
          </div>
        </motion.div>

        <div className="md:col-span-5">
          <StatusReadout
            fields={[
              { label: "ROLE", value: "Associate, SAP Analytics @ Bristlecone" },
              { label: "BASED IN", value: "Mumbai, India" },
              { label: "EDUCATION", value: "B.E. CSE + DS · Hons. AIML" },
              {
                label: "FOCUS",
                value: "AI automation + independent product builds",
              },
              { label: "CGPI", value: "9.32 / 10" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
