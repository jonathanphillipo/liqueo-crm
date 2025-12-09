import { Suspense } from "react"
import { getCompaniesAction } from "@/actions/db/companies-actions"
import { getContactsAction } from "@/actions/db/contacts-actions"
import { getDealsAction } from "@/actions/db/deals-actions"
import { getActivitiesAction } from "@/actions/db/activities-actions"
import Dashboard from "./_components/dashboard"
import DashboardSkeleton from "./_components/dashboard-skeleton"

export default async function HomePage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}

async function DashboardContent() {
  const [companiesResult, contactsResult, dealsResult, activitiesResult] =
    await Promise.all([
      getCompaniesAction(),
      getContactsAction(),
      getDealsAction(),
      getActivitiesAction(),
    ])

  const companies = companiesResult.isSuccess ? companiesResult.data : []
  const contacts = contactsResult.isSuccess ? contactsResult.data : []
  const deals = dealsResult.isSuccess ? dealsResult.data : []
  const activities = activitiesResult.isSuccess ? activitiesResult.data : []

  return (
    <Dashboard
      companies={companies}
      contacts={contacts}
      deals={deals}
      activities={activities}
    />
  )
}

