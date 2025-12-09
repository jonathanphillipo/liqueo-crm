import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core"
import { companiesTable } from "./companies-schema"
import { contactsTable } from "./contacts-schema"

export const dealsTable = pgTable("deals", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  value: integer("value").notNull(),
  stage: text("stage").notNull().default("prospecting"),
  probability: integer("probability").default(0),
  expectedCloseDate: timestamp("expected_close_date"),
  actualCloseDate: timestamp("actual_close_date"),
  companyId: uuid("company_id").references(() => companiesTable.id, {
    onDelete: "set null",
  }),
  contactId: uuid("contact_id").references(() => contactsTable.id, {
    onDelete: "set null",
  }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type InsertDeal = typeof dealsTable.$inferInsert
export type SelectDeal = typeof dealsTable.$inferSelect
