"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function CompaniesListSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="h-10 w-48 animate-pulse rounded-lg bg-secondary" />
            <div className="mt-3 h-6 w-72 animate-pulse rounded-lg bg-secondary" />
          </div>
          <div className="h-11 w-36 animate-pulse rounded-xl bg-secondary" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="card-glow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 animate-pulse rounded-xl bg-secondary" />
                  <div className="flex-1">
                    <div className="h-5 w-32 animate-pulse rounded bg-secondary" />
                    <div className="mt-3 h-6 w-20 animate-pulse rounded-lg bg-secondary" />
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-4 w-48 animate-pulse rounded bg-secondary" />
                  <div className="h-4 w-36 animate-pulse rounded bg-secondary" />
                  <div className="h-4 w-40 animate-pulse rounded bg-secondary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
