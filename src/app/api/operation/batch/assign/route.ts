import {
  OperationState,
  updateOperationStatusByCodes
} from "@/contexts/operation"
import {
  batchUpdateOperationSchema
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

    const params = batchUpdateOperationSchema.parse({
      codes: bodyParams.codes,
      newStatus: bodyParams.newStatus,
    })

    await updateOperationStatusByCodes({
      ...params,
      newStatus: parseInt(params.newStatus) as OperationState,
    })

    return NextResponse.json({ status: "success" }, { status: 200 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
