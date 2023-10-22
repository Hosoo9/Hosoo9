import { getAllUsers } from "@/contexts/user"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { unauthorized } from "../helpers"

const schema = z.object({
  role: z.string().optional(),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

  const users = await getAllUsers(params)

  return NextResponse.json(users, { status: 200 })
}
