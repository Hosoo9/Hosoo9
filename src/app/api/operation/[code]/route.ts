import { findOperation, updateOperation } from "@/contexts/operation"
import { updateOperationSchema } from "@/contexts/operation/validation-schema"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { NOT_AUTHORIZED } from "../../constants"
import { unauthorized } from "../../helpers"
import { presentOperation } from "@/utils/operation/operation-transformer"
import dayjs from "dayjs"

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return NextResponse.json({ error: NOT_AUTHORIZED }, { status: 401 })
  }

  const operation = await findOperation(params.code, { includeUser: true })

  if (operation === null) {
    return NextResponse.json({ error: "Operation not found" }, { status: 404 })
  }

  return NextResponse.json(presentOperation(operation), { status: 200 })
}

const toBoolean = (val: string | null) => {
  if (val === null) {
    return null
  } else {
    return val === "2" ? true : false
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { code: string } },
) {
  const user = await getCurrentUser()

  if (
    user === undefined
    // (await enforce(user.id, "operation", "write")) === false
  ) {
    return unauthorized()
  }

  const input = updateOperationSchema.parse(await request.json())

  const operation = await updateOperation(params.code, {
    ...input,
    operationType: input.operationType ? parseInt(input.operationType) : null,
    footprint: input.footprint ? parseInt(input.footprint) : null,
    beforeWorkInspectionType: input.beforeWorkInspectionType ? parseInt(input.beforeWorkInspectionType) : null,
    afterWorkInspectionType: input.afterWorkInspectionType ? parseInt(input.afterWorkInspectionType) : null,
    beforeWorkResult: toBoolean(input.beforeWorkResult),
    afterWorkResult: toBoolean(input.afterWorkResult),
  })

  return NextResponse.json(presentOperation(operation), { status: 200 })
}
