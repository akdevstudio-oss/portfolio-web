"use client"

import { motion } from "framer-motion"
import { Bot, MessageSquare, Zap, Rocket, Cpu, LineChart, ShieldCheck, Search, Globe, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ServiceCard from "@/components/ServiceCard"

const aiServices = [
  { icon: MessageSquare, title: "Custom AI Chatbots", desc: "Build intelligent customer support agents that understand your business and provide 24/7 assistance." },
  { icon: Bot, title: "Autonomous AI Agents", desc: "Develop agents that can perform complex tasks, research information, and manage workflows autonomously." },
  { icon: Zap, title: "Business Process Automation", desc: "Streamline your operations by automating repetitive tasks using AI-powered automation systems." },
  { icon: Search, title: "Lead Generation Tools", desc: "Identify and qualify high-potential leads automatically using intelligent AI scraping and analysis." },
  { icon: Cpu, title: "AI Productivity Tools", desc: "Custom software designed to enhance your team's productivity using the latest LLM technologies." },
  { icon: LineChart, title: "AI-Driven Analytics", desc: "Gain deeper insights from your data using predictive modeling and AI-powered data processing." },
]

export default function AISolutions() {
  return (
    <div className="bg-black pb-24 pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase">
            <Cpu className="h-3 w-3" /> Future of Business
          </div>
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            AI Solutions For <br />
            <span className="text-gradient">Modern Enterprise</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed">
            Harness the power of Artificial Intelligence to automate processes, scale your operations, and provide superior experiences to your customers.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Button asChild size="lg" className="h-14 rounded-full bg-primary px-10 font-bold">
              <Link href="/contact?type=ai">Get AI Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-white/10 bg-white/5 px-10 font-bold">
              <Link href="#solutions">View Solutions</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4 mb-32" id="solutions">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">Capabilities</h2>
          <h3 className="text-4xl font-bold text-white">Intelligent Offerings</h3>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aiServices.map((service, index) => (
            <ServiceCard
              key={service.title}
              index={index}
              icon={service.icon}
              title={service.title}
              description={service.desc}
            />
          ))}
        </div>
      </section>

      {/* Futuristic Visuals Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.02] p-12 lg:p-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(0,102,255,0.1),transparent_50%)]" />
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            <div>
              <h3 className="mb-6 text-4xl font-bold text-white">Why Choose My AI Services?</h3>
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "Data Privacy First", desc: "All AI solutions are built with strict data security and privacy protocols." },
                  { icon: Zap, title: "High Performance", desc: "Optimized for latency and accuracy to ensure smooth user interactions." },
                  { icon: Layout, title: "Seamless Integration", desc: "Easily integrate AI capabilities into your existing web or mobile apps." }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square rounded-full border-2 border-primary/20 p-8 animate-pulse-slow">
                 <div className="h-full w-full rounded-full border-2 border-primary/40 p-8">
                   <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-32 w-32 text-primary" />
                   </div>
                 </div>
               </div>
               {/* Orbiting icons */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-white">
                    <MessageSquare className="h-6 w-6" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white lg:p-20">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ready to AI-Power Your Business?
          </h2>
          <p className="mb-10 mx-auto max-w-2xl text-xl opacity-90">
            Let's build a custom AI solution that gives your business a competitive edge.
          </p>
          <Button asChild size="lg" className="h-16 rounded-full bg-white px-10 text-lg font-bold text-blue-600 hover:bg-white/90">
             <Link href="/contact?type=ai">Start Your AI Project</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
