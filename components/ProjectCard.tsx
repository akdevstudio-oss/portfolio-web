"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image_url: string
    live_url: string
    github_url: string
    tech_stack: string[]
    category: string
  }
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50"
    >
      <div className="relative aspect-video overflow-hidden">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            No Preview
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-all translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          {project.live_url && (
            <Link
              href={project.live_url}
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
          {project.github_url && (
            <Link
              href={project.github_url}
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
            {project.category}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="rounded-md bg-accent px-2 py-1 text-[10px] font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
