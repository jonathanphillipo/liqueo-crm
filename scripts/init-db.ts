import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "../db/schema"

const sqlite = new Database(process.env.DATABASE_URL || "./db.sqlite")
const db = drizzle(sqlite, { schema })

// Create tables
const createCompaniesTable = `
CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  employee_count INTEGER,
  revenue INTEGER,
  description TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)
`

const createContactsTable = `
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  job_title TEXT,
  company_id TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  notes TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id)
)
`

const createDealsTable = `
CREATE TABLE IF NOT EXISTS deals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  value INTEGER NOT NULL,
  stage TEXT NOT NULL DEFAULT 'prospecting',
  probability INTEGER DEFAULT 0,
  expected_close_date INTEGER,
  actual_close_date INTEGER,
  company_id TEXT,
  contact_id TEXT,
  description TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id)
)
`

const createActivitiesTable = `
CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  contact_id TEXT,
  company_id TEXT,
  deal_id TEXT,
  due_date INTEGER,
  completed_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (contact_id) REFERENCES contacts(id),
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (deal_id) REFERENCES deals(id)
)
`

sqlite.exec(createCompaniesTable)
sqlite.exec(createContactsTable)
sqlite.exec(createDealsTable)
sqlite.exec(createActivitiesTable)

console.log("Database tables created successfully!")

sqlite.close()

