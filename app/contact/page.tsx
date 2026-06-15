"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Smartphone, MapPin, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    toast.success("Thank you! Your project inquiry has been sent.")
    setLoading(false)
    const target = e.target as HTMLFormElement
    target.reset()
  }

  return (
    <div className="bg-black pb-24 pt-32">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-primary uppercase">Get In Touch</h2>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Start Your <span className="text-gradient">Project Journey</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Ready to transform your vision into a world-class digital product? Let's discuss your requirements and build something extraordinary.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-10">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
              <h3 className="mb-8 text-2xl font-bold text-white">Contact Details</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Me</p>
                    <p className="text-lg font-semibold text-white">alikhanxada1001@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">WhatsApp / Call</p>
                    <p className="text-lg font-semibold text-white">0326-1604808</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</p>
                    <p className="text-lg font-semibold text-white">Lahore, Pakistan (Available Globally)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-primary p-10 text-primary-foreground relative overflow-hidden">
               <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
               <h3 className="mb-4 text-2xl font-bold">Free Consultation</h3>
               <p className="mb-8 text-lg opacity-90 leading-relaxed">
                 Not sure where to start? Book a free 30-minute consultation call to discuss your project idea and get professional advice.
               </p>
               <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 px-8 font-bold">
                 <a href="#">Schedule A Call</a>
               </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/70">Full Name</label>
                    <input
                      required
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white placeholder:text-white/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/70">Company Name</label>
                    <input
                      placeholder="Your Company"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white placeholder:text-white/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/70">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white placeholder:text-white/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/70">WhatsApp Number</label>
                    <input
                      placeholder="+1 (234) 567-890"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white placeholder:text-white/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/70">Project Type</label>
                    <select
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option className="bg-black">Web Development</option>
                      <option className="bg-black">Mobile App</option>
                      <option className="bg-black">AI Solution</option>
                      <option className="bg-black">Data Analytics</option>
                      <option className="bg-black">Custom Software</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/70">Budget Range</label>
                    <select
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option className="bg-black">$1,000 - $3,000</option>
                      <option className="bg-black">$3,000 - $10,000</option>
                      <option className="bg-black">$10,000 - $25,000</option>
                      <option className="bg-black">$25,000+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70">Project Details</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your vision, goals, and any specific requirements..."
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-6 py-4 text-white placeholder:text-white/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <Button
                  disabled={loading}
                  className="h-16 w-full rounded-2xl bg-primary text-lg font-extrabold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
