import { Suspense } from "react"
import { getCompaniesAction } from "@/actions/db/companies-actions"
import CompaniesList from "./_components/companies-list"
import CompaniesListSkeleton from "./_components/companies-list-skeleton"

export default async function CompaniesPage() {
  return (
    <Suspense fallback={<CompaniesListSkeleton />}>
      <CompaniesContent />
    </Suspense>
  )
}

async function CompaniesContent() {
  const result = await getCompaniesAction()
  const companies = result.isSuccess ? result.data : []

  return <CompaniesList companies={companies} />
}

