"use server"

import { db } from "@/db/db"
import {
  InsertActivity,
  SelectActivity,
  activitiesTable,
} from "@/db/schema/activities-schema"
import { ActionState } from "@/types"
import { eq, desc } from "drizzle-orm"
import { generateId } from "@/lib/utils"

export async function createActivityAction(
  activity: Omit<InsertActivity, "id" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectActivity>> {
  try {
    const id = generateId()
    const [newActivity] = await db
      .insert(activitiesTable)
      .values({
        ...activity,
        id,
      })
      .returning()

    return {
      isSuccess: true,
      message: "Activity created successfully",
      data: newActivity,
    }
  } catch (error) {
    console.error("Error creating activity:", error)
    return { isSuccess: false, message: "Failed to create activity" }
  }
}

export async function getActivitiesAction(): Promise<
  ActionState<SelectActivity[]>
> {
  try {
    const activities = await db
      .select()
      .from(activitiesTable)
      .orderBy(desc(activitiesTable.createdAt))

    return {
      isSuccess: true,
      message: "Activities retrieved successfully",
      data: activities,
    }
  } catch (error) {
    console.error("Error getting activities:", error)
    return { isSuccess: false, message: "Failed to get activities" }
  }
}

export async function getActivityAction(
  id: string
): Promise<ActionState<SelectActivity>> {
  try {
    const [activity] = await db
      .select()
      .from(activitiesTable)
      .where(eq(activitiesTable.id, id))
      .limit(1)

    if (!activity) {
      return { isSuccess: false, message: "Activity not found" }
    }

    return {
      isSuccess: true,
      message: "Activity retrieved successfully",
      data: activity,
    }
  } catch (error) {
    console.error("Error getting activity:", error)
    return { isSuccess: false, message: "Failed to get activity" }
  }
}

export async function updateActivityAction(
  id: string,
  data: Partial<Omit<InsertActivity, "id" | "createdAt" | "updatedAt">>
): Promise<ActionState<SelectActivity>> {
  try {
    const [updatedActivity] = await db
      .update(activitiesTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(activitiesTable.id, id))
      .returning()

    if (!updatedActivity) {
      return { isSuccess: false, message: "Activity not found" }
    }

    return {
      isSuccess: true,
      message: "Activity updated successfully",
      data: updatedActivity,
    }
  } catch (error) {
    console.error("Error updating activity:", error)
    return { isSuccess: false, message: "Failed to update activity" }
  }
}

export async function deleteActivityAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(activitiesTable).where(eq(activitiesTable.id, id))

    return {
      isSuccess: true,
      message: "Activity deleted successfully",
      data: undefined,
    }
  } catch (error) {
    console.error("Error deleting activity:", error)
    return { isSuccess: false, message: "Failed to delete activity" }
  }
}

