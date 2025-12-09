"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Building2, Plus, Mail, Phone, Globe, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SelectCompany } from "@/db/schema/companies-schema"

interface CompaniesListProps {
  companies: SelectCompany[]
}

const industryColors: Record<string, string> = {
  "Asset Management": "from-sky-500 to-blue-600",
  "Wealth Management": "from-cyan-500 to-teal-600",
  "Investment Banking": "from-violet-500 to-purple-600",
  "FinTech - IBOR/OMS": "from-emerald-500 to-green-600",
  "FinTech - Core Banking": "from-amber-500 to-orange-600",
  "FinTech - Risk Management": "from-rose-500 to-red-600",
  "Hedge Fund": "from-indigo-500 to-blue-600",
  "Private Equity": "from-purple-500 to-violet-600",
  "Insurance": "from-teal-500 to-cyan-600",
}

const industryBadges: Record<string, "default" | "info" | "success" | "warning"> = {
  "Asset Management": "info",
  "Wealth Management": "info",
  "Investment Banking": "default",
  "FinTech - IBOR/OMS": "success",
  "FinTech - Core Banking": "warning",
  "FinTech - Risk Management": "warning",
  "Hedge Fund": "default",
  "Private Equity": "default",
  "Insurance": "info",
}

export default function CompaniesList({ companies }: CompaniesListProps) {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold">Companies</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage your company relationships
            </p>
          </div>
          <Link href="/companies/new">
            <Button className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-lg shadow-sky-500/25">
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </Link>
        </motion.div>

        {companies.length === 0 ? (
          <Card className="card-glow">
            <CardContent className="py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
                <Building2 className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="mt-6 text-xl font-semibold">No companies yet</p>
              <p className="mt-2 text-muted-foreground">
                Get started by adding your first company
              </p>
              <Link href="/companies/new">
                <Button className="mt-6 bg-gradient-to-r from-sky-600 to-blue-600">
                  Add Company
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="card-glow group cursor-pointer transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${industryColors[company.industry || "Technology"] || "from-slate-500 to-slate-600"} shadow-lg`}>
                        <Building2 className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                          {company.name}
                        </h3>
                        {company.industry && (
                          <Badge variant={industryBadges[company.industry] || "secondary"} className="mt-2">
                            {company.industry}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {company.email && (
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground truncate">{company.email}</span>
                        </div>
                      )}
                      {company.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{company.phone}</span>
                        </div>
                      )}
                      {company.website && (
                        <div className="flex items-center gap-3 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {company.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                      {(company.city || company.state) && (
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {[company.city, company.state].filter(Boolean).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
