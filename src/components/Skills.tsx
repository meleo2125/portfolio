'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const skillData = [
  {
    name: 'Java',
    level: 90,
    logo: '/window.svg', // Placeholder
    type: 'language',
  },
  {
    name: 'Python',
    level: 90,
    logo: '/window.svg', // Placeholder
    type: 'language',
  },
  {
    name: 'HTML',
    level: 95,
    logo: '/window.svg', // Placeholder
    type: 'language',
  },
  {
    name: 'CSS',
    level: 95,
    logo: '/window.svg', // Placeholder
    type: 'language',
  },
  {
    name: 'JavaScript',
    level: 92,
    logo: '/window.svg', // Placeholder
    type: 'language',
  },
  {
    name: 'SQL',
    level: 85,
    logo: '/window.svg', // Placeholder
    type: 'language',
  },
  {
    name: 'DSA',
    level: 80,
    logo: '/window.svg', // Placeholder
    type: 'language',
  },
  {
    name: 'NextJs',
    level: 90,
    logo: '/next.svg',
    type: 'framework',
  },
  {
    name: 'React Native',
    level: 85,
    logo: '/window.svg', // Placeholder
    type: 'framework',
  },
  {
    name: 'React',
    level: 90,
    logo: '/window.svg', // Placeholder
    type: 'framework',
  },
  {
    name: 'Ruby on Rails',
    level: 80,
    logo: '/window.svg', // Placeholder
    type: 'framework',
  },
  {
    name: 'MongoDB',
    level: 85,
    logo: '/window.svg', // Placeholder
    type: 'framework',
  },
  {
    name: 'Git',
    level: 90,
    logo: '/github.svg', // Placeholder
    type: 'tool',
  },
  {
    name: 'Github',
    level: 90,
    logo: '/github.svg', // Placeholder
    type: 'tool',
  },
  {
    name: 'Figma',
    level: 80,
    logo: '/window.svg', // Placeholder
    type: 'tool',
  },
  {
    name: 'Canva',
    level: 80,
    logo: '/window.svg', // Placeholder
    type: 'tool',
  },
]

const leadershipSkills = [
  "Creative Head, Students' Council",
  'Treasurer, ECell',
  'Joint Secretary, CSI',
  'Creative Director, DataCite Newsletter',
  'CSI - Joint Secretary',
  'DataCite Newsletter - Creative Director',
]

const softSkills = [
  'Problem Solving',
  'Team Leadership',
  'Communication',
  'Agile/Scrum',
]

  const skillCategories = [
    {
    title: "Programming Languages",
      skills: [
      { name: "Java", level: 90 },
      { name: "Python", level: 90 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 95 },
      { name: "JavaScript", level: 92 },
      { name: "SQL", level: 85 },
      { name: "DSA", level: 80 }
    ]
  },
  {
    title: "Frameworks & Libraries",
      skills: [
      { name: "NextJs", level: 90 },
      { name: "React Native", level: 85 },
      { name: "React", level: 90 },
      { name: "Ruby on Rails", level: 80 },
      { name: "MongoDB", level: 85 }
    ]
  },
  {
    title: "Tools & Platforms",
      skills: [
        { name: "Git", level: 90 },
      { name: "Github", level: 90 },
      { name: "Figma", level: 80 },
      { name: "Canva", level: 80 }
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving", level: 95 },
        { name: "Team Leadership", level: 88 },
        { name: "Communication", level: 90 },
        { name: "Agile/Scrum", level: 85 }
      ]
    }
  ]

const Skills = () => {
  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl"
            >
              <h3 className="text-xl font-heading font-semibold mb-6 text-primary">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/80">{skill.name}</span>
                      <span className="text-sm text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl -z-10" />
    </section>
  )
}

export default Skills 