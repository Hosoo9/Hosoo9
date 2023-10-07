import { createInvite, getInvites } from "@/contexts/invite"
import { getUserByEmail } from "@/contexts/user"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { NOT_AUTHORIZED } from "../../constants"

const inviteUserSchema = z.object({
  email: z.string(),
  role: z.coerce.number().default(1)
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== 3) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  return NextResponse.json(await getInvites())
}

export async function POST(request: NextRequest) {
  const params = inviteUserSchema.parse(await request.json())

  const user = await getUserByEmail(params.email.toLowerCase())

  if (user !== null) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }

  const invite = await createInvite({ email: params.email, role: params.role })

  if (invite) {
    return NextResponse.json(invite, { status: 201 })
  } else {
    return NextResponse.json({ error: "Invite already exists" }, { status: 400 })
  }
}
