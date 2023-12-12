import {
  ContactType,
  createContact,
  findContacts,
} from "@/contexts/contact"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../constants"
import { createContactSchema } from "@/contexts/contact/validation-schema"
import { ZodError, z } from "zod"
import { findOperation } from "@/contexts/operation"
import { recordNotFound } from "../helpers"

const schema = z.object({
  operationCode: z.string()
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

  const contacts = await findContacts(params)

  return NextResponse.json(contacts, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
    }

    const params = createContactSchema.parse(await request.json())

    const operation = await findOperation(params.operationCode)

    if (operation === null) {
      return recordNotFound()
    }

    const contact = await createContact({
      contactedBy: user.id,
      contactedAt: params.contactedAt,
      details: params.details,
      operationId: operation.id,
      contactType: parseInt(params.contactType) as ContactType,
      createdBy: user.id
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      console.log(e.issues)
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
