import { unauthorized } from "@/app/api/helpers"
import {
    findContacts
} from "@/contexts/contact"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  operationCode: z.string()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const contacts = await findContacts({ operationCode: params.code })

  return NextResponse.json(contacts, { status: 200 });
}
