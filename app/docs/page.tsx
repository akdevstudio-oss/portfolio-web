"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Terminal,
  Code2,
  Copy,
  Check,
  BookOpen,
  Zap,
  Globe,
  Lock,
  ArrowRight
} from "lucide-react"

const PYTHON_CODE = `from tinyfish import TinyFishBrowser

client = TinyFishBrowser(api_key="tf_live_9a87f...")

# Launch stealth browser and execute natural language prompt
async with client.launch(engine="chromium", stealth=True) as browser:
    page = await browser.new_page()
    await page.goto("https://news.ycombinator.com")

    data = await page.ai_execute(
        prompt="Extract top 5 story titles and points as JSON"
    )
    print(data.extracted_json)`

const PLAYWRIGHT_CODE = `import { chromium } from '@tinyfish/sdk';

const browser = await chromium.connectOverCDP(
  'wss://cloud.tinyfish.io/v1/cdp?api_key=tf_live_9a87f&stealth=true'
);

const page = await browser.newPage();
await page.goto('https://shop.nexus-tech.io');

const price = await page.evaluate(() => {
  return document.querySelector('.price-tag')?.textContent;
});
console.log('Price:', price);`

const REST_CODE = `curl -X POST https://api.tinyfish.io/v1/agent/execute \\
  -H "Authorization: Bearer tf_live_9a87f..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://amazon.com/dp/B0CX2318",
    "prompt": "Extract price and prime badge status",
    "stealth": true,
    "solve_captcha": true
  }'`

export default function DocsPage() {
  const [copiedSection, setCopiedSection] = React.useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSection(id)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl space-y-10">

      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-mono font-semibold text-cyan-400 border border-cyan-800/60">
            Developer Documentation
          </span>
          <span className="text-xs text-slate-400 font-mono">v1.4 API Reference</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          TinyFish Cloud Browser API & SDK Reference
        </h1>
        <p className="text-slate-400 text-sm">
          Integrate cloud browser automation, CDP event streaming, and AI web agents into Python, Node.js, or REST clients.
        </p>
      </div>

      {/* Quickstart SDK Installation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>Python SDK Installation</span>
            <span className="text-cyan-400">pip</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-cyan-300 flex items-center justify-between">
            <span>pip install tinyfish-ai</span>
            <button
              onClick={() => copyCode("pip install tinyfish-ai", "pip")}
              className="text-slate-400 hover:text-white"
            >
              {copiedSection === "pip" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span>Node.js / Playwright SDK</span>
            <span className="text-cyan-400">npm</span>
          </div>
          <div className="p-3 rounded-xl border border-slate-800 bg-slate-950 text-cyan-300 flex items-center justify-between">
            <span>npm install @tinyfish/sdk playwright</span>
            <button
              onClick={() => copyCode("npm install @tinyfish/sdk playwright", "npm")}
              className="text-slate-400 hover:text-white"
            >
              {copiedSection === "npm" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Code Snippets */}
      <div className="space-y-6">

        {/* Python Section */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              Python AI Browser Agent
            </h3>
            <button
              onClick={() => copyCode(PYTHON_CODE, "python")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-mono text-slate-300 hover:text-white"
            >
              {copiedSection === "python" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedSection === "python" ? "Copied" : "Copy Code"}
            </button>
          </div>
          <pre className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed">
            {PYTHON_CODE}
          </pre>
        </div>

        {/* Playwright Section */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code2 className="h-4 w-4 text-indigo-400" />
              Node.js Playwright Connect Over CDP
            </h3>
            <button
              onClick={() => copyCode(PLAYWRIGHT_CODE, "playwright")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-mono text-slate-300 hover:text-white"
            >
              {copiedSection === "playwright" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedSection === "playwright" ? "Copied" : "Copy Code"}
            </button>
          </div>
          <pre className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed">
            {PLAYWRIGHT_CODE}
          </pre>
        </div>

        {/* REST Section */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-400" />
              REST API Endpoint (`POST /v1/agent/execute`)
            </h3>
            <button
              onClick={() => copyCode(REST_CODE, "rest")}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-mono text-slate-300 hover:text-white"
            >
              {copiedSection === "rest" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedSection === "rest" ? "Copied" : "Copy Code"}
            </button>
          </div>
          <pre className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed">
            {REST_CODE}
          </pre>
        </div>

        {/* ChatGPT Custom GPT & User Permission Integration */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Zap className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">ChatGPT / Custom GPT Integration Guide</h3>
              <p className="text-slate-400 text-xs">Allow ChatGPT to open cloud browsers, request user permission, and perform authenticated web automations.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
              <span className="text-emerald-400 font-bold">Step 1: Custom GPT Action</span>
              <p className="text-slate-400 font-sans text-[11px]">
                Add TinyFish REST OpenAPI schema (`/v1/agent/execute`) into Custom GPT Action capabilities in ChatGPT.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
              <span className="text-cyan-400 font-bold">Step 2: User Permission Request</span>
              <p className="text-slate-400 font-sans text-[11px]">
                When ChatGPT requests a browser action, the user receives an interactive prompt in TinyFish Playground to confirm permission.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Account Session Handoff</span>
              <p className="text-slate-400 font-sans text-[11px]">
                User logs into target account in TinyFish cookie vault, enabling ChatGPT to perform authenticated actions automatically.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
