import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              Muhammad Ali<span className="text-primary/60">.</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Building modern, scalable, and user-centric software solutions for a digital-first world.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">Get in touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:alikhanxada1001@gmail.com" className="hover:text-primary">alikhanxada1001@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:03261604808" className="hover:text-primary">0326-1604808</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Me</Link>
              <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">My Projects</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hire Me</Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Muhammad Ali. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
