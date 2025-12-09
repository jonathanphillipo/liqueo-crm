"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { TrendingUp, Plus, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { SelectDeal } from "@/db/schema/deals-schema"

interface DealsListProps {
  deals: SelectDeal[]
}

const stageConfig: Record<string, { color: string; badge: "default" | "info" | "success" | "warning" }> = {
  prospecting: { color: "from-blue-500 to-indigo-600", badge: "info" },
  qualification: { color: "from-purple-500 to-violet-600", badge: "default" },
  proposal: { color: "from-amber-500 to-orange-600", badge: "warning" },
  negotiation: { color: "from-orange-500 to-red-600", badge: "warning" },
  closed: { color: "from-emerald-500 to-teal-600", badge: "success" },
}

export default function DealsList({ deals }: DealsListProps) {
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const openDeals = deals.filter((deal) => deal.stage !== "closed")

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold">Deals</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Track your sales pipeline
            </p>
          </div>
          <Link href="/deals/new">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/25">
              <Plus className="mr-2 h-4 w-4" />
              Add Deal
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
              <p className="text-sm text-muted-foreground">Total Pipeline</p>
              <p className="mt-2 metric-value text-gradient">{formatCurrency(totalValue)}</p>
            </CardContent>
          </Card>
          <Card className="card-glow">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Open Deals</p>
              <p className="mt-2 metric-value">{openDeals.length}</p>
            </CardContent>
          </Card>
          <Card className="card-glow">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Won Deals</p>
              <p className="mt-2 metric-value text-emerald-400">{deals.length - openDeals.length}</p>
            </CardContent>
          </Card>
        </motion.div>

        {deals.length === 0 ? (
          <Card className="card-glow">
            <CardContent className="py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
                <TrendingUp className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="mt-6 text-xl font-semibold">No deals yet</p>
              <p className="mt-2 text-muted-foreground">
                Get started by adding your first deal
              </p>
              <Link href="/deals/new">
                <Button className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600">
                  Add Deal
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal, index) => {
              const config = stageConfig[deal.stage] || stageConfig.prospecting
              return (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="card-glow group cursor-pointer transition-transform hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                            {deal.title}
                          </h3>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant={config.badge}>
                              {deal.stage}
                            </Badge>
                            {deal.probability !== null && (
                              <span className="text-sm text-muted-foreground">
                                {deal.probability}% probability
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${config.color} shadow-lg`}>
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Deal Value</p>
                          <p className="text-2xl font-bold font-mono">{formatCurrency(deal.value)}</p>
                        </div>

                        {/* Probability Bar */}
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Probability</span>
                            <span className="font-medium">{deal.probability || 0}%</span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-bar-fill" 
                              style={{ width: `${deal.probability || 0}%` }}
                            />
                          </div>
                        </div>

                        {deal.expectedCloseDate && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                            <Calendar className="h-4 w-4" />
                            <span>Expected: {formatDate(deal.expectedCloseDate)}</span>
                          </div>
                        )}

                        {deal.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {deal.description}
                          </p>
                        )}
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
