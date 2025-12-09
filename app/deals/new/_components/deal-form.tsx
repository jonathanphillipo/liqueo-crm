"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TrendingUp, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createDealAction } from "@/actions/db/deals-actions"
import type { SelectCompany } from "@/db/schema/companies-schema"
import type { SelectContact } from "@/db/schema/contacts-schema"

interface DealFormProps {
  companies: SelectCompany[]
  contacts: SelectContact[]
}

const stages = [
  { value: "prospecting", label: "Prospecting" },
  { value: "qualification", label: "Qualification" },
  { value: "proposal", label: "Proposal" },
  { value: "negotiation", label: "Negotiation" },
  { value: "closed", label: "Closed Won" },
]

export default function DealForm({ companies, contacts }: DealFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const expectedCloseDate = formData.get("expectedCloseDate") as string

    const result = await createDealAction({
      title: formData.get("title") as string,
      value: parseInt(formData.get("value") as string) || 0,
      stage: formData.get("stage") as string || "prospecting",
      probability: parseInt(formData.get("probability") as string) || 0,
      expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
      companyId: formData.get("companyId") as string || null,
      contactId: formData.get("contactId") as string || null,
      description: formData.get("description") as string || null,
    })

    setIsLoading(false)

    if (result.isSuccess) {
      router.push("/deals")
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/deals"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Deals
          </Link>
          <h1 className="text-4xl font-bold">Add Deal</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Add a new consulting engagement
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="card-glow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Deal Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title">Deal Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., BlackRock - Data Integration Strategy"
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="value">Deal Value ($) *</Label>
                    <Input
                      id="value"
                      name="value"
                      type="number"
                      placeholder="500000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stage">Stage</Label>
                    <select
                      id="stage"
                      name="stage"
                      defaultValue="prospecting"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {stages.map((stage) => (
                        <option key={stage.value} value={stage.value}>
                          {stage.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="probability">Probability (%)</Label>
                    <Input
                      id="probability"
                      name="probability"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
                    <Input
                      id="expectedCloseDate"
                      name="expectedCloseDate"
                      type="date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyId">Company</Label>
                    <select
                      id="companyId"
                      name="companyId"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select company...</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactId">Primary Contact</Label>
                    <select
                      id="contactId"
                      name="contactId"
                      className="flex h-10 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select contact...</option>
                      {contacts.map((contact) => (
                        <option key={contact.id} value={contact.id}>
                          {contact.firstName} {contact.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the engagement scope and deliverables..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Deal"
                    )}
                  </Button>
                  <Link href="/deals">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

