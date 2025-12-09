import { Suspense } from "react"
import { getActivitiesAction } from "@/actions/db/activities-actions"
import ActivitiesList from "./_components/activities-list"
import ActivitiesListSkeleton from "./_components/activities-list-skeleton"

export default async function ActivitiesPage() {
  return (
    <Suspense fallback={<ActivitiesListSkeleton />}>
      <ActivitiesContent />
    </Suspense>
  )
}

async function ActivitiesContent() {
  const result = await getActivitiesAction()
  const activities = result.isSuccess ? result.data : []

  return <ActivitiesList activities={activities} />
}

