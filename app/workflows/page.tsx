"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Zap,
  Plus,
  Clock,
  Globe,
  Bell,
  Sparkles,
  CheckCircle2,
  Trash2,
  Play,
  Pause,
  X,
  Send,
  Sliders,
  Check
} from "lucide-react"
import { toast } from "sonner"

// Mock Workflows
const INITIAL_WORKFLOWS = [
  {
    id: "wf_01",
    name: "Amazon E-Commerce Price Audit",
    url: "https://shop.amazon.com/dp/B0CX2318",
    prompt: "Extract buy box price. If price drops below $150, trigger Slack webhook alert.",
    frequency: "Every 15 minutes",
    status: "active",
    lastRun: "8 minutes ago",
    alertTarget: "Slack #price-alerts"
  },
  {
    id: "wf_02",
    name: "Landing Page Visual Bug Detector",
    url: "https://stripe.com",
    prompt: "Take full-page screenshot and audit DOM layout shifts and console errors.",
    frequency: "Every 1 hour",
    status: "active",
    lastRun: "24 minutes ago",
    alertTarget: "Webhook https://api.myapp.com/hooks"
  },
  {
    id: "wf_03",
    name: "HackerNews Daily AI Headlines Digest",
    url: "https://news.ycombinator.com",
    prompt: "Scan front page for stories mentioning 'AI' or 'LLM', summarize top 5 stories.",
    frequency: "Daily at 08:00 AM",
    status: "paused",
    lastRun: "Yesterday",
    alertTarget: "Email digest@company.com"
  }
]

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = React.useState(INITIAL_WORKFLOWS)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  // Form State
  const [name, setName] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [prompt, setPrompt] = React.useState("")
  const [frequency, setFrequency] = React.useState("Every 15 minutes")
  const [alertTarget, setAlertTarget] = React.useState("")

  // Toggle Active/Pause
  const handleToggleStatus = (id: string) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id === id) {
        const newStatus = w.status === "active" ? "paused" : "active"
        toast.info(`Workflow ${w.name} is now ${newStatus}`)
        return { ...w, status: newStatus }
      }
      return w
    }))
  }

  // Delete Workflow
  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== id))
    toast.success("Deleted automated web monitor workflow.")
  }

  // Create Workflow
  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !url || !prompt) {
      toast.error("Please fill in all required workflow fields.")
      return
    }

    const newWf = {
      id: `wf_${Date.now().toString().slice(-4)}`,
      name,
      url,
      prompt,
      frequency,
      status: "active",
      lastRun: "Just now",
      alertTarget: alertTarget || "Slack Webhook Channel"
    }

    setWorkflows([newWf, ...workflows])
    toast.success(`Created workflow: ${name}`)
    setIsModalOpen(false)

    // Reset
    setName("")
    setUrl("")
    setPrompt("")
    setAlertTarget("")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-mono font-semibold text-cyan-400 border border-cyan-800/60">
              Automated Monitors
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {workflows.filter(w => w.status === "active").length} Active Jobs
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Automated Web Browser Workflows
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Schedule recurring AI browser agents to monitor price drops, website availability, and layout changes 24/7.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-all shrink-0"
        >
          <Plus className="h-4 w-4" />
          Create Workflow
        </button>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {wf.name}
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase ${
                        wf.status === "active"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {wf.status}
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 truncate mt-0.5">{wf.url}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-950 text-xs font-mono text-slate-300 flex items-start gap-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{wf.prompt}</span>
              </div>
            </div>

            {/* Workflow Details */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-slate-400 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{wf.frequency}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Bell className="h-3.5 w-3.5 text-indigo-400" />
                  <span>{wf.alertTarget}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => handleToggleStatus(wf.id)}
                  className={`p-2 rounded-xl border transition-colors ${
                    wf.status === "active"
                      ? "border-amber-800/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60"
                      : "border-emerald-800/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60"
                  }`}
                  title={wf.status === "active" ? "Pause Workflow" : "Activate Workflow"}
                >
                  {wf.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>

                <button
                  onClick={() => handleDeleteWorkflow(wf.id)}
                  className="p-2 rounded-xl border border-rose-800/50 bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                  title="Delete Workflow"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Create Workflow Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Zap className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Create Automated Web Monitor</h3>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateWorkflow} className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold">Workflow Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Price Tracker - iPhone 16 Pro"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold">Target Website URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/product"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-bold">AI Automation Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Extract product price. If price is lower than $999, send alert."
                    rows={3}
                    className="w-full rounded-xl border border-cyan-800/50 bg-slate-950 px-3.5 py-2.5 text-cyan-200 focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold">Frequency</label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="Every 15 minutes">Every 15 minutes</option>
                      <option value="Every 30 minutes">Every 30 minutes</option>
                      <option value="Every 1 hour">Every 1 hour</option>
                      <option value="Daily at 08:00 AM">Daily at 08:00 AM</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-bold">Alert Target</label>
                    <input
                      type="text"
                      value={alertTarget}
                      onChange={(e) => setAlertTarget(e.target.value)}
                      placeholder="e.g. Slack Webhook / Email"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-slate-200 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-500 px-5 py-2.5 text-slate-950 font-bold hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
                  >
                    Save & Activate
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
