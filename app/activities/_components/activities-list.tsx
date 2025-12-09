"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Activity,
  Plus,
  Phone,
  Mail,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { SelectActivity } from "@/db/schema/activities-schema"

interface ActivitiesListProps {
  activities: SelectActivity[]
}

const typeConfig: Record<string, { 
  icon: React.ReactNode
  color: string
  badge: "default" | "info" | "success" | "warning"
}> = {
  call: { 
    icon: <Phone className="h-5 w-5" />, 
    color: "from-blue-500 to-indigo-600",
    badge: "info"
  },
  email: { 
    icon: <Mail className="h-5 w-5" />, 
    color: "from-purple-500 to-violet-600",
    badge: "default"
  },
  meeting: { 
    icon: <Calendar className="h-5 w-5" />, 
    color: "from-emerald-500 to-teal-600",
    badge: "success"
  },
  note: { 
    icon: <FileText className="h-5 w-5" />, 
    color: "from-amber-500 to-orange-600",
    badge: "warning"
  },
  task: { 
    icon: <CheckCircle2 className="h-5 w-5" />, 
    color: "from-cyan-500 to-blue-600",
    badge: "info"
  },
}

export default function ActivitiesList({ activities }: ActivitiesListProps) {
  const completedCount = activities.filter(a => a.completedAt).length
  const pendingCount = activities.filter(a => !a.completedAt && a.dueDate).length

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold">Activities</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Track your interactions and tasks
            </p>
          </div>
          <Link href="/activities/new">
            <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-500/25">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </Link>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid gap-6 md:grid-cols-3"
        >
          <Card className="card-glow">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Activities</p>
              <p className="mt-2 metric-value">{activities.length}</p>
            </CardContent>
          </Card>
          <Card className="card-glow">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="mt-2 metric-value text-emerald-400">{completedCount}</p>
            </CardContent>
          </Card>
          <Card className="card-glow">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="mt-2 metric-value text-amber-400">{pendingCount}</p>
            </CardContent>
          </Card>
        </motion.div>

        {activities.length === 0 ? (
          <Card className="card-glow">
            <CardContent className="py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
                <Activity className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="mt-6 text-xl font-semibold">No activities yet</p>
              <p className="mt-2 text-muted-foreground">
                Get started by adding your first activity
              </p>
              <Link href="/activities/new">
                <Button className="mt-6 bg-gradient-to-r from-orange-600 to-amber-600">
                  Add Activity
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = typeConfig[activity.type] || {
                icon: <Activity className="h-5 w-5" />,
                color: "from-slate-500 to-slate-600",
                badge: "secondary" as const
              }

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="card-glow group cursor-pointer transition-transform hover:scale-[1.01]">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${config.color} shadow-lg text-white`}>
                          {config.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                                {activity.subject}
                              </h3>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <Badge variant={config.badge}>
                                  {activity.type}
                                </Badge>
                                {activity.completedAt && (
                                  <Badge variant="success">Completed</Badge>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {formatDate(activity.createdAt)}
                            </span>
                          </div>

                          {activity.description && (
                            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                              {activity.description}
                            </p>
                          )}

                          {activity.dueDate && !activity.completedAt && (
                            <div className="mt-3 flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-amber-400" />
                              <span className="text-amber-400">Due: {formatDate(activity.dueDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
