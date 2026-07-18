'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth')?.value;
  if (!authCookie || authCookie !== process.env.ADMIN_PASSWORD) {
    throw new Error('Unauthorized access to database modifications.');
  }
}

export async function updateProject(id: string, data: {
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
}) {
  await verifyAdmin();
  
  await sql`
    UPDATE projects
    SET title = ${data.title},
        tagline = ${data.tagline},
        problem = ${data.problem},
        decision = ${data.decision},
        build = ${data.build},
        outcome = ${data.outcome},
        headline = ${data.headline || null},
        stack = ${data.stack as any},
        live_url = ${data.liveUrl || null},
        github_url = ${data.githubUrl || null},
        status = ${data.status}
    WHERE id = ${id}
  `;
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function addProject(data: {
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
}) {
  await verifyAdmin();
  
  const { rows } = await sql`SELECT COALESCE(MAX(sort_order), -1) as max_order FROM projects`;
  const nextOrder = rows[0].max_order + 1;
  
  await sql`
    INSERT INTO projects (
      id, title, tagline, problem, decision, build, outcome, headline, stack, live_url, github_url, status, sort_order
    ) VALUES (
      ${data.id}, ${data.title}, ${data.tagline}, ${data.problem}, ${data.decision}, ${data.build}, ${data.outcome}, ${data.headline || null}, ${data.stack as any}, ${data.liveUrl || null}, ${data.githubUrl || null}, ${data.status}, ${nextOrder}
    )
  `;
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteProject(id: string) {
  await verifyAdmin();
  
  await sql`DELETE FROM projects WHERE id = ${id}`;
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateSiteContent(key: string, value: string) {
  await verifyAdmin();
  
  await sql`
    UPDATE site_content SET value = ${value}, updated_at = NOW() WHERE key = ${key}
  `;
  
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
}
