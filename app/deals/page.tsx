import { Suspense } from "react"
import { getDealsAction } from "@/actions/db/deals-actions"
import DealsList from "./_components/deals-list"
import DealsListSkeleton from "./_components/deals-list-skeleton"

export default async function DealsPage() {
  return (
    <Suspense fallback={<DealsListSkeleton />}>
      <DealsContent />
    </Suspense>
  )
}

async function DealsContent() {
  const result = await getDealsAction()
  const deals = result.isSuccess ? result.data : []

  return <DealsList deals={deals} />
}

