"use server"

import { db } from "@/db/db"
import { InsertDeal, SelectDeal, dealsTable } from "@/db/schema/deals-schema"
import { ActionState } from "@/types"
import { eq, desc } from "drizzle-orm"
import { generateId } from "@/lib/utils"

export async function createDealAction(
  deal: Omit<InsertDeal, "id" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectDeal>> {
  try {
    const id = generateId()
    const [newDeal] = await db
      .insert(dealsTable)
      .values({
        ...deal,
        id,
      })
      .returning()

    return {
      isSuccess: true,
      message: "Deal created successfully",
      data: newDeal,
    }
  } catch (error) {
    console.error("Error creating deal:", error)
    return { isSuccess: false, message: "Failed to create deal" }
  }
}

export async function getDealsAction(): Promise<ActionState<SelectDeal[]>> {
  try {
    const deals = await db
      .select()
      .from(dealsTable)
      .orderBy(desc(dealsTable.createdAt))

    return {
      isSuccess: true,
      message: "Deals retrieved successfully",
      data: deals,
    }
  } catch (error) {
    console.error("Error getting deals:", error)
    return { isSuccess: false, message: "Failed to get deals" }
  }
}

export async function getDealAction(
  id: string
): Promise<ActionState<SelectDeal>> {
  try {
    const [deal] = await db
      .select()
      .from(dealsTable)
      .where(eq(dealsTable.id, id))
      .limit(1)

    if (!deal) {
      return { isSuccess: false, message: "Deal not found" }
    }

    return {
      isSuccess: true,
      message: "Deal retrieved successfully",
      data: deal,
    }
  } catch (error) {
    console.error("Error getting deal:", error)
    return { isSuccess: false, message: "Failed to get deal" }
  }
}

export async function updateDealAction(
  id: string,
  data: Partial<Omit<InsertDeal, "id" | "createdAt" | "updatedAt">>
): Promise<ActionState<SelectDeal>> {
  try {
    const [updatedDeal] = await db
      .update(dealsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(dealsTable.id, id))
      .returning()

    if (!updatedDeal) {
      return { isSuccess: false, message: "Deal not found" }
    }

    return {
      isSuccess: true,
      message: "Deal updated successfully",
      data: updatedDeal,
    }
  } catch (error) {
    console.error("Error updating deal:", error)
    return { isSuccess: false, message: "Failed to update deal" }
  }
}

export async function deleteDealAction(id: string): Promise<ActionState<void>> {
  try {
    await db.delete(dealsTable).where(eq(dealsTable.id, id))

    return {
      isSuccess: true,
      message: "Deal deleted successfully",
      data: undefined,
    }
  } catch (error) {
    console.error("Error deleting deal:", error)
    return { isSuccess: false, message: "Failed to delete deal" }
  }
}

