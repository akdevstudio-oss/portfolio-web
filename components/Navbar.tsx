"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "AI Solutions", href: "/ai-solutions" },
  { name: "Skills", href: "/#skills" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/70 backdrop-blur-xl py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-2 text-2xl font-bold tracking-tighter">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-transform group-hover:scale-110">
              M
            </span>
            <span className="hidden sm:inline-block">
              Muhammad <span className="text-primary/80">Ali</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                  />
                )}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <ThemeToggle />
            <Button asChild size="sm" className="rounded-full bg-primary px-6 font-semibold hover:bg-primary/90">
              <Link href="/contact" className="flex items-center gap-2">
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 bg-black/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 px-4 py-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </Link>
              ))}
              <Button asChild size="lg" className="mt-4 rounded-xl bg-primary w-full font-bold">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Start Your Project
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
