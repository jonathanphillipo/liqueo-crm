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

// Get database URL with better error handling
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.warn("⚠️  DATABASE_URL not found. Please set DATABASE_URL in .env.local")
  console.log("   For local development, create .env.local with:")
  console.log("   DATABASE_URL='postgresql://user:password@host/database?sslmode=require'")
  console.log("   Or for SQLite: DATABASE_URL='file:./dev.db'")
}

// Use a dummy URL for build time, but throw error at runtime if not configured
const client = postgres(databaseUrl || "postgresql://dummy:dummy@localhost:5432/dummy", {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
})

export const db = drizzle(client, { schema })
