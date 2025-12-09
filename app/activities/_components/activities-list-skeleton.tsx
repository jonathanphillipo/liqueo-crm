"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function ActivitiesListSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="h-10 w-40 animate-pulse rounded-lg bg-secondary" />
            <div className="mt-3 h-6 w-64 animate-pulse rounded-lg bg-secondary" />
          </div>
          <div className="h-11 w-36 animate-pulse rounded-xl bg-secondary" />
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="card-glow">
              <CardContent className="p-6">
                <div className="h-4 w-28 animate-pulse rounded bg-secondary" />
                <div className="mt-3 h-10 w-16 animate-pulse rounded bg-secondary" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="card-glow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 animate-pulse rounded-xl bg-secondary" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="h-5 w-48 animate-pulse rounded bg-secondary" />
                        <div className="mt-3 flex gap-2">
                          <div className="h-6 w-16 animate-pulse rounded-lg bg-secondary" />
                        </div>
                      </div>
                      <div className="h-4 w-20 animate-pulse rounded bg-secondary" />
                    </div>
                    <div className="mt-3 h-4 w-full animate-pulse rounded bg-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
