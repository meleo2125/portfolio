CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  problem TEXT NOT NULL,
  decision TEXT NOT NULL,
  build TEXT NOT NULL,
  outcome TEXT NOT NULL,
  headline TEXT,
  stack TEXT[] NOT NULL,
  live_url TEXT,
  github_url TEXT,
  status TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
