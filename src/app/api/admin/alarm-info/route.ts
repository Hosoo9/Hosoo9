import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../../constants"
import { getAlarmInfos, createAlarmInfo } from "@/contexts/alarm-info"
import { createAlarmInfoSchema } from "@/contexts/alarm-info/validation-schema"
import { ROLE_BUREAU } from "@/utils/constants"

// const schema = z.object({
//   page: z.coerce.number().default(1),
//   limit: z.coerce.number().default(10),
// })

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_BUREAU) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  // const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

  const alarmInfos = await getAlarmInfos()

  return NextResponse.json(alarmInfos, { status: 200 })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_BUREAU) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  // check if the request body is valid
  const body = await request.json()
  const params = createAlarmInfoSchema.parse(body)
 
  return NextResponse.json(await createAlarmInfo(params))
}
