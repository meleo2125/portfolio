'use client'

import { motion } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'

const Hero = () => {
  const roles = [
    'Web Developer',
    'Mobile Developer',
    'AI/ML Enthusiast',
    'Tech Explorer',
    'Computer Science Student'
  ]
  const [displayText, setDisplayText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const currentRole = roles[roleIdx]
    if (typing) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        }, 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 1200)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1))
        }, 40)
      } else {
        setTyping(true)
        setRoleIdx((prev) => (prev + 1) % roles.length)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayText, typing, roleIdx])

  return (
    <section id="home" className="min-h-[calc(var(--vh)*100)] flex items-center justify-center relative">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="gradient-text">Hi, I'm Mukeshkumar Prajapat</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 min-h-[2.5rem]">
              <span className="inline-block border-r-2 border-primary animate-pulse pr-1">
                {displayText}
              </span>
            </p>
            <div className="flex justify-center gap-6 mb-8">
              <a href="https://www.linkedin.com/in/mukesh-prajapat-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="w-7 h-7 text-primary hover:text-accent transition-colors" />
              </a>
              <a href="https://github.com/meleo2125" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub className="w-7 h-7 text-primary hover:text-accent transition-colors" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.a
              href="#about"
              className="flex flex-col items-center text-foreground/60 hover:text-primary transition-colors"
              whileHover={{ y: 5 }}
            >
              <span className="text-sm mb-2">Scroll Down</span>
              <ArrowDownIcon className="w-6 h-6 animate-bounce" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-accent/20 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-secondary/20 rounded-full filter blur-3xl opacity-20" />
      </div>
    </section>
  )
}

export default Hero 