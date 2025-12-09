import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
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

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql, { schema })
