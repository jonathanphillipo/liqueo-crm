"use server"

import { db } from "@/db/db"
import {
  InsertContact,
  SelectContact,
  contactsTable,
} from "@/db/schema/contacts-schema"
import { ActionState } from "@/types"
import { eq, desc } from "drizzle-orm"
import { generateId } from "@/lib/utils"

export async function createContactAction(
  contact: Omit<InsertContact, "id" | "createdAt" | "updatedAt">
): Promise<ActionState<SelectContact>> {
  try {
    const id = generateId()
    const [newContact] = await db
      .insert(contactsTable)
      .values({
        ...contact,
        id,
      })
      .returning()

    return {
      isSuccess: true,
      message: "Contact created successfully",
      data: newContact,
    }
  } catch (error) {
    console.error("Error creating contact:", error)
    return { isSuccess: false, message: "Failed to create contact" }
  }
}

export async function getContactsAction(): Promise<ActionState<SelectContact[]>> {
  try {
    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt))

    return {
      isSuccess: true,
      message: "Contacts retrieved successfully",
      data: contacts,
    }
  } catch (error) {
    console.error("Error getting contacts:", error)
    return { isSuccess: false, message: "Failed to get contacts" }
  }
}

export async function getContactAction(
  id: string
): Promise<ActionState<SelectContact>> {
  try {
    const [contact] = await db
      .select()
      .from(contactsTable)
      .where(eq(contactsTable.id, id))
      .limit(1)

    if (!contact) {
      return { isSuccess: false, message: "Contact not found" }
    }

    return {
      isSuccess: true,
      message: "Contact retrieved successfully",
      data: contact,
    }
  } catch (error) {
    console.error("Error getting contact:", error)
    return { isSuccess: false, message: "Failed to get contact" }
  }
}

export async function updateContactAction(
  id: string,
  data: Partial<Omit<InsertContact, "id" | "createdAt" | "updatedAt">>
): Promise<ActionState<SelectContact>> {
  try {
    const [updatedContact] = await db
      .update(contactsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contactsTable.id, id))
      .returning()

    if (!updatedContact) {
      return { isSuccess: false, message: "Contact not found" }
    }

    return {
      isSuccess: true,
      message: "Contact updated successfully",
      data: updatedContact,
    }
  } catch (error) {
    console.error("Error updating contact:", error)
    return { isSuccess: false, message: "Failed to update contact" }
  }
}

export async function deleteContactAction(
  id: string
): Promise<ActionState<void>> {
  try {
    await db.delete(contactsTable).where(eq(contactsTable.id, id))

    return {
      isSuccess: true,
      message: "Contact deleted successfully",
      data: undefined,
    }
  } catch (error) {
    console.error("Error deleting contact:", error)
    return { isSuccess: false, message: "Failed to delete contact" }
  }
}

