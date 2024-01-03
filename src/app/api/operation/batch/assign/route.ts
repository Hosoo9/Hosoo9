import { batchAssignWorkers } from "@/contexts/operation"
import {
    batchAssign
} from "@/contexts/operation/validation-schema"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { unauthorized } from "../../../helpers"

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (
      user === undefined
      // (await enforcer.enforce(user.id, "operation", "write")) === false
    ) {
      return unauthorized()
    }

    const bodyParams = await request.json()

    const params = batchAssign.parse({
      codes: bodyParams.codes,
      assignedWorkerId: bodyParams.assignedWorkerId,
      scheduledDate: bodyParams.scheduledDate,
    })

    await batchAssignWorkers(params)

    return NextResponse.json({ status: "success" }, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
