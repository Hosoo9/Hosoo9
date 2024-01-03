import { findUser, upsertUser } from "@/contexts/user"
import { upsertUserSchema } from "@/contexts/user/validation-schema"
import { getCurrentUser } from "@/lib/session"
import { ROLE_BUREAU } from "@/utils/constants"
import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../../../constants"
import { stringToNumberEnum } from "@/utils/converters"
import { recordNotFound } from "@/app/api/helpers"
import { defaultPassword } from "@/lib/pass"

export async function GET(
  request: NextRequest,
  { params }: { params: { modelNumber: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const result = await findUser(params.modelNumber)

  return NextResponse.json(result, { status: 200 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined && user !== ROLE_BUREAU) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const input = upsertUserSchema.parse(await request.json())

  const dbUser = await findUser(params.id)

  if (dbUser === null) {
    return recordNotFound()
  }

  const result = await upsertUser(params.id, {
    ...input,
    role: stringToNumberEnum(input.role),
    technicianType: stringToNumberEnum(input.technicianType),
    password: dbUser.password || await defaultPassword(),
  })

  return NextResponse.json(result, { status: 200 })
}
