import { motion } from 'framer-motion'
import React, { useState } from 'react'
import PdfModal from './PdfModal'

const experiences = [
  {
    title: 'Technical Writer, GeeksforGeeks',
    date: '04/2024 - 09/2024',
    location: 'Mumbai, India',
    details: [
      'Contributed 8 articles on Ruby on Rails and statistics, simplifying complex concepts for beginners.',
      'Achieved 24,000+ total views, demonstrating strong audience engagement.',
      'Added 5-10 FAQs per article to enhance reader understanding.',
      'Refined code snippets and incorporated team feedback to improve content quality.',
      'Expanded knowledge of technical writing while enhancing communication skills.'
    ],
    certificates: [
      { label: 'Internship Certificate', src: '/exp/gfg.pdf' }
    ]
  },
  {
    title: 'Web Development Intern, Prodigy Infotech',
    date: '08/2023 - 12/2023',
    location: 'Mumbai, India',
    details: [
      'Developed responsive web applications using HTML, CSS, and JavaScript.',
      'Gained hands-on experience in REST API integration and asynchronous JavaScript.',
      'Strengthened front-end development skills through practical project assignments.'
    ],
    certificates: [
      { label: 'Internship Certificate', src: '/exp/prodigy.pdf' },
      { label: 'Letter of Recommendation', src: '/exp/lor.pdf' }
    ]
  }
]

const Experience = () => {
  const [pdfSrc, setPdfSrc] = useState<string | null>(null)
  return (
    <section id="experience" className="py-20 relative bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-full z-0 hidden md:block" />
          <div className="space-y-8 pl-0 md:space-y-16 md:pl-16">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row md:gap-8 items-start"
              >
                {/* Timeline dot (desktop only) */}
                <div className="absolute -left-8 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background z-10 shadow-lg hidden md:block" />
                <div className="glass p-6 md:p-8 rounded-xl flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-heading font-semibold text-primary mb-1 md:mb-0">
                      <span className="inline-block md:hidden w-3 h-3 rounded-full bg-primary mr-2" />
                      {exp.title}
                    </h3>
                    <span className="text-sm text-foreground/60">{exp.date} | {exp.location}</span>
                  </div>
                  <ul className="list-disc pl-4 md:pl-5 text-foreground/80 space-y-1 mb-2">
                    {exp.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                  {/* Certificates/LORs */}
                  <div className="flex flex-wrap gap-2 md:gap-4 mt-2 md:mt-4 items-center">
                    {exp.certificates && exp.certificates.map((cert, i) => (
                      <button
                        key={cert.label}
                        onClick={() => setPdfSrc(cert.src)}
                        className="px-3 py-1 rounded bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow md:px-4 md:py-2"
                      >
                        {cert.label}
                      </button>
                    ))}
                    {exp.title.includes('GeeksforGeeks') && (
                      <a
                        href="https://www.geeksforgeeks.org/user/mukeshprajtjp2/contributions/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow md:px-4 md:py-2"
                      >
                        My Work
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <PdfModal open={!!pdfSrc} onClose={() => setPdfSrc(null)} src={pdfSrc || ''} />
      </div>
    </section>
  )
}

export default Experience 