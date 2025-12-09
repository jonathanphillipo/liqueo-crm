import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { companiesTable } from "./companies-schema"

export const contactsTable = sqliteTable("contacts", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  jobTitle: text("job_title"),
  companyId: text("company_id").references(() => companiesTable.id, {
    onDelete: "set null",
  }),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

export type InsertContact = typeof contactsTable.$inferInsert
export type SelectContact = typeof contactsTable.$inferSelect

