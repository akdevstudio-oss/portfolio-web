"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Sparkles, Play, Shield, Terminal, Zap } from "lucide-react"

const PLANS = [
  {
    name: "Developer",
    price: "$0",
    period: "/month",
    description: "Ideal for testing AI browser automation and small projects.",
    credits: "1,000 Credits / mo",
    features: [
      "2 Concurrent Cloud Browser Sessions",
      "Standard Anti-Bot Bypass",
      "Live 30 FPS Screencasts",
      "Community Discord Support",
      "Python & Node.js SDK Access"
    ],
    buttonText: "Start Free - 1k Credits",
    highlight: false,
    href: "/playground"
  },
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Designed for small engineering teams running automated monitors.",
    credits: "25,000 Credits / mo",
    features: [
      "10 Concurrent Cloud Browser Sessions",
      "Residential Proxy Rotation (US/EU)",
      "Automated CAPTCHA Auto-Solver",
      "Full CDP Event Log Streaming",
      "Webhook & Alert Integration",
      "99.9% Fleet Uptime SLA"
    ],
    buttonText: "Upgrade to Starter",
    highlight: false,
    href: "/playground"
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "Built for AI agent startups and high-frequency web scrapers.",
    credits: "120,000 Credits / mo",
    features: [
      "50 Concurrent Cloud Browser Sessions",
      "Global Residential Proxy Rotation (18 Regions)",
      "Turnstile, reCAPTCHA & hCaptcha Solvers",
      "Session Video Recordings & HAR Export",
      "Priority WebSocket Latency Routing",
      "Dedicated Technical Support"
    ],
    buttonText: "Get Started with Pro",
    highlight: true,
    href: "/playground"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated isolated container clusters with custom SLAs.",
    credits: "Unlimited Custom Fleet",
    features: [
      "Unlimited Concurrent Browser Instances",
      "Custom Dedicated IP Subnets",
      "SOC2 Type II & HIPAA Compliance",
      "Custom On-Premises or Private Cloud",
      "Dedicated Account Manager",
      "Custom AI Vision Fine-Tuning"
    ],
    buttonText: "Contact Enterprise",
    highlight: false,
    href: "/docs"
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly")

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl space-y-12">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1 text-xs font-mono text-cyan-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>TRANSPARENT RUNTIME PRICING</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Cloud Browser Infrastructure Pricing
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Pay only for cloud browser execution time. Scale from 1 session to thousands instantly.
        </p>

        {/* Monthly/Annual Toggle */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg transition-colors ${
                billingCycle === "monthly" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold" : "text-slate-400"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold" : "text-slate-400"
              }`}
            >
              Annual Billing
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800/40">
                20% OFF
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl border p-6 flex flex-col justify-between transition-all ${
              plan.highlight
                ? "border-cyan-500 bg-slate-900 shadow-2xl shadow-cyan-500/20 relative scale-105"
                : "border-slate-800 bg-slate-900/60"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-3 py-0.5 text-[10px] font-extrabold text-slate-950 uppercase tracking-widest font-mono">
                Most Popular
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{plan.description}</p>
              </div>

              <div className="border-y border-slate-800/80 py-4 font-mono">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>
                <div className="text-xs text-cyan-400 font-semibold mt-1">{plan.credits}</div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <Link
                href={plan.href}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all ${
                  plan.highlight
                    ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
                    : "border border-slate-800 bg-slate-950 text-slate-200 hover:bg-slate-900 hover:border-slate-700"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/80 p-8 space-y-6">
        <h3 className="text-xl font-bold text-white text-center font-mono">Frequently Asked Questions</h3>

        <div className="space-y-4 text-xs font-mono">
          <div className="space-y-1">
            <h4 className="text-cyan-300 font-bold text-sm">How do TinyFish browser credits work?</h4>
            <p className="text-slate-400 font-sans leading-relaxed">
              1 credit equals 1 minute of single-page browser automation execution, including CDP streaming, anti-fingerprinting, and AI task evaluation.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-cyan-300 font-bold text-sm">Are residential proxies included in the price?</h4>
            <p className="text-slate-400 font-sans leading-relaxed">
              Yes! Starter, Pro, and Enterprise plans include built-in residential proxy bandwidth with automated location rotation.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="text-cyan-300 font-bold text-sm">Can I connect existing Playwright or Puppeteer scripts?</h4>
            <p className="text-slate-400 font-sans leading-relaxed">
              Absolutely. You can connect any Playwright or Puppeteer script directly via WebSocket CDP using `connectOverCDP`.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
