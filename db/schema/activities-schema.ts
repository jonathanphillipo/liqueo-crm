import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { contactsTable } from "./contacts-schema"
import { companiesTable } from "./companies-schema"
import { dealsTable } from "./deals-schema"

export const activitiesTable = sqliteTable("activities", {
  id: text("id").primaryKey(),
  type: text("type").notNull(), // call, email, meeting, note, task
  subject: text("subject").notNull(),
  description: text("description"),
  contactId: text("contact_id").references(() => contactsTable.id, {
    onDelete: "cascade",
  }),
  companyId: text("company_id").references(() => companiesTable.id, {
    onDelete: "cascade",
  }),
  dealId: text("deal_id").references(() => dealsTable.id, {
    onDelete: "cascade",
  }),
  dueDate: integer("due_date", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

export type InsertActivity = typeof activitiesTable.$inferInsert
export type SelectActivity = typeof activitiesTable.$inferSelect

