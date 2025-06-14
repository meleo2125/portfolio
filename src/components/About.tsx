'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import PdfModal from './PdfModal'

const About = () => {
  const [pdfOpen, setPdfOpen] = useState(false)

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden gradient-border">
              <Image
                src="/your-photo.jpg"
                alt="Mukeshkumar Prajapat"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full filter blur-2xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading font-bold">
              Building AI-driven solutions and seamless web experiences
            </h3>
            <p className="text-foreground/80 leading-relaxed text-justify">
              I thrive on solving real-world problems through technology—combining a strong foundation in computer science with hands-on experience in AI, machine learning, and modern web development. My journey is driven by curiosity, a passion for impactful solutions, and a commitment to continuous learning and growth.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Education:</h4>
              <p><b>B.E. in Computer Science Engineering and Data Science, Honours in AIML</b><br/>Vidyavardhini's College of Engineering and Technology, CGPI 9.32<br/>Dec 2021 - Jun 2025, Mumbai, India</p>
            </div>
            <button
              onClick={() => setPdfOpen(true)}
              className="inline-block px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              View Resume
            </button>
          </motion.div>
        </div>
      </div>
      <PdfModal open={pdfOpen} onClose={() => setPdfOpen(false)} src="/Mukesh-Prajapat.pdf" />
    </section>
  )
}

export default About 