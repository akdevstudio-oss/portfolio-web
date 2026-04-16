"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Code, Layout, Smartphone, Database } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0.1),transparent)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wider text-primary uppercase">
            Available for New Projects
          </div>
          <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            Muhammad <span className="text-primary/60">Ali</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl">
            Web Developer & Software Engineer crafting premium digital experiences with modern technologies.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/projects" className="group">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/contact">
                Let's Talk
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Layout, title: "Web Development", desc: "Custom web applications built with Next.js and React." },
            { icon: Code, title: "Software Solutions", desc: "Tailored software to solve your business challenges." },
            { icon: Smartphone, title: "Mobile Apps", desc: "Responsive and native-like mobile experiences." },
            { icon: Database, title: "UI/UX Design", desc: "User-centric designs that convert and engage." },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50"
            >
              <service.icon className="mb-4 h-10 w-10 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
