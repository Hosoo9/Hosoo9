import {
  FindOperationsInput,
  OperationWorkType,
  countOperations,
  updateOperationStatusByCodes,
  findOperations,
  OperationState,
} from "@/contexts/operation"
import {
  batchUpdateOperationSchema,
  selectOperationSchema,
} from "@/contexts/operation/validation-schema"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError } from "zod"
import { unauthorized } from "../../helpers"

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const params = selectOperationSchema.parse({
    ...Object.fromEntries(request.nextUrl.searchParams),
    statuses: request.nextUrl.searchParams.getAll("statuses"),
    isExpiredExchange:
      request.nextUrl.searchParams.get("isExpiredExchange") === undefined
        ? undefined
        : request.nextUrl.searchParams.get("isExpiredExchange") === "true",
    operationTypes: request.nextUrl.searchParams.has("operationType")
      ? request.nextUrl.searchParams.getAll("operationType")
      : undefined,
  })

  const options: FindOperationsInput = {
    ...params,
    operationTypes: (params.operationTypes || []).map(
      (type) => parseInt(type) as OperationWorkType,
    ),
  }

  const operations = await findOperations(options, { includeUser: true })

  const total = await countOperations(options)

  return NextResponse.json({ data: operations, total }, { status: 200 })
}

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
