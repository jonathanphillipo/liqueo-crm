import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const companiesTable = sqliteTable("companies", {
  id: text("id").primaryKey(),
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
  revenue: integer("revenue"),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
})

export type InsertCompany = typeof companiesTable.$inferInsert
export type SelectCompany = typeof companiesTable.$inferSelect

