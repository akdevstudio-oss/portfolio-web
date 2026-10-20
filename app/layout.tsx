import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TinyFish | AI Cloud Browser Automation & Monitoring",
  description: "Cloud browser infrastructure for AI agents. Run headless and headful cloud browsers, monitor live DOM streams, automate web workflows with natural language, and bypass anti-bot detections at scale.",
  keywords: ["AI Browser", "Web Automation", "Cloud Browser", "Browser Monitoring", "TinyFish", "Playwright Cloud", "Headless Chrome", "AI Agent Web"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans dark", geist.variable)}>
      <body className={cn(inter.className, "bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <FooterWrapper />
          </div>
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  );
}
