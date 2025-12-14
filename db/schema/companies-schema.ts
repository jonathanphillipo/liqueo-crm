import { pgTable, text, integer, bigint, timestamp, uuid } from "drizzle-orm/pg-core"

export const companiesTable = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  website: text("website"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country"),
  employeeCount: integer("employee_count"),
  revenue: bigint("revenue", { mode: "number" }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type InsertCompany = typeof companiesTable.$inferInsert
export type SelectCompany = typeof companiesTable.$inferSelect
