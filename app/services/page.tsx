"use client"

import { motion } from "framer-motion"
import { Code, Layout, Smartphone, Database, Server, Globe, Cpu, Zap } from "lucide-react"

const services = [
  {
    icon: Layout,
    title: "Web Development",
    description: "Building fast, responsive, and SEO-friendly websites using Next.js, React, and Tailwind CSS.",
  },
  {
    icon: Server,
    title: "Backend Solutions",
    description: "Developing robust APIs and server-side logic using Node.js, Express, and Supabase.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Creating cross-platform mobile applications with React Native for iOS and Android.",
  },
  {
    icon: Database,
    title: "Database Management",
    description: "Designing and optimizing database schemas with PostgreSQL and NoSQL solutions.",
  },
  {
    icon: Cpu,
    title: "Custom Software",
    description: "Tailor-made software solutions designed to streamline your business operations.",
  },
  {
    icon: Globe,
    title: "UI/UX Design",
    description: "Designing intuitive user interfaces and engaging user experiences that delight users.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Improving your existing application's speed, efficiency, and Core Web Vitals.",
  },
  {
    icon: Code,
    title: "Consultation",
    description: "Providing expert advice on technology stacks, architecture, and digital strategy.",
  },
]

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Professional Services</h1>
        <p className="mt-4 text-lg text-muted-foreground">Comprehensive solutions for your digital needs.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
