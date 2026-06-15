"use client"

import { motion } from "framer-motion"

const steps = [
  {
    title: "Discovery",
    description: "Deep dive into your requirements, goals, and target audience to define the project scope.",
    color: "bg-blue-500",
  },
  {
    title: "Planning",
    description: "Strategic architecture design, technology stack selection, and roadmap creation.",
    color: "bg-purple-500",
  },
  {
    title: "Design",
    description: "Creating intuitive UI/UX designs and interactive prototypes for your approval.",
    color: "bg-pink-500",
  },
  {
    title: "Development",
    description: "Agile coding process with regular updates and high-quality standard implementation.",
    color: "bg-primary",
  },
  {
    title: "Testing",
    description: "Rigorous quality assurance, bug fixing, and performance optimization.",
    color: "bg-green-500",
  },
  {
    title: "Deployment",
    description: "Smooth launch to production and configuration of scaling infrastructure.",
    color: "bg-yellow-500",
  },
  {
    title: "Support & Growth",
    description: "Ongoing maintenance, security updates, and feature enhancements for long-term success.",
    color: "bg-red-500",
  },
]

export default function ProcessTimeline() {
  return (
    <div className="relative space-y-12 before:absolute before:left-[17px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-white/10 md:before:left-1/2 md:before:-translate-x-1/2">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative flex flex-col items-start gap-8 md:flex-row md:items-center ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="absolute left-0 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-black bg-white md:left-1/2 md:-translate-x-1/2">
            <div className={`h-2.5 w-2.5 rounded-full ${step.color}`} />
          </div>

          <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
            <div className={`group rounded-2xl border border-white/5 bg-white/5 p-8 transition-all hover:border-primary/30 hover:bg-white/10 ${
              index % 2 === 0 ? "md:text-right" : "md:text-left"
            }`}>
              <span className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold text-white ${step.color}`}>
                Step {index + 1}
              </span>
              <h3 className="mb-3 text-2xl font-bold text-white">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2" />
        </motion.div>
      ))}
    </div>
  )
}
