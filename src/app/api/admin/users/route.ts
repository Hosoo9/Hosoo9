import { getUsers, createUser } from "@/contexts/user"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../../constants"
import { z } from "zod"
import { ROLE_BUREAU, ROLE_TECHNICIAN, ROLE_MANAGER } from "@/utils/constants"

const schema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_BUREAU) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

  const users = await getUsers(params)

  return NextResponse.json(users, { status: 200 })
}

const createSchema = z.object({
  id: z.string(),
  role: z.enum([ROLE_BUREAU.toString(), ROLE_MANAGER.toString(), ROLE_TECHNICIAN.toString()]),
})

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_BUREAU) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  // check if the request body is valid
  const body = await request.json()
  const params = createSchema.parse(body)

  await createUser({ ...params, role: parseInt(params.role),  })

  return NextResponse.json(params, { status: 200 })
}
