'use client'

import { motion } from 'framer-motion'

  const skillCategories = [
    {
    title: "Programming Languages",
      skills: [
      { name: "Java", level: 80 },
      { name: "Python", level: 70 },
      { name: "HTML", level: 80 },
      { name: "CSS", level: 70 },
      { name: "JavaScript", level: 70 },
      { name: "SQL", level: 85 },
      { name: "DSA", level: 80 }
    ]
  },
  {
    title: "Frameworks & Libraries",
      skills: [
      { name: "NextJs", level: 75 },
      { name: "React Native", level: 70 },
      { name: "React", level: 75 },
      { name: "Ruby on Rails", level: 70 },
      { name: "MongoDB", level: 80 }
    ]
  },
  {
    title: "Tools & Platforms",
      skills: [
        { name: "Git", level: 80 },
      { name: "Github", level: 80 },
      { name: "Figma", level: 75 },
      { name: "Canva", level: 85 }
      ]
    },
    {
      title: "Soft Skills",
      skills: [
        { name: "Problem Solving", level: 90 },
        { name: "Team Leadership", level: 85 },
        { name: "Communication", level: 80 },
        { name: "Agile/Scrum", level: 80 }
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
        <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory hide-scrollbar">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl w-[calc(100vw-2rem)] md:w-[calc(25%-1.5rem)] min-w-[300px] md:min-w-0 snap-center"
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