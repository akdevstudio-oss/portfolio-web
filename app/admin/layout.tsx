"use client"

import { usePathname } from "next/navigation"
import AdminSidebar from "@/components/AdminSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <main className="flex-grow overflow-auto p-8">
        <div className="container mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
