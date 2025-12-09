import { Suspense } from "react"
import { getCompaniesAction } from "@/actions/db/companies-actions"
import ContactForm from "./_components/contact-form"

export default async function NewContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background p-8">Loading...</div>}>
      <ContactFormWrapper />
    </Suspense>
  )
}

async function ContactFormWrapper() {
  const result = await getCompaniesAction()
  const companies = result.isSuccess ? result.data : []

  return <ContactForm companies={companies} />
}

