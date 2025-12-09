"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Users,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { SelectCompany } from "@/db/schema/companies-schema"
import type { SelectContact } from "@/db/schema/contacts-schema"
import type { SelectDeal } from "@/db/schema/deals-schema"
import type { SelectActivity } from "@/db/schema/activities-schema"

interface DashboardProps {
  companies: SelectCompany[]
  contacts: SelectContact[]
  deals: SelectDeal[]
  activities: SelectActivity[]
}

const typeIcons: Record<string, React.ReactNode> = {
  call: <Phone className="h-4 w-4" />,
  email: <Mail className="h-4 w-4" />,
  meeting: <Calendar className="h-4 w-4" />,
  note: <FileText className="h-4 w-4" />,
  task: <CheckCircle2 className="h-4 w-4" />,
}

export default function Dashboard({
  companies,
  contacts,
  deals,
  activities,
}: DashboardProps) {
  const totalDealValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const openDeals = deals.filter((deal) => deal.stage !== "closed")
  const closedDeals = deals.filter((deal) => deal.stage === "closed")
  const recentActivities = activities.slice(0, 5)

  const stats = [
    {
      title: "Client Companies",
      value: companies.length,
      icon: Building2,
      change: "+3",
      href: "/companies",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      title: "Key Contacts",
      value: contacts.length,
      icon: Users,
      change: "+2",
      href: "/contacts",
      gradient: "from-cyan-500 to-teal-600",
    },
    {
      title: "Active Deals",
      value: openDeals.length,
      icon: TrendingUp,
      change: "+1",
      href: "/deals",
      gradient: "from-emerald-500 to-green-600",
    },
    {
      title: "Activities",
      value: activities.length,
      icon: Activity,
      change: "+5",
      href: "/activities",
      gradient: "from-orange-500 to-amber-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-gradient">Liqueo CRM</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Financial Services Consulting Pipeline
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={stat.href}>
                <Card className="stat-card card-glow cursor-pointer transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="metric-value mt-2">{stat.value}</p>
                        <div className="mt-3 flex items-center text-sm">
                          <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">{stat.change}</span>
                          <span className="ml-1 text-muted-foreground">this month</span>
                        </div>
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Deal Pipeline - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="card-glow h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Pipeline Overview</CardTitle>
                  <Link href="/deals">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
                    <p className="metric-value text-gradient">{formatCurrency(totalDealValue)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <p className="text-sm text-muted-foreground">Active Engagements</p>
                    <p className="mt-1 text-2xl font-bold">{openDeals.length}</p>
                    <div className="mt-3 progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${(openDeals.length / Math.max(deals.length, 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="rounded-xl bg-secondary/50 p-4">
                    <p className="text-sm text-muted-foreground">Closed Won</p>
                    <p className="mt-1 text-2xl font-bold">{closedDeals.length}</p>
                    <div className="mt-3 progress-bar">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${(closedDeals.length / Math.max(deals.length, 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Recent Deals */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">Recent Opportunities</p>
                  {deals.slice(0, 3).map((deal) => (
                    <div
                      key={deal.id}
                      className="flex items-center justify-between rounded-xl bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          deal.stage === 'closed' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-primary/20 text-primary'
                        }`}>
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{deal.title}</p>
                          <p className="text-sm text-muted-foreground capitalize">{deal.stage}</p>
                        </div>
                      </div>
                      <p className="font-mono font-semibold">{formatCurrency(deal.value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="card-glow h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <Link href="/activities">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 rounded-xl bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary shrink-0">
                          {typeIcons[activity.type] || <Activity className="h-5 w-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{activity.subject}</p>
                          <p className="text-sm text-muted-foreground capitalize">{activity.type}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(activity.createdAt)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No recent activities
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6"
        >
          <Card className="card-glow">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Link href="/companies/new">
                  <Button className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-lg shadow-sky-500/25">
                    <Building2 className="mr-2 h-4 w-4" />
                    Add Company
                  </Button>
                </Link>
                <Link href="/contacts/new">
                  <Button className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 shadow-lg shadow-cyan-500/25">
                    <Users className="mr-2 h-4 w-4" />
                    Add Contact
                  </Button>
                </Link>
                <Link href="/deals/new">
                  <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-lg shadow-emerald-500/25">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Add Deal
                  </Button>
                </Link>
                <Link href="/activities/new">
                  <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-500/25">
                    <Activity className="mr-2 h-4 w-4" />
                    Add Activity
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
