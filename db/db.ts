import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import {
  companiesTable,
  contactsTable,
  dealsTable,
  activitiesTable,
} from "@/db/schema"

const schema = {
  companies: companiesTable,
  contacts: contactsTable,
  deals: dealsTable,
  activities: activitiesTable,
}

const client = postgres(process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy")

export const db = drizzle(client, { schema })
