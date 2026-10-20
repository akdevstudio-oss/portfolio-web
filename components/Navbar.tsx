"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Terminal, Cpu, Activity, Play, Zap, Shield, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/", icon: Cpu },
  { name: "Live Sandbox", href: "/playground", icon: Play },
  { name: "Sessions Monitor", href: "/sessions", icon: Activity },
  { name: "Workflows", href: "/workflows", icon: Zap },
  { name: "API & Docs", href: "/docs", icon: BookOpen },
  { name: "Pricing", href: "/pricing", icon: Terminal },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 transition-transform group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <svg className="h-5 w-5 text-cyan-400 transition-colors group-hover:text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 12c-2.5 0-4 1.5-4 3s1.5 3 4 3 4-1.5 4-3-1.5-3-4-3z" />
                  <path d="M12 6c-3 0-5.5 2-5.5 4.5S9 15 12 15s5.5-2 5.5-4.5S15 6 12 6z" />
                  <path d="M18 10c1.5 0 3 .8 3 2s-1.5 2-3 2" />
                  <circle cx="13.5" cy="9.5" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white font-mono">TinyFish</span>
                <span className="rounded bg-cyan-950 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-800/50">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-sans tracking-wide -mt-1 hidden sm:inline">Browser Cloud</span>
            </div>
          </Link>

          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3 py-1 text-xs text-emerald-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Cloud Fleet Online
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors rounded-lg",
                  isActive
                    ? "text-cyan-400 bg-slate-900/80 border border-slate-800"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/40"
                )}
              >
                <item.icon className={cn("h-3.5 w-3.5", isActive ? "text-cyan-400" : "text-slate-400")} />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/playground"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5 text-xs font-medium text-white shadow-md shadow-cyan-500/10 transition-all hover:scale-105"
          >
            <span className="relative flex items-center gap-1.5 rounded-[7px] bg-slate-950 px-3.5 py-1.5 transition-all duration-75 group-hover:bg-opacity-0 font-semibold">
              <Play className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400 group-hover:fill-white group-hover:text-white" />
              Launch Sandbox
            </span>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-cyan-950/60 text-cyan-400 border border-cyan-800/40"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  href="/playground"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20"
                >
                  <Play className="h-4 w-4 fill-slate-950" />
                  Launch Sandbox
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
