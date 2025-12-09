import { Suspense } from "react"
import { getCompaniesAction } from "@/actions/db/companies-actions"
import { getContactsAction } from "@/actions/db/contacts-actions"
import { getDealsAction } from "@/actions/db/deals-actions"
import ActivityForm from "./_components/activity-form"

export default async function NewActivityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background p-8">Loading...</div>}>
      <ActivityFormWrapper />
    </Suspense>
  )
}

async function ActivityFormWrapper() {
  const [companiesResult, contactsResult, dealsResult] = await Promise.all([
    getCompaniesAction(),
    getContactsAction(),
    getDealsAction(),
  ])

  const companies = companiesResult.isSuccess ? companiesResult.data : []
  const contacts = contactsResult.isSuccess ? contactsResult.data : []
  const deals = dealsResult.isSuccess ? dealsResult.data : []

  return <ActivityForm companies={companies} contacts={contacts} deals={deals} />
}

