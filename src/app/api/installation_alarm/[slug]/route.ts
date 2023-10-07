import { findInstallationAlarm } from "@/contexts/installation-alarm"
import { findOperation } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { ROLE_BUREAU, ROLE_TECHNICIAN } from "@/utils/constants"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { NOT_AUTHORIZED } from "../../constants"

// const schema = z.object({
//   page: z.coerce.number().default(1),
//   limit: z.coerce.number().default(10),
// })

const completeInstallation = z.object({
  gasLeakDetectorAbnormality: z.boolean(),
  carbonMonoxideDetectorAbnormality: z.boolean(),
  fireAlarmDetectorAbnormality: z.boolean(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined || user.role !== ROLE_TECHNICIAN || user.role !== ROLE_BUREAU) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const [operationCode, branchNumber] = params.slug.split("-")

  const operation = await findOperation(operationCode)

  if (operation === null) {
    return NextResponse.json({ error: "Operation not found" }, { status: 404 })
  }

  const alarmInstallation = await findInstallationAlarm({
    branchNumber,
    operationId: operation.id,
  })

  return NextResponse.json(alarmInstallation, { status: 200 })
}
