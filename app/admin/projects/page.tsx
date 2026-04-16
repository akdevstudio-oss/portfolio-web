"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import Link from "next/link"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image_url: string
  live_url: string
  github_url: string
  tech_stack: string[]
  category: string
  created_at: string
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Error fetching projects')
    } else {
      setProjects(data || [])
    }
    setLoading(false)
  }

  async function deleteProject(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return

    const supabase = createClient()
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Error deleting project')
    } else {
      toast.success('Project deleted successfully')
      fetchProjects()
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">All Projects</h1>
          <p className="mt-2 text-muted-foreground">Manage your portfolio items.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="animate-pulse">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground">No projects found. Add your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center">
              <div className="relative h-24 w-40 overflow-hidden rounded-lg bg-muted">
                {project.image_url && (
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                <div className="mt-2 flex gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary uppercase">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={project.live_url || "#"}
                  target="_blank"
                  className="p-2 text-muted-foreground hover:text-primary"
                >
                  <ExternalLink className="h-5 w-5" />
                </Link>
                <Link
                  href={`/admin/projects/edit/${project.id}`}
                  className="p-2 text-muted-foreground hover:text-blue-500"
                >
                  <Edit className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="p-2 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
