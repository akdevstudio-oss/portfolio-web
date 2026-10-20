"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  Search,
  Filter,
  RefreshCw,
  Play,
  Square,
  Eye,
  Terminal,
  ShieldCheck,
  Cpu,
  Globe,
  Clock,
  Download,
  X,
  CheckCircle2,
  AlertTriangle,
  Server,
  HardDrive
} from "lucide-react"
import { toast } from "sonner"

// Mock Cloud Browser Sessions
const INITIAL_SESSIONS = [
  {
    id: "tf_sess_9a87f12",
    agentName: "E-Commerce Price Scraper Agent",
    domain: "shop.amazon.com",
    url: "https://shop.amazon.com/dp/B0CX2318",
    status: "running",
    proxyRegion: "US-East (Virginia)",
    engine: "Chromium v124",
    duration: "45s",
    cpuUsage: "18%",
    ramUsage: "480 MB",
    fps: 30,
    stealth: true,
    logs: [
      "[0.01s] Container instance spawned in us-east-1a",
      "[0.12s] CDP WebSocket connected",
      "[0.38s] Page loaded (DOM Ready in 210ms)",
      "[0.80s] AI Agent clicking element '.buybox-button'",
      "[1.20s] Extracting buy box price: $149.99"
    ]
  },
  {
    id: "tf_sess_88b20c1",
    agentName: "Cloudflare Turnstile Solver",
    domain: "protected-portal.net",
    url: "https://protected-portal.net/login",
    status: "running",
    proxyRegion: "EU-Central (Frankfurt)",
    engine: "Chromium v124",
    duration: "1m 12s",
    cpuUsage: "32%",
    ramUsage: "620 MB",
    fps: 60,
    stealth: true,
    logs: [
      "[0.01s] Spawning residential IP proxy context",
      "[0.25s] Detected Turnstile iframe",
      "[0.60s] Solved anti-bot challenge automatically"
    ]
  },
  {
    id: "tf_sess_77a11d9",
    agentName: "SaaS Visual QA Regression Monitor",
    domain: "app.stripe.com",
    url: "https://app.stripe.com/dashboard",
    status: "completed",
    proxyRegion: "US-West (Oregon)",
    engine: "Firefox v125",
    duration: "28s",
    cpuUsage: "0%",
    ramUsage: "0 MB",
    fps: 0,
    stealth: false,
    logs: [
      "[0.01s] Context initialized",
      "[0.15s] Captured DOM layout snapshot",
      "[0.28s] No visual regressions found. Task done."
    ]
  },
  {
    id: "tf_sess_66c44a2",
    agentName: "HackerNews Headlines Scraper",
    domain: "news.ycombinator.com",
    url: "https://news.ycombinator.com",
    status: "completed",
    proxyRegion: "AP-South (Tokyo)",
    engine: "WebKit v17.4",
    duration: "14s",
    cpuUsage: "0%",
    ramUsage: "0 MB",
    fps: 0,
    stealth: false,
    logs: [
      "[0.01s] WebKit session launched",
      "[0.10s] Scraped top 30 stories as JSON payload"
    ]
  },
  {
    id: "tf_sess_55f99e3",
    agentName: "Crypto Ticker Feed Monitor",
    domain: "binance.com",
    url: "https://binance.com/en/trade/BTC_USDT",
    status: "failed",
    proxyRegion: "EU-West (London)",
    engine: "Chromium v124",
    duration: "2m 04s",
    cpuUsage: "0%",
    ramUsage: "0 MB",
    fps: 0,
    stealth: true,
    logs: [
      "[0.01s] Connected to proxy",
      "[1.20s] Timeout waiting for element '.trade-book'",
      "[2.04s] Session terminated with ERROR_TIMEOUT"
    ]
  }
]

export default function SessionsPage() {
  const [sessions, setSessions] = React.useState(INITIAL_SESSIONS)
  const [statusFilter, setStatusFilter] = React.useState<"all" | "running" | "completed" | "failed">("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSessionModal, setSelectedSessionModal] = React.useState<typeof INITIAL_SESSIONS[0] | null>(null)

  // Filtered Sessions
  const filteredSessions = sessions.filter(session => {
    const matchesStatus = statusFilter === "all" || session.status === statusFilter
    const matchesSearch = session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          session.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          session.domain.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Terminate Session
  const handleTerminateSession = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: "completed", cpuUsage: "0%", ramUsage: "0 MB" } : s))
    toast.success(`Terminated session: ${id}`)
    if (selectedSessionModal?.id === id) {
      setSelectedSessionModal(null)
    }
  }

  // Refresh
  const handleRefresh = () => {
    toast.info("Refreshed active browser session fleet status.")
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-mono font-semibold text-cyan-400 border border-cyan-800/60">
              Session Fleet Dashboard
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              100% Uptime
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Real-Time Cloud Browser Session Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Inspect live streaming cloud browser instances, CDP event logs, bandwidth usage, and session recordings.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-mono text-slate-200 hover:border-slate-700 hover:bg-slate-800 transition-colors shrink-0"
        >
          <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
          Refresh Fleet
        </button>
      </div>

      {/* Fleet Metric Banner Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Active Sessions</span>
            <Activity className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {sessions.filter(s => s.status === "running").length}
          </div>
          <div className="text-[10px] text-cyan-400 font-mono">2 Container Clusters Active</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Completed Today</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">12,840</div>
          <div className="text-[10px] text-emerald-400 font-mono">+18% vs yesterday</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Fleet CPU Load</span>
            <Cpu className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">28.4%</div>
          <div className="text-[10px] text-indigo-400 font-mono">32 Node Instances</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Anti-Bot Bypass Rate</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">99.8%</div>
          <div className="text-[10px] text-emerald-400 font-mono">Stealth Proxies OK</div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by session ID, domain or agent..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-9 pr-3 py-2 text-xs font-mono text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono text-xs w-full sm:w-auto overflow-x-auto">
          {(["all", "running", "completed", "failed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition-colors capitalize whitespace-nowrap ${
                statusFilter === status
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <motion.div
            key={session.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">

              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                    {session.id}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1.5">{session.agentName}</h3>
                </div>

                {/* Status Badge */}
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                    session.status === "running"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                      : session.status === "completed"
                      ? "bg-indigo-950 text-indigo-300 border border-indigo-800/50"
                      : "bg-rose-950 text-rose-400 border border-rose-800/50"
                  }`}
                >
                  {session.status === "running" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />}
                  {session.status}
                </span>
              </div>

              {/* Domain & Proxy Details */}
              <div className="space-y-1.5 font-mono text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Domain:</span>
                  <span className="text-slate-200 font-bold">{session.domain}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Proxy Region:</span>
                  <span className="text-cyan-300">{session.proxyRegion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Engine:</span>
                  <span>{session.engine}</span>
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
                <div className="rounded-lg border border-slate-800/60 bg-slate-950 p-1.5">
                  <div className="text-slate-500 text-[9px]">DURATION</div>
                  <div className="text-white font-bold">{session.duration}</div>
                </div>
                <div className="rounded-lg border border-slate-800/60 bg-slate-950 p-1.5">
                  <div className="text-slate-500 text-[9px]">CPU</div>
                  <div className="text-indigo-300 font-bold">{session.cpuUsage}</div>
                </div>
                <div className="rounded-lg border border-slate-800/60 bg-slate-950 p-1.5">
                  <div className="text-slate-500 text-[9px]">RAM</div>
                  <div className="text-cyan-300 font-bold">{session.ramUsage}</div>
                </div>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedSessionModal(session)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 py-2 text-xs font-mono text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-900 transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                Watch Stream
              </button>

              {session.status === "running" && (
                <button
                  onClick={() => handleTerminateSession(session.id)}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-rose-800/60 bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                  title="Terminate Session"
                >
                  <Square className="h-3.5 w-3.5 fill-rose-400" />
                </button>
              )}
            </div>

          </motion.div>
        ))}
      </div>

      {/* Detailed Session Stream Modal */}
      <AnimatePresence>
        {selectedSessionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedSessionModal.agentName}</h3>
                    <p className="text-xs font-mono text-slate-400">{selectedSessionModal.id} • {selectedSessionModal.domain}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedSessionModal(null)}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Virtual Screencast Display */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col items-center justify-center text-center relative min-h-[220px]">
                <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  CDP WebSocket Live Stream
                </div>

                <div className="space-y-2">
                  <Globe className="h-10 w-10 text-cyan-400 mx-auto animate-pulse" />
                  <p className="text-xs font-mono text-slate-300 font-bold">{selectedSessionModal.url}</p>
                  <p className="text-[11px] font-mono text-slate-400">
                    Stealth Anti-Bot Fingerprint spoofing active ({selectedSessionModal.proxyRegion})
                  </p>
                </div>
              </div>

              {/* Logs Stream */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-1 text-slate-300">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-1 mb-1 border-b border-slate-800">
                  Live CDP Event Logs
                </div>
                {selectedSessionModal.logs.map((log, idx) => (
                  <div key={idx} className="text-cyan-300">{log}</div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-slate-400">
                  Engine: <strong className="text-white">{selectedSessionModal.engine}</strong>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      toast.success("Downloaded Session CDP Log HAR file!")
                    }}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5 text-cyan-400" />
                    Download HAR
                  </button>
                  <button
                    onClick={() => setSelectedSessionModal(null)}
                    className="rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                  >
                    Close Inspector
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
