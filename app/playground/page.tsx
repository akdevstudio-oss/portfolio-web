"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Play,
  Terminal,
  Globe,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  Activity,
  Layers,
  Shield,
  Clock,
  Laptop,
  Smartphone,
  MousePointerClick
} from "lucide-react"
import { toast } from "sonner"

// Quick Preset Prompts
const QUICK_PRESETS = [
  {
    label: "🛒 E-Commerce Price Extractor",
    url: "https://shop.nexus-tech.io/item/9921",
    prompt: "Extract product title, price, discount percentage, and seller rating as clean JSON."
  },
  {
    label: "📰 News Headlines Scraper",
    url: "https://news.ycombinator.com",
    prompt: "Scan top 5 stories on Hacker News, extract title, link URL, author username, and points."
  },
  {
    label: "🔐 Cloudflare Stealth Bypass",
    url: "https://protected-data.io/login",
    prompt: "Handle Cloudflare Turnstile challenge, fill form with test credentials, and snapshot DOM."
  },
  {
    label: "📊 Performance & Vitals Audit",
    url: "https://stripe.com",
    prompt: "Measure DOM loading time, check console error logs, and record network waterfall."
  }
]

export default function PlaygroundPage() {
  const [url, setUrl] = React.useState("https://shop.nexus-tech.io/item/9921")
  const [prompt, setPrompt] = React.useState("Extract product title, price, discount percentage, and seller rating as clean JSON.")
  const [browserEngine, setBrowserEngine] = React.useState<"chromium" | "firefox" | "webkit">("chromium")
  const [stealthMode, setStealthMode] = React.useState(true)
  const [autoCaptcha, setAutoCaptcha] = React.useState(true)
  const [proxyLocation, setProxyLocation] = React.useState("us-east")
  const [viewport, setViewport] = React.useState<"desktop" | "mobile">("desktop")

  const [isRunning, setIsRunning] = React.useState(false)
  const [activeStepIndex, setActiveStepIndex] = React.useState(0)
  const [activeInspectorTab, setActiveInspectorTab] = React.useState<"steps" | "logs" | "json" | "dom">("steps")
  const [copiedJson, setCopiedJson] = React.useState(false)

  // Simulated Execution Steps State
  const [executionSteps, setExecutionSteps] = React.useState<Array<{
    time: string;
    thought: string;
    action: string;
    selector?: string;
    status: "pending" | "running" | "completed";
  }>>([
    { time: "0.01s", thought: "Initializing cloud container in us-east datacenter...", action: "Launch Browser", status: "completed" },
    { time: "0.18s", thought: "Connecting over CDP WebSocket & injecting stealth fingerprints...", action: "Connect CDP", status: "completed" },
    { time: "0.45s", thought: "Loading target page DOM and waiting for network idle...", action: "Navigate", selector: url, status: "completed" },
    { time: "0.89s", thought: "AI Vision Agent scanning DOM nodes to match query...", action: "Locate Elements", selector: "h1.product-title, .price-tag", status: "completed" },
    { time: "1.30s", thought: "Extracted target values & structured data...", action: "Extract Data", status: "completed" }
  ])

  // Simulated Output JSON
  const extractedOutput = {
    url_target: url,
    timestamp: new Date().toISOString(),
    extracted_data: {
      title: "Nexus Pro Wireless AI Noise-Cancelling Headphones",
      price_usd: 149.99,
      original_price: 199.99,
      discount: "25% OFF",
      in_stock: true,
      stock_units: 42,
      seller_rating: 4.85,
      seller_name: "Nexus Direct Store",
      shipping: "Free Next-Day"
    },
    performance_metrics: {
      dom_load_ms: 320,
      total_network_requests: 18,
      stealth_bypass_status: "SUCCESS"
    }
  }

  // Handle Preset Click
  const handleApplyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setUrl(preset.url)
    setPrompt(preset.prompt)
    toast.info(`Applied preset: ${preset.label}`)
  }

  // Handle Trigger Automation Run
  const handleRunAutomation = () => {
    setIsRunning(true)
    setActiveStepIndex(0)
    toast.success("Triggered cloud browser automation task!")

    setExecutionSteps([
      { time: "0.01s", thought: `Spinning up isolated ${browserEngine} container (${proxyLocation})...`, action: "Launch Browser", status: "running" },
      { time: "0.20s", thought: stealthMode ? "Applying anti-fingerprinting stealth spoofing & WebGL mocks..." : "Standard CDP connection...", action: "Connect CDP", status: "pending" },
      { time: "0.55s", thought: `Navigating to ${url}...`, action: "Navigate", selector: url, status: "pending" },
      { time: "1.10s", thought: `AI Agent analyzing prompt: "${prompt}"...`, action: "AI Reasoning", status: "pending" },
      { time: "1.65s", thought: "Locating matching selectors and extracting structured payload...", action: "Extract Data", status: "pending" }
    ])

    // Progress timer
    let step = 0
    const interval = setInterval(() => {
      step++
      setActiveStepIndex(step)
      setExecutionSteps(prev => prev.map((s, idx) => ({
        ...s,
        status: idx < step ? "completed" : idx === step ? "running" : "pending"
      })))

      if (step >= 4) {
        clearInterval(interval)
        setIsRunning(false)
        toast.success("AI Browser Task completed successfully!")
      }
    }, 500)
  }

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(extractedOutput, null, 2))
    setCopiedJson(true)
    setTimeout(() => setCopiedJson(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl space-y-6">

      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-mono font-semibold text-cyan-400 border border-cyan-800/60">
              Interactive Sandbox
            </span>
            <span className="text-xs text-slate-400 font-mono">1,000 Credits Remaining</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            TinyFish AI Cloud Browser Playground
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Test natural language AI web automation, inspect live CDP telemetry, and view extracted data in real time.
          </p>
        </div>

        {/* Preset Quick Actions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {QUICK_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(preset)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all whitespace-nowrap"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Runner Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-xl">

        {/* Top Inputs Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Target URL */}
          <div className="lg:col-span-5 space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-cyan-400" />
              Target Website URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs font-mono text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* AI Task Prompt */}
          <div className="lg:col-span-7 space-y-1.5">
            <label className="text-xs font-mono font-medium text-slate-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              AI Automation Task Prompt
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What should the AI browser agent do?"
                className="w-full rounded-xl border border-cyan-800/50 bg-slate-950 px-3.5 py-2.5 text-xs font-mono text-cyan-200 focus:border-cyan-400 focus:outline-none"
              />
              <button
                onClick={handleRunAutomation}
                disabled={isRunning}
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 disabled:opacity-50 transition-all shrink-0"
              >
                {isRunning ? (
                  <>
                    <Activity className="h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 fill-slate-950" />
                    Run Task
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Configuration Drawer */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono text-slate-400">

          {/* Engine */}
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5">
            <span>Engine:</span>
            <select
              value={browserEngine}
              onChange={(e) => setBrowserEngine(e.target.value as any)}
              className="bg-transparent text-cyan-400 focus:outline-none capitalize font-bold"
            >
              <option value="chromium" className="bg-slate-900 text-white">Chromium</option>
              <option value="firefox" className="bg-slate-900 text-white">Firefox</option>
              <option value="webkit" className="bg-slate-900 text-white">WebKit</option>
            </select>
          </div>

          {/* Stealth Mode */}
          <button
            onClick={() => setStealthMode(!stealthMode)}
            className={`flex items-center justify-between rounded-lg border px-3 py-1.5 transition-colors ${
              stealthMode
                ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-400"
                : "border-slate-800 bg-slate-950 text-slate-400"
            }`}
          >
            <span>Stealth Mode:</span>
            <span className="font-bold">{stealthMode ? "ENABLED" : "OFF"}</span>
          </button>

          {/* Captcha Solver */}
          <button
            onClick={() => setAutoCaptcha(!autoCaptcha)}
            className={`flex items-center justify-between rounded-lg border px-3 py-1.5 transition-colors ${
              autoCaptcha
                ? "border-cyan-500/40 bg-cyan-950/40 text-cyan-400"
                : "border-slate-800 bg-slate-950 text-slate-400"
            }`}
          >
            <span>Auto Captcha:</span>
            <span className="font-bold">{autoCaptcha ? "AUTO SOLVE" : "OFF"}</span>
          </button>

          {/* Proxy Region */}
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5">
            <span>Proxy Region:</span>
            <select
              value={proxyLocation}
              onChange={(e) => setProxyLocation(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none uppercase font-bold"
            >
              <option value="us-east" className="bg-slate-900 text-white">US-East</option>
              <option value="us-west" className="bg-slate-900 text-white">US-West</option>
              <option value="eu-frankfurt" className="bg-slate-900 text-white">EU-DE</option>
              <option value="ap-tokyo" className="bg-slate-900 text-white">AP-JP</option>
            </select>
          </div>

          {/* Viewport */}
          <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5">
            <span>Viewport:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewport("desktop")}
                className={`p-1 rounded ${viewport === "desktop" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-500"}`}
              >
                <Laptop className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`p-1 rounded ${viewport === "mobile" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-500"}`}
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side: Live Cloud Screen Streaming Sandbox */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden flex flex-col justify-between min-h-[480px]">

          {/* Screen Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>LIVE VIRTUAL SCREEN</span>
              <span className="text-slate-500">• {viewport === "desktop" ? "1920x1080" : "390x844"}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <Shield className="h-3 w-3" />
                Residential IP Active
              </span>
            </div>
          </div>

          {/* Virtual Display Frame */}
          <div className="p-6 bg-slate-950/90 flex-1 flex flex-col items-center justify-center relative overflow-hidden">

            {/* Target Highlight Overlay */}
            <div className="w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-900/90 p-5 space-y-4 shadow-2xl relative">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-cyan-300 font-bold">Target DOM Element Selected</span>
                <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800/40">200 OK</span>
              </div>

              {/* DOM Target Box */}
              <div className="space-y-2 font-mono text-xs">
                <div className="text-slate-400 text-[10px]">HTML Node: &lt;div class="product-card"&gt;</div>
                <div className="p-3 rounded-xl border border-cyan-500/50 bg-cyan-950/30 text-cyan-200 flex items-center justify-between">
                  <span className="font-bold text-white">Nexus Pro Wireless AI Headphones</span>
                  <span className="text-emerald-400 font-extrabold text-sm">$149.99</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Rating: ⭐ 4.85 (1,240 reviews)</span>
                  <span className="text-cyan-400">In Stock: 42</span>
                </div>
              </div>

              {/* Cursor Overlay */}
              <motion.div
                animate={{
                  x: [0, 20, -10, 0],
                  y: [0, -15, 10, 0]
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-1/3 right-10 pointer-events-none flex items-center gap-1 rounded-full bg-cyan-500 px-2.5 py-1 text-[10px] font-bold text-slate-950 shadow-lg shadow-cyan-500/50"
              >
                <MousePointerClick className="h-3 w-3 fill-slate-950" />
                <span>AI Click</span>
              </motion.div>
            </div>

          </div>

          {/* Screen Bottom Telemetry */}
          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-4 py-2 text-[11px] font-mono text-slate-400">
            <span>CDP Session: tf_sess_playground_9a87</span>
            <span>Frames Transmitted: 1,420 | Bitrate: 4.2 Mbps</span>
          </div>

        </div>

        {/* Right Side: Multi-Tab Inspector */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 flex flex-col justify-between min-h-[480px]">

          <div>
            {/* Inspector Tab Bar */}
            <div className="flex items-center border-b border-slate-800 bg-slate-950 px-3 pt-2 gap-1 font-mono text-xs overflow-x-auto">
              {[
                { id: "steps", label: "Steps & AI Thoughts", icon: Activity },
                { id: "logs", label: "CDP & Logs", icon: Terminal },
                { id: "json", label: "Extracted JSON", icon: Code2 },
                { id: "dom", label: "DOM Tree", icon: Layers }
              ].map((tab) => {
                const isActive = activeInspectorTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveInspectorTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "border-cyan-400 text-cyan-300 bg-slate-900/80"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <tab.icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Inspector Tab Content */}
            <div className="p-4 font-mono text-xs">

              {/* Steps Tab */}
              {activeInspectorTab === "steps" && (
                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800 flex justify-between">
                    <span>Execution Sequence</span>
                    <span className="text-cyan-400">{executionSteps.length} Steps</span>
                  </div>

                  <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                    {executionSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border transition-all ${
                          step.status === "running"
                            ? "border-cyan-500/50 bg-cyan-950/30 text-cyan-200"
                            : step.status === "completed"
                            ? "border-slate-800/80 bg-slate-950 text-slate-300"
                            : "border-slate-800/40 bg-slate-950/40 text-slate-500"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="flex items-center gap-1.5 text-cyan-400">
                            {step.status === "completed" ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            ) : step.status === "running" ? (
                              <Activity className="h-3.5 w-3.5 animate-spin text-cyan-400" />
                            ) : (
                              <Clock className="h-3.5 w-3.5 text-slate-600" />
                            )}
                            Step {idx + 1}: {step.action}
                          </span>
                          <span className="text-slate-500">{step.time}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-400 leading-relaxed font-sans">
                          {step.thought}
                        </p>
                        {step.selector && (
                          <div className="mt-1.5 text-[10px] text-cyan-300/80 bg-slate-900 px-2 py-0.5 rounded inline-block">
                            Selector: {step.selector}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Logs Tab */}
              {activeInspectorTab === "logs" && (
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="text-slate-500">[0.00s] POST /v1/browser/launch HTTP/1.1 200 OK</div>
                  <div className="text-slate-400">[0.02s] CDP WebSocket session created: wss://cloud.tinyfish.io/v1/cdp</div>
                  <div className="text-emerald-400">[0.15s] Anti-bot stealth parameters applied successfully</div>
                  <div className="text-cyan-300">[0.42s] DOMContentLoaded event fired in 320ms</div>
                  <div className="text-slate-400">[0.60s] Network request: GET /item/9921 (200 OK - 12KB)</div>
                  <div className="text-slate-400">[0.85s] Console: [info] Analytics script loaded</div>
                  <div className="text-amber-300">[1.10s] AI Vision Agent located target node: div.product-card</div>
                  <div className="text-emerald-400 font-bold">[1.35s] Task finished successfully</div>
                </div>
              )}

              {/* JSON Tab */}
              {activeInspectorTab === "json" && (
                <div className="relative font-mono text-[11px]">
                  <button
                    onClick={copyJson}
                    className="absolute top-0 right-0 flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[10px] text-slate-300 hover:text-white"
                  >
                    {copiedJson ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    {copiedJson ? "Copied" : "Copy"}
                  </button>
                  <pre className="text-cyan-300 bg-slate-950 p-3 rounded-xl border border-slate-800 max-h-[320px] overflow-auto">
                    {JSON.stringify(extractedOutput, null, 2)}
                  </pre>
                </div>
              )}

              {/* DOM Tree Tab */}
              {activeInspectorTab === "dom" && (
                <div className="space-y-1 font-mono text-[11px] text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 max-h-[320px] overflow-auto">
                  <div>&lt;html lang="en"&gt;</div>
                  <div className="pl-3 text-slate-500">&lt;head&gt; ... &lt;/head&gt;</div>
                  <div className="pl-3 text-cyan-300">&lt;body class="dark"&gt;</div>
                  <div className="pl-6 text-slate-400">&lt;div id="root"&gt;</div>
                  <div className="pl-9 text-emerald-400 bg-emerald-950/30 p-1 rounded border border-emerald-800/40">
                    &lt;div class="product-card" data-price="149.99"&gt;
                  </div>
                  <div className="pl-12 text-slate-300">&lt;h1&gt;Nexus Pro Headphones&lt;/h1&gt;</div>
                  <div className="pl-12 text-slate-300">&lt;span class="price"&gt;$149.99&lt;/span&gt;</div>
                  <div className="pl-9 text-emerald-400">&lt;/div&gt;</div>
                  <div className="pl-6 text-slate-400">&lt;/div&gt;</div>
                  <div className="pl-3 text-cyan-300">&lt;/body&gt;</div>
                  <div>&lt;html&gt;</div>
                </div>
              )}

            </div>
          </div>

          {/* Inspector Footer */}
          <div className="border-t border-slate-800 bg-slate-950 px-4 py-2.5 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Execution Duration: <strong className="text-emerald-400">1.35s</strong></span>
            <span>Total Cost: <strong className="text-cyan-400">1 Credit</strong></span>
          </div>

        </div>

      </div>

    </div>
  )
}
