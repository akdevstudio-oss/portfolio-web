"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function Contact() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success("Message sent successfully!")
    setLoading(false)
    const target = e.target as HTMLFormElement
    target.reset()
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Let's Connect</h1>
        <p className="mt-4 text-lg text-muted-foreground">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">alikhanxada1001@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-semibold">0326-1604808</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <h3 className="mb-4 text-xl font-bold">Ready to start?</h3>
            <p className="mb-6 text-primary-foreground/80">
              I'm available for freelance opportunities and full-time positions. Let's build something amazing together.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">Web Development</div>
              <div className="rounded-lg bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">UI/UX Design</div>
              <div className="rounded-lg bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">Custom Software</div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-border bg-card p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  required
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <input
                required
                placeholder="Project Inquiry"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
