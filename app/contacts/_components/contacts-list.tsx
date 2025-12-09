"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Users, Plus, Mail, Phone, Briefcase, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { SelectContact } from "@/db/schema/contacts-schema"

interface ContactsListProps {
  contacts: SelectContact[]
}

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-600",
]

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % avatarColors.length
  return avatarColors[index]
}

export default function ContactsList({ contacts }: ContactsListProps) {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold">Contacts</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage your contact relationships
            </p>
          </div>
          <Link href="/contacts/new">
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/25">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </Link>
        </motion.div>

        {contacts.length === 0 ? (
          <Card className="card-glow">
            <CardContent className="py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                <Users className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="mt-6 text-xl font-semibold">No contacts yet</p>
              <p className="mt-2 text-muted-foreground">
                Get started by adding your first contact
              </p>
              <Link href="/contacts/new">
                <Button className="mt-6 bg-gradient-to-r from-cyan-600 to-blue-600">
                  Add Contact
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="card-glow group cursor-pointer transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarColor(contact.firstName)} shadow-lg text-white font-bold text-lg`}>
                        {getInitials(contact.firstName, contact.lastName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        {contact.jobTitle && (
                          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="h-3.5 w-3.5" />
                            <span className="truncate">{contact.jobTitle}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {contact.email && (
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground truncate">{contact.email}</span>
                        </div>
                      )}
                      {contact.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{contact.phone}</span>
                        </div>
                      )}
                      {(contact.city || contact.state) && (
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {[contact.city, contact.state].filter(Boolean).join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
