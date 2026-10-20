import Link from "next/link"
import { Github, Twitter, Terminal, Cpu, Shield, Activity, BookOpen, Layers } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 text-slate-400">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">

          {/* Brand & Description */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 12c-2.5 0-4 1.5-4 3s1.5 3 4 3 4-1.5 4-3-1.5-3-4-3z" />
                  <path d="M12 6c-3 0-5.5 2-5.5 4.5S9 15 12 15s5.5-2 5.5-4.5S15 6 12 6z" />
                </svg>
              </div>
              <span className="text-xl font-bold font-mono text-white tracking-tight">TinyFish</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous Cloud Browser Infrastructure & Live Monitoring for AI Agents and Automated Web Workflows.
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-xs text-slate-300 font-mono">
              <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>Global Latency: <strong className="text-emerald-400">38ms</strong></span>
            </div>
          </div>

          {/* Platform & Sandbox */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">Platform</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/playground" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Live AI Sandbox
                </Link>
              </li>
              <li>
                <Link href="/sessions" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Session Stream & Logs
                </Link>
              </li>
              <li>
                <Link href="/workflows" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Automated Web Monitors
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Cloud Runtime Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers & SDKs */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">Developers</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/docs" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  REST & WebSocket API
                </Link>
              </li>
              <li>
                <Link href="/docs#python" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Python SDK (`pip install tinyfish`)
                </Link>
              </li>
              <li>
                <Link href="/docs#playwright" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  Node.js & Playwright Migration
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  System Status (100% Uptime)
                </a>
              </li>
            </ul>
          </div>

          {/* Infrastructure Security */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">Security & Stealth</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Isolated disposable browser containers with anti-fingerprinting, dynamic residential proxy rotation, and automated CAPTCHA solving.
            </p>
            <div className="flex gap-3 pt-1">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TinyFish Inc. AI Cloud Browser Automation & Monitoring.</p>
          <div className="flex gap-6 font-mono">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">SOC2 Type II</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
