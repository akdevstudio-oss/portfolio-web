"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl">
            Passionate about building <span className="text-primary/60">meaningful</span> digital solutions.
          </h1>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              I'm Muhammad Ali, a Software Engineer based in Lahore, Pakistan. With several years of experience in full-stack development, I specialize in building high-performance web applications using the latest technologies.
            </p>
            <p>
              My journey started with a curiosity for how things work on the internet, which led me to dive deep into JavaScript, TypeScript, and the React ecosystem. Today, I help businesses and startups turn their ideas into reality.
            </p>
            <div className="pt-6">
              <h3 className="mb-4 text-xl font-bold text-foreground">Core Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Supabase", "PostgreSQL", "React Native", "Framer Motion"].map((skill) => (
                  <span key={skill} className="rounded-full border border-border bg-accent px-4 py-1.5 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-square overflow-hidden rounded-3xl bg-muted lg:aspect-auto lg:h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
          <div className="flex h-full items-center justify-center text-4xl font-bold opacity-20">
            MA
          </div>
        </motion.div>
      </div>
    </div>
  )
}
