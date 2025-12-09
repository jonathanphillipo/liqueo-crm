import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { companiesTable } from "./companies-schema"
import { contactsTable } from "./contacts-schema"

export const dealsTable = sqliteTable("deals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  value: integer("value").notNull(),
  stage: text("stage").notNull().default("prospecting"),
  probability: integer("probability").default(0),
  expectedCloseDate: integer("expected_close_date", { mode: "timestamp" }),
  actualCloseDate: integer("actual_close_date", { mode: "timestamp" }),
  companyId: text("company_id").references(() => companiesTable.id, {
    onDelete: "set null",
  }),
  contactId: text("contact_id").references(() => contactsTable.id, {
    onDelete: "set null",
  }),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

export type InsertDeal = typeof dealsTable.$inferInsert
export type SelectDeal = typeof dealsTable.$inferSelect

