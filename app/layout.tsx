import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import Sidebar from "@/components/sidebar"
import "./globals.css"

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Liqueo CRM",
  description: "Financial Services CRM for Liqueo Consulting",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={dmSans.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
