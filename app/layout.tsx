import type React from "react"
import "@/app/globals.css"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import CustomCursor from "@/components/custom-cursor"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata = {
  title: "Garv Bhardwaj | AI/ML Engineer & Full Stack Developer",
  description:
    "Personal portfolio of Garv Bhardwaj, an aspiring AI/ML Engineer and Full Stack Web Developer based in New Delhi, India.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CustomCursor />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
