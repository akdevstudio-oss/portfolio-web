"use client"

import { motion } from "framer-motion"
import { Users, CheckCircle, Cpu, Laptop, Smartphone, BarChart3 } from "lucide-react"

const stats = [
  { label: "Projects Completed", value: "150+", icon: CheckCircle },
  { label: "Clients Served", value: "80+", icon: Users },
  { label: "AI Tools Built", value: "25+", icon: Cpu },
  { label: "Dashboards Created", value: "40+", icon: BarChart3 },
  { label: "Mobile Apps", value: "20+", icon: Smartphone },
  { label: "Web Applications", value: "60+", icon: Laptop },
]

export default function TrustSection() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-6 text-center transition-all hover:border-primary/30 hover:bg-white/10"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
            <stat.icon className="h-6 w-6" />
          </div>
          <h3 className="mb-1 text-2xl font-bold text-white">{stat.value}</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
