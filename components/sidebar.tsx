"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Activity, 
  LayoutDashboard,
  Droplets,
  Settings,
  HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Companies", href: "/companies", icon: Building2 },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "Deals", href: "/deals", icon: TrendingUp },
  { name: "Activities", href: "/activities", icon: Activity },
]

const bottomNav = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 px-6 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/25">
            <Droplets className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Liqueo</span>
            <span className="text-xl font-light text-foreground"> CRM</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="px-4 mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn("sidebar-item", isActive && "active")}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-border px-3 py-4 space-y-1">
          {bottomNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="sidebar-item"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* User section */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-sm font-bold text-white">
              LC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Liqueo Consultant</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
