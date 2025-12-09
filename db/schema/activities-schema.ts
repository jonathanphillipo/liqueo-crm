import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"
import { contactsTable } from "./contacts-schema"
import { companiesTable } from "./companies-schema"
import { dealsTable } from "./deals-schema"

export const activitiesTable = pgTable("activities", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").notNull(), // call, email, meeting, note, task
  subject: text("subject").notNull(),
  description: text("description"),
  contactId: uuid("contact_id").references(() => contactsTable.id, {
    onDelete: "cascade",
  }),
  companyId: uuid("company_id").references(() => companiesTable.id, {
    onDelete: "cascade",
  }),
  dealId: uuid("deal_id").references(() => dealsTable.id, {
    onDelete: "cascade",
  }),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type InsertActivity = typeof activitiesTable.$inferInsert
export type SelectActivity = typeof activitiesTable.$inferSelect
