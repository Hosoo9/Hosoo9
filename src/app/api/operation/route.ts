import { OperationType, createOperation, findOperations } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { unauthorized } from "../helpers"
import {
  createOperationSchema,
  selectOperationSchema,
} from "@/contexts/operation/validation-schema"

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
  })

  const operations = await findOperations(params, { includeUser: true })

  return NextResponse.json(operations, { status: 200 })
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    // const enforcer = await getEnforcer()

    if (
      user === undefined
      // (await enforcer.enforce(user.id, "operation", "write")) === false
    ) {
      return unauthorized()
    }

    const params = createOperationSchema.parse(await request.json())

    const operation = await createOperation({
      ...params,
      createdBy: user.id,
      operationType: parseInt(params.operationType) as OperationType,
    })

    return NextResponse.json(operation, { status: 201 })
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json(e.issues, { status: 400 })
    } else {
      throw e
    }
  }
}
