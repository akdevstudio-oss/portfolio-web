"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Founder, TechScale AI",
    content: "Muhammad delivered an exceptional AI-powered dashboard that transformed how we track our KPIs. His attention to detail and technical expertise are top-notch.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "CTO, GreenFlow Systems",
    content: "The mobile app Muhammad built for us using React Native is incredibly smooth and performant. He is a pleasure to work with and always hits deadlines.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Director, Peak Marketing",
    content: "Our new business website is fast, beautiful, and converts better than ever. Muhammad's full-stack skills are truly world-class.",
    rating: 5,
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(next, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative overflow-hidden px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Quote className="h-8 w-8" />
            </div>

            <div className="mb-6 flex gap-1">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>

            <p className="mb-8 text-2xl font-medium italic leading-relaxed text-white md:text-3xl">
              "{testimonials[current].content}"
            </p>

            <div>
              <h4 className="text-xl font-bold text-white">{testimonials[current].name}</h4>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={prev}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-primary hover:text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-primary hover:text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
