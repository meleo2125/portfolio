# Updating the site, and the Vercel changes for the redesign

## How to update the site now (no database, no admin page)
All the text lives in one file: `src/content/site.ts`. To change something:

1. Edit `docs/CONTENT.md`, the record of what is allowed on the site. Then make the same change in `src/content/site.ts`.
2. Images go in `public/images/projects/`. The resume is `public/resume.pdf`; replace that file to update it.
3. Commit and push to `master`. Vercel builds and deploys it automatically, usually within a minute or two.
4. To check a change before it goes live, push it to a branch first. Vercel gives every branch its own preview URL.

You can also just ask Claude Code to make the change. It will follow these same steps.

Why this replaces /admin: the site has a handful of facts that change a few times a year, and every change already has to be checked against CONTENT.md. A database and a login page added a deprecated dependency, a password to protect, and a build that broke without the database. A text file in git keeps every change reviewable and reversible.

## What to change on Vercel when the redesign goes live
The redesign reads no environment variables and needs no database. Nothing on Vercel has to change for it to build. The steps below are clean-up, and the order matters.

**Before merging (check once)**
- Project → Settings → Build and Deployment → Node.js Version: 20.x or newer (Next.js 16 needs at least 20.9). 22.x or 24.x is fine.
- Framework preset: Next.js, with the default build and output settings. The redesign needs nothing custom.

**After the new site is live and you've checked it (wait a week or two)**
Keep the database until then. The current live site needs it, and so would an Instant Rollback to an old deployment.
1. **Environment variables** (Project → Settings → Environment Variables): delete `ADMIN_PASSWORD`, plus the variables the Neon/Postgres integration added. Their names start with `POSTGRES_`, `PG`, `DATABASE_URL` or `NEON_`.
2. **Disconnect the database** (Storage tab → the Neon database → Projects → disconnect this project).
3. **Delete the database**, once nothing else uses it (in the Vercel Storage tab or the Neon console). Its contents are the old, outdated site text; everything current is in docs/CONTENT.md. Export it first only if you want an archive.
4. The old `/admin` and `/admin/login` URLs will return the site's 404 page. Nothing else needs doing.

Never paste the values of these variables into chat, issues or commits.
