"use client"

import { motion } from "framer-motion"
import { LucideIcon, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
  href?: string
  className?: string
}

export default function ServiceCard({ icon: Icon, title, description, index, href = "/services", className }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-primary/50 hover:bg-white/10",
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>

      <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">{title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <Link
        href={href}
        className="group/btn inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
      >
        Learn More
        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
      </Link>
    </motion.div>
  )
}
