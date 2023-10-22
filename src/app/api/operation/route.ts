import { createOperation, findOperations } from "@/contexts/operation"
import { getCurrentUser } from "@/lib/session"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z } from "zod"
import { unauthorized } from "../helpers"
import { createOperationSchema } from "@/contexts/operation/validation-schema"

const schema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  customerNumber: z.string().optional(),
  address: z.string().optional(),
  status: z.coerce.number().optional(),
  customerName: z.string().optional(),
  desiredDate: z.coerce.date().optional(),
  technicianName: z.string().optional(),
})

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()

  if (user === undefined) {
    return unauthorized()
  }

  const params = schema.parse(Object.fromEntries(request.nextUrl.searchParams))

  const operations = await findOperations(params)

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
      createdBy: user.id,
      ...params,
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
