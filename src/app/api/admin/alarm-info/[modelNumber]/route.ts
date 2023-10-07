import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../../../constants"
import { getCurrentUser } from "@/lib/session"
import {
  findAlarmInfo,
  updateAlarmInfo,
} from "@/contexts/alarm-info"
import { updateAlarmInfoSchema } from "@/contexts/alarm-info/validation-schema"
import { ROLE_BUREAU } from "@/utils/constants"

export async function GET(
  request: NextRequest,
  { params }: { params: { modelNumber: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const alarmInfo = await findAlarmInfo(params.modelNumber)

  return NextResponse.json(alarmInfo, { status: 200 })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { modelNumber: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined && user !== ROLE_BUREAU) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const input = updateAlarmInfoSchema.parse(await request.json())

  const alarmInfo = await updateAlarmInfo(params.modelNumber, {
    ...input,
  })

  return NextResponse.json(alarmInfo, { status: 200 })
}
