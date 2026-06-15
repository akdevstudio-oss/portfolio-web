"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkillCardProps {
  name: string
  icon?: string
  level?: number // 0 to 100
  index: number
  category?: string
}

export default function SkillCard({ name, level = 90, index, category }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-primary/30 hover:bg-white/10"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <span className="text-xs font-bold">{name.substring(0, 2).toUpperCase()}</span>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">{name}</h4>
          {category && <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{category}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
            className="h-full bg-primary"
          />
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">{level}%</span>
      </div>
    </motion.div>
  )
}
