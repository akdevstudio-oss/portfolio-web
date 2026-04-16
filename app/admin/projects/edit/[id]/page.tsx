"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase"
import { useRouter, useParams } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft, Loader2, Upload } from "lucide-react"
import Link from "next/link"

const projectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  short_description: z.string().min(10, "Short description must be at least 10 characters"),
  image_url: z.string().url("Invalid image URL").optional().or(z.literal("")),
  live_url: z.string().url("Invalid live URL").optional().or(z.literal("")),
  github_url: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  tech_stack: z.string().min(3, "Tech stack must be provided as a comma-separated list"),
  category: z.string().min(2, "Category is required"),
})

type ProjectFormValues = z.infer<typeof projectFormSchema>

export default function EditProject() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
  })

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        toast.error('Error fetching project')
        router.push('/admin/projects')
      } else if (data) {
        reset({
          title: data.title,
          short_description: data.description,
          image_url: data.image_url || "",
          live_url: data.live_url || "",
          github_url: data.github_url || "",
          tech_stack: data.tech_stack?.join(', ') || "",
          category: data.category,
        })
      }
      setFetching(false)
    }

    if (id) {
      fetchProject()
    }
  }, [id, reset, router, supabase])

  const onSubmit = async (values: ProjectFormValues) => {
    setLoading(true)
    let imageUrl = values.image_url

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { data, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        toast.error('Error uploading image')
        setLoading(false)
        return
      }
      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)
      imageUrl = publicUrl
    }

    const { error } = await supabase.from('projects').update({
      title: values.title,
      description: values.short_description,
      image_url: imageUrl,
      live_url: values.live_url,
      github_url: values.github_url,
      tech_stack: values.tech_stack.split(',').map(s => s.trim()),
      category: values.category,
    }).eq('id', id)

    if (error) {
      toast.error('Error updating project: ' + error.message)
    } else {
      toast.success('Project updated successfully')
      router.push('/admin/projects')
      router.refresh()
    }
    setLoading(false)
  }

  if (fetching) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 rounded-full hover:bg-accent transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <p className="mt-2 text-muted-foreground">Modify the details of your project.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-card p-8 shadow-xl lg:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              {...register("title")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Short Description</label>
            <textarea
              rows={3}
              {...register("short_description")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.short_description && <p className="text-xs text-destructive">{errors.short_description.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <input
              {...register("category")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tech Stack (comma separated)</label>
            <input
              {...register("tech_stack")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.tech_stack && <p className="text-xs text-destructive">{errors.tech_stack.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Live Demo URL</label>
            <input
              {...register("live_url")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.live_url && <p className="text-xs text-destructive">{errors.live_url.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub Repository URL</label>
            <input
              {...register("github_url")}
              className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {errors.github_url && <p className="text-xs text-destructive">{errors.github_url.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Image (URL or Upload)</label>
            <div className="flex gap-4">
              <input
                {...register("image_url")}
                className="flex-grow rounded-lg border border-border bg-background px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-border py-4">
              <label className="flex cursor-pointer flex-col items-center gap-2 text-sm text-muted-foreground">
                <Upload className="h-6 w-6" />
                <span>{imageFile ? imageFile.name : "Click to upload new image"}</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Project"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
