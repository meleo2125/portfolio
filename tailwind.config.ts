import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        panel: "var(--color-panel)",
        "panel-raised": "var(--color-panel-raised)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        amber: "var(--color-accent-amber)",
        cyan: "var(--color-accent-cyan)",
        grid: "var(--color-grid-line)",
        /* Patch bay tokens (docs/DESIGN.md); defined in src/app/(site)/site.css */
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        field: "rgb(var(--field) / <alpha-value>)",
        "on-field": "rgb(var(--on-field) / <alpha-value>)",
        "on-field-soft": "rgb(var(--on-field-soft) / <alpha-value>)",
        "cable-1": "rgb(var(--cable-1) / <alpha-value>)",
        "cable-2": "rgb(var(--cable-2) / <alpha-value>)",
        "cable-3": "rgb(var(--cable-3) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        anybody: ["var(--font-anybody)", "system-ui", "sans-serif"],
        hanken: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
      },
      maxWidth: {
        content: "1200px",
      },
      screens: {
        bay: "820px", /* the Patch bay layout breakpoint */
      },
    },
  },
  plugins: [],
};

export default config;
