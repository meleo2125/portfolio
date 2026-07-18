import { sql } from '@vercel/postgres';

async function seed() {
  console.log('Seeding site content (About section)...');
  
  const content = [
    {
      key: 'about_p1',
      value: 'I thrive on solving real-world problems through technology. My background combines a computer science foundation with hands-on experience in AI, machine learning, and modern web development.'
    },
    {
      key: 'about_p2',
      value: 'Currently an <span class="text-text">Associate in SAP Analytics at Bristlecone</span>, where I build automation that has cut manual migration effort by <span class="text-amber">60–90%</span> across projects. Outside of that, I build my own things.'
    },
    {
      key: 'about_p3',
      value: '<span class="text-text">B.E. in Computer Science Engineering &amp; Data Science</span> (Honours in AIML), Vidyavardhini&rsquo;s College of Engineering and Technology — CGPI <span class="text-amber">9.32</span>.'
    },
    {
      key: 'about_p4',
      value: 'Range beyond engineering: Students&rsquo; Council Creative Head · E-Cell Treasurer · CSI Joint Secretary · DataCite Newsletter Creative Director.'
    },
    {
      key: 'status_role',
      value: 'Associate, SAP Analytics @ Bristlecone'
    },
    {
      key: 'status_based_in',
      value: 'Mumbai, India'
    },
    {
      key: 'status_education',
      value: 'B.E. CSE + DS · Hons. AIML'
    },
    {
      key: 'status_focus',
      value: 'AI automation + independent product builds'
    },
    {
      key: 'status_cgpi',
      value: '9.32 / 10'
    }
  ];

  for (const item of content) {
    console.log(`Seeding key: ${item.key}`);
    await sql`
      INSERT INTO site_content (key, value)
      VALUES (${item.key}, ${item.value})
      ON CONFLICT (key) DO UPDATE SET
        value = EXCLUDED.value,
        updated_at = NOW();
    `;
  }
  
  console.log('Seeding site content complete.');
}

seed().catch((err) => {
  console.error('Error seeding site content:', err);
  process.exit(1);
});
