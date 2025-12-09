"use server"

import { db } from "@/db/db"
import {
  InsertCompany,
  SelectCompany,
  companiesTable,
} from "@/db/schema/companies-schema"
import { ActionState } from "@/types"
import { eq, desc } from "drizzle-orm"
import { generateId } from "@/lib/utils"

export async function createCompanyAction(
  company: Omit<InsertCompany, "id" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectCompany>> {
  try {
    const id = generateId()
    const [newCompany] = await db
      .insert(companiesTable)
      .values({
        ...company,
        id,
      })
      .returning()

    return {
      isSuccess: true,
      message: "Company created successfully",
      data: newCompany,
    }
  } catch (error) {
    console.error("Error creating company:", error)
    return { isSuccess: false, message: "Failed to create company" }
  }
}

export async function getCompaniesAction(): Promise<ActionState<SelectCompany[]>> {
  try {
    const companies = await db
      .select()
      .from(companiesTable)
      .orderBy(desc(companiesTable.createdAt))

    return {
      isSuccess: true,
      message: "Companies retrieved successfully",
      data: companies,
    }
  } catch (error) {
    console.error("Error getting companies:", error)
    return { isSuccess: false, message: "Failed to get companies" }
  }
}

export async function getCompanyAction(
  id: string
): Promise<ActionState<SelectCompany>> {
  try {
    const [company] = await db
      .select()
      .from(companiesTable)
      .where(eq(companiesTable.id, id))
      .limit(1)

    if (!company) {
      return { isSuccess: false, message: "Company not found" }
    }

    return {
      isSuccess: true,
      message: "Company retrieved successfully",
      data: company,
    }
  } catch (error) {
    console.error("Error getting company:", error)
    return { isSuccess: false, message: "Failed to get company" }
  }
}

export async function updateCompanyAction(
  id: string,
  data: Partial<Omit<InsertCompany, "id" | "createdAt" | "updatedAt">>
): Promise<ActionState<SelectCompany>> {
  try {
    const [updatedCompany] = await db
      .update(companiesTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(companiesTable.id, id))
      .returning()

    if (!updatedCompany) {
      return { isSuccess: false, message: "Company not found" }
    }

    return {
      isSuccess: true,
      message: "Company updated successfully",
      data: updatedCompany,
    }
  } catch (error) {
    console.error("Error updating company:", error)
    return { isSuccess: false, message: "Failed to update company" }
  }
}

export async function deleteCompanyAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(companiesTable).where(eq(companiesTable.id, id))

    return {
      isSuccess: true,
      message: "Company deleted successfully",
      data: undefined,
    }
  } catch (error) {
    console.error("Error deleting company:", error)
    return { isSuccess: false, message: "Failed to delete company" }
  }
}

