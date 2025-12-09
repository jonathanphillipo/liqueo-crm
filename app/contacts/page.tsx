import { Suspense } from "react"
import { getContactsAction } from "@/actions/db/contacts-actions"
import ContactsList from "./_components/contacts-list"
import ContactsListSkeleton from "./_components/contacts-list-skeleton"

export default async function ContactsPage() {
  return (
    <Suspense fallback={<ContactsListSkeleton />}>
      <ContactsContent />
    </Suspense>
  )
}

async function ContactsContent() {
  const result = await getContactsAction()
  const contacts = result.isSuccess ? result.data : []

  return <ContactsList contacts={contacts} />
}

