"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase"
import ProjectCard from "@/components/ProjectCard"

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  live_url: string
  github_url: string
  tech_stack: string[]
  category: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h1>
        <p className="mt-4 text-lg text-muted-foreground">A showcase of my recent work and open-source contributions.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[400px] animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-xl text-muted-foreground">No projects found. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
