'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const Projects = () => {
  const projects = [
    {
      title: "Virtual Herbal Garden",
      description: "Interactive 3D web app for exploring herbal plants with advanced search, virtual tours, and multimedia from Ayurveda, Homeopathy, and more.",
      image: "/projects/analytics.jpg",
      technologies: ["Next.js", "Three.js", "Tailwind"],
      liveUrl: "https://virtual-3d-garden.vercel.app/",
      githubUrl: "https://github.com/meleo2125/3D-virtual-herbal-garden",
      youtubeUrl: "https://www.youtube.com/watch?v=yD4sJhDHEQ0&t=2s"
    },
    {
      title: "Gamified IPR Learning Platform",
      description: "Full-stack app to educate users on Intellectual Property Rights (IPR) using interactive chapters, role-play, and mini-games. Personalized recommendations for better learning outcomes.",
      image: "/projects/ecommerce.jpg",
      technologies: ["React Native", "Node.js", "Express.js", "MongoDB", "JWT", "Gemini API", "AWS S3"],
      liveUrl: "#",
      githubUrl: "https://github.com/meleo2125/ipr-app"
    },
    {
      title: "AI-Powered Healthcare Platform",
      description: "AI-driven platform for multi-disease diagnosis (schizophrenia, TB, pneumonia, etc.) with 90%+ accuracy. Features a bilingual chatbot and instant medical recommendations.",
      image: "/projects/taskmanager.jpg",
      technologies: ["AI", "Deep Learning", "Chatbot", "Healthcare"],
      liveUrl: "#",
      githubUrl: "https://github.com/SM-Sclass/502lostserver_ALGORITHM_9.0",
      date: "02/2025"
    }
  ]

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass rounded-xl overflow-hidden"
            >
              <div className="aspect-video relative overflow-visible">
                <div className="absolute inset-0 z-20 pointer-events-none group-hover:shadow-2xl transition-all duration-300" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110 group-hover:z-30 group-hover:shadow-2xl"
                  style={{ zIndex: 30 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none transition-all duration-300 group-hover:opacity-0" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-foreground/80 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CodeBracketIcon className="w-5 h-5" />
                    Source Code
                  </motion.a>
                  {project.youtubeUrl && (
                    <motion.a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.566A2.994 2.994 0 0 0 .502 6.186C0 8.344 0 12 0 12s0 3.656.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.656 24 12 24 12s0-3.656-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      YouTube
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl -z-10" />
    </section>
  )
}

export default Projects 