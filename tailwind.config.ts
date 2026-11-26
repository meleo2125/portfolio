import type { Config } from "tailwindcss";

/* Tokens are defined as RGB channels in src/app/site.css (spec: docs/DESIGN.md). */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
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
        anybody: ["var(--font-anybody)", "system-ui", "sans-serif"],
        hanken: ["var(--font-hanken)", "system-ui", "sans-serif"],
      },
      screens: {
        bay: "820px" /* the Patch bay layout breakpoint */,
      },
    },
  },
  plugins: [],
};

export default config;
