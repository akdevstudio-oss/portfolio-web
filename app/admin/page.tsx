"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Briefcase, FolderPlus, Settings, Users } from "lucide-react"

export default function AdminDashboard() {
  const [projectCount, setProjectCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      const supabase = createClient()
      const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })

      if (!error && count !== null) {
        setProjectCount(count)
      }
      setLoading(false)
    }

    fetchCounts()
  }, [])

  const stats = [
    { name: "Total Projects", value: loading ? "..." : projectCount, icon: Briefcase, color: "bg-blue-500/10 text-blue-500" },
    { name: "Active Services", value: "6", icon: Settings, color: "bg-green-500/10 text-green-500" },
    { name: "Total Clients", value: "15+", icon: Users, color: "bg-purple-500/10 text-purple-500" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">Manage your portfolio and services here.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
            <p className="mt-1 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-8">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90">
            <FolderPlus className="h-4 w-4" />
            Add New Project
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-2 text-sm font-semibold transition-all hover:bg-accent">
            <Settings className="h-4 w-4" />
            Edit Settings
          </button>
        </div>
      </div>
    </div>
  )
}
