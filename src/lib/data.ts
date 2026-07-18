import { sql } from '@vercel/postgres';

export type Project = {
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

type DbProject = {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  decision: string;
  build: string;
  outcome: string;
  headline: string | null;
  stack: string[];
  live_url: string | null;
  github_url: string | null;
  status: "LIVE" | "ACTIVE" | "SHIPPED" | "OPEN-SOURCE";
  sort_order: number;
};

export async function getProjects(): Promise<Project[]> {
  const { rows } = await sql<DbProject>`SELECT * FROM projects ORDER BY sort_order ASC`;
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    tagline: row.tagline,
    problem: row.problem,
    decision: row.decision,
    build: row.build,
    outcome: row.outcome,
    headline: row.headline || undefined,
    stack: row.stack,
    liveUrl: row.live_url || undefined,
    githubUrl: row.github_url || undefined,
    status: row.status,
  }));
}

export async function getSiteContent(): Promise<Record<string, string>> {
  const { rows } = await sql<{ key: string; value: string }>`SELECT key, value FROM site_content`;
  return Object.fromEntries(rows.map(r => [r.key, r.value]));
}
