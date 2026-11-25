import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Flat config per node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "screenshots/**", "playwright-report/**", "test-results/**"]),
]);
