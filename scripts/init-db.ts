import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

async function init() {
  console.log('Initializing database...');
  const schemaPath = path.join(process.cwd(), 'src/lib/db/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  await sql.query(schema);
  console.log('Schema created successfully');
}

init().catch((err) => {
  console.error('Error initializing database:', err);
  process.exit(1);
});
