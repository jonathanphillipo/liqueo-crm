"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-secondary" />
          <div className="mt-3 h-6 w-96 animate-pulse rounded-lg bg-secondary" />
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="card-glow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
                    <div className="mt-4 h-10 w-16 animate-pulse rounded bg-secondary" />
                    <div className="mt-3 h-4 w-32 animate-pulse rounded bg-secondary" />
                  </div>
                  <div className="h-12 w-12 animate-pulse rounded-xl bg-secondary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3 card-glow">
            <CardHeader>
              <div className="h-6 w-40 animate-pulse rounded bg-secondary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-12 w-48 animate-pulse rounded bg-secondary" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 animate-pulse rounded-xl bg-secondary" />
                  <div className="h-24 animate-pulse rounded-xl bg-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 card-glow">
            <CardHeader>
              <div className="h-6 w-32 animate-pulse rounded bg-secondary" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="h-16 animate-pulse rounded-xl bg-secondary"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
