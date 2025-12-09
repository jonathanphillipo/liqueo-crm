import { Suspense } from "react"
import { getCompaniesAction } from "@/actions/db/companies-actions"
import { getContactsAction } from "@/actions/db/contacts-actions"
import DealForm from "./_components/deal-form"

export default async function NewDealPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background p-8">Loading...</div>}>
      <DealFormWrapper />
    </Suspense>
  )
}

async function DealFormWrapper() {
  const [companiesResult, contactsResult] = await Promise.all([
    getCompaniesAction(),
    getContactsAction(),
  ])

  const companies = companiesResult.isSuccess ? companiesResult.data : []
  const contacts = contactsResult.isSuccess ? contactsResult.data : []

  return <DealForm companies={companies} contacts={contacts} />
}

