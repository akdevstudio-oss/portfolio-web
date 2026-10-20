"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play,
  Terminal,
  Activity,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Code2,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Search,
  Eye,
  Layers,
  BarChart3,
  RefreshCw,
  Lock,
  MousePointerClick
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Simulation Presets
const DEMO_PRESETS = [
  {
    id: "ecommerce",
    title: "E-Commerce Price Extraction",
    url: "https://shop.nexus-store.io/tech/headphones",
    prompt: "Find 'Noise Cancelling AI Headphones', extract current price, check stock availability, and snapshot product image.",
    steps: [
      { time: "0.02s", msg: "Allocating Chromium instance in us-east (ID: tf_c8f2)", status: "info" },
      { time: "0.15s", msg: "Connected via CDP WebSocket (Viewport: 1920x1080)", status: "info font-mono" },
      { time: "0.42s", msg: "Navigated to target URL (HTTP 200 - 1.2s DOM load)", status: "success" },
      { time: "0.80s", msg: "AI Vision Agent located search element '#search-input'", status: "action" },
      { time: "1.10s", msg: "Simulated realistic typing: 'Noise Cancelling AI Headphones'", status: "action" },
      { time: "1.45s", msg: "Clicked search button -> Page updated dynamically", status: "action" },
      { time: "1.90s", msg: "Extracted DOM node [data-price] -> '$149.99' (In Stock)", status: "extracted" },
      { time: "2.30s", msg: "Generated full-page PNG screenshot & JSON payload", status: "completed" }
    ],
    output: {
      product: "Noise Cancelling AI Headphones",
      price: "$149.99",
      currency: "USD",
      in_stock: true,
      stock_count: 42,
      seller: "Nexus Tech Direct",
      extracted_at: "2025-05-18T14:32:01.002Z"
    }
  },
  {
    id: "antibot",
    title: "Cloudflare & Captcha Bypass",
    url: "https://portal.secure-data.net/login",
    prompt: "Bypass JavaScript challenge, handle Turnstile verification, and inspect target DOM.",
    steps: [
      { time: "0.01s", msg: "Spawning stealth Chromium session with rotated residential proxy (US-West)", status: "info" },
      { time: "0.22s", msg: "Spoofed WebGL fingerprints & TLS canvas signatures", status: "info" },
      { time: "0.65s", msg: "Detected Turnstile Challenge iframe on page", status: "action" },
      { time: "1.10s", msg: "AI Captcha solver engaged -> Solved in 450ms without prompt", status: "success" },
      { time: "1.70s", msg: "Passed Cloudflare verification clearance token stored", status: "success" },
      { time: "2.10s", msg: "Target DOM unlocked. Rendered dashboard successfully", status: "completed" }
    ],
    output: {
      status: "BYPASSED",
      clearance_token: "cf_clearance=9a8bf721c0ae_secure",
      challenge_type: "Turnstile",
      solve_time_ms: 450,
      ip_origin: "192.241.201.44 (US Residential)"
    }
  },
  {
    id: "monitoring",
    title: "Continuous Web Monitor Audit",
    url: "https://app.saas-metrics.com/dashboard",
    prompt: "Log in with test session token, check API health status badge, and alert if latency > 100ms.",
    steps: [
      { time: "0.02s", msg: "Loaded session cookie state into cloud browser context", status: "info" },
      { time: "0.30s", msg: "DOM snapshot captured -> Checking element '.status-indicator'", status: "action" },
      { time: "0.75s", msg: "Recorded network waterfall (42 requests, total 320KB)", status: "info" },
      { time: "1.20s", msg: "Latency metric measured: 38ms (Healthy threshold <100ms)", status: "success" },
      { time: "1.50s", msg: "Web audit completed -> No layout shifts or console errors detected", status: "completed" }
    ],
    output: {
      health: "OPERATIONAL",
      latency_ms: 38,
      dom_errors: 0,
      layout_shifts: 0.00,
      network_status: "200 OK"
    }
  }
]

// Code Snippets
const CODE_SNIPPETS = {
  python: `from tinyfish import TinyFishBrowser

# Initialize cloud browser with AI automation engine
client = TinyFishBrowser(api_key="tf_live_9a87f...")

# Launch stealth cloud session
async with client.launch(
    engine="chromium",
    stealth=True,
    proxy_country="US"
) as browser:
    page = await browser.new_page()
    await page.goto("https://news.ycombinator.com")

    # Execute natural language AI action
    result = await page.ai_execute(
        prompt="Extract top 5 news titles, URLs, and upvote counts as JSON"
    )

    print(result.extracted_data)`,

  playwright: `import { chromium } from '@tinyfish/sdk';

// Connect Playwright to TinyFish cloud browser fleet
const browser = await chromium.connectOverCDP(
  'wss://cloud.tinyfish.io/v1/cdp?api_key=tf_live_9a87f&stealth=true'
);

const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://app.datadoghq.com');

// Stream live browser frame to your agent or frontend
const liveStreamUrl = page.getLiveStreamUrl();
console.log('Watching live session at:', liveStreamUrl);`,

  rest: `curl -X POST https://api.tinyfish.io/v1/agent/execute \\
  -H "Authorization: Bearer tf_live_9a87f..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://amazon.com/dp/B0CX2318",
    "prompt": "Extract buy box price, prime badge status, and seller name",
    "stealth": true,
    "solve_captcha": true,
    "format": "json"
  }'`
}

export default function Home() {
  const [selectedPreset, setSelectedPreset] = React.useState(DEMO_PRESETS[0])
  const [isSimulating, setIsSimulating] = React.useState(false)
  const [simulationStepIndex, setSimulationStepIndex] = React.useState(selectedPreset.steps.length)
  const [activeCodeTab, setActiveCodeTab] = React.useState<"python" | "playwright" | "rest">("python")
  const [copiedCode, setCopiedCode] = React.useState(false)

  // Handle Preset Change
  const handleSelectPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setSelectedPreset(preset)
    setIsSimulating(true)
    setSimulationStepIndex(1)
  }

  // Simulation Step Progress
  React.useEffect(() => {
    if (isSimulating && simulationStepIndex < selectedPreset.steps.length) {
      const timer = setTimeout(() => {
        setSimulationStepIndex((prev) => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    } else if (simulationStepIndex >= selectedPreset.steps.length) {
      setIsSimulating(false)
    }
  }, [isSimulating, simulationStepIndex, selectedPreset])

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab])
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">

          {/* Top Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Introducing <strong>TinyFish Vision Agent 2.0</strong> — Native Playwright CDP Stream</span>
              <ArrowRight className="h-3 w-3 text-cyan-400" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-center space-y-6"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-white">
              Give AI Agents <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Eyes & Hands
              </span> in the Browser
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              Cloud browser infrastructure built for AI agents and web automation. Monitor real-time DOM streams, execute natural language actions, bypass anti-bots, and extract structured web data at scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/playground"
                className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-400 hover:scale-105"
              >
                <Play className="h-4 w-4 fill-slate-950" />
                Launch Live Sandbox
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/sessions"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-700 hover:bg-slate-800"
              >
                <Activity className="h-4 w-4 text-cyan-400" />
                Session Monitor
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-6 py-3.5 text-sm font-semibold text-slate-400 transition-colors hover:text-white hover:border-slate-700"
              >
                <Terminal className="h-4 w-4" />
                API Reference
              </Link>
            </div>
          </motion.div>

          {/* Interactive Live Browser Automation Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl overflow-hidden"
          >
            {/* Window Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
                  TinyFish Cloud Sandbox — Instance #tf_runner_09
                </span>
              </div>

              {/* Preset Selector Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-all whitespace-nowrap ${
                      selectedPreset.id === preset.id
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                        : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Address Bar & AI Prompt */}
            <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-800 bg-slate-900/60 p-3 gap-3 items-center text-xs font-mono">
              <div className="md:col-span-5 flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-300">
                <Globe className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{selectedPreset.url}</span>
              </div>
              <div className="md:col-span-7 flex items-center gap-2 rounded-lg border border-cyan-800/40 bg-cyan-950/30 px-3 py-1.5 text-cyan-200">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0 animate-pulse" />
                <span className="truncate"><strong>AI Prompt:</strong> "{selectedPreset.prompt}"</span>
              </div>
            </div>

            {/* Split Screen: Live Virtual Screen View & Real-Time Terminal Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">

              {/* Virtual Screen Simulation */}
              <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 bg-slate-950/90 relative flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span>LIVE STREAM (30 FPS)</span>
                  </div>
                  <span className="text-slate-500">1920 x 1080 • Stealth Mode On</span>
                </div>

                {/* Simulated Target Website Interface */}
                <div className="relative my-4 rounded-xl border border-slate-800 bg-slate-900/90 p-4 min-h-[220px] flex flex-col justify-center items-center text-center space-y-3">
                  <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                    <Eye className="h-3 w-3" />
                    <span>DOM Bounding Box Highlighted</span>
                  </div>

                  {/* Simulated AI Mouse Action Indicator */}
                  <motion.div
                    animate={{
                      x: [10, 40, -20, 0],
                      y: [20, -10, 15, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 z-20 pointer-events-none flex items-center gap-1.5 rounded-full bg-cyan-500 px-2 py-0.5 text-[10px] font-bold text-slate-950 shadow-lg shadow-cyan-500/50"
                  >
                    <MousePointerClick className="h-3 w-3 fill-slate-950" />
                    <span>AI Cursor</span>
                  </motion.div>

                  <div className="w-full max-w-sm space-y-2 text-left">
                    <div className="h-3 w-2/3 rounded bg-slate-800" />
                    <div className="h-8 w-full rounded-lg border border-cyan-500/50 bg-slate-950 p-2 text-xs font-mono text-cyan-300 flex items-center justify-between">
                      <span>Noise Cancelling AI Headphones</span>
                      <span className="text-emerald-400 font-bold">$149.99</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <div className="h-6 w-24 rounded bg-cyan-500/20 border border-cyan-500/40 text-[10px] text-cyan-300 flex items-center justify-center font-mono">
                        In Stock (42)
                      </div>
                      <div className="h-6 w-28 rounded bg-slate-800 text-[10px] text-slate-400 flex items-center justify-center font-mono">
                        Instant Delivery
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-slate-800/60">
                  <span className="text-slate-400">FPS: 60 | Latency: 32ms</span>
                  <span className="text-cyan-400 font-semibold">
                    {isSimulating ? "⚡ EXECUTING STEPS..." : "🟢 EXECUTION FINISHED"}
                  </span>
                </div>
              </div>

              {/* Real-Time Terminal Log Stream */}
              <div className="lg:col-span-5 p-4 bg-slate-950 flex flex-col justify-between font-mono text-xs">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Terminal className="h-3.5 w-3.5" />
                      Execution Telemetry
                    </span>
                    <span className="text-[10px] text-slate-500">CDP WebSocket Stream</span>
                  </div>

                  {/* Logs list */}
                  <div className="mt-3 space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {selectedPreset.steps.slice(0, simulationStepIndex).map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-2 text-[11px] leading-relaxed"
                      >
                        <span className="text-slate-500 shrink-0">{step.time}</span>
                        <span
                          className={
                            step.status === "success"
                              ? "text-emerald-400"
                              : step.status === "action"
                              ? "text-cyan-300"
                              : step.status === "extracted"
                              ? "text-amber-300 font-bold"
                              : step.status === "completed"
                              ? "text-indigo-300 font-bold"
                              : "text-slate-300"
                          }
                        >
                          {step.msg}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* JSON Result Preview */}
                <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/80 p-3 font-mono text-[11px] text-slate-300">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Extracted Payload JSON</span>
                    <span className="text-emerald-400 text-[9px] font-bold">VALIDATED JSON</span>
                  </div>
                  <pre className="text-cyan-300 overflow-x-auto max-h-[90px] text-[10px]">
                    {JSON.stringify(selectedPreset.output, null, 2)}
                  </pre>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* Fleet Stats Banner */}
      <section className="border-y border-slate-800 bg-slate-950/80 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">14,290+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Active Cloud Instances</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-400">32ms</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Avg CDP Stream Latency</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">120M+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Steps Executed Daily</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">99.8%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Anti-Bot Bypass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-cyan-400 font-mono">
            ENGINEERED FOR AI AGENTS
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Next-Generation Cloud Browser Infrastructure
          </p>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything your AI agents need to reliably interact with complex web pages without blocking or rate limiting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Eye,
              title: "Real-Time Browser Screencasts",
              desc: "Watch live 30 FPS screencasts of remote cloud browser instances via WebSocket & WebRTC streaming."
            },
            {
              icon: Sparkles,
              title: "Natural Language AI Actions",
              desc: "Send natural language task prompts. TinyFish Vision Agent calculates DOM targets and performs human-like clicks."
            },
            {
              icon: ShieldCheck,
              title: "Stealth & Anti-Bot Fingerprinting",
              desc: "Built-in dynamic WebGL, TLS, canvas spoofing, residential proxy rotation, and Cloudflare/Turnstile auto-solvers."
            },
            {
              icon: Terminal,
              title: "Full CDP Event Access",
              desc: "Inspect network waterfalls, request headers, cookies, console logs, and performance metrics in real-time."
            },
            {
              icon: RefreshCw,
              title: "Automated Web Monitors",
              desc: "Schedule recurring web browser tasks to monitor uptime, layout regressions, and price changes automatically."
            },
            {
              icon: Lock,
              title: "Isolated Container Sandboxes",
              desc: "Every browser session runs in an isolated, disposable container environment with automated cleanup."
            }
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 transition-all hover:border-cyan-500/40 hover:bg-slate-900"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 transition-transform group-hover:scale-110">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Code Integration Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">DEVELOPER SDKs</span>
              <h3 className="text-2xl font-bold text-white mt-1">Plug into Any AI Framework in Minutes</h3>
            </div>

            {/* Code Language Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(["python", "playwright", "rest"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors capitalize ${
                    activeCodeTab === tab
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "python" ? "Python SDK" : tab === "playwright" ? "Node / Playwright" : "REST API"}
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewbox */}
          <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs overflow-x-auto">
            <button
              onClick={copyCode}
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedCode ? "Copied" : "Copy Code"}
            </button>
            <pre className="text-slate-300 text-xs leading-relaxed pt-2">
              {CODE_SNIPPETS[activeCodeTab]}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 p-8 sm:p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to Automate & Monitor Browsers at Scale?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Get started with 1,000 free cloud browser credits today. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-all hover:scale-105"
              >
                <Play className="h-4 w-4 fill-slate-950" />
                Try Interactive Sandbox
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                View Cloud Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
