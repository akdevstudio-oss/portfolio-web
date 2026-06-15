"use client"

import { motion } from "framer-motion"
import { CheckCircle, Award, Target, Users } from "lucide-react"

export default function About() {
  return (
    <div className="bg-black pb-24 pt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">My Story</h2>
            <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Turning Ideas Into <span className="text-gradient">Digital Success</span>
            </h1>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I am Muhammad Ali, a multi-disciplinary Software Engineer, Mobile App Developer, AI Tool Builder, and Data Analyst with a passion for creating high-impact digital products.
              </p>
              <p>
                With over 5 years of experience in the industry, I have helped startups and established businesses across the globe transform their complex ideas into scalable, user-friendly software solutions.
              </p>
              <p>
                My expertise spans the entire development lifecycle, from strategic planning and UI/UX design to robust backend architecture and data-driven optimization. I believe in writing clean, maintainable code that solves real business problems.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              {[
                { label: "Years Experience", value: "5+" },
                { label: "Global Clients", value: "80+" },
                { label: "Successful Projects", value: "150+" },
                { label: "Coffee Consumed", value: "∞" },
              ].map((stat) => (
                <div key={stat.label}>
                  <h4 className="text-3xl font-bold text-white">{stat.value}</h4>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-4">
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-black flex items-center justify-center">
                 <span className="text-9xl font-bold opacity-10">MA</span>
              </div>
            </div>
            <div className="absolute -left-8 top-1/4 rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Certified</p>
                  <p className="text-sm text-muted-foreground">Full Stack Specialist</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 bottom-1/4 rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Results Driven</p>
                  <p className="text-sm text-muted-foreground">100% Delivery Rate</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-12 md:grid-cols-3">
           {[
             {
               icon: Target,
               title: "My Mission",
               desc: "Helping startups and businesses scale through modern, efficient, and intelligent digital solutions."
             },
             {
               icon: Users,
               title: "Client Centric",
               desc: "Building long-term partnerships through transparent communication and exceptional delivery."
             },
             {
               icon: CheckCircle,
               title: "Quality First",
               desc: "I never compromise on code quality, performance, or user experience standards."
             }
           ].map((item, i) => (
             <motion.div
               key={item.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="rounded-3xl border border-white/5 bg-white/5 p-10"
             >
               <item.icon className="mb-6 h-10 w-10 text-primary" />
               <h3 className="mb-4 text-2xl font-bold text-white">{item.title}</h3>
               <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  )
}
