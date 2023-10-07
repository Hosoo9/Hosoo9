import { unauthorized } from "@/app/api/helpers"
import { completeInstallationAlarm } from "@/contexts/installation-alarm"
import { findOperation } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"

const completeInstallation = z.object({
  gasLeakDetectorAbnormality: z.boolean(),
  carbonMonoxideDetectorAbnormality: z.boolean(),
  fireAlarmDetectorAbnormality: z.boolean(),
  operationInspectionDate: z.coerce.date(),
  inspectorId: z.string(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const user = await getCurrentUser()

    if (user === undefined) {
      return unauthorized()
    }

    const completeParams = completeInstallation.parse(await request.json())

    const [operationCode, branchNumber] = params.slug.split("-")

    const operation = await findOperation(operationCode)

    if (operation === null) {
      return NextResponse.json({ error: "Operation not found" }, { status: 404 })
    }

    const installationAlarm = await completeInstallationAlarm({
      operationId: operation.id,
      branchNumber: branchNumber,
    }, completeParams)

    if (installationAlarm === null) {
      return NextResponse.json({ error: "Installation alarm not found" }, { status: 404 })
    }

    return NextResponse.json(installationAlarm, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
