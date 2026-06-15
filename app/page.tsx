"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Code,
  Layout,
  Smartphone,
  Database,
  Cpu,
  BarChart3,
  Zap,
  CheckCircle,
  Globe,
  ShieldCheck,
  MessageSquare,
  Bot,
  LineChart,
  Rocket,
  Layers,
  Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import ProjectCard from "@/components/ProjectCard"
import ServiceCard from "@/components/ServiceCard"
import SkillCard from "@/components/SkillCard"
import TrustSection from "@/components/TrustSection"
import ProcessTimeline from "@/components/ProcessTimeline"
import TestimonialSlider from "@/components/TestimonialSlider"

const techBadges = [
  "React", "Next.js", "React Native", "Node.js", "Python", "Power BI", "AI Automation", "PostgreSQL", "TypeScript", "Tailwind CSS"
]

export default function Home() {
  const [projects, setProjects] = useState<any[]>([])
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient()
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

      if (data) setProjects(data)
    }
    fetchProjects()
  }, [])

  return (
    <div className="flex flex-col gap-0 overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center md:pt-0">
        <div className="absolute inset-0 -z-10 bg-mesh opacity-40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,255,0.1),transparent_50%)]" />

        <motion.div style={{ opacity, scale }} className="container relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase backdrop-blur-md">
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-primary" />
              Available for Global Projects
            </div>

            <h1 className="text-5xl font-extrabold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl text-white">
              Building Powerful <span className="text-gradient">Digital Products</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed">
              I help startups and businesses create scalable <span className="text-white font-semibold">Websites, Mobile Apps, AI Tools & Data Solutions</span> that drive real growth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
              <Button asChild size="lg" className="h-14 rounded-full bg-primary px-10 text-lg font-bold shadow-[0_0_20px_rgba(0,102,255,0.4)] transition-all hover:scale-105">
                <Link href="/projects" className="group">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 rounded-full border-white/10 bg-white/5 px-10 text-lg font-bold backdrop-blur-md transition-all hover:bg-white/10">
                <Link href="/contact" className="flex items-center gap-2">
                  <Play className="h-4 w-4 fill-current" />
                  Start Your Project
                </Link>
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-3">
              {techBadges.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 text-xs font-bold text-white/60 backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-float absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-blue-500/10 blur-[100px]" />
          <div className="absolute right-[10%] top-[40%] h-64 w-64 rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-white/5 bg-white/[0.02] py-20">
        <div className="container mx-auto px-4">
          <TrustSection />
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="relative py-24 lg:py-32" id="services">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">My Expertise</h2>
            <h3 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Professional <span className="text-gradient">Solutions</span>
            </h3>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Delivering high-performance digital products tailored to your business needs, from conceptual design to scalable deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              index={0}
              icon={Globe}
              title="Web Development"
              description="High-converting, scalable websites built with Next.js, React, and modern tech stacks."
            />
            <ServiceCard
              index={1}
              icon={Smartphone}
              title="Mobile Apps"
              description="Cross-platform iOS and Android applications developed with React Native and Expo."
            />
            <ServiceCard
              index={2}
              icon={Bot}
              title="AI Solutions"
              description="Custom AI chatbots, automation systems, and intelligent business tools powered by OpenAI."
            />
            <ServiceCard
              index={3}
              icon={BarChart3}
              title="Data Analytics"
              description="Insightful Power BI dashboards and data-driven solutions for business intelligence."
            />
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="link" className="text-white hover:text-primary">
              <Link href="/services" className="flex items-center gap-2 text-lg font-bold">
                View All 16 Services
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="bg-white/[0.01] py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">Why Work With Me</h2>
              <h3 className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Experience Excellence in <span className="text-gradient">Development</span>
              </h3>
              <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
                I combine technical mastery with a deep understanding of business goals to create products that don't just work, but excel in their market.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { icon: Zap, title: "Fast Performance", desc: "Optimized for speed and efficiency." },
                  { icon: ShieldCheck, title: "Secure & Scalable", desc: "Built with the future in mind." },
                  { icon: MessageSquare, title: "Direct Communication", desc: "No middleman, just professional advice." },
                  { icon: Layers, title: "Clean Architecture", desc: "Readable, maintainable codebases." },
                ].map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-3xl">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                  <div className="absolute inset-0 bg-mesh opacity-20" />
                  <div className="flex h-full flex-col p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-[10px] text-white/40">Portfolio_Main_v4.tsx</div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="h-4 w-3/4 rounded bg-primary/20" />
                      <div className="h-4 w-1/2 rounded bg-white/10" />
                      <div className="h-4 w-5/6 rounded bg-primary/20" />
                      <div className="h-4 w-2/3 rounded bg-white/10" />
                      <div className="h-4 w-1/4 rounded bg-primary/20" />
                    </div>
                    <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-8">
                      <div className="h-10 w-10 rounded-full bg-white/10" />
                      <div>
                        <div className="h-3 w-20 rounded bg-white/10" />
                        <div className="mt-2 h-2 w-32 rounded bg-white/5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-500">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40">Success Rate</p>
                  <p className="text-sm font-bold text-white">100% Client Satisfaction</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 lg:py-32" id="projects">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div className="text-center md:text-left">
              <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">My Works</h2>
              <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Featured <span className="text-gradient">Projects</span>
              </h3>
            </div>
            <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-primary hover:text-white">
              <Link href="/projects" className="flex items-center gap-2">
                View Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            ) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] animate-pulse rounded-3xl bg-white/5" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* AI Solutions Showcase */}
      <section className="relative overflow-hidden bg-primary/5 py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(0,102,255,0.1),transparent_40%)]" />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
             <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageSquare, title: "AI Chatbots", desc: "Intelligent customer support" },
                  { icon: Zap, title: "Automation", desc: "Workflow efficiency tools" },
                  { icon: Rocket, title: "Lead Gen", desc: "Automated sales pipelines" },
                  { icon: Bot, title: "AI Agents", desc: "Autonomous task solvers" },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-primary/10"
                  >
                    <item.icon className="mb-4 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                    <h4 className="mb-1 font-bold text-white">{item.title}</h4>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">Innovation</h2>
              <h3 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                AI Solutions For <span className="text-gradient">Modern Businesses</span>
              </h3>
              <p className="mb-8 text-lg text-muted-foreground">
                Harness the power of Artificial Intelligence to automate processes, gain insights, and provide superior customer experiences.
              </p>
              <Button asChild size="lg" className="rounded-full bg-primary font-bold">
                <Link href="/ai-solutions">Explore AI Offerings</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Power BI & Data Analytics */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">Data Insights</h2>
              <h3 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Power BI & <span className="text-gradient">Data Analytics</span>
              </h3>
              <p className="mb-8 text-lg text-muted-foreground">
                Turn your raw data into actionable insights with interactive dashboards and professional KPI tracking.
              </p>
              <ul className="mb-10 space-y-4">
                {[
                  "Interactive Business Reports",
                  "Sales & Financial Analytics",
                  "KPI Tracking Dashboards",
                  "Data Visualization & Storytelling"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/80">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="rounded-full border-white/10 bg-white/5">
                <Link href="/services#data">View Data Solutions</Link>
              </Button>
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-3xl">
              <div className="aspect-video overflow-hidden rounded-2xl bg-black/40">
                <div className="flex h-full items-center justify-center">
                  <BarChart3 className="h-20 w-20 text-primary opacity-20" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl border border-white/10 bg-black p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 p-3 text-primary">
                    <LineChart className="h-full w-full" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase">Accuracy</p>
                    <p className="text-lg font-bold text-white">99.9% Data Integrity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white/[0.01] py-24 lg:py-32" id="skills">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">My Stack</h2>
            <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Technical <span className="text-gradient">Proficiency</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <h4 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <Layout className="h-5 w-5 text-primary" /> Frontend
              </h4>
              <div className="space-y-3">
                <SkillCard name="React / Next.js" level={95} index={0} category="Modern Frameworks" />
                <SkillCard name="TypeScript" level={90} index={1} category="Languages" />
                <SkillCard name="Tailwind CSS" level={98} index={2} category="Styling" />
                <SkillCard name="Framer Motion" level={85} index={3} category="Animations" />
              </div>
            </div>
            <div>
              <h4 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <Database className="h-5 w-5 text-primary" /> Backend & Data
              </h4>
              <div className="space-y-3">
                <SkillCard name="Node.js / Express" level={88} index={4} category="Runtime" />
                <SkillCard name="Python" level={82} index={5} category="Data Science" />
                <SkillCard name="PostgreSQL" level={90} index={6} category="Databases" />
                <SkillCard name="Power BI" level={85} index={7} category="Analytics" />
              </div>
            </div>
            <div>
              <h4 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <Smartphone className="h-5 w-5 text-primary" /> Mobile & AI
              </h4>
              <div className="space-y-3">
                <SkillCard name="React Native" level={92} index={8} category="Mobile" />
                <SkillCard name="OpenAI API" level={85} index={9} category="AI" />
                <SkillCard name="Supabase" level={90} index={10} category="BaaS" />
                <SkillCard name="Git / GitHub" level={95} index={11} category="Tools" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">The Process</h2>
            <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              How I Turn <span className="text-gradient">Ideas Into Reality</span>
            </h3>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white/[0.01] py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">Testimonials</h2>
            <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What My <span className="text-gradient">Clients Say</span>
            </h3>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* About Me Section (Brief) */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                  <div className="flex h-full items-center justify-center text-6xl font-bold opacity-10">MA</div>
                </div>
              </div>
              <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />
            </div>
            <div>
              <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">About Me</h2>
              <h3 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Turning Ideas Into <span className="text-gradient">Digital Products</span>
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                I am a Full Stack Developer, Mobile App Developer, AI Tool Builder, and Data Analyst. My focus is on building modern solutions that help businesses grow and scale in the digital age.
              </p>
              <div className="mb-10 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-3xl font-bold text-white">5+</h4>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white">150+</h4>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </div>
              </div>
              <Button asChild size="lg" className="rounded-full bg-primary font-bold">
                <Link href="/about">Read Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Me Section */}
      <section className="container mx-auto px-4 pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-[3rem] bg-primary p-12 text-center text-primary-foreground lg:p-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Have a Project In Mind?
            </h2>
            <p className="mb-12 text-xl font-medium opacity-90">
              Whether you need a website, mobile app, AI solution, dashboard, or custom software, I can help turn your vision into reality.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button asChild size="lg" className="h-16 rounded-full bg-white px-10 text-lg font-bold text-black transition-all hover:scale-105 hover:bg-white/90">
                <Link href="/contact">Start Your Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 rounded-full border-white/20 bg-white/10 px-10 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
                <Link href="/contact?type=consultation">Book Free Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
